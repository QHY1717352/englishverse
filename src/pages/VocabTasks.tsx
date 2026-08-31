import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../store/AppContext';
import {
  countVocabByLevel,
  getAllVocabByLevel,
  type VocabEntry,
} from '../data/vocab-bank';
import type { VocabTaskProgress } from '../data/types';
import { speak, speechSupported, stopSpeaking } from '../lib/audio';
import { classnames } from '../lib/storage';
import { ProgressBar, Toast } from '../components/ui';

type Level = 'senior' | 'cet4';

type Stage =
  | { kind: 'select' }
  | { kind: 'card'; index: number }
  | { kind: 'quiz'; index: number; pickedCorrect: boolean | null }
  | { kind: 'result'; correct: number; newlyUnlocked: string[] };

const ROUND_SIZE = 20;
const TTS_LANG = 'en-US';

/** 选词策略：优先未掌握，不足则用已掌握的复习词补足 */
function pickBatch(all: VocabEntry[], progress: VocabTaskProgress, size: number): VocabEntry[] {
  const masteredSet = new Set(progress.masteredTerms);
  const unmastered = all.filter((w) => !masteredSet.has(w.term));
  const mastered = all.filter((w) => masteredSet.has(w.term));
  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

  const pool = [...shuffle(unmastered), ...shuffle(mastered)];
  return pool.slice(0, Math.min(size, pool.length));
}

/** 生成 4 选项：正确释义 + 3 个干扰项 */
function makeOptions(target: VocabEntry, pool: VocabEntry[]): string[] {
  const distractors = pool
    .filter((w) => w.term !== target.term && w.meaning !== target.meaning)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => w.meaning);
  return [...distractors, target.meaning].sort(() => Math.random() - 0.5);
}

const LEVEL_META: Record<Level, { title: string; subtitle: string; icon: string; gradient: string }> = {
  senior: {
    title: '高中词汇',
    subtitle: '高考核心 4000 词',
    icon: '🏫',
    gradient: 'from-sky-400 to-indigo-500',
  },
  cet4: {
    title: '四级词汇',
    subtitle: 'CET4 核心 4500 词',
    icon: '🎓',
    gradient: 'from-emerald-400 to-teal-500',
  },
};

