import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { COURSES } from '../data/courses';
import { LANGUAGES } from '../data/languages';
import { ACHIEVEMENTS, TIER_STYLE } from '../data/achievements';
import { StatCard, ProgressBar, EmptyState } from '../components/ui';
import { todayKey } from '../lib/storage';
import { classnames } from '../lib/storage';

export function Dashboard() {
  const { user, getLessonProgress, recommendedNext } = useApp();
  if (!user) return null;

  const today = todayKey();
  const todayXP = user.activityCalendar[today] ?? 0;

  // 我在学的课程：目标语种 + 有进度的
  const myCourses = COURSES.filter(
    (c) => user.targetLanguages.includes(c.language) || c.units.some((u) =>
      u.lessons.some((l) => user.progress[`${c.id}:${l.id}`]),
    ),
  ).slice(0, 4);

  // 最近 14 天活动
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const key = todayKey(d);
    return { key, label: `${d.getMonth() + 1}/${d.getDate()}`, xp: user.activityCalendar[key] ?? 0 };
  });
  const maxXP = Math.max(10, ...days.map((d) => d.xp));

  const recentAchievements = ACHIEVEMENTS.filter((a) => user.unlockedAchievements.includes(a.id)).slice(-3);

  const next = recommendedNext();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Greeting */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">
            {todayXP > 0 ? '继续加油 👋' : '今天还没开始学习哦'}，{user.name}
          </h1>
          <p className="text-ink-600 text-sm mt-1">
            已连续学习 <b className="text-brand-600">{user.stats.streakDays}</b> 天 · 累计 {user.stats.totalXP} XP
          </p>
        </div>
        <Link to="/app/courses" className="btn-primary">浏览课程 →</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
        <StatCard icon="🔥" label="连续天数" value={user.stats.streakDays} hint="坚持就是胜利" />
        <StatCard icon="⭐" label="总经验值" value={user.stats.totalXP} hint={`今日 +${todayXP}`} />
        <StatCard icon="📚" label="完成课时" value={user.stats.lessonsCompleted} hint={`掌握 ${user.stats.wordsLearned} 词`} />
        <StatCard icon="🏆" label="成就徽章" value={`${user.unlockedAchievements.length}/${ACHIEVEMENTS.length}`} hint="持续解锁中" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {/* Recommended next */}
        <div className="md:col-span-2 card p-5 bg-gradient-to-br from-brand-600 to-brand-800 text-white">
          <div className="text-sm text-brand-100">🧭 推荐你接下来学</div>
          {next ? (
            <>
              <div className="text-xl font-extrabold mt-1">{next.reason}</div>
              <Link
                to={`/app/learn/${next.courseId}/${next.lessonId}`}
                className="btn-accent mt-4"
              >
                立即开始 →
              </Link>
            </>
          ) : (
            <div className="mt-1">
              <div className="text-xl font-bold">先选择一门课程吧</div>
              <Link to="/app/courses" className="btn-accent mt-3">去选课程</Link>
            </div>
          )}
        </div>

        {/* Today activity */}
        <div className="card p-5">
          <div className="text-sm text-ink-600">今日学习</div>
          <div className="text-3xl font-extrabold text-ink-900 mt-1">{todayXP} <span className="text-base font-medium text-ink-600">XP</span></div>
          <div className="mt-3 text-xs text-ink-600 mb-1">近 14 天</div>
          <div className="flex items-end gap-1 h-16">
            {days.map((d) => (
              <div key={d.key} className="flex-1 flex flex-col items-center gap-0.5" title={`${d.label}: ${d.xp} XP`}>
                <div
                  className={classnames(
                    'w-full rounded-sm transition-all',
                    d.xp > 0 ? 'bg-gradient-to-t from-brand-500 to-brand-400' : 'bg-slate-100',
                  )}
                  style={{ height: `${Math.max(4, (d.xp / maxXP) * 100)}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My courses */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-extrabold text-ink-900">我的课程</h2>
          <Link to="/app/courses" className="text-sm text-brand-600">查看全部 ›</Link>
        </div>
        {myCourses.length === 0 ? (
          <EmptyState
            icon="🚀"
            title="还没有开始任何课程"
            hint="从你感兴趣的语言开始第一节吧"
            action={<Link to="/app/courses" className="btn-primary">选择课程</Link>}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {myCourses.map((c) => {
              const lang = LANGUAGES[c.language];
              const all = c.units.flatMap((u) => u.lessons);
              const done = all.filter((l) => getLessonProgress(c.id, l.id).status === 'completed').length;
              const pct = all.length ? Math.round((done / all.length) * 100) : 0;
              return (
                <Link key={c.id} to={`/app/courses/${c.id}`} className="card p-4 hover:-translate-y-0.5 transition">
                  <div className={`h-14 rounded-lg bg-gradient-to-br ${lang.gradient} flex items-center justify-center text-2xl`}>
                    {lang.flag}
                  </div>
                  <div className="font-bold text-ink-900 text-sm mt-2 line-clamp-1">{c.title}</div>
                  <div className="text-xs text-ink-600">CEFR {c.level}</div>
                  <div className="mt-2"><ProgressBar value={pct} /></div>
                  <div className="text-xs text-ink-600 mt-1">{done}/{all.length} · {pct}%</div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* English overview */}
      <div className="mt-6">
        <h2 className="text-lg font-extrabold text-ink-900 mb-3">英语学习概览</h2>
        <div className="card p-5 text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🇬🇧</div>
            <div>
              <div className="text-xl font-extrabold">English</div>
              <div className="text-sm opacity-90">当前等级 {user.levelByLang.en ?? 'A1'} · 掌握 {user.stats.wordsLearned} 词</div>
              <div className="text-xs opacity-80 italic mt-1">"Practice makes perfect."</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent achievements */}
      {recentAchievements.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-extrabold text-ink-900">最近解锁</h2>
            <Link to="/app/profile" className="text-sm text-brand-600">全部成就 ›</Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {recentAchievements.map((a) => (
              <div key={a.id} className="card p-4 text-center">
                <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${TIER_STYLE[a.tier]} flex items-center justify-center text-2xl`}>
                  {a.icon}
                </div>
                <div className="font-bold text-sm mt-2 text-ink-900">{a.title}</div>
                <div className="text-xs text-ink-600 mt-0.5">{a.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
