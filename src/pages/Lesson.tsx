import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { findLesson, getCourseById } from '../data/courses';
import { LANGUAGES } from '../data/languages';
import type {
  GrammarPoint,
  Lesson as LessonType,
  ListeningClip,
  SpeakingSentence,
  VocabItem,
} from '../data/types';
import { recordAndScore, speak, speechSupported, stopSpeaking } from '../lib/audio';
import { classnames } from '../lib/storage';
import { ProgressBar, Toast } from '../components/ui';

type Stage =
  | { kind: 'intro' }
  | { kind: 'vocab-card'; index: number }
  | { kind: 'vocab-quiz'; pairs: { term: string; meaning: string }[]; index: number; correct: number }
  | { kind: 'grammar-explain'; index: number }
  | { kind: 'grammar-quiz'; point: GrammarPoint; index: number; correct: number }
  | { kind: 'speaking-practice'; index: number; done: number }
  | { kind: 'listening-practice'; index: number; correct: number }
  | { kind: 'result'; score: number; xp: number };

export function Lesson() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { completeLesson } = useApp();
  const found = courseId && lessonId ? findLesson(courseId, lessonId) : undefined;
  const course = courseId ? getCourseById(courseId) : undefined;

  const [stage, setStage] = useState<Stage>({ kind: 'intro' });
  const [unlockedToast, setUnlockedToast] = useState<string | null>(null);
  const [resultInfo, setResultInfo] = useState<{ score: number; xp: number; newlyUnlocked: string[] } | null>(null);

  const lang = course ? LANGUAGES[course.language] : undefined;

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  if (!found || !course || !lang) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <div className="text-5xl mb-3">🤔</div>
        <div className="font-bold">课时不存在</div>
        <Link to="/app/courses" className="btn-primary mt-4 inline-flex">返回课程</Link>
      </div>
    );
  }

  const { lesson, unit } = found;

  const startLesson = () => {
    if (lesson.type === 'vocab' && lesson.vocab) {
      setStage({ kind: 'vocab-card', index: 0 });
    } else if (lesson.type === 'grammar' && lesson.grammar) {
      setStage({ kind: 'grammar-explain', index: 0 });
    } else if (lesson.type === 'speaking' && lesson.speaking) {
      setStage({ kind: 'speaking-practice', index: 0, done: 0 });
    } else if (lesson.type === 'listening' && lesson.listening) {
      setStage({ kind: 'listening-practice', index: 0, correct: 0 });
    }
  };

  const finish = (score: number, xp: number, wordsLearned = 0, isSpeaking = false) => {
    const res = completeLesson({ courseId: course.id, lessonId: lesson.id, score, xp, wordsLearned, isSpeaking });
    setResultInfo({ score, xp, newlyUnlocked: res.newlyUnlocked });
    if (res.newlyUnlocked.length > 0) setUnlockedToast('解锁新成就！');
    setStage({ kind: 'result', score, xp });
  };

  // 总步数（用于顶部进度）
  const totalSteps = useMemo(() => {
    switch (lesson.type) {
      case 'vocab':
        return (lesson.vocab?.length ?? 0) + 1;
      case 'grammar':
        return (lesson.grammar?.length ?? 0) * 2;
      case 'speaking':
        return lesson.speaking?.length ?? 0;
      case 'listening':
        return lesson.listening?.length ?? 0;
      default:
        return 1;
    }
  }, [lesson]);

  const currentStep = (() => {
    switch (stage.kind) {
      case 'intro':
        return 0;
      case 'vocab-card':
      case 'vocab-quiz':
        return stage.index + 1;
      case 'grammar-explain':
      case 'grammar-quiz':
        return stage.index * 2 + (stage.kind === 'grammar-explain' ? 1 : 2);
      case 'speaking-practice':
        return stage.index + 1;
      case 'listening-practice':
        return stage.index + 1;
      default:
        return totalSteps;
    }
  })();

  const progressPct = stage.kind === 'result' ? 100 : Math.round((currentStep / (totalSteps + 1)) * 100);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Top bar */}
      <div className="sticky top-14 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 h-12 flex items-center gap-3">
          <button
            onClick={() => {
              stopSpeaking();
              if (confirm('确定要退出本次学习吗？进度将不会保存。')) navigate(`/app/courses/${course.id}`);
            }}
            className="text-ink-600 hover:text-rose-500 text-lg"
          >
            ✕
          </button>
          <ProgressBar value={progressPct} className="flex-1" />
          <span className="text-xs text-ink-600 tabular-nums">{currentStep}/{totalSteps + 1}</span>
        </div>
      </div>

      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-6">
        {stage.kind === 'intro' && (
          <IntroStage lesson={lesson} unitTitle={unit.title} onStart={startLesson} />
        )}

        {stage.kind === 'vocab-card' && lesson.vocab && (
          <VocabCardStage
            vocab={lesson.vocab}
            index={stage.index}
            ttsLang={lang.ttsLang}
            onNext={() => {
              if (stage.index + 1 < lesson.vocab!.length) {
                setStage({ kind: 'vocab-card', index: stage.index + 1 });
              } else {
                // 进入 quiz
                const pairs = lesson.vocab!.slice(0, Math.min(6, lesson.vocab!.length)).map((v) => ({
                  term: v.term,
                  meaning: v.meaning,
                }));
                setStage({ kind: 'vocab-quiz', pairs, index: 0, correct: 0 });
              }
            }}
          />
        )}

        {stage.kind === 'vocab-quiz' && (
          <VocabQuizStage
            pairs={stage.pairs}
            index={stage.index}
            correct={stage.correct}
            onAnswer={(ok) => {
              const newCorrect = stage.correct + (ok ? 1 : 0);
              if (stage.index + 1 < stage.pairs.length) {
                setStage({ kind: 'vocab-quiz', pairs: stage.pairs, index: stage.index + 1, correct: newCorrect });
              } else {
                const score = Math.round((newCorrect / stage.pairs.length) * 100);
                finish(score, 50 + score / 2, lesson.vocab?.length ?? 0);
              }
            }}
          />
        )}

        {stage.kind === 'grammar-explain' && lesson.grammar && (
          <GrammarExplainStage
            point={lesson.grammar[stage.index]}
            index={stage.index}
            total={lesson.grammar.length}
            onNext={() => setStage({ kind: 'grammar-quiz', point: lesson.grammar![stage.index], index: stage.index, correct: 0 })}
          />
        )}

        {stage.kind === 'grammar-quiz' && (
          <GrammarQuizStage
            point={stage.point}
            onAnswer={(ok) => {
              const newCorrect = stage.correct + (ok ? 1 : 0);
              if (stage.index + 1 < (lesson.grammar?.length ?? 0)) {
                setStage({ kind: 'grammar-explain', index: stage.index + 1 });
              } else {
                const totalGrammar = lesson.grammar?.length ?? 1;
                const score = Math.round((newCorrect / totalGrammar) * 100);
                finish(score, 50 + score / 2);
              }
            }}
          />
        )}

        {stage.kind === 'speaking-practice' && lesson.speaking && (
          <SpeakingStage
            sentence={lesson.speaking[stage.index]}
            ttsLang={lang.ttsLang}
            index={stage.index}
            total={lesson.speaking.length}
            done={stage.done}
            onDone={() => {
              const newDone = stage.done + 1;
              if (stage.index + 1 < lesson.speaking!.length) {
                setStage({ kind: 'speaking-practice', index: stage.index + 1, done: newDone });
              } else {
                const finalScore = Math.round(60 + (newDone / lesson.speaking!.length) * 40);
                finish(finalScore, 60 + finalScore / 3, 0, true);
              }
            }}
          />
        )}

        {stage.kind === 'listening-practice' && lesson.listening && (
          <ListeningStage
            clip={lesson.listening[stage.index]}
            index={stage.index}
            total={lesson.listening.length}
            correct={stage.correct}
            ttsLang={lang.ttsLang}
            onAnswer={(ok) => {
              const newCorrect = stage.correct + (ok ? 1 : 0);
              if (stage.index + 1 < lesson.listening!.length) {
                setStage({ kind: 'listening-practice', index: stage.index + 1, correct: newCorrect });
              } else {
                const score = Math.round(50 + (newCorrect / lesson.listening!.length) * 50);
                finish(score, 50 + score / 2);
              }
            }}
          />
        )}

        {stage.kind === 'result' && resultInfo && (
          <ResultStage
            score={resultInfo.score}
            xp={resultInfo.xp}
            newlyUnlocked={resultInfo.newlyUnlocked}
            onContinue={() => navigate(`/app/courses/${course.id}`)}
            onReplay={startLesson}
          />
        )}
      </div>

      {unlockedToast && <Toast message={unlockedToast} onClose={() => setUnlockedToast(null)} />}
    </div>
  );
}

