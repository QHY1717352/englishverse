import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { getCourseById } from '../data/courses';
import { LANGUAGES } from '../data/languages';
import type { LessonType } from '../data/types';
import { classnames } from '../lib/storage';
import { ProgressBar } from '../components/ui';

const lessonTypeMeta: Record<LessonType, { icon: string; label: string; color: string }> = {
  vocab: { icon: '📖', label: '单词记忆', color: 'bg-blue-50 text-blue-700' },
  grammar: { icon: '📐', label: '语法练习', color: 'bg-violet-50 text-violet-700' },
  speaking: { icon: '🎤', label: '口语跟读', color: 'bg-rose-50 text-rose-700' },
  listening: { icon: '🎧', label: '听力训练', color: 'bg-emerald-50 text-emerald-700' },
};

export function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getLessonProgress } = useApp();
  const course = courseId ? getCourseById(courseId) : undefined;

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="text-5xl mb-3">🤔</div>
        <div className="font-bold">课程不存在</div>
        <Link to="/app/courses" className="btn-primary mt-4 inline-flex">返回课程列表</Link>
      </div>
    );
  }

  const lang = LANGUAGES[course.language];
  const allLessons = course.units.flatMap((u) => u.lessons);
  const done = allLessons.filter((l) => getLessonProgress(course.id, l.id).status === 'completed').length;
  const pct = allLessons.length ? Math.round((done / allLessons.length) * 100) : 0;

  const startFirstUnfinished = () => {
    const next = allLessons.find((l) => getLessonProgress(course.id, l.id).status !== 'completed');
    const target = next ?? allLessons[0];
    navigate(`/app/learn/${course.id}/${target.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Link to="/app/courses" className="text-sm text-ink-600 hover:text-brand-600">← 课程中心</Link>

      <div className={`rounded-2xl bg-gradient-to-br ${lang.gradient} text-white p-6 mt-3`}>
        <div className="flex items-center gap-3">
          <span className="text-5xl">{lang.flag}</span>
          <div>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <span>{lang.name}</span>·<span>CEFR {course.level}</span>
            </div>
            <h1 className="text-2xl font-extrabold">{course.title}</h1>
          </div>
        </div>
        <p className="mt-3 text-white/90 text-sm leading-relaxed">{course.description}</p>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/90 mb-1">
            <span>课程进度</span>
            <span>{done}/{allLessons.length} · {pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/30 overflow-hidden">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <button onClick={startFirstUnfinished} className="btn-accent mt-4">
          {pct === 0 ? '开始学习' : pct === 100 ? '复习课程' : '继续学习'} →
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {course.units.map((unit, ui) => {
          const unitDone = unit.lessons.filter((l) => getLessonProgress(course.id, l.id).status === 'completed').length;
          return (
            <div key={unit.id} className="card p-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-100 text-brand-700 font-bold flex items-center justify-center">
                  {ui + 1}
                </div>
                <div>
                  <div className="font-bold text-ink-900">{unit.title}</div>
                  <div className="text-xs text-ink-600">{unit.summary}</div>
                </div>
                <div className="ml-auto text-xs text-ink-600">{unitDone}/{unit.lessons.length}</div>
              </div>

              <div className="mt-4 space-y-2">
                {unit.lessons.map((l, li) => {
                  const p = getLessonProgress(course.id, l.id);
                  const meta = lessonTypeMeta[l.type];
                  return (
                    <Link
                      key={l.id}
                      to={`/app/learn/${course.id}/${l.id}`}
                      className={classnames(
                        'flex items-center gap-3 p-3 rounded-xl border transition',
                        p.status === 'completed'
                          ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50'
                          : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/30',
                      )}
                    >
                      <div className={classnames('w-9 h-9 rounded-lg flex items-center justify-center text-lg', meta.color)}>
                        {meta.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-ink-900 text-sm flex items-center gap-2">
                          <span className="text-ink-600 text-xs">{li + 1}.</span>
                          {l.title}
                        </div>
                        <div className="text-xs text-ink-600">{meta.label} · {l.durationMin} 分钟 · {l.goal}</div>
                        {p.status !== 'not_started' && (
                          <div className="mt-1.5"><ProgressBar value={p.score} /></div>
                        )}
                      </div>
                      <div className="text-right">
                        {p.status === 'completed' && (
                          <span className="text-emerald-600 text-xs font-medium">
                            {p.score >= 95 ? '⭐ 满分' : `✓ ${p.score}`}
                          </span>
                        )}
                        <div className="text-ink-600">›</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
