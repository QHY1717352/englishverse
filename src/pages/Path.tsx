import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { allLessonsFlat, getCoursesByLanguage } from '../data/courses';
import { LANGUAGES } from '../data/languages';
import { ProgressBar, EmptyState } from '../components/ui';
import { classnames } from '../lib/storage';

interface PathStep {
  courseId: string;
  lessonId: string;
  title: string;
  reason: string;
  type: string;
  status: 'done' | 'current' | 'todo';
  score?: number;
}

export function Path() {
  const { user, getLessonProgress } = useApp();
  if (!user) return null;

  // 为每个目标语种生成一条推荐路径（取该语种前 6 节按顺序）
  const paths = user.targetLanguages.map((lang) => {
    const langInfo = LANGUAGES[lang];
    const courses = getCoursesByLanguage(lang);
    const flat = allLessonsFlat().filter((x) => x.course.language === lang);
    // 找到当前进度位置
    let firstUnfinishedIdx = -1;
    const steps: PathStep[] = flat.slice(0, 6).map((x, i) => {
      const p = getLessonProgress(x.course.id, x.lesson.id);
      const status: PathStep['status'] =
        p.status === 'completed' ? 'done' : firstUnfinishedIdx === -1 ? (firstUnfinishedIdx = i, 'current') : 'todo';
      const reasons = [
        '夯实基础的第一步',
        '巩固核心词汇',
        '掌握关键句型',
        '听说能力进阶',
        '强化综合应用',
        '迈向下一等级',
      ];
      return {
        courseId: x.course.id,
        lessonId: x.lesson.id,
        title: x.lesson.title,
        reason: reasons[i] ?? '继续巩固',
        type: x.lesson.type,
        status,
        score: p.score,
      };
    });

    // 整体进度
    const totalLessons = courses.flatMap((c) => c.units).flatMap((u) => u.lessons).length;
    const doneCount = flat.filter((x) => getLessonProgress(x.course.id, x.lesson.id).status === 'completed').length;
    const pct = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;

    return { lang, langInfo, steps, pct, doneCount, totalLessons };
  });

  // 课时类型对应的图标，用于路径节点展示
  const typeLabels: Record<string, { icon: string; label: string }> = {
    vocab: { icon: '📖', label: '单词' },
    grammar: { icon: '📐', label: '语法' },
    speaking: { icon: '🎤', label: '口语' },
    listening: { icon: '🎧', label: '听力' },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900">个性化学习路径</h1>
        <p className="text-ink-600 text-sm mt-1">基于你的进度与目标语种，智能规划最适合你的下一步</p>
      </div>

      {paths.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon="🧭"
            title="还没有目标语言"
            hint="前往个人中心选择想学的语言，我们将为你定制专属路径"
            action={<Link to="/app/profile" className="btn-primary">设置目标语言</Link>}
          />
        </div>
      ) : (
        <div className="space-y-6 mt-5">
          {paths.map((p) => (
            <div key={p.lang} className="card p-5">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.langInfo.gradient} flex items-center justify-center text-2xl`}>
                  {p.langInfo.flag}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-ink-900">{p.langInfo.name} 学习路径</div>
                  <div className="text-xs text-ink-600">当前等级 {user.levelByLang[p.lang] ?? 'A1'}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-ink-600">总进度</div>
                  <div className="font-bold text-brand-600">{p.pct}%</div>
                </div>
              </div>
              <div className="mt-3"><ProgressBar value={p.pct} /></div>

              {/* 路径节点 */}
              <div className="mt-5 relative">
                <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-slate-200" />
                <div className="space-y-3">
                  {p.steps.map((s, i) => {
                    const meta = typeLabels[s.type];
                    return (
                      <Link
                        key={s.lessonId}
                        to={`/app/learn/${s.courseId}/${s.lessonId}`}
                        className={classnames(
                          'relative flex items-center gap-3 pl-12 p-3 rounded-xl border transition',
                          s.status === 'current'
                            ? 'border-brand-400 bg-brand-50/50 hover:bg-brand-50'
                            : s.status === 'done'
                              ? 'border-emerald-200 bg-emerald-50/30'
                              : 'border-slate-200 bg-white hover:border-brand-300',
                        )}
                      >
                        <div
                          className={classnames(
                            'absolute left-2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 bg-white',
                            s.status === 'current'
                              ? 'border-brand-500 text-brand-600'
                              : s.status === 'done'
                                ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                                : 'border-slate-300 text-ink-600',
                          )}
                        >
                          {s.status === 'done' ? '✓' : i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-ink-900 text-sm flex items-center gap-2">
                            <span>{meta.icon}</span>
                            <span className="truncate">{s.title}</span>
                            {s.status === 'current' && <span className="chip text-[10px] px-2 py-0">推荐</span>}
                          </div>
                          <div className="text-xs text-ink-600">{s.reason}</div>
                        </div>
                        {s.status === 'done' && (
                          <span className="text-xs text-emerald-600 font-medium">{s.score}分</span>
                        )}
                        {s.status === 'current' && <span className="text-brand-600 text-sm">开始 →</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 学习建议 */}
      <div className="card p-5 mt-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <div className="font-bold text-amber-700">💡 学习小贴士</div>
        <ul className="mt-2 space-y-1.5 text-sm text-ink-700">
          <li>· 每天坚持 15 分钟，比周末集中学习 2 小时更有效</li>
          <li>· 单词记忆后 24 小时内复习一次，可显著提升长期记忆</li>
          <li>· 口语跟读时模仿语调与节奏，比单纯读对单词更重要</li>
          <li>· 听力训练先盲听 2 遍再对照原文，能锻炼真实场景理解力</li>
        </ul>
      </div>
    </div>
  );
}