export function VocabTasks() {
  const { user, getVocabTaskProgress, completeVocabTaskRound } = useApp();
  const [level, setLevel] = useState<Level>('senior');
  const [stage, setStage] = useState<Stage>({ kind: 'select' });
  const [batch, setBatch] = useState<VocabEntry[]>([]);
  const [correct, setCorrect] = useState(0);
  const [masteredThisRound, setMasteredThisRound] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => () => stopSpeaking(), []);

  if (!user) return null;

  const startRound = (lv: Level) => {
    const all = getAllVocabByLevel(lv);
    if (all.length === 0) return;
    const picked = pickBatch(all, getVocabTaskProgress(lv), ROUND_SIZE);
    setLevel(lv);
    setBatch(picked);
    setCorrect(0);
    setMasteredThisRound([]);
    setStage({ kind: 'card', index: 0 });
  };

  const onQuizAnswer = (index: number, ok: boolean) => {
    const word = batch[index];
    const newCorrect = correct + (ok ? 1 : 0);
    const newMastered = ok ? [...masteredThisRound, word.term] : masteredThisRound;
    setCorrect(newCorrect);
    setMasteredThisRound(newMastered);

    if (index + 1 < batch.length) {
      setStage({ kind: 'card', index: index + 1 });
    } else {
      // 完成本轮
      const seenTerms = batch.map((w) => w.term);
      const xp = 10 + newCorrect * 2; // 基础 10 + 每答对一题 2
      const res = completeVocabTaskRound({
        level,
        seenTerms,
        masteredTerms: newMastered,
        correct: newCorrect,
        answered: batch.length,
        xp,
      });
      setStage({ kind: 'result', correct: newCorrect, newlyUnlocked: res.newlyUnlocked });
      if (res.newlyUnlocked.length > 0) setToast('解锁新成就！');
    }
  };

  const backToSelect = () => {
    stopSpeaking();
    setStage({ kind: 'select' });
    setBatch([]);
  };

  // ============ 选择页 ============
  if (stage.kind === 'select') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-ink-900">✍️ 单词任务</h1>
          <p className="text-ink-600 mt-1 text-sm">每次 {ROUND_SIZE} 词，逐个任务化记忆，掌握高考与四级全量词汇</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {(['senior', 'cet4'] as Level[]).map((lv) => {
            const meta = LEVEL_META[lv];
            const p = getVocabTaskProgress(lv);
            const totalLv = countVocabByLevel(lv);
            const masteredPct = totalLv > 0 ? Math.round((p.masteredTerms.length / totalLv) * 100) : 0;
            return (
              <div key={lv} className="card p-5 flex flex-col">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-3xl shadow-card`}>
                  {meta.icon}
                </div>
                <div className="mt-3 font-extrabold text-lg text-ink-900">{meta.title}</div>
                <div className="text-xs text-ink-600">{meta.subtitle}</div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-600">词库总量</span>
                    <span className="font-bold text-ink-900">{totalLv}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-600">已掌握</span>
                    <span className="font-bold text-emerald-600">{p.masteredTerms.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-600">已学过</span>
                    <span className="font-bold text-brand-600">{p.seenTerms.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-600">完成轮次</span>
                    <span className="font-bold text-ink-900">{p.roundsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-600">答题正确率</span>
                    <span className="font-bold text-ink-900">
                      {p.totalAnswered > 0 ? Math.round((p.totalCorrect / p.totalAnswered) * 100) : 0}%
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-ink-600 mb-1">
                    <span>掌握进度</span>
                    <span>{masteredPct}%</span>
                  </div>
                  <ProgressBar value={masteredPct} />
                </div>

                <button
                  onClick={() => startRound(lv)}
                  disabled={totalLv === 0}
                  className="btn-primary mt-4 w-full disabled:opacity-50"
                >
                  开始 {ROUND_SIZE} 词任务 →
                </button>
              </div>
            );
          })}
        </div>

        <div className="card p-4 mt-4 bg-brand-50/40 border-brand-100">
          <div className="text-sm font-bold text-brand-700">💡 学习说明</div>
          <ul className="text-xs text-ink-700 mt-2 space-y-1 list-disc list-inside">
            <li>每轮自动抽取 {ROUND_SIZE} 个单词，优先推送你还未掌握的词。</li>
            <li>每个单词作为一个任务：先看卡片（音标/词性/释义/例句），再做选择测验。</li>
            <li>测验答对即记为「已掌握」，答错可在下轮自动复习。</li>
            <li>完成每轮可获得 XP，并触发成就解锁。</li>
          </ul>
        </div>
      </div>
    );
  }

  // ============ 学习中（卡片/测验） ============
  if (stage.kind === 'card' || stage.kind === 'quiz') {
    const index = stage.index;
    const word = batch[index];
    const totalSteps = batch.length;
    // 每个任务 = 卡片(1) + 测验(1)，共 2*totalSteps 步
    const currentStep = index * 2 + (stage.kind === 'card' ? 1 : 2);
    const progressPct = Math.round((currentStep / (totalSteps * 2)) * 100);

    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
        <div className="sticky top-14 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 h-12 flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm('确定退出本轮任务吗？进度将不会保存。')) backToSelect();
              }}
              className="text-ink-600 hover:text-rose-500 text-lg"
            >
              ✕
            </button>
            <ProgressBar value={progressPct} className="flex-1" />
            <span className="text-xs text-ink-600 tabular-nums">
              任务 {index + 1}/{totalSteps}
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-6">
          {stage.kind === 'card' ? (
            <CardStage
              word={word}
              index={index}
              total={totalSteps}
              onNext={() => setStage({ kind: 'quiz', index, pickedCorrect: null })}
            />
          ) : (
            <QuizStage
              word={word}
              pool={batch}
              index={index}
              total={totalSteps}
              correct={correct}
              onAnswer={(ok) => onQuizAnswer(index, ok)}
            />
          )}
        </div>
      </div>
    );
  }

  // ============ 结果页 ============
  if (stage.kind === 'result') {
    return (
      <>
        <ResultStage
          correct={stage.correct}
          total={batch.length}
          newlyMastered={masteredThisRound}
          newlyUnlocked={stage.newlyUnlocked}
          onAgain={() => startRound(level)}
          onBack={backToSelect}
          level={level}
        />
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </>
    );
  }

  return null;
}

// ============ 单词卡片 ============
function CardStage({
  word,
  index,
  total,
  onNext,
}: {
  word: VocabEntry;
  index: number;
  total: number;
  onNext: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speakingExample, setSpeakingExample] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [word.term]);

  const play = () => {
    if (!speechSupported()) return;
    setSpeaking(true);
    speak(word.term, { lang: TTS_LANG, onEnd: () => setSpeaking(false) });
  };

  const playExample = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!speechSupported()) return;
    setSpeakingExample(true);
    speak(word.example, { lang: TTS_LANG, rate: 0.9, onEnd: () => setSpeakingExample(false) });
  };

  return (
    <div className="text-center">
      <div className="text-xs text-ink-600 mb-3">
        第 {index + 1} / {total} 个单词 · 看卡片学习
      </div>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full max-w-md mx-auto card p-8 min-h-[280px] flex flex-col items-center justify-center cursor-pointer hover:shadow-card transition"
      >
        <div className="flex items-center gap-2">
          <div className="text-3xl font-extrabold text-ink-900">{word.term}</div>
          <span className="chip bg-brand-50 text-brand-700 text-xs px-2 py-0.5">{word.pos}</span>
        </div>
        <div className="text-sm text-brand-600 mt-1 font-mono">{word.phonetic}</div>

        {flipped ? (
          <div className="mt-4 animate-pop w-full">
            <div className="text-xl font-bold text-accent-600">{word.meaning}</div>
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
              <div className="text-sm font-medium text-ink-900 italic">"{word.example}"</div>
              <div className="text-xs text-ink-600 mt-1">{word.exampleMeaning}</div>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-xs text-ink-600">点击卡片查看释义与例句</div>
        )}
      </button>

      <div className="flex justify-center gap-3 mt-5">
        <button onClick={play} disabled={!speechSupported()} className="btn-ghost">
          {speaking ? '🔊 朗读中…' : '🔊 朗读单词'}
        </button>
        <button onClick={onNext} className="btn-primary px-8">
          我记住了，来测验 →
        </button>
      </div>
      <div className="text-xs text-ink-600 mt-3">提示：多听几遍读音，结合例句理解用法</div>
    </div>
  );
}

// ============ 单词测验 ============
function QuizStage({
  word,
  pool,
  index,
  total,
  correct,
  onAnswer,
}: {
  word: VocabEntry;
  pool: VocabEntry[];
  index: number;
  total: number;
  correct: number;
  onAnswer: (ok: boolean) => void;
}) {
  const options = useMemo(() => makeOptions(word, pool), [word, pool]);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => setPicked(null), [word.term]);

  const pick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    const ok = opt === word.meaning;
    setTimeout(() => onAnswer(ok), 700);
  };

  return (
    <div>
      <div className="text-center text-xs text-ink-600 mb-3">
        测验 {index + 1} / {total} · 已答对 {correct}
      </div>
      <div className="card p-6 text-center">
        <div className="text-xs text-ink-600">选择正确的释义</div>
        <div className="text-3xl font-extrabold text-ink-900 mt-2">{word.term}</div>
        <div className="text-sm text-brand-600 mt-1 font-mono">{word.phonetic}</div>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-4">
        {options.map((opt) => {
          const isCorrect = opt === word.meaning;
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
        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-left animate-pop">
          <div className="text-xs text-ink-600 mb-1">📖 例句</div>
          <div className="text-sm font-medium text-ink-900 italic">"{word.example}"</div>
          <div className="text-xs text-ink-600 mt-1">{word.exampleMeaning}</div>
        </div>
      )}
    </div>
  );
}

// ============ 结果页 ============
function ResultStage({
  correct,
  total,
  newlyMastered,
  newlyUnlocked,
  onAgain,
  onBack,
  level,
}: {
  correct: number;
  total: number;
  newlyMastered: string[];
  newlyUnlocked: string[];
  onAgain: () => void;
  onBack: () => void;
  level: Level;
}) {
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  const xp = 10 + correct * 2;
  const tier = score >= 90 ? 'perfect' : score >= 70 ? 'great' : score >= 50 ? 'good' : 'fail';
  const meta = {
    perfect: { emoji: '🏆', title: '完美掌握！', color: 'from-amber-400 to-orange-500', msg: '这些词你已经牢牢记住' },
    great: { emoji: '🎉', title: '表现很棒！', color: 'from-emerald-400 to-teal-500', msg: '再加把劲就能全部掌握' },
    good: { emoji: '👍', title: '完成任务！', color: 'from-brand-400 to-brand-600', msg: '答错的词会在下轮自动复习' },
    fail: { emoji: '💪', title: '继续努力', color: 'from-slate-400 to-slate-600', msg: '多看几遍卡片，下轮一定能行' },
  }[tier];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-center">
      <div className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-br ${meta.color} flex items-center justify-center text-6xl shadow-card animate-pop`}>
        {meta.emoji}
      </div>
      <h1 className="text-2xl font-extrabold mt-4 text-ink-900">{meta.title}</h1>
      <p className="text-ink-600 mt-1">{meta.msg}</p>

      <div className="flex justify-center gap-4 mt-6">
        <div className="card px-6 py-4">
          <div className="text-xs text-ink-600">本轮得分</div>
          <div className="text-3xl font-extrabold text-ink-900">{score}</div>
        </div>
        <div className="card px-6 py-4">
          <div className="text-xs text-ink-600">答对 / 总数</div>
          <div className="text-3xl font-extrabold text-emerald-600">{correct}/{total}</div>
        </div>
        <div className="card px-6 py-4">
          <div className="text-xs text-ink-600">获得 XP</div>
          <div className="text-3xl font-extrabold text-accent-600">+{xp}</div>
        </div>
      </div>

      <div className="card p-4 mt-5 text-left">
        <div className="text-sm font-bold text-ink-900">✍️ 本轮新掌握 {newlyMastered.length} 词</div>
        {newlyMastered.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {newlyMastered.map((t) => (
              <span key={t} className="chip bg-emerald-50 text-emerald-700 text-xs">{t}</span>
            ))}
          </div>
        ) : (
          <div className="text-xs text-ink-600 mt-2">本轮没有新掌握的单词，多为复习，继续加油！</div>
        )}
      </div>

      {newlyUnlocked.length > 0 && (
        <div className="card p-4 mt-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="font-bold text-amber-700">🎉 解锁新成就！</div>
          <div className="text-sm text-ink-700 mt-1">{newlyUnlocked.join(' · ')}</div>
        </div>
      )}

      <div className="flex justify-center gap-3 mt-6">
        <button onClick={onBack} className="btn-ghost">返回选择</button>
        <button onClick={onAgain} className="btn-primary px-8">
          再来 {ROUND_SIZE} 词 →
        </button>
      </div>
      <div className="text-xs text-ink-600 mt-3">
        当前等级：{LEVEL_META[level].title}
      </div>
    </div>
  );
}
