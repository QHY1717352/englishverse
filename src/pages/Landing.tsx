import { Link } from 'react-router-dom';
import { COURSES } from '../data/courses';
import { ACHIEVEMENTS } from '../data/achievements';
import { ALL_VOCAB_GROUPS } from '../data/vocab-bank';

const features = [
  { icon: '🪜', title: '分级课程体系', desc: '从 A1 入门到 B2 四级，循序渐进掌握每一阶段的能力。' },
  { icon: '🎮', title: '互动式学习', desc: '单词记忆、语法练习、口语跟读、听力训练四大模块。' },
  { icon: '📖', title: '一词一句', desc: '每个单词配音标、词性与例句，朗读例句加深理解。' },
  { icon: '📈', title: '进度追踪', desc: '可视化学习日历、连续天数、得分与熟练度一目了然。' },
  { icon: '🧭', title: '个性化推荐', desc: '基于学习数据智能推荐下一节最适合的课时。' },
  { icon: '🏆', title: '成就激励', desc: '多枚徽章等你解锁，让坚持变成习惯。' },
];

const totalWords = ALL_VOCAB_GROUPS.reduce((sum, g) => sum + g.words.length, 0);

export function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-ink-900">
            <span className="text-xl">🇬🇧</span>
            <span>EnglishVerse</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/auth" className="btn-ghost text-sm">登录</Link>
            <Link to="/auth" className="btn-primary text-sm">免费开始</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="chip mb-4">✨ 专注英语 · 沉浸式 · 个性化</span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-ink-900">
              学好英语，<br />
              打开<span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">一个新世界</span>
            </h1>
            <p className="mt-4 text-ink-700 text-lg leading-relaxed">
              从零基础入门到高中核心词汇、大学四级冲刺，一个平台完成英语学习的全过程。
              互动式课程、一词一句例句精讲、智能推荐与社区陪伴，让坚持不再孤单。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/auth" className="btn-primary">立即免费开始 →</Link>
              <a href="#features" className="btn-ghost">了解更多</a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-ink-600">
              <div><b className="text-ink-900 text-base">{COURSES.length}</b> 门分级课程</div>
              <div><b className="text-ink-900 text-base">{totalWords}+</b> 核心词汇</div>
              <div><b className="text-ink-900 text-base">{ACHIEVEMENTS.length}</b> 枚成就</div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="relative h-[360px]">
            <div className="absolute top-0 left-6 card p-4 w-56 animate-floaty">
              <div className="text-3xl">🇬🇧</div>
              <div className="font-bold mt-1">Hello!</div>
              <div className="text-xs text-ink-600">英语 · A1 入门基础</div>
              <div className="mt-2 progress-track"><div className="progress-bar" style={{ width: '60%' }} /></div>
            </div>
            <div className="absolute top-24 right-0 card p-4 w-56 animate-floaty" style={{ animationDelay: '0.6s' }}>
              <div className="text-3xl">📖</div>
              <div className="font-bold mt-1">achieve /əˈtʃiːv/</div>
              <div className="text-xs text-ink-600">英语 · 高中核心词汇</div>
              <div className="mt-2 progress-track"><div className="progress-bar" style={{ width: '85%' }} /></div>
            </div>
            <div className="absolute bottom-0 left-12 card p-4 w-56 animate-floaty" style={{ animationDelay: '1.2s' }}>
              <div className="text-3xl">🎓</div>
              <div className="font-bold mt-1">essential /ɪˈsenʃl/</div>
              <div className="text-xs text-ink-600">英语 · 大学四级词汇</div>
              <div className="mt-2 progress-track"><div className="progress-bar" style={{ width: '40%' }} /></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 to-transparent" />
      </section>

      {/* Courses */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-extrabold text-ink-900">分级课程体系</h2>
        <p className="text-ink-600 mt-1">从入门到四级，每一阶段都精心准备了分级课程与互动内容</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {COURSES.map((c) => (
            <div key={c.id} className="card p-5 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white">
              <div className="text-3xl">🇬🇧</div>
              <div className="font-bold mt-2 text-lg">{c.level}</div>
              <div className="text-sm opacity-90">{c.title}</div>
              <div className="mt-3 text-xs opacity-90 italic line-clamp-2">{c.tagline}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-ink-900">沉浸式学习体验</h2>
          <p className="text-ink-600 mt-1">六大核心能力，覆盖英语学习的全流程</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {features.map((f) => (
            <div key={f.title} className="card p-5 hover:shadow-card transition">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-2xl flex items-center justify-center">{f.icon}</div>
              <div className="font-bold mt-3 text-ink-900">{f.title}</div>
              <div className="text-sm text-ink-600 mt-1 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 text-center text-white">
          <h2 className="text-3xl font-extrabold">准备好开始了吗？</h2>
          <p className="mt-2 text-brand-100">三分钟创建账号，开启你的英语学习之旅</p>
          <Link to="/auth" className="btn-accent mt-5">免费注册 →</Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-ink-600">
        <div className="flex items-center justify-center gap-2 font-bold text-ink-900 mb-2">
          <span>🇬🇧</span> EnglishVerse
        </div>
        <div>专注英语学习的在线平台 · 数据保存在本地浏览器</div>
      </footer>
    </div>
  );
}
