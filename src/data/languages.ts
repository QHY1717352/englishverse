import type { Language } from './types';

export const LANGUAGES: Record<string, Language> = {
  en: {
    code: 'en',
    name: '英语',
    nativeName: 'English',
    flag: '🇬🇧',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    ttsLang: 'en-US',
    greetings: ['Hello!', "How's it going?", 'Nice to meet you.'],
  },
  ja: {
    code: 'ja',
    name: '日语',
    nativeName: '日本語',
    flag: '🇯🇵',
    gradient: 'from-rose-400 via-pink-500 to-fuchsia-500',
    ttsLang: 'ja-JP',
    greetings: ['こんにちは！', 'はじめまして', 'よろしくお願いします'],
  },
  ko: {
    code: 'ko',
    name: '韩语',
    nativeName: '한국어',
    flag: '🇰🇷',
    gradient: 'from-sky-400 via-cyan-500 to-teal-500',
    ttsLang: 'ko-KR',
    greetings: ['안녕하세요!', '만나서 반갑습니다', '잘 부탁드립니다'],
  },
  fr: {
    code: 'fr',
    name: '法语',
    nativeName: 'Français',
    flag: '🇫🇷',
    gradient: 'from-blue-600 via-indigo-700 to-violet-700',
    ttsLang: 'fr-FR',
    greetings: ['Bonjour!', 'Enchanté', 'Ça va ?'],
  },
  es: {
    code: 'es',
    name: '西班牙语',
    nativeName: 'Español',
    flag: '🇪🇸',
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    ttsLang: 'es-ES',
    greetings: ['¡Hola!', 'Mucho gusto', '¿Cómo estás?'],
  },
};

/**
 * 平台已专注英语学习。
 * LANGUAGES 仍保留全部语种条目，便于兼容旧用户数据（如历史社区帖子的语种标签）查找，
 * 但对外暴露的 LANGUAGE_LIST 仅含英语，所有语言选择 UI 均只呈现英语。
 */
export const LANGUAGE_LIST = [LANGUAGES.en];
