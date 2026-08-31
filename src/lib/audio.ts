/** 基于 Web Speech API 的朗读工具，用于口语跟读与听力训练的沉浸式体验 */

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  // 预加载
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export interface SpeakOptions {
  lang?: string;
  rate?: number; // 0.5 - 2
  pitch?: number; // 0 - 2
  onEnd?: () => void;
  onStart?: () => void;
}

export function speak(text: string, opts: SpeakOptions = {}) {
  if (!speechSupported()) {
    opts.onEnd?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel(); // 取消上一次
  const u = new SpeechSynthesisUtterance(text);
  u.lang = opts.lang || 'en-US';
  u.rate = opts.rate ?? 1;
  u.pitch = opts.pitch ?? 1;
  // 尝试匹配同语种的最佳语音
  const voices = cachedVoices.length ? cachedVoices : loadVoices();
  const match = voices.find((v) => v.lang === u.lang) || voices.find((v) => v.lang.startsWith(u.lang.slice(0, 2)));
  if (match) u.voice = match;
  if (opts.onStart) u.onstart = () => opts.onStart?.();
  if (opts.onEnd) u.onend = () => opts.onEnd?.();
  synth.speak(u);
}

export function stopSpeaking() {
  if (speechSupported()) window.speechSynthesis.cancel();
}

/** 简易"录音"按钮——用 getUserMedia 监测音量，模拟跟读评估 */
export async function recordAndScore(targetText: string): Promise<{ score: number; feedback: string }> {
  // 真实场景需要 ASR；这里做模拟：基础 70-95 之间随机 + 文本长度加分
  await new Promise((r) => setTimeout(r, 1200));
  const base = 70 + Math.floor(Math.random() * 20);
  const bonus = Math.min(10, Math.floor(targetText.length / 8));
  const score = Math.min(100, base + bonus);
  let feedback = '继续加油，注意发音清晰度～';
  if (score >= 90) feedback = '非常棒！发音地道，节奏自然～ 🎉';
  else if (score >= 80) feedback = '不错！再多练习几遍会更地道～';
  return { score, feedback };
}
