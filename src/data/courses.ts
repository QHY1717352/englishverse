import type { Course, LangCode, CEFRLevel, Unit, VocabItem } from './types';
import { SENIOR_VOCAB, CET4_VOCAB, type VocabGroup } from './vocab-bank';

/**
 * 课程数据：英语专用学习平台
 * - 入门基础（A1）：打招呼、自我介绍、数字、颜色
 * - 初级进阶（A2）：过去时、日常活动
 * - 高中核心词汇（B1）：基于主题分组的高中词汇（含音标/词性/例句）
 * - 大学英语四级词汇（B2）：基于主题分组的四级词汇（含音标/词性/例句）
 * 课时类型涵盖：vocab（单词）/ grammar（语法）/ speaking（口语跟读）/ listening（听力训练）
 */

// ============ 英语 ENGLISH · 入门基础 A1 ============

const enA1: Course = {
  id: 'en-a1',
  language: 'en',
  level: 'A1',
  title: '英语 · 入门基础',
  tagline: '从零开始，掌握最常用的英语表达',
  description: '面向零基础学员，建立英语字母、发音与基础词汇体系，能够进行简单的日常问候与自我介绍。',
  estimatedHours: 18,
  units: [
    {
      id: 'en-a1-u1',
      title: '第 1 单元 · 打招呼与自我介绍',
      summary: '学习最基础的问候语与个人介绍句型',
      lessons: [
        {
          id: 'en-a1-u1-l1',
          type: 'vocab',
          title: '基础问候词汇',
          goal: '掌握 10 个核心问候与告别用语',
          durationMin: 8,
          vocab: [
            { term: 'Hello', phonetic: '/həˈloʊ/', pos: 'interj.', meaning: '你好', example: 'Hello, everyone!', exampleMeaning: '大家好！' },
            { term: 'Hi', phonetic: '/haɪ/', pos: 'interj.', meaning: '嗨', example: 'Hi, Sam.', exampleMeaning: '嗨，Sam。' },
            { term: 'Good morning', phonetic: '/ɡʊd ˈmɔːrnɪŋ/', pos: 'phrase', meaning: '早上好', example: 'Good morning, teacher.', exampleMeaning: '早上好，老师。' },
            { term: 'Goodbye', phonetic: '/ˌɡʊdˈbaɪ/', pos: 'interj.', meaning: '再见', example: 'Goodbye, see you tomorrow.', exampleMeaning: '再见，明天见。' },
            { term: 'Thanks', phonetic: '/θæŋks/', pos: 'interj.', meaning: '谢谢', example: 'Thanks a lot.', exampleMeaning: '非常感谢。' },
            { term: 'Sorry', phonetic: '/ˈsɑːri/', pos: 'adj.', meaning: '对不起', example: "Sorry, I'm late.", exampleMeaning: '对不起，我迟到了。' },
            { term: 'Yes', phonetic: '/jes/', pos: 'adv.', meaning: '是的', example: 'Yes, I do.', exampleMeaning: '是的，我有。' },
            { term: 'No', phonetic: '/noʊ/', pos: 'adv.', meaning: '不', example: 'No, thank you.', exampleMeaning: '不了，谢谢。' },
            { term: 'Please', phonetic: '/pliːz/', pos: 'adv.', meaning: '请', example: 'Please sit down.', exampleMeaning: '请坐。' },
            { term: 'Welcome', phonetic: '/ˈwelkəm/', pos: 'interj.', meaning: '欢迎', example: 'Welcome to our class.', exampleMeaning: '欢迎来到我们的课堂。' },
          ],
        },
        {
          id: 'en-a1-u1-l2',
          type: 'grammar',
          title: 'be 动词与主语',
          goal: '理解 I am / You are / He is 的基本用法',
          durationMin: 10,
          grammar: [
            {
              pattern: 'I am / You are / He·She·It is',
              meaning: '我是 / 你是 / 他·她·它是',
              example: 'I am a student. She is my friend.',
              exampleMeaning: '我是一名学生。她是我的朋友。',
              explanation: 'be 动词随主语变化，缩写为 I\'m, You\'re, He\'s, She\'s, It\'s。',
            },
            {
              pattern: 'Am / Is / Are + 主语?',
              meaning: '一般疑问句',
              example: 'Are you a teacher? — Yes, I am.',
              exampleMeaning: '你是老师吗？——是的，我是。',
              explanation: '把 be 动词提前构成疑问句，用 Yes/No 回答。',
            },
          ],
        },
        {
          id: 'en-a1-u1-l3',
          type: 'speaking',
          title: '口语跟读：自我介绍',
          goal: '用 5 句话完成自我介绍',
          durationMin: 7,
          speaking: [
            { text: 'Hello, my name is Alex.', translation: '你好，我叫 Alex。', tips: '注意 name /neɪm/ 的双元音。' },
            { text: "I'm from China.", translation: '我来自中国。', tips: "I'm 是 I am 的缩写。" },
            { text: 'I am twenty years old.', translation: '我二十岁。', tips: 'twenty 注意 /tw/ 的发音。' },
            { text: "I'm a university student.", translation: '我是一名大学生。', tips: 'university 重音在第三音节 /ˌjuːnɪˈvɜːrsəti/。' },
            { text: 'Nice to meet you!', translation: '很高兴认识你！', tips: 'meet you 可连读为 /miːtʃu/。' },
          ],
        },
        {
          id: 'en-a1-u1-l4',
          type: 'listening',
          title: '听力训练：办公室问候',
          goal: '听懂三段简短对话',
          durationMin: 9,
          listening: [
            {
              transcript: 'A: Good morning, Lisa. B: Morning, Tom. How are you? A: I am fine, thanks.',
              translation: 'A：早上好，Lisa。B：早上好，Tom。你好吗？A：我很好，谢谢。',
              speed: 'slow',
            },
            {
              transcript: 'A: Hi, are you a new student? B: Yes, I am. My name is Kim.',
              translation: 'A：嗨，你是新同学吗？B：是的，我是。我叫 Kim。',
            },
            {
              transcript: 'A: Welcome to our company. B: Thank you. Nice to meet everyone.',
              translation: 'A：欢迎来到我们公司。B：谢谢，很高兴认识大家。',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a1-u2',
      title: '第 2 单元 · 数字、时间与颜色',
      summary: '学会用英语说出数字、时间与常见颜色',
      lessons: [
        {
          id: 'en-a1-u2-l1',
          type: 'vocab',
          title: '数字 1-20 与颜色',
          goal: '熟记数字与 8 种颜色',
          durationMin: 10,
          vocab: [
            { term: 'one', phonetic: '/wʌn/', pos: 'num.', meaning: '一' },
            { term: 'two', phonetic: '/tuː/', pos: 'num.', meaning: '二' },
            { term: 'three', phonetic: '/θriː/', pos: 'num.', meaning: '三' },
            { term: 'ten', phonetic: '/ten/', pos: 'num.', meaning: '十' },
            { term: 'twenty', phonetic: '/ˈtwenti/', pos: 'num.', meaning: '二十' },
            { term: 'red', phonetic: '/red/', pos: 'adj.', meaning: '红色', example: 'A red apple.', exampleMeaning: '一个红苹果。' },
            { term: 'blue', phonetic: '/bluː/', pos: 'adj.', meaning: '蓝色', example: 'The sky is blue.', exampleMeaning: '天空是蓝色的。' },
            { term: 'green', phonetic: '/ɡriːn/', pos: 'adj.', meaning: '绿色', example: 'I like green tea.', exampleMeaning: '我喜欢绿茶。' },
            { term: 'yellow', phonetic: '/ˈjeloʊ/', pos: 'adj.', meaning: '黄色', example: 'The sun is yellow.', exampleMeaning: '太阳是黄色的。' },
            { term: 'black', phonetic: '/blæk/', pos: 'adj.', meaning: '黑色', example: 'She has black hair.', exampleMeaning: '她有一头黑发。' },
            { term: 'white', phonetic: '/waɪt/', pos: 'adj.', meaning: '白色', example: 'The walls are white.', exampleMeaning: '墙壁是白色的。' },
            { term: 'orange', phonetic: '/ˈɔːrɪndʒ/', pos: 'adj./n.', meaning: '橙色', example: 'An orange is orange.', exampleMeaning: '橙子是橙色的。' },
          ],
        },
        {
          id: 'en-a1-u2-l2',
          type: 'grammar',
          title: "What's this? / It's ...",
          goal: '学会询问与回答物品名称',
          durationMin: 8,
          grammar: [
            {
              pattern: "What's this? — It's a / an ...",
              meaning: '这是什么？——这是……',
              example: "What's this? — It's an apple.",
              exampleMeaning: '这是什么？——这是一个苹果。',
              explanation: '元音音素开头用 an，辅音音素开头用 a。',
            },
          ],
        },
        {
          id: 'en-a1-u2-l3',
          type: 'listening',
          title: '听力训练：购物对话',
          goal: '听懂数字与颜色的搭配',
          durationMin: 9,
          listening: [
            {
              transcript: 'A: I would like two red apples, please. B: Here you are.',
              translation: 'A：我想要两个红苹果，谢谢。B：给您。',
              speed: 'slow',
            },
            {
              transcript: 'A: What color is your car? B: It is blue.',
              translation: 'A：你的车是什么颜色？B：蓝色。',
            },
          ],
        },
      ],
    },
  ],
};

// ============ 英语 ENGLISH · 初级进阶 A2 ============

const enA2: Course = {
  id: 'en-a2',
  language: 'en',
  level: 'A2',
  title: '英语 · 初级进阶',
  tagline: '掌握过去时与日常交流',
  description: '扩展日常话题词汇，学习一般过去时与将来时，能够描述过去的经历与未来的计划。',
  estimatedHours: 22,
  units: [
    {
      id: 'en-a2-u1',
      title: '第 1 单元 · 日常生活与过去时',
      summary: '描述昨天做过的事',
      lessons: [
        {
          id: 'en-a2-u1-l1',
          type: 'vocab',
          title: '日常活动词汇',
          goal: '掌握 12 个常见动词',
          durationMin: 12,
          vocab: [
            { term: 'wake up', phonetic: '/weɪk ʌp/', pos: 'v.', meaning: '醒来', example: 'I wake up at 7.', exampleMeaning: '我七点醒来。' },
            { term: 'have breakfast', phonetic: '/hæv ˈbrekfəst/', pos: 'v.', meaning: '吃早餐', example: 'I have breakfast at 8.', exampleMeaning: '我八点吃早餐。' },
            { term: 'go to work', phonetic: '/ɡoʊ tuː wɜːrk/', pos: 'v.', meaning: '去上班', example: 'She goes to work by bus.', exampleMeaning: '她坐公交去上班。' },
            { term: 'study', phonetic: '/ˈstʌdi/', pos: 'v.', meaning: '学习', example: 'He studies hard every day.', exampleMeaning: '他每天都努力学习。' },
            { term: 'cook', phonetic: '/kʊk/', pos: 'v.', meaning: '做饭', example: 'My mother cooks dinner.', exampleMeaning: '我妈妈做晚饭。' },
            { term: 'exercise', phonetic: '/ˈeksərsaɪz/', pos: 'v.', meaning: '锻炼', example: 'I exercise every morning.', exampleMeaning: '我每天早上锻炼。' },
            { term: 'meet friends', phonetic: '/miːt frendz/', pos: 'v.', meaning: '见朋友', example: 'I meet friends on weekends.', exampleMeaning: '我周末见朋友。' },
            { term: 'watch TV', phonetic: '/wɑːtʃ tiː viː/', pos: 'v.', meaning: '看电视', example: 'We watch TV after dinner.', exampleMeaning: '我们晚饭后看电视。' },
            { term: 'read', phonetic: '/riːd/', pos: 'v.', meaning: '阅读', example: 'She reads a book before bed.', exampleMeaning: '她睡前读一本书。' },
            { term: 'sleep', phonetic: '/sliːp/', pos: 'v.', meaning: '睡觉', example: 'I sleep eight hours a day.', exampleMeaning: '我一天睡八小时。' },
            { term: 'travel', phonetic: '/ˈtrævl/', pos: 'v.', meaning: '旅行', example: 'They travel to Japan in summer.', exampleMeaning: '他们夏天去日本旅行。' },
            { term: 'shop', phonetic: '/ʃɑːp/', pos: 'v.', meaning: '购物', example: 'I shop online every week.', exampleMeaning: '我每周网购。' },
          ],
        },
        {
          id: 'en-a2-u1-l2',
          type: 'grammar',
          title: '一般过去时',
          goal: '使用 -ed 形式描述过去事件',
          durationMin: 12,
          grammar: [
            {
              pattern: '主语 + 动词过去式',
              meaning: '描述过去发生的事',
              example: 'I visited my grandma yesterday.',
              exampleMeaning: '我昨天拜访了我的奶奶。',
              explanation: '规则动词加 -ed，不规则动词需单独记忆（go→went, see→saw）。',
            },
            {
              pattern: 'Did + 主语 + 动词原形?',
              meaning: '过去时的疑问句',
              example: 'Did you watch the match?',
              exampleMeaning: '你看比赛了吗？',
            },
          ],
        },
        {
          id: 'en-a2-u1-l3',
          type: 'speaking',
          title: '口语跟读：我的一天',
          goal: '描述自己昨天的活动',
          durationMin: 10,
          speaking: [
            { text: 'Yesterday I woke up at six.', translation: '我昨天六点醒来。' },
            { text: 'I had eggs and toast for breakfast.', translation: '我早餐吃了鸡蛋和吐司。' },
            { text: 'Then I went to the office by bus.', translation: '然后我坐公交去办公室。' },
            { text: 'I met my team for lunch.', translation: '我和团队一起吃了午饭。' },
            { text: 'In the evening, I read a book before sleep.', translation: '晚上，我睡前读了一本书。' },
          ],
        },
        {
          id: 'en-a2-u1-l4',
          type: 'listening',
          title: '听力训练：旅行故事',
          goal: '听懂一段过去的旅行描述',
          durationMin: 11,
          listening: [
            {
              transcript: 'Last summer, I traveled to Japan. I visited Tokyo and Kyoto. The food was amazing.',
              translation: '去年夏天，我去了日本旅行。我参观了东京和京都。食物非常棒。',
            },
            {
              transcript: 'We stayed in a small hotel near the station. Every morning we had sushi for breakfast.',
              translation: '我们住在车站附近的小旅馆。每天早上我们都吃寿司早餐。',
            },
          ],
        },
      ],
    },
  ],
};

// ============ 词汇课程：由 vocab-bank 动态生成 ============

/** 将词汇分组转换为课程单元 */
function vocabGroupToUnit(group: VocabGroup, coursePrefix: string, unitIndex: number): Unit {
  const vocab: VocabItem[] = group.words.map((w) => ({
    term: w.term,
    phonetic: w.phonetic,
    pos: w.pos,
    meaning: w.meaning,
    example: w.example,
    exampleMeaning: w.exampleMeaning,
  }));
  return {
    id: `${coursePrefix}-u${unitIndex}`,
    title: `第 ${unitIndex} 单元 · ${group.title}`,
    summary: `掌握 ${group.words.length} 个「${group.title}」主题词汇及例句`,
    lessons: [
      {
        id: `${coursePrefix}-u${unitIndex}-l1`,
        type: 'vocab',
        title: `${group.title} 词汇精讲`,
        goal: `掌握 ${group.words.length} 个核心词汇，通过例句学习用法`,
        durationMin: Math.max(8, Math.ceil(group.words.length * 1.2)),
        vocab,
      },
    ],
  };
}

// ============ 英语 · 高中核心词汇 B1 ============

const enSeniorVocab: Course = {
  id: 'en-senior-vocab',
  language: 'en',
  level: 'B1',
  title: '英语 · 高中核心词汇',
  tagline: '主题式掌握高中高频词汇',
  description:
    '按日常生活、情感态度、学校学习、自然环境、社会文化等主题，系统学习高中核心词汇。每词配音标、词性与例句，一词一句，学以致用。',
  estimatedHours: 20,
  units: SENIOR_VOCAB.map((g, i) => vocabGroupToUnit(g, 'en-senior-vocab', i + 1)),
};

// ============ 英语 · 大学四级词汇 B2 ============

const enCet4Vocab: Course = {
  id: 'en-cet4-vocab',
  language: 'en',
  level: 'B2',
  title: '英语 · 大学四级词汇',
  tagline: '攻克 CET4 核心词汇',
  description:
    '按抽象概念、商业经济、高频动词形容词、学术科技、社会现象等主题，系统学习大学英语四级核心词汇。每词配音标、词性与例句，一词一句，深入理解。',
  estimatedHours: 24,
  units: CET4_VOCAB.map((g, i) => vocabGroupToUnit(g, 'en-cet4-vocab', i + 1)),
};

export const COURSES: Course[] = [enA1, enA2, enSeniorVocab, enCet4Vocab];

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getCoursesByLanguage(lang: LangCode): Course[] {
  return COURSES.filter((c) => c.language === lang);
}

export function getCourseByLanguageLevel(lang: LangCode, level: CEFRLevel): Course | undefined {
  return COURSES.find((c) => c.language === lang && c.level === level);
}

export function findLesson(courseId: string, lessonId: string) {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  for (const unit of course.units) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return { course, unit, lesson };
  }
  return undefined;
}

export function allLessonsFlat() {
  return COURSES.flatMap((c) =>
    c.units.flatMap((u) => u.lessons.map((l) => ({ course: c, unit: u, lesson: l }))),
  );
}
