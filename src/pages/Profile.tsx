import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ACHIEVEMENTS, TIER_STYLE } from '../data/achievements';
import type { CEFRLevel, LangCode } from '../data/types';
import { Modal, StatCard, ProgressBar } from '../components/ui';
import { classnames, todayKey } from '../lib/storage';
import { useState } from 'react';

const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export function Profile() {
  const { user, logout, updateProfile } = useApp();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [avatar, setAvatar] = useState(user?.avatar ?? '🦊');
  const [enLevel, setEnLevel] = useState<CEFRLevel>(user?.levelByLang?.en ?? 'A1');

  if (!user) return null;

  const avatars = ['🦊', '🐼', '🐧', '🐯', '🦄', '🐨', '🦉', '🐙', '🐻', '🐰'];

  // 30 天活动日历
  const calendar = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const key = todayKey(d);
    return { key, label: d.getDate(), xp: user.activityCalendar[key] ?? 0 };
  });

  const save = () => {
    updateProfile({
      name,
      bio,
      avatar,
      targetLanguages: ['en'],
      levelByLang: { ...user.levelByLang, en: enLevel } as Record<LangCode, CEFRLevel>,
    });
    setEditOpen(false);
  };

  const unlockedSet = new Set(user.unlockedAchievements);
  const sortedAch = [...ACHIEVEMENTS].sort((a, b) => {
    const ua = unlockedSet.has(a.id) ? 0 : 1;
    const ub = unlockedSet.has(b.id) ? 0 : 1;
    return ua - ub;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header card */}
      <div className="card p-6 bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-5xl ring-4 ring-white/30">
            {user.avatar}
          </div>
          <div className="flex-1">
            <div className="text-2xl font-extrabold">{user.name}</div>
            <div className="text-sm text-brand-100">{user.email}</div>
            <div className="text-xs text-brand-200 mt-1">
              加入于 {new Date(user.joinedAt).toLocaleDateString()} · 已学习 {user.stats.lessonsCompleted} 节课
            </div>
          </div>
          <button onClick={() => setEditOpen(true)} className="btn-ghost text-sm bg-white/15 text-white border-white/30 hover:bg-white/25">
            编辑
          </button>
        </div>
        {user.bio && <div className="mt-3 text-sm text-brand-100 italic">"{user.bio}"</div>}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <StatCard icon="🔥" label="连续天数" value={user.stats.streakDays} />
        <StatCard icon="⭐" label="总经验值" value={user.stats.totalXP} />
        <StatCard icon="📚" label="完成课时" value={user.stats.lessonsCompleted} />
        <StatCard icon="💎" label="掌握单词" value={user.stats.wordsLearned} />
      </div>

      {/* Activity calendar */}
      <div className="card p-5 mt-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-ink-900">学习日历</div>
          <div className="text-xs text-ink-600">近 30 天</div>
        </div>
        <div className="mt-3 grid grid-cols-15 gap-1" style={{ gridTemplateColumns: 'repeat(15, 1fr)' }}>
          {calendar.map((c) => (
            <div
              key={c.key}
              title={`${c.key}: ${c.xp} XP`}
              className={classnames(
                'aspect-square rounded',
                c.xp === 0 && 'bg-slate-100',
                c.xp > 0 && c.xp < 30 && 'bg-brand-200',
                c.xp >= 30 && c.xp < 80 && 'bg-brand-400',
                c.xp >= 80 && 'bg-brand-600',
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-ink-600">
          <span>少</span>
          <span className="w-3 h-3 rounded bg-slate-100" />
          <span className="w-3 h-3 rounded bg-brand-200" />
          <span className="w-3 h-3 rounded bg-brand-400" />
          <span className="w-3 h-3 rounded bg-brand-600" />
          <span>多</span>
        </div>
      </div>

      {/* Achievements */}
      <div className="card p-5 mt-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-ink-900">成就徽章</div>
          <div className="text-xs text-ink-600">{unlockedSet.size}/{ACHIEVEMENTS.length} 已解锁</div>
        </div>
        <ProgressBar value={(unlockedSet.size / ACHIEVEMENTS.length) * 100} className="mt-2" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
          {sortedAch.map((a) => {
            const unlocked = unlockedSet.has(a.id);
            return (
              <div
                key={a.id}
                className={classnames(
                  'p-3 rounded-xl border text-center transition',
                  unlocked ? 'border-amber-200 bg-amber-50/40' : 'border-slate-200 bg-slate-50 opacity-70',
                )}
              >
                <div
                  className={classnames(
                    'w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl',
                    unlocked ? `bg-gradient-to-br ${TIER_STYLE[a.tier]}` : 'bg-slate-200 grayscale',
                  )}
                >
                  {unlocked ? a.icon : '🔒'}
                </div>
                <div className="font-bold text-sm mt-2 text-ink-900">{a.title}</div>
                <div className="text-xs text-ink-600 mt-0.5">{a.description}</div>
                <div className="text-[10px] text-ink-600 mt-1 uppercase tracking-wide">{a.tier}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* English level */}
      <div className="card p-5 mt-4">
        <div className="font-bold text-ink-900">英语学习等级</div>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-2xl">
            🇬🇧
          </div>
          <div>
            <div className="font-medium text-sm text-ink-900">英语</div>
            <div className="text-xs text-ink-600">当前等级 {user.levelByLang.en ?? 'A1'}</div>
          </div>
        </div>
      </div>

      <button
        onClick={() => { logout(); navigate('/'); }}
        className="btn-ghost mt-5 w-full text-rose-600 border-rose-200 hover:bg-rose-50"
      >
        退出登录
      </button>

      {/* Edit modal */}
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="编辑个人资料"
        footer={
          <>
            <button onClick={() => setEditOpen(false)} className="btn-ghost">取消</button>
            <button onClick={save} className="btn-primary">保存</button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <div className="label">头像</div>
            <div className="flex flex-wrap gap-2">
              {avatars.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={classnames(
                    'w-10 h-10 rounded-full text-xl flex items-center justify-center border-2',
                    avatar === a ? 'border-brand-500 bg-brand-50' : 'border-slate-200',
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="label">昵称</div>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <div className="label">个性签名</div>
            <input className="input" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="一句话介绍自己" />
          </div>
          <div>
            <div className="label">英语当前等级</div>
            <div className="flex gap-1 flex-wrap">
              {CEFR_LEVELS.map((lv) => (
                <button
                  key={lv}
                  onClick={() => setEnLevel(lv)}
                  className={classnames(
                    'px-3 py-1 rounded text-sm',
                    enLevel === lv ? 'bg-brand-600 text-white' : 'bg-slate-100 text-ink-600',
                  )}
                >
                  {lv}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
