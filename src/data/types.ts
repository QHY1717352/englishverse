// ===== 平台核心类型定义 =====

export type LangCode = 'en' | 'ja' | 'ko' | 'fr' | 'es';

export interface Language {
  code: LangCode;
  name: string;
  nativeName: string;
  flag: string;
  gradient: string;
  ttsLang: string; // Web Speech API 语种代码
  greetings: string[];
}

/** CEFR 等级 */
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type LessonType = 'vocab' | 'grammar' | 'speaking' | 'listening';

export interface VocabItem {
  term: string;
  reading?: string; // 拼音 / 假名注音 / 罗马音
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  phonetic?: string; // 音标（英语）
  pos?: string; // 词性 n./v./adj. 等
}

export interface GrammarPoint {
  pattern: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  explanation?: string;
}

export interface ListeningClip {
  transcript: string;
  translation: string;
  speed?: 'slow' | 'normal';
}

export interface SpeakingSentence {
  text: string;
  translation: string;
  tips?: string;
}

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  goal: string;
  durationMin: number;
  // 不同类型对应的内容
  vocab?: VocabItem[];
  grammar?: GrammarPoint[];
  listening?: ListeningClip[];
  speaking?: SpeakingSentence[];
}

export interface Unit {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  language: LangCode;
  level: CEFRLevel;
  title: string;
  description: string;
  tagline: string;
  estimatedHours: number;
  units: Unit[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  check: (stats: UserStats) => boolean;
}

export interface UserStats {
  totalXP: number;
  streakDays: number;
  lessonsCompleted: number;
  wordsLearned: number;
  perfectLessons: number;
  languagesStudied: number;
  communityPosts: number;
  speakingPracticeCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  joinedAt: number;
  /** 关注的学习语种 */
  targetLanguages: LangCode[];
  /** 当前 CEFR 等级（按语种） */
  levelByLang: Record<LangCode, CEFRLevel>;
  stats: UserStats;
  unlockedAchievements: string[];
  /** 进度记录 key: `${courseId}:${lessonId}` */
  progress: Record<string, LessonProgress>;
  /** 学习日历 YYYY-MM-DD => xp */
  activityCalendar: Record<string, number>;
}

export interface LessonProgress {
  status: 'not_started' | 'in_progress' | 'completed';
  score: number; // 0-100
  xp: number;
  lastVisitedAt: number;
  attempts: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  language: LangCode;
  title: string;
  content: string;
  createdAt: number;
  likes: number;
  likedBy: string[];
  comments: Comment[];
  tag: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  content: string;
  createdAt: number;
}
