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
    {
      id: 'en-a1-u3',
      title: '第 3 单元 · 家庭成员',
      summary: '学习家庭成员的称呼与介绍家人的句型',
      lessons: [
        {
          id: 'en-a1-u3-l1',
          type: 'vocab',
          title: '家庭成员词汇',
          goal: '掌握 12 个家庭成员称谓',
          durationMin: 10,
          vocab: [
            { term: 'father', phonetic: '/ˈfɑːðər/', pos: 'n.', meaning: '父亲', example: 'My father is a teacher.', exampleMeaning: '我父亲是老师。' },
            { term: 'mother', phonetic: '/ˈmʌðər/', pos: 'n.', meaning: '母亲', example: 'My mother cooks well.', exampleMeaning: '我妈妈做饭很好。' },
            { term: 'brother', phonetic: '/ˈbrʌðər/', pos: 'n.', meaning: '兄弟', example: 'I have one brother.', exampleMeaning: '我有一个兄弟。' },
            { term: 'sister', phonetic: '/ˈsɪstər/', pos: 'n.', meaning: '姐妹', example: 'Her sister is tall.', exampleMeaning: '她姐姐个子高。' },
            { term: 'son', phonetic: '/sʌn/', pos: 'n.', meaning: '儿子', example: 'Their son is five.', exampleMeaning: '他们的儿子五岁。' },
            { term: 'daughter', phonetic: '/ˈdɔːtər/', pos: 'n.', meaning: '女儿', example: 'My daughter likes dogs.', exampleMeaning: '我女儿喜欢狗。' },
            { term: 'grandfather', phonetic: '/ˈɡrænfɑːðər/', pos: 'n.', meaning: '祖父；外公', example: 'My grandfather is old.', exampleMeaning: '我爷爷年纪大了。' },
            { term: 'grandmother', phonetic: '/ˈɡrænmʌðər/', pos: 'n.', meaning: '祖母；外婆', example: 'My grandmother is kind.', exampleMeaning: '我奶奶很和蔼。' },
            { term: 'parents', phonetic: '/ˈperənts/', pos: 'n.', meaning: '父母', example: 'My parents are at home.', exampleMeaning: '我父母在家。' },
            { term: 'family', phonetic: '/ˈfæməli/', pos: 'n.', meaning: '家庭', example: 'I love my family.', exampleMeaning: '我爱我的家。' },
            { term: 'baby', phonetic: '/ˈbeɪbi/', pos: 'n.', meaning: '婴儿', example: 'The baby is sleeping.', exampleMeaning: '婴儿在睡觉。' },
            { term: 'husband', phonetic: '/ˈhʌzbənd/', pos: 'n.', meaning: '丈夫', example: 'Her husband is a doctor.', exampleMeaning: '她丈夫是医生。' },
          ],
        },
        {
          id: 'en-a1-u3-l2',
          type: 'grammar',
          title: 'This is my ... / She is my ...',
          goal: '学会介绍家庭成员',
          durationMin: 8,
          grammar: [
            {
              pattern: 'This is my + 称谓.',
              meaning: '这是我的……',
              example: 'This is my mother.',
              exampleMeaning: '这是我妈妈。',
              explanation: '用 this is 介绍身边的人，用 he/she is 介绍他人。',
            },
          ],
        },
        {
          id: 'en-a1-u3-l3',
          type: 'listening',
          title: '听力训练：家庭介绍',
          goal: '听懂家庭关系的简短介绍',
          durationMin: 8,
          listening: [
            {
              transcript: 'A: Who is this? B: This is my father. He is a doctor.',
              translation: 'A：这是谁？B：这是我爸爸。他是医生。',
              speed: 'slow',
            },
            {
              transcript: 'A: Do you have brothers? B: Yes, I have one brother.',
              translation: 'A：你有兄弟吗？B：有，我有一个兄弟。',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a1-u4',
      title: '第 4 单元 · 食物与饮料',
      summary: '认识常见食物饮料，学会表达喜欢与想要',
      lessons: [
        {
          id: 'en-a1-u4-l1',
          type: 'vocab',
          title: '食物饮料词汇',
          goal: '掌握 14 个常见食物与饮料',
          durationMin: 12,
          vocab: [
            { term: 'water', phonetic: '/ˈwɔːtər/', pos: 'n.', meaning: '水', example: 'I drink water every day.', exampleMeaning: '我每天喝水。' },
            { term: 'milk', phonetic: '/mɪlk/', pos: 'n.', meaning: '牛奶', example: 'Milk is good for you.', exampleMeaning: '牛奶对你有益。' },
            { term: 'bread', phonetic: '/bred/', pos: 'n.', meaning: '面包', example: 'I eat bread for breakfast.', exampleMeaning: '我早餐吃面包。' },
            { term: 'rice', phonetic: '/raɪs/', pos: 'n.', meaning: '米饭', example: 'We have rice for lunch.', exampleMeaning: '我们午餐吃米饭。' },
            { term: 'egg', phonetic: '/eɡ/', pos: 'n.', meaning: '鸡蛋', example: 'I like eggs.', exampleMeaning: '我喜欢鸡蛋。' },
            { term: 'meat', phonetic: '/miːt/', pos: 'n.', meaning: '肉', example: 'He does not eat meat.', exampleMeaning: '他不吃肉。' },
            { term: 'fish', phonetic: '/fɪʃ/', pos: 'n.', meaning: '鱼', example: 'The fish is fresh.', exampleMeaning: '这鱼很新鲜。' },
            { term: 'apple', phonetic: '/ˈæpl/', pos: 'n.', meaning: '苹果', example: 'An apple a day.', exampleMeaning: '一天一个苹果。' },
            { term: 'banana', phonetic: '/bəˈnænə/', pos: 'n.', meaning: '香蕉', example: 'She eats a banana.', exampleMeaning: '她吃了一根香蕉。' },
            { term: 'chicken', phonetic: '/ˈtʃɪkɪn/', pos: 'n.', meaning: '鸡肉', example: 'I like chicken.', exampleMeaning: '我喜欢鸡肉。' },
            { term: 'tea', phonetic: '/tiː/', pos: 'n.', meaning: '茶', example: 'Would you like tea?', exampleMeaning: '你想喝茶吗？' },
            { term: 'coffee', phonetic: '/ˈkɑːfi/', pos: 'n.', meaning: '咖啡', example: 'He drinks coffee in the morning.', exampleMeaning: '他早上喝咖啡。' },
            { term: 'fruit', phonetic: '/fruːt/', pos: 'n.', meaning: '水果', example: 'Fruit is healthy.', exampleMeaning: '水果很健康。' },
            { term: 'juice', phonetic: '/dʒuːs/', pos: 'n.', meaning: '果汁', example: 'I want orange juice.', exampleMeaning: '我想要橙汁。' },
          ],
        },
        {
          id: 'en-a1-u4-l2',
          type: 'grammar',
          title: 'I like / I want ...',
          goal: '表达喜欢与想要的食物',
          durationMin: 8,
          grammar: [
            {
              pattern: 'I like / want + 食物',
              meaning: '我喜欢/想要……',
              example: 'I want an apple, please.',
              exampleMeaning: '我想要一个苹果，谢谢。',
              explanation: 'like 表习惯喜好，want 表当下想要；可数名词单数前加 a/an。',
            },
          ],
        },
        {
          id: 'en-a1-u4-l3',
          type: 'listening',
          title: '听力训练：餐厅点餐',
          goal: '听懂点餐对话中的食物词',
          durationMin: 9,
          listening: [
            {
              transcript: 'A: What would you like? B: I want rice and chicken, please.',
              translation: 'A：您想要什么？B：我想要米饭和鸡肉，谢谢。',
              speed: 'slow',
            },
            {
              transcript: 'A: Do you want tea or coffee? B: Coffee, please.',
              translation: 'A：您要茶还是咖啡？B：请给我咖啡。',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a1-u5',
      title: '第 5 单元 · 身体部位',
      summary: '认识身体各部位的名称',
      lessons: [
        {
          id: 'en-a1-u5-l1',
          type: 'vocab',
          title: '身体部位词汇',
          goal: '掌握 11 个身体部位名称',
          durationMin: 10,
          vocab: [
            { term: 'head', phonetic: '/hed/', pos: 'n.', meaning: '头', example: 'Put your hand on your head.', exampleMeaning: '把手放在头上。' },
            { term: 'hair', phonetic: '/her/', pos: 'n.', meaning: '头发', example: 'She has long hair.', exampleMeaning: '她头发很长。' },
            { term: 'eye', phonetic: '/aɪ/', pos: 'n.', meaning: '眼睛', example: 'I have two eyes.', exampleMeaning: '我有两只眼睛。' },
            { term: 'ear', phonetic: '/ɪr/', pos: 'n.', meaning: '耳朵', example: 'Cover your ears.', exampleMeaning: '捂住你的耳朵。' },
            { term: 'nose', phonetic: '/noʊz/', pos: 'n.', meaning: '鼻子', example: 'Touch your nose.', exampleMeaning: '摸摸你的鼻子。' },
            { term: 'mouth', phonetic: '/maʊθ/', pos: 'n.', meaning: '嘴', example: 'Open your mouth.', exampleMeaning: '张开嘴。' },
            { term: 'hand', phonetic: '/hænd/', pos: 'n.', meaning: '手', example: 'Wash your hands.', exampleMeaning: '洗手。' },
            { term: 'foot', phonetic: '/fʊt/', pos: 'n.', meaning: '脚', example: 'My foot hurts.', exampleMeaning: '我的脚疼。' },
            { term: 'leg', phonetic: '/leɡ/', pos: 'n.', meaning: '腿', example: 'He broke his leg.', exampleMeaning: '他摔断了腿。' },
            { term: 'arm', phonetic: '/ɑːrm/', pos: 'n.', meaning: '手臂', example: 'Raise your arm.', exampleMeaning: '抬起你的手臂。' },
            { term: 'face', phonetic: '/feɪs/', pos: 'n.', meaning: '脸', example: 'Wash your face.', exampleMeaning: '洗脸。' },
          ],
        },
        {
          id: 'en-a1-u5-l2',
          type: 'grammar',
          title: 'My / Your + 身体部位',
          goal: '用物主代词描述身体部位',
          durationMin: 7,
          grammar: [
            {
              pattern: 'My / Your + 身体部位',
              meaning: '我的/你的……',
              example: 'My head hurts.',
              exampleMeaning: '我头疼。',
              explanation: 'my 表示我的，your 表示你的/你们的，放在名词前。',
            },
          ],
        },
        {
          id: 'en-a1-u5-l3',
          type: 'listening',
          title: '听力训练：医生问诊',
          goal: '听懂关于身体部位的简单描述',
          durationMin: 8,
          listening: [
            {
              transcript: 'A: What is wrong? B: My ear hurts.',
              translation: 'A：怎么了？B：我耳朵疼。',
              speed: 'slow',
            },
            {
              transcript: 'A: Touch your nose. B: Here?',
              translation: 'A：摸你的鼻子。B：这里吗？',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a1-u6',
      title: '第 6 单元 · 动物',
      summary: '认识常见动物的英文名称',
      lessons: [
        {
          id: 'en-a1-u6-l1',
          type: 'vocab',
          title: '动物词汇',
          goal: '掌握 12 个常见动物',
          durationMin: 10,
          vocab: [
            { term: 'dog', phonetic: '/dɔːɡ/', pos: 'n.', meaning: '狗', example: 'The dog is small.', exampleMeaning: '这只狗很小。' },
            { term: 'cat', phonetic: '/kæt/', pos: 'n.', meaning: '猫', example: 'I have a cat.', exampleMeaning: '我有一只猫。' },
            { term: 'bird', phonetic: '/bɜːrd/', pos: 'n.', meaning: '鸟', example: 'The bird can fly.', exampleMeaning: '鸟会飞。' },
            { term: 'horse', phonetic: '/hɔːrs/', pos: 'n.', meaning: '马', example: 'The horse runs fast.', exampleMeaning: '马跑得快。' },
            { term: 'cow', phonetic: '/kaʊ/', pos: 'n.', meaning: '牛', example: 'The cow gives milk.', exampleMeaning: '牛产奶。' },
            { term: 'pig', phonetic: '/pɪɡ/', pos: 'n.', meaning: '猪', example: 'The pig is pink.', exampleMeaning: '这头猪是粉色的。' },
            { term: 'sheep', phonetic: '/ʃiːp/', pos: 'n.', meaning: '羊', example: 'There are three sheep.', exampleMeaning: '有三只羊。' },
            { term: 'duck', phonetic: '/dʌk/', pos: 'n.', meaning: '鸭子', example: 'The duck is in the water.', exampleMeaning: '鸭子在水里。' },
            { term: 'rabbit', phonetic: '/ˈræbɪt/', pos: 'n.', meaning: '兔子', example: 'The rabbit hops fast.', exampleMeaning: '兔子跳得快。' },
            { term: 'mouse', phonetic: '/maʊs/', pos: 'n.', meaning: '老鼠', example: 'A mouse is small.', exampleMeaning: '老鼠很小。' },
            { term: 'elephant', phonetic: '/ˈelɪfənt/', pos: 'n.', meaning: '大象', example: 'The elephant is big.', exampleMeaning: '大象很大。' },
            { term: 'tiger', phonetic: '/ˈtaɪɡər/', pos: 'n.', meaning: '老虎', example: 'The tiger is strong.', exampleMeaning: '老虎很强壮。' },
          ],
        },
        {
          id: 'en-a1-u6-l2',
          type: 'grammar',
          title: 'It is a / an + 动物',
          goal: '用 a/an 描述动物',
          durationMin: 7,
          grammar: [
            {
              pattern: 'It is a / an + 动物',
              meaning: '它是一只……',
              example: 'It is an elephant.',
              exampleMeaning: '它是一头大象。',
              explanation: '元音音素开头（如 elephant）用 an，辅音音素开头用 a。',
            },
          ],
        },
        {
          id: 'en-a1-u6-l3',
          type: 'listening',
          title: '听力训练：动物园',
          goal: '听懂动物名称的指认',
          durationMin: 8,
          listening: [
            {
              transcript: 'A: What is that? B: It is a tiger.',
              translation: 'A：那是什么？B：那是一只老虎。',
              speed: 'slow',
            },
            {
              transcript: 'A: Look at the bird! B: It is so small.',
              translation: 'A：看那只鸟！B：它好小。',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a1-u7',
      title: '第 7 单元 · 天气',
      summary: '学习描述天气的基本词汇',
      lessons: [
        {
          id: 'en-a1-u7-l1',
          type: 'vocab',
          title: '天气词汇',
          goal: '掌握 10 个天气相关词',
          durationMin: 9,
          vocab: [
            { term: 'rain', phonetic: '/reɪn/', pos: 'n.', meaning: '雨', example: 'The rain is heavy.', exampleMeaning: '雨很大。' },
            { term: 'snow', phonetic: '/snoʊ/', pos: 'n.', meaning: '雪', example: 'The snow is white.', exampleMeaning: '雪是白色的。' },
            { term: 'wind', phonetic: '/wɪnd/', pos: 'n.', meaning: '风', example: 'The wind is strong.', exampleMeaning: '风很大。' },
            { term: 'cloud', phonetic: '/klaʊd/', pos: 'n.', meaning: '云', example: 'I see a cloud.', exampleMeaning: '我看到一朵云。' },
            { term: 'hot', phonetic: '/hɑːt/', pos: 'adj.', meaning: '热的', example: 'It is hot today.', exampleMeaning: '今天很热。' },
            { term: 'cold', phonetic: '/koʊld/', pos: 'adj.', meaning: '冷的', example: 'It is cold in winter.', exampleMeaning: '冬天很冷。' },
            { term: 'warm', phonetic: '/wɔːrm/', pos: 'adj.', meaning: '温暖的', example: 'It is warm in spring.', exampleMeaning: '春天很温暖。' },
            { term: 'sunny', phonetic: '/ˈsʌni/', pos: 'adj.', meaning: '晴朗的', example: 'It is a sunny day.', exampleMeaning: '今天是个晴天。' },
            { term: 'weather', phonetic: '/ˈweðər/', pos: 'n.', meaning: '天气', example: 'How is the weather?', exampleMeaning: '天气怎么样？' },
            { term: 'season', phonetic: '/ˈsiːzn/', pos: 'n.', meaning: '季节', example: 'Spring is my favorite season.', exampleMeaning: '春天是我最喜欢的季节。' },
          ],
        },
        {
          id: 'en-a1-u7-l2',
          type: 'grammar',
          title: 'It is + 天气形容词',
          goal: '描述天气状况',
          durationMin: 7,
          grammar: [
            {
              pattern: 'It is + 形容词',
              meaning: '天气……',
              example: 'It is cold and windy.',
              exampleMeaning: '又冷风又大。',
              explanation: '用 it 指代天气，后接形容词描述状况。',
            },
          ],
        },
        {
          id: 'en-a1-u7-l3',
          type: 'listening',
          title: '听力训练：天气预报',
          goal: '听懂简单的天气描述',
          durationMin: 8,
          listening: [
            {
              transcript: 'A: How is the weather today? B: It is sunny.',
              translation: 'A：今天天气怎么样？B：晴天。',
              speed: 'slow',
            },
            {
              transcript: 'A: Is it cold? B: Yes, take a coat.',
              translation: 'A：冷吗？B：冷，带件外套。',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a1-u8',
      title: '第 8 单元 · 学校物品',
      summary: '学习教室里常见的物品与人员',
      lessons: [
        {
          id: 'en-a1-u8-l1',
          type: 'vocab',
          title: '学校物品词汇',
          goal: '掌握 12 个学校相关词',
          durationMin: 10,
          vocab: [
            { term: 'book', phonetic: '/bʊk/', pos: 'n.', meaning: '书', example: 'Open your book.', exampleMeaning: '打开你的书。' },
            { term: 'pen', phonetic: '/pen/', pos: 'n.', meaning: '钢笔', example: 'I need a pen.', exampleMeaning: '我需要一支钢笔。' },
            { term: 'pencil', phonetic: '/ˈpensl/', pos: 'n.', meaning: '铅笔', example: 'This is my pencil.', exampleMeaning: '这是我的铅笔。' },
            { term: 'bag', phonetic: '/bæɡ/', pos: 'n.', meaning: '包', example: 'My bag is heavy.', exampleMeaning: '我的包很重。' },
            { term: 'desk', phonetic: '/desk/', pos: 'n.', meaning: '书桌', example: 'Sit at your desk.', exampleMeaning: '坐到你的书桌前。' },
            { term: 'chair', phonetic: '/tʃer/', pos: 'n.', meaning: '椅子', example: 'The chair is broken.', exampleMeaning: '椅子坏了。' },
            { term: 'teacher', phonetic: '/ˈtiːtʃər/', pos: 'n.', meaning: '老师', example: 'The teacher is kind.', exampleMeaning: '老师很和蔼。' },
            { term: 'student', phonetic: '/ˈstuːdnt/', pos: 'n.', meaning: '学生', example: 'He is a good student.', exampleMeaning: '他是个好学生。' },
            { term: 'school', phonetic: '/skuːl/', pos: 'n.', meaning: '学校', example: 'I go to school by bus.', exampleMeaning: '我坐公交上学。' },
            { term: 'class', phonetic: '/klæs/', pos: 'n.', meaning: '班级；课', example: 'Our class is big.', exampleMeaning: '我们班很大。' },
            { term: 'ruler', phonetic: '/ˈruːlər/', pos: 'n.', meaning: '尺子', example: 'Can I use your ruler?', exampleMeaning: '我能用你的尺子吗？' },
            { term: 'eraser', phonetic: '/ɪˈreɪsər/', pos: 'n.', meaning: '橡皮', example: 'I lost my eraser.', exampleMeaning: '我把橡皮弄丢了。' },
          ],
        },
        {
          id: 'en-a1-u8-l2',
          type: 'grammar',
          title: 'This is a / That is a ...',
          goal: '区分近处与远处的物品',
          durationMin: 7,
          grammar: [
            {
              pattern: 'This is a / That is a + 物品',
              meaning: '这是/那是……',
              example: 'This is a pen. That is a book.',
              exampleMeaning: '这是钢笔。那是书。',
              explanation: 'this 指近处的物品，that 指远处的物品。',
            },
          ],
        },
        {
          id: 'en-a1-u8-l3',
          type: 'listening',
          title: '听力训练：教室指令',
          goal: '听懂教室里的常见指令',
          durationMin: 8,
          listening: [
            {
              transcript: 'A: Open your book, please. B: OK.',
              translation: 'A：请打开书。B：好的。',
              speed: 'slow',
            },
            {
              transcript: 'A: Is this your pen? B: Yes, thank you.',
              translation: 'A：这是你的钢笔吗？B：是的，谢谢。',
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
    {
      id: 'en-a2-u2',
      title: '第 2 单元 · 健康与就医',
      summary: '学习健康与就医相关词汇及表达',
      lessons: [
        {
          id: 'en-a2-u2-l1',
          type: 'vocab',
          title: '健康与就医词汇',
          goal: '掌握 15 个健康相关词汇',
          durationMin: 14,
          vocab: [
            { term: 'doctor', phonetic: '/ˈdɑːktər/', pos: 'n.', meaning: '医生', example: 'You should see a doctor.', exampleMeaning: '你应该去看医生。' },
            { term: 'hospital', phonetic: '/ˈhɑːspɪtl/', pos: 'n.', meaning: '医院', example: 'He works in a hospital.', exampleMeaning: '他在医院工作。' },
            { term: 'medicine', phonetic: '/ˈmedsn/', pos: 'n.', meaning: '药', example: 'Take this medicine after meals.', exampleMeaning: '饭后服用此药。' },
            { term: 'headache', phonetic: '/ˈhedeɪk/', pos: 'n.', meaning: '头痛', example: 'I have a bad headache.', exampleMeaning: '我头痛得厉害。' },
            { term: 'fever', phonetic: '/ˈfiːvər/', pos: 'n.', meaning: '发烧', example: 'She has a fever.', exampleMeaning: '她发烧了。' },
            { term: 'cough', phonetic: '/kɔːf/', pos: 'n./v.', meaning: '咳嗽', example: 'His cough is getting worse.', exampleMeaning: '他的咳嗽加重了。' },
            { term: 'healthy', phonetic: '/ˈhelθi/', pos: 'adj.', meaning: '健康的', example: 'They live a healthy life.', exampleMeaning: '他们过着健康的生活。' },
            { term: 'sick', phonetic: '/sɪk/', pos: 'adj.', meaning: '生病的', example: 'I feel sick today.', exampleMeaning: '我今天觉得不舒服。' },
            { term: 'pain', phonetic: '/peɪn/', pos: 'n.', meaning: '疼痛', example: 'I feel a sharp pain here.', exampleMeaning: '我这里感到剧痛。' },
            { term: 'toothache', phonetic: '/ˈtuːθeɪk/', pos: 'n.', meaning: '牙痛', example: 'He has a toothache.', exampleMeaning: '他牙痛。' },
            { term: 'stomach', phonetic: '/ˈstʌmək/', pos: 'n.', meaning: '胃；腹部', example: 'My stomach hurts after eating.', exampleMeaning: '我吃完东西后胃疼。' },
            { term: 'patient', phonetic: '/ˈpeɪʃnt/', pos: 'n.', meaning: '病人', example: 'The patient is resting.', exampleMeaning: '病人在休息。' },
            { term: 'nurse', phonetic: '/nɜːrs/', pos: 'n.', meaning: '护士', example: 'The nurse is very kind.', exampleMeaning: '护士非常和蔼。' },
            { term: 'rest', phonetic: '/rest/', pos: 'n./v.', meaning: '休息', example: 'You need a good rest.', exampleMeaning: '你需要好好休息。' },
            { term: 'dentist', phonetic: '/ˈdentɪst/', pos: 'n.', meaning: '牙医', example: 'I visit the dentist twice a year.', exampleMeaning: '我每年看两次牙医。' },
          ],
        },
        {
          id: 'en-a2-u2-l2',
          type: 'grammar',
          title: "should / shouldn't 表建议",
          goal: '用 should 给出健康建议',
          durationMin: 10,
          grammar: [
            {
              pattern: "主语 + should / shouldn't + 动词原形",
              meaning: '应该/不应该……',
              example: 'You should drink more water.',
              exampleMeaning: '你应该多喝水。',
              explanation: "should 用于给出建议，否定形式为 shouldn't。",
            },
          ],
        },
        {
          id: 'en-a2-u2-l3',
          type: 'listening',
          title: '听力训练：看病对话',
          goal: '听懂就医场景的对话',
          durationMin: 11,
          listening: [
            {
              transcript: "A: What's the matter? B: I have a headache and a fever.",
              translation: 'A：怎么了？B：我头痛还发烧。',
            },
            {
              transcript: 'A: You should rest and take the medicine. B: Thank you, doctor.',
              translation: 'A：你应该休息并服药。B：谢谢您，医生。',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a2-u3',
      title: '第 3 单元 · 购物',
      summary: '学习购物场景的核心词汇与表达',
      lessons: [
        {
          id: 'en-a2-u3-l1',
          type: 'vocab',
          title: '购物词汇',
          goal: '掌握 15 个购物相关词汇',
          durationMin: 14,
          vocab: [
            { term: 'price', phonetic: '/praɪs/', pos: 'n.', meaning: '价格', example: 'What is the price?', exampleMeaning: '价格是多少？' },
            { term: 'money', phonetic: '/ˈmʌni/', pos: 'n.', meaning: '钱', example: 'I do not have enough money.', exampleMeaning: '我的钱不够。' },
            { term: 'store', phonetic: '/stɔːr/', pos: 'n.', meaning: '商店', example: 'The store opens at nine.', exampleMeaning: '商店九点开门。' },
            { term: 'market', phonetic: '/ˈmɑːrkɪt/', pos: 'n.', meaning: '市场', example: 'We go to the market on Sunday.', exampleMeaning: '我们周日去市场。' },
            { term: 'buy', phonetic: '/baɪ/', pos: 'v.', meaning: '买', example: 'I want to buy a book.', exampleMeaning: '我想买一本书。' },
            { term: 'sell', phonetic: '/sel/', pos: 'v.', meaning: '卖', example: 'They sell fresh fruit.', exampleMeaning: '他们卖新鲜水果。' },
            { term: 'cheap', phonetic: '/tʃiːp/', pos: 'adj.', meaning: '便宜的', example: 'This shirt is cheap.', exampleMeaning: '这件衬衫很便宜。' },
            { term: 'expensive', phonetic: '/ɪkˈspensɪv/', pos: 'adj.', meaning: '昂贵的', example: 'The car is too expensive.', exampleMeaning: '这车太贵了。' },
            { term: 'customer', phonetic: '/ˈkʌstəmər/', pos: 'n.', meaning: '顾客', example: 'The customer is happy.', exampleMeaning: '顾客很满意。' },
            { term: 'receipt', phonetic: '/rɪˈsiːt/', pos: 'n.', meaning: '收据', example: 'Keep your receipt, please.', exampleMeaning: '请保留收据。' },
            { term: 'discount', phonetic: '/ˈdɪskaʊnt/', pos: 'n.', meaning: '折扣', example: 'There is a big discount today.', exampleMeaning: '今天有大折扣。' },
            { term: 'size', phonetic: '/saɪz/', pos: 'n.', meaning: '尺寸', example: 'What size do you need?', exampleMeaning: '你需要什么尺寸？' },
            { term: 'pay', phonetic: '/peɪ/', pos: 'v.', meaning: '付款', example: 'I will pay in cash.', exampleMeaning: '我用现金付款。' },
            { term: 'wallet', phonetic: '/ˈwɑːlɪt/', pos: 'n.', meaning: '钱包', example: 'I lost my wallet.', exampleMeaning: '我把钱包丢了。' },
            { term: 'cash', phonetic: '/kæʃ/', pos: 'n.', meaning: '现金', example: 'Do you take cash?', exampleMeaning: '你们收现金吗？' },
          ],
        },
        {
          id: 'en-a2-u3-l2',
          type: 'grammar',
          title: 'How much is / are ...?',
          goal: '询问价格',
          durationMin: 10,
          grammar: [
            {
              pattern: 'How much is / are + 物品?',
              meaning: '……多少钱？',
              example: 'How much are these apples?',
              exampleMeaning: '这些苹果多少钱？',
              explanation: '单数用 is，复数用 are；回答常用 It is / They are + 价格。',
            },
          ],
        },
        {
          id: 'en-a2-u3-l3',
          type: 'listening',
          title: '听力训练：商场对话',
          goal: '听懂购物对话中的价格与商品',
          durationMin: 11,
          listening: [
            {
              transcript: 'A: How much is this shirt? B: It is two hundred yuan.',
              translation: 'A：这件衬衫多少钱？B：两百元。',
            },
            {
              transcript: 'A: Do you have a smaller size? B: Let me check. Yes, here it is.',
              translation: 'A：有小一号的吗？B：我看看。有，在这里。',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a2-u4',
      title: '第 4 单元 · 工作与职业',
      summary: '学习常见职业与工作场所词汇',
      lessons: [
        {
          id: 'en-a2-u4-l1',
          type: 'vocab',
          title: '职业词汇',
          goal: '掌握 15 个职业与工作相关词',
          durationMin: 14,
          vocab: [
            { term: 'job', phonetic: '/dʒɑːb/', pos: 'n.', meaning: '工作', example: 'He found a new job.', exampleMeaning: '他找到了一份新工作。' },
            { term: 'worker', phonetic: '/ˈwɜːrkər/', pos: 'n.', meaning: '工人', example: 'The workers are on break.', exampleMeaning: '工人们在休息。' },
            { term: 'manager', phonetic: '/ˈmænɪdʒər/', pos: 'n.', meaning: '经理', example: 'Our manager is very busy.', exampleMeaning: '我们的经理很忙。' },
            { term: 'engineer', phonetic: '/ˌendʒɪˈnɪr/', pos: 'n.', meaning: '工程师', example: 'She is a software engineer.', exampleMeaning: '她是一名软件工程师。' },
            { term: 'lawyer', phonetic: '/ˈlɔːjər/', pos: 'n.', meaning: '律师', example: 'The lawyer won the case.', exampleMeaning: '律师赢了官司。' },
            { term: 'chef', phonetic: '/ʃef/', pos: 'n.', meaning: '厨师', example: 'The chef cooked a great meal.', exampleMeaning: '厨师做了一顿美餐。' },
            { term: 'driver', phonetic: '/ˈdraɪvər/', pos: 'n.', meaning: '司机', example: 'The driver is waiting outside.', exampleMeaning: '司机在外面等。' },
            { term: 'farmer', phonetic: '/ˈfɑːrmər/', pos: 'n.', meaning: '农民', example: 'The farmer grows rice.', exampleMeaning: '这位农民种水稻。' },
            { term: 'officer', phonetic: '/ˈɑːfɪsər/', pos: 'n.', meaning: '警官；官员', example: 'The officer helped us.', exampleMeaning: '警官帮助了我们。' },
            { term: 'office', phonetic: '/ˈɑːfɪs/', pos: 'n.', meaning: '办公室', example: 'I work in an office.', exampleMeaning: '我在办公室工作。' },
            { term: 'company', phonetic: '/ˈkʌmpəni/', pos: 'n.', meaning: '公司', example: 'Our company is growing.', exampleMeaning: '我们公司在发展。' },
            { term: 'salary', phonetic: '/ˈsæləri/', pos: 'n.', meaning: '薪水', example: 'He got a higher salary.', exampleMeaning: '他涨薪了。' },
            { term: 'boss', phonetic: '/bɑːs/', pos: 'n.', meaning: '老板', example: 'My boss is strict but fair.', exampleMeaning: '我老板严格但公正。' },
            { term: 'interview', phonetic: '/ˈɪntərvjuː/', pos: 'n./v.', meaning: '面试；采访', example: 'I have a job interview tomorrow.', exampleMeaning: '我明天有个面试。' },
            { term: 'business', phonetic: '/ˈbɪznəs/', pos: 'n.', meaning: '商业；生意', example: 'Business is good this year.', exampleMeaning: '今年生意不错。' },
          ],
        },
        {
          id: 'en-a2-u4-l2',
          type: 'grammar',
          title: 'What do you do? / I am a ...',
          goal: '询问与回答职业',
          durationMin: 10,
          grammar: [
            {
              pattern: 'What do you do? — I am a + 职业',
              meaning: '你是做什么的？——我是……',
              example: 'What do you do? — I am a nurse.',
              exampleMeaning: '你是做什么的？——我是护士。',
              explanation: '用 What do you do? 询问对方职业，回答用 I am a/an + 职业。',
            },
          ],
        },
        {
          id: 'en-a2-u4-l3',
          type: 'listening',
          title: '听力训练：自我介绍职业',
          goal: '听懂他人的职业介绍',
          durationMin: 11,
          listening: [
            {
              transcript: 'A: What do you do? B: I am an engineer at a small company.',
              translation: 'A：你是做什么的？B：我在一家小公司当工程师。',
            },
            {
              transcript: 'A: Do you like your job? B: Yes, the people are nice.',
              translation: 'A：你喜欢你的工作吗？B：喜欢，同事们很好。',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a2-u5',
      title: '第 5 单元 · 交通与出行',
      summary: '学习交通工具与出行相关词汇',
      lessons: [
        {
          id: 'en-a2-u5-l1',
          type: 'vocab',
          title: '交通出行词汇',
          goal: '掌握 15 个交通相关词',
          durationMin: 14,
          vocab: [
            { term: 'car', phonetic: '/kɑːr/', pos: 'n.', meaning: '汽车', example: 'His car is new.', exampleMeaning: '他的车是新的。' },
            { term: 'bus', phonetic: '/bʌs/', pos: 'n.', meaning: '公交车', example: 'I take the bus to work.', exampleMeaning: '我坐公交上班。' },
            { term: 'train', phonetic: '/treɪn/', pos: 'n.', meaning: '火车', example: 'The train is fast.', exampleMeaning: '火车很快。' },
            { term: 'plane', phonetic: '/pleɪn/', pos: 'n.', meaning: '飞机', example: 'The plane took off on time.', exampleMeaning: '飞机准时起飞了。' },
            { term: 'bike', phonetic: '/baɪk/', pos: 'n.', meaning: '自行车', example: 'She rides a bike to school.', exampleMeaning: '她骑车上学。' },
            { term: 'taxi', phonetic: '/ˈtæksi/', pos: 'n.', meaning: '出租车', example: 'Let us take a taxi.', exampleMeaning: '我们打车吧。' },
            { term: 'ship', phonetic: '/ʃɪp/', pos: 'n.', meaning: '轮船', example: 'The ship sails at night.', exampleMeaning: '轮船夜间航行。' },
            { term: 'subway', phonetic: '/ˈsʌbweɪ/', pos: 'n.', meaning: '地铁', example: 'The subway is crowded now.', exampleMeaning: '现在地铁很挤。' },
            { term: 'station', phonetic: '/ˈsteɪʃn/', pos: 'n.', meaning: '车站', example: 'Meet me at the station.', exampleMeaning: '在车站等我。' },
            { term: 'ticket', phonetic: '/ˈtɪkɪt/', pos: 'n.', meaning: '票', example: 'I bought two tickets.', exampleMeaning: '我买了两张票。' },
            { term: 'airport', phonetic: '/ˈerpɔːrt/', pos: 'n.', meaning: '机场', example: 'We arrived at the airport early.', exampleMeaning: '我们很早到了机场。' },
            { term: 'drive', phonetic: '/draɪv/', pos: 'v.', meaning: '驾驶', example: 'He drives carefully.', exampleMeaning: '他开车很小心。' },
            { term: 'ride', phonetic: '/raɪd/', pos: 'v.', meaning: '乘坐；骑', example: 'She rides her bike every day.', exampleMeaning: '她每天骑车。' },
            { term: 'arrive', phonetic: '/əˈraɪv/', pos: 'v.', meaning: '到达', example: 'We arrived at noon.', exampleMeaning: '我们中午到达。' },
            { term: 'journey', phonetic: '/ˈdʒɜːrni/', pos: 'n.', meaning: '旅程', example: 'It was a long journey.', exampleMeaning: '那是一段漫长的旅程。' },
          ],
        },
        {
          id: 'en-a2-u5-l2',
          type: 'grammar',
          title: 'by + 交通工具 / take a + 交通工具',
          goal: '表达出行方式',
          durationMin: 10,
          grammar: [
            {
              pattern: 'by + 交通工具 / take a + 交通工具',
              meaning: '乘坐……出行',
              example: 'I go to work by subway. / I take a taxi.',
              exampleMeaning: '我坐地铁上班。/ 我打车。',
              explanation: 'by 后不加冠词（by bus），take 后加冠词（take a bus）。',
            },
          ],
        },
        {
          id: 'en-a2-u5-l3',
          type: 'listening',
          title: '听力训练：车站对话',
          goal: '听懂出行方式的对话',
          durationMin: 11,
          listening: [
            {
              transcript: 'A: How do you go to work? B: I usually take the subway.',
              translation: 'A：你怎么去上班？B：我通常坐地铁。',
            },
            {
              transcript: 'A: When does the train arrive? B: At ten past nine.',
              translation: 'A：火车什么时候到？B：九点十分。',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a2-u6',
      title: '第 6 单元 · 情感与态度',
      summary: '学习表达情绪与态度的形容词',
      lessons: [
        {
          id: 'en-a2-u6-l1',
          type: 'vocab',
          title: '情感词汇',
          goal: '掌握 15 个情感相关词',
          durationMin: 14,
          vocab: [
            { term: 'happy', phonetic: '/ˈhæpi/', pos: 'adj.', meaning: '开心的', example: 'She looks happy today.', exampleMeaning: '她今天看起来很开心。' },
            { term: 'sad', phonetic: '/sæd/', pos: 'adj.', meaning: '伤心的', example: 'He felt sad after the news.', exampleMeaning: '听到消息后他很伤心。' },
            { term: 'angry', phonetic: '/ˈæŋɡri/', pos: 'adj.', meaning: '生气的', example: 'Do not be angry with me.', exampleMeaning: '别生我的气。' },
            { term: 'excited', phonetic: '/ɪkˈsaɪtɪd/', pos: 'adj.', meaning: '兴奋的', example: 'The kids are excited.', exampleMeaning: '孩子们很兴奋。' },
            { term: 'tired', phonetic: '/ˈtaɪərd/', pos: 'adj.', meaning: '疲惫的', example: 'I am very tired today.', exampleMeaning: '我今天很累。' },
            { term: 'bored', phonetic: '/bɔːrd/', pos: 'adj.', meaning: '无聊的', example: 'He gets bored easily.', exampleMeaning: '他很容易无聊。' },
            { term: 'surprised', phonetic: '/sərˈpraɪzd/', pos: 'adj.', meaning: '惊讶的', example: 'I was surprised by the result.', exampleMeaning: '结果让我惊讶。' },
            { term: 'nervous', phonetic: '/ˈnɜːrvəs/', pos: 'adj.', meaning: '紧张的', example: 'She felt nervous before the test.', exampleMeaning: '考试前她很紧张。' },
            { term: 'proud', phonetic: '/praʊd/', pos: 'adj.', meaning: '自豪的', example: 'I am proud of you.', exampleMeaning: '我为你自豪。' },
            { term: 'lonely', phonetic: '/ˈloʊnli/', pos: 'adj.', meaning: '孤独的', example: 'He felt lonely in the city.', exampleMeaning: '他在城里感到孤独。' },
            { term: 'afraid', phonetic: '/əˈfreɪd/', pos: 'adj.', meaning: '害怕的', example: 'She is afraid of dogs.', exampleMeaning: '她怕狗。' },
            { term: 'worried', phonetic: '/ˈwɜːrid/', pos: 'adj.', meaning: '担心的', example: 'My mom is worried about me.', exampleMeaning: '我妈妈担心我。' },
            { term: 'calm', phonetic: '/kɑːm/', pos: 'adj.', meaning: '平静的', example: 'Please stay calm.', exampleMeaning: '请保持冷静。' },
            { term: 'brave', phonetic: '/breɪv/', pos: 'adj.', meaning: '勇敢的', example: 'The boy is very brave.', exampleMeaning: '这个男孩很勇敢。' },
            { term: 'hope', phonetic: '/hoʊp/', pos: 'n./v.', meaning: '希望', example: 'I hope to see you soon.', exampleMeaning: '我希望能很快见到你。' },
          ],
        },
        {
          id: 'en-a2-u6-l2',
          type: 'grammar',
          title: 'be + 形容词 / feel + 形容词',
          goal: '描述情绪状态',
          durationMin: 10,
          grammar: [
            {
              pattern: '主语 + be / feel + 情感形容词',
              meaning: '感到……',
              example: 'She felt nervous and I felt excited.',
              exampleMeaning: '她很紧张，我很兴奋。',
              explanation: 'be 和 feel 都可接情感形容词，feel 强调主观感受。',
            },
          ],
        },
        {
          id: 'en-a2-u6-l3',
          type: 'listening',
          title: '听力训练：情绪表达',
          goal: '听懂他人情绪的描述',
          durationMin: 11,
          listening: [
            {
              transcript: 'A: You look tired today. B: I am. I did not sleep well.',
              translation: 'A：你今天看起来很累。B：是的，我没睡好。',
            },
            {
              transcript: 'A: Why are you sad? B: I miss my family.',
              translation: 'A：你怎么不开心？B：我想家了。',
            },
          ],
        },
      ],
    },
    {
      id: 'en-a2-u7',
      title: '第 7 单元 · 节日与庆祝',
      summary: '学习节日庆祝相关词汇',
      lessons: [
        {
          id: 'en-a2-u7-l1',
          type: 'vocab',
          title: '节日词汇',
          goal: '掌握 15 个节日相关词',
          durationMin: 14,
          vocab: [
            { term: 'holiday', phonetic: '/ˈhɑːlədeɪ/', pos: 'n.', meaning: '假日', example: 'We have a long holiday next week.', exampleMeaning: '下周有个长假。' },
            { term: 'festival', phonetic: '/ˈfestɪvl/', pos: 'n.', meaning: '节日', example: 'Spring Festival is coming.', exampleMeaning: '春节快到了。' },
            { term: 'celebrate', phonetic: '/ˈselɪbreɪt/', pos: 'v.', meaning: '庆祝', example: 'We celebrate New Year together.', exampleMeaning: '我们一起庆祝新年。' },
            { term: 'party', phonetic: '/ˈpɑːrti/', pos: 'n.', meaning: '派对', example: 'They had a big party.', exampleMeaning: '他们办了一场大派对。' },
            { term: 'gift', phonetic: '/ɡɪft/', pos: 'n.', meaning: '礼物', example: 'I got many gifts.', exampleMeaning: '我收到很多礼物。' },
            { term: 'card', phonetic: '/kɑːrd/', pos: 'n.', meaning: '卡片', example: 'She made a birthday card.', exampleMeaning: '她做了一张生日卡。' },
            { term: 'candle', phonetic: '/ˈkændl/', pos: 'n.', meaning: '蜡烛', example: 'Light the candles, please.', exampleMeaning: '请点燃蜡烛。' },
            { term: 'cake', phonetic: '/keɪk/', pos: 'n.', meaning: '蛋糕', example: 'Let us cut the cake.', exampleMeaning: '我们切蛋糕吧。' },
            { term: 'fireworks', phonetic: '/ˈfaɪərwɜːrks/', pos: 'n.', meaning: '烟花', example: 'We watched the fireworks.', exampleMeaning: '我们看了烟花。' },
            { term: 'relative', phonetic: '/ˈrelətɪv/', pos: 'n.', meaning: '亲属', example: 'We visit our relatives every year.', exampleMeaning: '我们每年都拜访亲戚。' },
            { term: 'traditional', phonetic: '/trəˈdɪʃənl/', pos: 'adj.', meaning: '传统的', example: 'Dumplings are traditional food.', exampleMeaning: '饺子是传统食物。' },
            { term: 'dance', phonetic: '/dæns/', pos: 'n./v.', meaning: '舞蹈；跳舞', example: 'They danced all night.', exampleMeaning: '他们跳了一整晚的舞。' },
            { term: 'song', phonetic: '/sɔːŋ/', pos: 'n.', meaning: '歌曲', example: 'We sang a happy song.', exampleMeaning: '我们唱了一首欢快的歌。' },
            { term: 'dinner', phonetic: '/ˈdɪnər/', pos: 'n.', meaning: '晚餐', example: 'We had a big dinner.', exampleMeaning: '我们吃了一顿丰盛的晚餐。' },
            { term: 'decorate', phonetic: '/ˈdekəreɪt/', pos: 'v.', meaning: '装饰', example: 'We decorated the room.', exampleMeaning: '我们装饰了房间。' },
          ],
        },
        {
          id: 'en-a2-u7-l2',
          type: 'grammar',
          title: '过去时描述节日经历',
          goal: '用过去时描述上次过节',
          durationMin: 10,
          grammar: [
            {
              pattern: '主语 + 动词过去式 + 节日活动',
              meaning: '描述节日做过的事',
              example: 'We celebrated and ate a big dinner.',
              exampleMeaning: '我们庆祝了一番，吃了一顿大餐。',
              explanation: '描述已经过去的节日活动时，动词用过去式。',
            },
          ],
        },
        {
          id: 'en-a2-u7-l3',
          type: 'listening',
          title: '听力训练：节日故事',
          goal: '听懂节日经历的描述',
          durationMin: 11,
          listening: [
            {
              transcript: 'A: How was your holiday? B: Great! We had a big party at home.',
              translation: 'A：假期过得怎么样？B：很棒！我们在家办了场大派对。',
            },
            {
              transcript: 'A: Did you watch the fireworks? B: Yes, they were beautiful.',
              translation: 'A：你看烟花了吗？B：看了，很漂亮。',
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
