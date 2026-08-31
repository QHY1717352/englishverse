/** 简单的 localStorage 封装，带命名空间与 JSON 序列化 */

const NS = 'linguaverse:';

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(NS + key);
      if (raw === null) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(NS + key, JSON.stringify(value));
    } catch {
      /* 容量满或隐私模式，忽略 */
    }
  },
  remove(key: string): void {
    localStorage.removeItem(NS + key);
  },
};

/** sessionStorage 封装（关闭浏览器即失效，用于"不记住我"场景） */
export const sessionStore = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = sessionStorage.getItem(NS + key);
      if (raw === null) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(NS + key, JSON.stringify(value));
    } catch {
      /* 隐私模式或不可用，忽略 */
    }
  },
  remove(key: string): void {
    try {
      sessionStorage.removeItem(NS + key);
    } catch {
      /* ignore */
    }
  },
};

/** 带过期的会话存储：返回未过期的值，否则返回 null 并清理 */
export function getSessionWithTTL(key: string): string | null {
  const payload = storage.get<{ id: string; expiresAt: number } | string | null>(key, null);
  if (!payload) {
    // 兼容旧版：从 sessionStorage 读
    const sid = sessionStore.get<string | null>(key, null);
    return sid ?? null;
  }
  // 兼容旧版：纯字符串格式的 session id，直接返回
  if (typeof payload === 'string') return payload;
  if (payload.expiresAt && Date.now() > payload.expiresAt) {
    storage.remove(key);
    return null;
  }
  return payload.id;
}

/** 写入会话：remember=true 写 localStorage 带 TTL，否则写 sessionStorage */
export function setSessionWithTTL(key: string, id: string, rememberDays: number): void {
  if (rememberDays > 0) {
    const expiresAt = Date.now() + rememberDays * 24 * 60 * 60 * 1000;
    storage.set(key, { id, expiresAt });
    sessionStore.remove(key); // 清掉可能的临时会话
  } else {
    sessionStore.set(key, id);
    storage.remove(key); // 清掉可能的持久会话
  }
}

export function clearSession(key: string): void {
  storage.remove(key);
  sessionStore.remove(key);
}

/**
 * 凭据混淆存储（非真正加密，仅防肉眼直接可见）。
 * 用 XOR + Base64，密钥为本机域名+固定盐，换设备/换域名即失效。
 * 仅用于"本机便利回填"，不应在共享设备使用。
 */
const CRED_SALT = 'linguaverse-local-credential-v1';

export function encodeCredential(cred: { email: string; password: string }): string {
  try {
    const json = JSON.stringify(cred);
    const key = (location?.origin || 'local') + CRED_SALT;
    let out = '';
    for (let i = 0; i < json.length; i++) {
      out += String.fromCharCode(json.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(unescape(encodeURIComponent(out)));
  } catch {
    return '';
  }
}

export function decodeCredential(encoded: string): { email: string; password: string } | null {
  try {
    const raw = decodeURIComponent(escape(atob(encoded)));
    const key = (location?.origin || 'local') + CRED_SALT;
    let json = '';
    for (let i = 0; i < raw.length; i++) {
      json += String.fromCharCode(raw.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    const cred = JSON.parse(json);
    if (typeof cred.email === 'string' && typeof cred.password === 'string') return cred;
    return null;
  } catch {
    return null;
  }
}

export const CRED_KEY = 'saved-credential';

export function uid(prefix = ''): string {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** 计算 streak：根据活动日历连续天数 */
export function computeStreak(activityCalendar: Record<string, number>): number {
  if (!activityCalendar || Object.keys(activityCalendar).length === 0) return 0;
  let streak = 0;
  const d = new Date();
  // 如果今天没活动但从昨天起有，仍按昨天为末尾计算
  if (!activityCalendar[todayKey(d)]) {
    d.setDate(d.getDate() - 1);
    if (!activityCalendar[todayKey(d)]) return 0;
  }
  while (activityCalendar[todayKey(d)]) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function classnames(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(' ');
}
