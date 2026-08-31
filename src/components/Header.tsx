import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { Avatar } from './ui';

const navItems = [
  { to: '/app', label: '学习', icon: '🏠', end: true },
  { to: '/app/courses', label: '课程', icon: '📚', end: false },
  { to: '/app/tasks', label: '背词', icon: '✍️', end: false },
  { to: '/app/path', label: '推荐', icon: '🧭', end: false },
  { to: '/app/profile', label: '我的', icon: '👤', end: false },
];

export function Header() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/app" className="flex items-center gap-2 font-extrabold text-ink-900">
          <span className="text-xl">🇬🇧</span>
          <span>EnglishVerse</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-slate-100'
                }`
              }
            >
              {it.label}
            </NavLink>
          ))}
        </nav>
        {user && (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 chip">
              <span>🔥</span>
              <span className="font-bold">{user.stats.streakDays}</span>
              <span className="text-ink-600">天</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 chip bg-accent-400/20 text-accent-600">
              <span>⭐</span>
              <span className="font-bold">{user.stats.totalXP}</span>
            </div>
            <Link to="/app/profile" className="flex items-center gap-2">
              <Avatar emoji={user.avatar} size={32} />
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="text-xs text-ink-600 hover:text-brand-600 px-2"
              title="退出登录"
            >
              退出
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200">
      <div className="grid grid-cols-5">
        {navItems.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 text-[11px] font-medium ${
                isActive ? 'text-brand-600' : 'text-ink-600'
              }`
            }
          >
            <span className="text-xl leading-none">{it.icon}</span>
            <span className="mt-0.5">{it.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
