import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  CEFRLevel,
  CommunityPost,
  LangCode,
  LessonProgress,
  User,
  UserStats,
} from '../data/types';
import { ACHIEVEMENTS } from '../data/achievements';
import { allLessonsFlat } from '../data/courses';
import { SEED_POSTS } from '../data/community';
import {
  clearSession,
  computeStreak,
  getSessionWithTTL,
  setSessionWithTTL,
  storage,
  todayKey,
  uid,
} from '../lib/storage';

const USERS_KEY = 'users';
const SESSION_KEY = 'session';
const POSTS_KEY = 'posts';

/** 记住我默认有效期（7 天） */
export const REMEMBER_DAYS = 7;

const EMPTY_STATS: UserStats = {
  totalXP: 0,
  streakDays: 0,
  lessonsCompleted: 0,
  wordsLearned: 0,
  perfectLessons: 0,
  languagesStudied: 0,
  communityPosts: 0,
  speakingPracticeCount: 0,
};

interface AppContextValue {
  user: User | null;
  users: User[];
  posts: CommunityPost[];
  // auth
  register: (input: { name: string; email: string; password: string; targetLanguages: LangCode[] }, remember?: boolean) =>
    | { ok: true; user: User }
    | { ok: false; error: string };
  login: (email: string, password: string, remember?: boolean) =>
    | { ok: true; user: User }
    | { ok: false; error: string };
  logout: () => void;
  updateProfile: (patch: Partial<Pick<User, 'name' | 'avatar' | 'bio' | 'targetLanguages' | 'levelByLang'>>) => void;
  // learning
  getLessonProgress: (courseId: string, lessonId: string) => LessonProgress;
  completeLesson: (input: {
    courseId: string;
    lessonId: string;
    score: number;
    xp: number;
    wordsLearned?: number;
    isSpeaking?: boolean;
  }) => { newlyUnlocked: string[]; leveledUp?: boolean };
  // community
  addPost: (input: { title: string; content: string; language: LangCode; tag: string }) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  // recommendations
  recommendedNext: () => { courseId: string; lessonId: string; reason: string } | null;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => storage.get<User[]>(USERS_KEY, []));
  // 启动时校验会话：未过期返回 id，过期返回 null 并自动清理
  const [sessionId, setSessionId] = useState<string | null>(() => getSessionWithTTL(SESSION_KEY));
  const [posts, setPosts] = useState<CommunityPost[]>(() => storage.get<CommunityPost[]>(POSTS_KEY, SEED_POSTS));

  useEffect(() => storage.set(USERS_KEY, users), [users]);
  // sessionId 变化时：null 则彻底清除，非 null 视为登录态，由 login/register 控制 TTL，这里无需重复写
  useEffect(() => {
    if (sessionId === null) clearSession(SESSION_KEY);
  }, [sessionId]);
  useEffect(() => storage.set(POSTS_KEY, posts), [posts]);

  const user = useMemo(() => users.find((u) => u.id === sessionId) ?? null, [users, sessionId]);

  const persistUser = useCallback((updated: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }, []);

  const register: AppContextValue['register'] = ({ name, email, password, targetLanguages }, remember = true) => {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, error: '该邮箱已被注册' };
    if (password.length < 4) return { ok: false, error: '密码至少 4 位' };
    const avatars = ['🦊', '🐼', '🐧', '🐯', '🦄', '🐨', '🦉', '🐙'];
    const newUser: User = {
      id: uid('u_'),
      name,
      email,
      password,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      bio: '',
      joinedAt: Date.now(),
      targetLanguages,
      levelByLang: targetLanguages.reduce((acc, l) => {
        acc[l] = 'A1';
        return acc;
      }, {} as Record<LangCode, CEFRLevel>),
      stats: { ...EMPTY_STATS, languagesStudied: targetLanguages.length },
      unlockedAchievements: [],
      progress: {},
      activityCalendar: {},
    };
    setUsers((prev) => [...prev, newUser]);
    setSessionWithTTL(SESSION_KEY, newUser.id, remember ? REMEMBER_DAYS : 0);
    setSessionId(newUser.id);
    return { ok: true, user: newUser };
  };

  const login: AppContextValue['login'] = (email, password, remember = true) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { ok: false, error: '该邮箱尚未注册' };
    if (found.password !== password) return { ok: false, error: '密码不正确' };
    setSessionWithTTL(SESSION_KEY, found.id, remember ? REMEMBER_DAYS : 0);
    setSessionId(found.id);
    return { ok: true, user: found };
  };

  const logout = () => {
    clearSession(SESSION_KEY);
    setSessionId(null);
  };

  const updateProfile: AppContextValue['updateProfile'] = (patch) => {
    if (!user) return;
    const updated: User = { ...user, ...patch };
    if (patch.targetLanguages) {
      updated.stats = { ...updated.stats, languagesStudied: patch.targetLanguages.length };
      updated.levelByLang = { ...updated.levelByLang };
      patch.targetLanguages.forEach((l) => {
        if (!updated.levelByLang[l]) updated.levelByLang[l] = 'A1';
      });
    }
    persistUser(updated);
  };

  const getLessonProgress: AppContextValue['getLessonProgress'] = (courseId, lessonId) => {
    const key = `${courseId}:${lessonId}`;
    return (
      user?.progress[key] ?? {
        status: 'not_started',
        score: 0,
        xp: 0,
        lastVisitedAt: 0,
        attempts: 0,
      }
    );
  };

  const completeLesson: AppContextValue['completeLesson'] = ({
    courseId,
    lessonId,
    score,
    xp,
    wordsLearned = 0,
    isSpeaking = false,
  }) => {
    if (!user) return { newlyUnlocked: [] };
    const key = `${courseId}:${lessonId}`;
    const prev = user.progress[key];
    const wasCompleted = prev?.status === 'completed';
    const newlyCompleted = !wasCompleted && score >= 60;
    const prevScore = prev?.score ?? 0;
    const perfectNow = score >= 95 && prevScore < 95;

    const updatedProgress: LessonProgress = {
      status: score >= 60 ? 'completed' : 'in_progress',
      score: Math.max(prev?.score ?? 0, score),
      xp: (prev?.xp ?? 0) + (wasCompleted ? Math.floor(xp / 2) : xp), // 复习减半
      lastVisitedAt: Date.now(),
      attempts: (prev?.attempts ?? 0) + 1,
    };

    const today = todayKey();
    const activityCalendar = { ...user.activityCalendar, [today]: (user.activityCalendar[today] ?? 0) + xp };
    const streak = computeStreak(activityCalendar);

    const stats: UserStats = {
      ...user.stats,
      totalXP: user.stats.totalXP + (wasCompleted ? Math.floor(xp / 2) : xp),
      streakDays: Math.max(user.stats.streakDays, streak),
      lessonsCompleted: user.stats.lessonsCompleted + (newlyCompleted ? 1 : 0),
      wordsLearned: user.stats.wordsLearned + (newlyCompleted ? wordsLearned : 0),
      perfectLessons: user.stats.perfectLessons + (perfectNow && newlyCompleted ? 1 : 0),
      speakingPracticeCount: user.stats.speakingPracticeCount + (isSpeaking ? 1 : 0),
      languagesStudied: user.targetLanguages.length,
    };

    const before = new Set(user.unlockedAchievements);
    const after = new Set(user.unlockedAchievements);
    for (const a of ACHIEVEMENTS) {
      if (!after.has(a.id) && a.check(stats)) after.add(a.id);
    }
    const newlyUnlocked = [...after].filter((id) => !before.has(id));

    const updatedUser: User = {
      ...user,
      progress: { ...user.progress, [key]: updatedProgress },
      activityCalendar,
      stats,
      unlockedAchievements: [...after],
    };
    persistUser(updatedUser);

    return { newlyUnlocked };
  };

  const addPost: AppContextValue['addPost'] = ({ title, content, language, tag }) => {
    if (!user) return;
    const post: CommunityPost = {
      id: uid('p_'),
      userId: user.id,
      userName: user.name,
      avatar: user.avatar,
      language,
      title,
      content,
      createdAt: Date.now(),
      likes: 0,
      likedBy: [],
      comments: [],
      tag,
    };
    setPosts((prev) => [post, ...prev]);
    const stats: UserStats = { ...user.stats, communityPosts: user.stats.communityPosts + 1 };
    const after = new Set(user.unlockedAchievements);
    for (const a of ACHIEVEMENTS) if (!after.has(a.id) && a.check(stats)) after.add(a.id);
    persistUser({ ...user, stats, unlockedAchievements: [...after] });
  };

  const toggleLike: AppContextValue['toggleLike'] = (postId) => {
    if (!user) return;
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const liked = p.likedBy.includes(user.id);
        return {
          ...p,
          liked: !liked ? p.likes + 1 : p.likes - 1,
          likedBy: liked ? p.likedBy.filter((id) => id !== user.id) : [...p.likedBy, user.id],
        };
      }),
    );
  };

  const addComment: AppContextValue['addComment'] = (postId, content) => {
    if (!user) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: uid('c_'),
                  userId: user.id,
                  userName: user.name,
                  avatar: user.avatar,
                  content,
                  createdAt: Date.now(),
                },
              ],
            }
          : p,
      ),
    );
  };

  const recommendedNext: AppContextValue['recommendedNext'] = () => {
    if (!user) return null;
    // 找到用户目标语种中第一门未完成的课程，再找其中第一节未完成或分数最低的课时
    for (const lang of user.targetLanguages) {
      const flat = allLessonsFlat().filter((x) => x.course.language === lang);
      if (flat.length === 0) continue;
      // 优先推荐未完成
      const next = flat.find((x) => {
        const p = user.progress[`${x.course.id}:${x.lesson.id}`];
        return !p || p.status !== 'completed';
      });
      const target = next ?? flat[0];
      const p = user.progress[`${target.course.id}:${target.lesson.id}`];
      return {
        courseId: target.course.id,
        lessonId: target.lesson.id,
        reason: p
          ? '继续上次未完成的课时'
          : `开启 ${target.course.title} 的第一课`,
      };
    }
    return null;
  };

  const value: AppContextValue = {
    user,
    users,
    posts,
    register,
    login,
    logout,
    updateProfile,
    getLessonProgress,
    completeLesson,
    addPost,
    toggleLike,
    addComment,
    recommendedNext,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