// ============ Intro ============
function IntroStage({
  lesson,
  unitTitle,
  onStart,
}: {
  lesson: LessonType;
  unitTitle: string;
  onStart: () => void;
}) {
  const typeMeta: Record<string, { icon: string; label: string; color: string }> = {
    vocab: { icon: '📖', label: '单词记忆', color: 'from-blue-400 to-indigo-500' },
    grammar: { icon: '📐', label: '语法练习', color: 'from-violet-400 to-purple-500' },
    speaking: { icon: '🎤', label: '口语跟读', color: 'from-rose-400 to-pink-500' },
    listening: { icon: '🎧', label: '听力训练', color: 'from-emerald-400 to-teal-500' },
  };
  const meta = typeMeta[lesson.type];
  return (
    <div className="text-center py-6">
      <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-5xl shadow-card`}>
        {meta.icon}
      </div>
      <div className="mt-4 chip mx-auto">{meta.label}</div>
      <h1 className="text-2xl font-extrabold mt-2 text-ink-900">{lesson.title}</h1>
      <p className="text-ink-600 mt-1">{unitTitle}</p>
      <div className="card mt-6 p-5 text-left max-w-md mx-auto">
        <div className="text-xs text-ink-600">本节目标</div>
        <div className="font-medium text-ink-900 mt-1">{lesson.goal}</div>
        <div className="mt-3 flex gap-4 text-sm text-ink-600">
          <span>⏱️ 约 {lesson.durationMin} 分钟</span>
          <span>⭐ 完成可得 XP</span>
        </div>
      </div>
      <button onClick={onStart} className="btn-primary mt-6 px-8">开始学习 →</button>
      {!speechSupported() && (
        <div className="text-xs text-amber-600 mt-3">
          ⚠️ 当前浏览器不支持语音朗读，部分功能将受限
        </div>
      )}
    </div>
  );
}

// ============ Vocab Card ============
function VocabCardStage({
  vocab,
  index,
  ttsLang,
  onNext,
}: {
  vocab: VocabItem[];
  index: number;
  ttsLang: string;
  onNext: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speakingExample, setSpeakingExample] = useState(false);
  const item = vocab[index];

  useEffect(() => {
    setFlipped(false);
  }, [index]);

  const play = () => {
    if (!speechSupported()) return;
    setSpeaking(true);
    speak(item.term, { lang: ttsLang, onEnd: () => setSpeaking(false) });
  };

  const playExample = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!speechSupported() || !item.example) return;
    setSpeakingExample(true);
    speak(item.example, { lang: ttsLang, rate: 0.9, onEnd: () => setSpeakingExample(false) });
  };

  return (
    <div className="text-center">
      <div className="text-xs text-ink-600 mb-3">
        第 {index + 1} / {vocab.length} 个单词
      </div>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full max-w-md mx-auto card p-8 min-h-[260px] flex flex-col items-center justify-center cursor-pointer hover:shadow-card transition"
      >
        <div className="flex items-center gap-2">
          <div className="text-3xl font-extrabold text-ink-900">{item.term}</div>
          {item.pos && (
            <span className="chip bg-brand-50 text-brand-700 text-xs px-2 py-0.5">{item.pos}</span>
          )}
        </div>
        {item.phonetic && <div className="text-sm text-brand-600 mt-1 font-mono">{item.phonetic}</div>}
        {item.reading && !item.phonetic && <div className="text-sm text-brand-600 mt-1">{item.reading}</div>}
        {flipped ? (
          <div className="mt-4 animate-pop w-full">
            <div className="text-xl font-bold text-accent-600">{item.meaning}</div>
            {item.example && (
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-ink-600">📖 句子阅读</span>
                  <button
                    onClick={playExample}
                    disabled={!speechSupported()}
                    className="text-xs text-brand-600 hover:text-brand-700 font-medium disabled:opacity-40"
                  >
                    {speakingExample ? '🔊 朗读中…' : '🔊 朗读例句'}
                  </button>
                </div>
                <div className="text-sm font-medium text-ink-900 italic">"{item.example}"</div>
                {item.exampleMeaning && <div className="text-xs text-ink-600 mt-1">{item.exampleMeaning}</div>}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 text-xs text-ink-600">
            {item.example ? '点击卡片查看释义与例句' : '点击卡片查看释义'}
          </div>
        )}
      </button>
      <div className="flex justify-center gap-3 mt-5">
        <button onClick={play} disabled={!speechSupported()} className="btn-ghost">
          {speaking ? '🔊 朗读中…' : '🔊 朗读单词'}
        </button>
        <button onClick={onNext} className="btn-primary px-8">
          {index + 1 < vocab.length ? '下一个 →' : '开始测验'}
        </button>
      </div>
      <div className="text-xs text-ink-600 mt-3">提示：多听几遍读音，点击卡片查看释义与例句，朗读例句加深理解</div>
    </div>
  );
}

// ============ Vocab Quiz ============
function VocabQuizStage({
  pairs,
  index,
  correct,
  onAnswer,
}: {
  pairs: { term: string; meaning: string }[];
  index: number;
  correct: number;
  onAnswer: (ok: boolean) => void;
}) {
  const current = pairs[index];
  const options = useMemo(() => {
    const distractors = pairs
      .filter((p) => p.term !== current.term)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p.meaning);
    return [...distractors, current.meaning].sort(() => Math.random() - 0.5);
  }, [current, pairs]);

  const [picked, setPicked] = useState<string | null>(null);
  const [pickedOk, setPickedOk] = useState(false);

  useEffect(() => {
    setPicked(null);
    setPickedOk(false);
  }, [index]);

  const pick = (opt: string) => {
    if (picked) return;
    const ok = opt === current.meaning;
    setPicked(opt);
    setPickedOk(ok);
  };

  return (
    <div>
      <div className="text-center text-xs text-ink-600 mb-3">
        测验 {index + 1} / {pairs.length} · 已答对 {correct}
      </div>
      <div className="card p-6 text-center">
        <div className="text-xs text-ink-600">选择正确的释义</div>
        <div className="text-3xl font-extrabold text-ink-900 mt-2">{current.term}</div>
        {picked && (
          <div className={classnames(
            'text-xs mt-2 font-medium',
            pickedOk ? 'text-emerald-600' : 'text-rose-600',
          )}>
            {pickedOk ? '✓ 答对了！' : `✕ 答错了，正确释义：${current.meaning}`}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-2 mt-4">
        {options.map((opt) => {
          const isCorrect = opt === current.meaning;
          const isPicked = opt === picked;
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={!!picked}
              className={classnames(
                'p-3.5 rounded-xl border-2 text-left font-medium transition',
                !picked && 'border-slate-200 hover:border-brand-400 hover:bg-brand-50/40',
                picked && isCorrect && 'border-emerald-400 bg-emerald-50 text-emerald-700',
                picked && isPicked && !isCorrect && 'border-rose-400 bg-rose-50 text-rose-700',
                picked && !isCorrect && !isPicked && 'border-slate-200 opacity-60',
              )}
            >
              {opt}
              {picked && isCorrect && ' ✓'}
              {picked && isPicked && !isCorrect && ' ✕'}
            </button>
          );
        })}
      </div>
      {picked && (
        <button onClick={() => onAnswer(pickedOk)} className="btn-primary mt-5 w-full">
          {index + 1 < pairs.length ? '下一题 →' : '查看成绩'}
        </button>
      )}
    </div>
  );
}

// ============ Grammar Explain ============
function GrammarExplainStage({
  point,
  index,
  total,
  onNext,
}: {
  point: GrammarPoint;
  index: number;
  total: number;
  onNext: () => void;
}) {
  return (
    <div>
      <div className="text-xs text-ink-600 mb-3">语法点 {index + 1} / {total}</div>
      <div className="card p-6">
        <div className="chip bg-violet-50 text-violet-700">📐 句型</div>
        <div className="text-2xl font-extrabold text-ink-900 mt-3">{point.pattern}</div>
        <div className="text-ink-700 mt-1">{point.meaning}</div>
        {point.explanation && (
          <div className="mt-4 p-3 rounded-xl bg-violet-50/60 text-sm text-ink-700">
            💡 {point.explanation}
          </div>
        )}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-xs text-ink-600 mb-1">例句</div>
          <div className="font-bold text-ink-900">{point.example}</div>
          <div className="text-sm text-ink-600 mt-0.5">{point.exampleMeaning}</div>
        </div>
      </div>
      <button onClick={onNext} className="btn-primary mt-5 px-8 w-full max-w-xs mx-auto flex">
        我会了，来练一练 →
      </button>
    </div>
  );
}

// ============ Grammar Quiz (填空) ============
function GrammarQuizStage({
  point,
  onAnswer,
}: {
  point: GrammarPoint;
  onAnswer: (ok: boolean) => void;
}) {
  // 把例句中某个词挖空
  const blank = useMemo(() => {
    const words = point.example.split(/\s+/);
    const idx = Math.floor(Math.random() * words.length);
    const answer = words[idx].replace(/[.,!?。！？]/g, '');
    const blanked = words.map((w, i) => (i === idx ? '____' : w)).join(' ');
    return { blanked, answer };
  }, [point]);

  const options = useMemo(() => {
    const distractors = ['the', 'is', 'was', 'to', 'a', 'are', 'have', 'been', 'will', 'do'];
    const set = Array.from(new Set([blank.answer, ...distractors])).slice(0, 4);
    return set.sort(() => Math.random() - 0.5);
  }, [blank]);

  const [picked, setPicked] = useState<string | null>(null);
  const [pickedOk, setPickedOk] = useState(false);

  useEffect(() => {
    setPicked(null);
    setPickedOk(false);
  }, [blank]);

  const pick = (opt: string) => {
    if (picked) return;
    const ok = opt === blank.answer;
    setPicked(opt);
    setPickedOk(ok);
  };

  return (
    <div>
      <div className="text-xs text-ink-600 mb-3">选择正确单词填空</div>
      <div className="card p-6">
        <div className="text-xs text-ink-600">含义：{point.meaning}</div>
        <div className="text-xl font-bold text-ink-900 mt-2 leading-relaxed">{blank.blanked}</div>
        <div className="text-sm text-ink-600 mt-1">{point.exampleMeaning}</div>
        {picked && !pickedOk && (
          <div className="text-xs mt-2 font-medium text-rose-600">
            ✕ 正确答案：{blank.answer}
          </div>
        )}
        {picked && pickedOk && (
          <div className="text-xs mt-2 font-medium text-emerald-600">✓ 答对了！</div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {options.map((opt) => {
          const isCorrect = opt === blank.answer;
          const isPicked = opt === picked;
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={!!picked}
              className={classnames(
                'p-3 rounded-xl border-2 font-medium transition',
                !picked && 'border-slate-200 hover:border-brand-400 hover:bg-brand-50/40',
                picked && isCorrect && 'border-emerald-400 bg-emerald-50 text-emerald-700',
                picked && isPicked && !isCorrect && 'border-rose-400 bg-rose-50 text-rose-700',
                picked && !isCorrect && !isPicked && 'border-slate-200 opacity-60',
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked && (
        <button onClick={() => onAnswer(pickedOk)} className="btn-primary mt-5 w-full">
          下一题 →
        </button>
      )}
    </div>
  );
}

// ============ Speaking ============
function SpeakingStage({
  sentence,
  index,
  total,
  done,
  ttsLang,
  onDone,
}: {
  sentence: SpeakingSentence;
  index: number;
  total: number;
  done: number;
  ttsLang: string;
  onDone: (score: number) => void;
}) {
  const [phase, setPhase] = useState<'listen' | 'record' | 'scoring' | 'result'>('listen');
  const [speaking, setSpeaking] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setPhase('listen');
    setScore(null);
    setFeedback('');
  }, [sentence]);

  const play = (rate = 1) => {
    if (!speechSupported()) return;
    setSpeaking(true);
    speak(sentence.text, { lang: ttsLang, rate, onEnd: () => setSpeaking(false) });
  };

  const record = async () => {
    setPhase('scoring');
    const res = await recordAndScore(sentence.text);
    setScore(res.score);
    setFeedback(res.feedback);
    setPhase('result');
  };

  return (
    <div className="text-center">
      <div className="text-xs text-ink-600 mb-3">
        第 {index + 1} / {total} 句 · 已完成 {done}
      </div>
      <div className="card p-6">
        <div className="text-xs text-ink-600">朗读这句话</div>
        <div className="text-2xl font-extrabold text-ink-900 mt-2 leading-relaxed">{sentence.text}</div>
        <div className="text-sm text-ink-600 mt-2">{sentence.translation}</div>
        {sentence.tips && (
          <div className="mt-3 text-xs text-amber-600 bg-amber-50 rounded-lg p-2">💡 {sentence.tips}</div>
        )}
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex justify-center gap-2">
          <button onClick={() => play(0.7)} disabled={!speechSupported() || speaking} className="btn-ghost">
            🐢 慢速
          </button>
          <button onClick={() => play(1)} disabled={!speechSupported() || speaking} className="btn-ghost">
            {speaking ? '🔊 …' : '🔊 常速'}
          </button>
        </div>

        {phase === 'result' && score !== null && (
          <div className="card p-4 animate-pop">
            <div className="text-xs text-ink-600">本次评分</div>
            <div className={classnames(
              'text-3xl font-extrabold',
              score >= 90 ? 'text-emerald-600' : score >= 80 ? 'text-brand-600' : 'text-accent-600',
            )}>{score}</div>
            <div className="text-sm text-ink-700 mt-1">{feedback}</div>
          </div>
        )}

        {phase === 'scoring' ? (
          <button disabled className="btn-primary w-full">
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            评分中…
          </button>
        ) : phase === 'result' ? (
          <button onClick={() => onDone(score ?? 80)} className="btn-primary w-full px-8">
            {index + 1 < total ? '下一句 →' : '完成本节'}
          </button>
        ) : (
          <button onClick={record} className="btn-accent w-full px-8">
            🎤 {phase === 'listen' ? '开始跟读录音' : '重新录音'}
          </button>
        )}
      </div>
      {!speechSupported() && (
        <div className="text-xs text-amber-600 mt-3">浏览器不支持语音播放，请使用 Chrome / Edge</div>
      )}
    </div>
  );
}

// ============ Listening ============
function ListeningStage({
  clip,
  index,
  total,
  correct,
  ttsLang,
  onAnswer,
}: {
  clip: ListeningClip;
  index: number;
  total: number;
  correct: number;
  ttsLang: string;
  onAnswer: (ok: boolean) => void;
}) {
  const [speaking, setSpeaking] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [pickedOk, setPickedOk] = useState(false);

  useEffect(() => {
    setRevealed(false);
    setPicked(null);
    setPickedOk(false);
  }, [clip]);

  // 生成一个判断题：例句翻译是否正确（用 clip.translation 与扰动版本）
  const question = useMemo(() => {
    const correctText = clip.translation;
    // 简单扰动：去掉一些字 / 替换
    const wrong = correctText
      .split('')
      .map((c, i) => (i % 3 === 1 && c !== ' ' ? '？' : c))
      .join('');
    const useCorrect = Math.random() > 0.5;
    return {
      prompt: useCorrect ? correctText : wrong,
      answer: useCorrect, // true 表示这段翻译正确
    };
  }, [clip]);

  const play = (rate = 1) => {
    if (!speechSupported()) return;
    setSpeaking(true);
    speak(clip.transcript, { lang: ttsLang, rate, onEnd: () => setSpeaking(false) });
  };

  const pick = (val: boolean) => {
    if (picked !== null) return;
    setPicked(val);
    setPickedOk(val === question.answer);
  };

  return (
    <div className="text-center">
      <div className="text-xs text-ink-600 mb-3">
        听力 {index + 1} / {total} · 已答对 {correct}
      </div>
      <div className="card p-6">
        <div className="text-xs text-ink-600">🎧 仔细听这段对话</div>
        <div className="text-4xl my-3">🔊</div>
        <div className="flex justify-center gap-2">
          <button onClick={() => play(0.7)} disabled={!speechSupported() || speaking} className="btn-ghost">🐢 慢速</button>
          <button onClick={() => play(1)} disabled={!speechSupported() || speaking} className="btn-primary">
            {speaking ? '播放中…' : '▶ 播放'}
          </button>
        </div>
        {(revealed || picked !== null) && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 text-left animate-pop">
            <div className="text-xs text-emerald-700 mb-1">📖 原文对照</div>
            <div className="text-sm text-ink-900 font-medium">{clip.transcript}</div>
            <div className="text-xs text-ink-600 mt-1">{clip.translation}</div>
          </div>
        )}
        {!revealed && picked === null && (
          <button onClick={() => setRevealed(true)} className="text-xs text-ink-600 hover:text-brand-600 mt-3">
            看一眼原文 👀
          </button>
        )}
        {picked !== null && (
          <div className={classnames(
            'text-xs mt-3 font-medium',
            pickedOk ? 'text-emerald-600' : 'text-rose-600',
          )}>
            {pickedOk ? '✓ 判断正确！' : `✕ 判断错误，正确答案：${question.answer ? '正确' : '错误'}`}
          </div>
        )}
      </div>

      <div className="mt-5 card p-5">
        <div className="text-xs text-ink-600 mb-2">这段翻译是否正确？</div>
        <div className="p-3 rounded-xl bg-slate-50 text-ink-900 font-medium">{question.prompt}</div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => pick(true)}
            disabled={picked !== null}
            className={classnames(
              'p-3 rounded-xl border-2 font-medium transition',
              picked === null && 'border-slate-200 hover:border-emerald-400',
              picked !== null && question.answer === true && 'border-emerald-400 bg-emerald-50 text-emerald-700',
              picked === true && question.answer !== true && 'border-rose-400 bg-rose-50 text-rose-700',
              picked !== null && question.answer !== true && picked !== true && 'opacity-60',
            )}
          >
            ✓ 正确
          </button>
          <button
            onClick={() => pick(false)}
            disabled={picked !== null}
            className={classnames(
              'p-3 rounded-xl border-2 font-medium transition',
              picked === null && 'border-slate-200 hover:border-rose-400',
              picked !== null && question.answer === false && 'border-emerald-400 bg-emerald-50 text-emerald-700',
              picked === false && question.answer !== false && 'border-rose-400 bg-rose-50 text-rose-700',
              picked !== null && question.answer !== false && picked !== false && 'opacity-60',
            )}
          >
            ✕ 错误
          </button>
        </div>
      </div>
      {picked !== null && (
        <button onClick={() => onAnswer(pickedOk)} className="btn-primary mt-5 w-full">
          {index + 1 < total ? '下一题 →' : '查看成绩'}
        </button>
      )}
    </div>
  );
}

// ============ Result ============
function ResultStage({
  score,
  xp,
  newlyUnlocked,
  onContinue,
  onReplay,
}: {
  score: number;
  xp: number;
  newlyUnlocked: string[];
  onContinue: () => void;
  onReplay: () => void;
}) {
  const tier = score >= 95 ? 'perfect' : score >= 80 ? 'great' : score >= 60 ? 'good' : 'fail';
  const meta = {
    perfect: { emoji: '🏆', title: '完美通关！', color: 'from-amber-400 to-orange-500', msg: '你已熟练掌握本节内容' },
    great: { emoji: '🎉', title: '表现很棒！', color: 'from-emerald-400 to-teal-500', msg: '再加把劲就能满分啦' },
    good: { emoji: '👍', title: '通关成功！', color: 'from-brand-400 to-brand-600', msg: '继续巩固会更扎实' },
    fail: { emoji: '💪', title: '再接再厉', color: 'from-slate-400 to-slate-600', msg: '未达 60 分，建议再学一遍' },
  }[tier];

  return (
    <div className="text-center py-6">
      <div className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-br ${meta.color} flex items-center justify-center text-6xl shadow-card animate-pop`}>
        {meta.emoji}
      </div>
      <h1 className="text-2xl font-extrabold mt-4 text-ink-900">{meta.title}</h1>
      <p className="text-ink-600 mt-1">{meta.msg}</p>

      <div className="flex justify-center gap-4 mt-6">
        <div className="card px-6 py-4">
          <div className="text-xs text-ink-600">本次得分</div>
          <div className="text-3xl font-extrabold text-ink-900">{score}</div>
        </div>
        <div className="card px-6 py-4">
          <div className="text-xs text-ink-600">获得 XP</div>
          <div className="text-3xl font-extrabold text-accent-600">+{Math.round(xp)}</div>
        </div>
      </div>

      {newlyUnlocked.length > 0 && (
        <div className="card p-4 mt-5 max-w-md mx-auto bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="font-bold text-amber-700">🎉 解锁新成就！</div>
          <div className="text-sm text-ink-700 mt-1">{newlyUnlocked.join(' · ')}</div>
        </div>
      )}

      <div className="flex justify-center gap-3 mt-6">
        <button onClick={onReplay} className="btn-ghost">再练一遍</button>
        <button onClick={onContinue} className="btn-primary px-8">继续课程 →</button>
      </div>
    </div>
  );
}
