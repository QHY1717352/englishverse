import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { COURSES } from '../data/courses';
import { ProgressBar } from '../components/ui';

export function Courses() {
  const { getLessonProgress } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">课程中心</h1>
          <p className="text-ink-600 text-sm mt-1">按 CEFR 等级分级，循序渐进掌握英语</p>
        </div>
      </div>

      {/* Course grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {COURSES.map((c) => {
          // 计算课程整体进度
          const allLessons = c.units.flatMap((u) => u.lessons);
          const done = allLessons.filter(
            (l) => getLessonProgress(c.id, l.id).status === 'completed',
          ).length;
          const pct = allLessons.length ? Math.round((done / allLessons.length) * 100) : 0;
          return (
            <Link
              key={c.id}
              to={`/app/courses/${c.id}`}
              className="card p-5 hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="h-24 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-5xl">
                🇬🇧
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="chip">英语</span>
                <span className="chip bg-accent-400/20 text-accent-600">CEFR {c.level}</span>
                <span className="text-xs text-ink-600 ml-auto">{c.estimatedHours}h</span>
              </div>
              <div className="font-bold text-ink-900 mt-2">{c.title}</div>
              <div className="text-sm text-ink-600 mt-1 line-clamp-2">{c.tagline}</div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-ink-600 mb-1">
                  <span>{done}/{allLessons.length} 节课</span>
                  <span>{pct}%</span>
                </div>
                <ProgressBar value={pct} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
