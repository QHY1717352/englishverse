import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import {
  CRED_KEY,
  classnames,
  decodeCredential,
  encodeCredential,
  storage,
} from '../lib/storage';

export function Auth() {
  const { login, register } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // 记住我（默认勾选）+ 保存账号密码回填（默认不勾选）
  const [remember, setRemember] = useState(true);
  const [saveCred, setSaveCred] = useState(false);

  // 首次进入登录页：尝试读取已保存的账号密码自动回填
  useEffect(() => {
    const saved = storage.get<string | null>(CRED_KEY, null);
    if (saved) {
      const cred = decodeCredential(saved);
      if (cred) {
        setEmail(cred.email);
        setPassword(cred.password);
        setSaveCred(true);
      }
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'login') {
      const res = login(email, password, remember);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      // 登录成功后处理凭据：勾选保存则写，否则清除旧凭据
      if (saveCred) {
        storage.set(CRED_KEY, encodeCredential({ email, password }));
      } else {
        storage.remove(CRED_KEY);
      }
    } else {
      if (!name.trim()) {
        setError('请填写昵称');
        return;
      }
      const res = register({ name, email, password, targetLanguages: ['en'] }, remember);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      if (saveCred) {
        storage.set(CRED_KEY, encodeCredential({ email, password }));
      } else {
        storage.remove(CRED_KEY);
      }
    }
    navigate('/app');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 via-white to-accent-400/10">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <span className="text-3xl">🇬🇧</span>
          <span className="text-2xl font-extrabold text-ink-900">EnglishVerse</span>
        </Link>

        <div className="card p-6">
          <div className="flex bg-slate-100 rounded-xl p-1 mb-5">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError('');
                }}
                className={classnames(
                  'flex-1 py-2 rounded-lg text-sm font-medium transition',
                  mode === m ? 'bg-white text-brand-700 shadow-soft' : 'text-ink-600',
                )}
              >
                {m === 'login' ? '登录' : '注册'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <div className="label">昵称</div>
                <input
                  className="input"
                  placeholder="给自己起个名字"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <div className="label">邮箱</div>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="label">密码</div>
              <input
                type="password"
                className="input"
                placeholder="至少 4 位"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mode === 'register' && (
              <div className="rounded-xl bg-brand-50/60 px-3 py-2.5 text-sm text-ink-700 flex items-center gap-2">
                <span className="text-lg">🇬🇧</span>
                <span>注册即开始英语学习之旅，平台已专注英语课程</span>
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-rose-50 text-rose-600 text-sm px-3 py-2">{error}</div>
            )}

            {/* 记住我 / 保存账号密码 选项 */}
            <div className="space-y-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="text-ink-700">记住我（7 天内免登录）</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  checked={saveCred}
                  onChange={(e) => setSaveCred(e.target.checked)}
                />
                <span className="text-ink-700">
                  保存账号密码到本机（下次自动填充）
                </span>
              </label>
              {saveCred && (
                <p className="text-xs text-amber-600 leading-relaxed">
                  ⚠️ 仅建议私人设备使用；公共/共享设备请勿勾选。
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full">
              {mode === 'login' ? '登录' : '创建账号'}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-ink-600">
            {mode === 'login' ? '还没有账号？' : '已有账号？'}
            <button
              className="text-brand-600 font-medium ml-1"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            >
              {mode === 'login' ? '去注册' : '去登录'}
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-xs text-ink-600 hover:text-brand-600">← 返回首页</Link>
        </div>
      </div>
    </div>
  );
}
