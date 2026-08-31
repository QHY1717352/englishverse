/**
 * 英语词汇库
 * - 高中核心词汇（约 4000 词的精选分组，覆盖高频）
 * - 大学英语四级（CET4）核心词汇
 * 每词含：音标、词性、释义、例句、例句翻译
 * 词汇按主题分组，供课程动态生成单元与课时。
 */

export interface VocabEntry {
  term: string;
  phonetic: string; // 音标
  pos: string; // 词性 n./v./adj./adv./prep. 等
  meaning: string; // 中文释义
  example: string; // 例句（英文）
  exampleMeaning: string; // 例句翻译
}

export interface VocabGroup {
  id: string;
  title: string; // 主题
  level: 'senior' | 'cet4'; // 高中 / 四级
  words: VocabEntry[];
}

// ============ 高中核心词汇 ============
export const SENIOR_VOCAB: VocabGroup[] = [
  {
    id: 'senior-daily',
    title: '日常生活',
    level: 'senior',
    words: [
      { term: 'achieve', phonetic: '/əˈtʃiːv/', pos: 'v.', meaning: '实现，达成', example: 'She achieved her goal of becoming a doctor.', exampleMeaning: '她实现了当医生的目标。' },
      { term: 'attempt', phonetic: '/əˈtempt/', pos: 'v./n.', meaning: '尝试，企图', example: 'He attempted to climb the mountain alone.', exampleMeaning: '他尝试独自攀登这座山。' },
      { term: 'behavior', phonetic: '/bɪˈheɪvjər/', pos: 'n.', meaning: '行为，举止', example: 'His good behavior was praised by the teacher.', exampleMeaning: '他的良好行为受到了老师的表扬。' },
      { term: 'consider', phonetic: '/kənˈsɪdər/', pos: 'v.', meaning: '考虑，认为', example: 'Please consider my suggestion carefully.', exampleMeaning: '请仔细考虑我的建议。' },
      { term: 'develop', phonetic: '/dɪˈveləp/', pos: 'v.', meaning: '发展，开发', example: 'We should develop good study habits.', exampleMeaning: '我们应该养成良好的学习习惯。' },
      { term: 'experience', phonetic: '/ɪkˈspɪriəns/', pos: 'n./v.', meaning: '经验，经历', example: 'Traveling gives you rich experience.', exampleMeaning: '旅行能给你丰富的经历。' },
      { term: 'improve', phonetic: '/ɪmˈpruːv/', pos: 'v.', meaning: '改善，提高', example: 'I want to improve my English speaking.', exampleMeaning: '我想提高我的英语口语。' },
      { term: 'manage', phonetic: '/ˈmænɪdʒ/', pos: 'v.', meaning: '管理，设法做到', example: 'She managed to finish the work on time.', exampleMeaning: '她设法按时完成了工作。' },
      { term: 'ordinary', phonetic: '/ˈɔːrdneri/', pos: 'adj.', meaning: '普通的，平凡的', example: 'It was just an ordinary day.', exampleMeaning: '那只是平凡的一天。' },
      { term: 'prepare', phonetic: '/prɪˈper/', pos: 'v.', meaning: '准备', example: 'I need to prepare for the exam.', exampleMeaning: '我需要为考试做准备。' },
      { term: 'realize', phonetic: '/ˈriːəlaɪz/', pos: 'v.', meaning: '意识到，实现', example: 'He realized his mistake too late.', exampleMeaning: '他意识到自己的错误时为时已晚。' },
      { term: 'successful', phonetic: '/səkˈsesfl/', pos: 'adj.', meaning: '成功的', example: 'She is a successful businesswoman.', exampleMeaning: '她是一位成功的女商人。' },
    ],
  },
  {
    id: 'senior-emotion',
    title: '情感与态度',
    level: 'senior',
    words: [
      { term: 'anxious', phonetic: '/ˈæŋkʃəs/', pos: 'adj.', meaning: '焦虑的，渴望的', example: 'She felt anxious about the interview.', exampleMeaning: '她对面试感到焦虑。' },
      { term: 'confident', phonetic: '/ˈkɑːnfɪdənt/', pos: 'adj.', meaning: '自信的', example: 'He is confident about passing the test.', exampleMeaning: '他对通过考试很有信心。' },
      { term: 'disappoint', phonetic: '/ˌdɪsəˈpɔɪnt/', pos: 'v.', meaning: '使失望', example: 'Don\'t disappoint your parents.', exampleMeaning: '不要让你的父母失望。' },
      { term: 'eager', phonetic: '/ˈiːɡər/', pos: 'adj.', meaning: '渴望的，急切的', example: 'The students were eager to learn.', exampleMeaning: '学生们渴望学习。' },
      { term: 'embarrass', phonetic: '/ɪmˈbærəs/', pos: 'v.', meaning: '使尴尬', example: 'His joke embarrassed everyone.', exampleMeaning: '他的玩笑让所有人尴尬。' },
      { term: 'grateful', phonetic: '/ˈɡreɪtfl/', pos: 'adj.', meaning: '感激的', example: 'I am grateful for your help.', exampleMeaning: '我很感激你的帮助。' },
      { term: 'lonely', phonetic: '/ˈloʊnli/', pos: 'adj.', meaning: '孤独的', example: 'He felt lonely in the new city.', exampleMeaning: '他在新城市感到孤独。' },
      { term: 'proud', phonetic: '/praʊd/', pos: 'adj.', meaning: '骄傲的，自豪的', example: 'I am proud of my daughter.', exampleMeaning: '我为女儿感到自豪。' },
      { term: 'regret', phonetic: '/rɪˈɡret/', pos: 'v./n.', meaning: '后悔，遗憾', example: 'I regret not studying harder.', exampleMeaning: '我后悔没有更努力学习。' },
      { term: 'upset', phonetic: '/ʌpˈset/', pos: 'adj.', meaning: '心烦的，难过的', example: 'She was upset by the bad news.', exampleMeaning: '她因坏消息而难过。' },
    ],
  },
  {
    id: 'senior-school',
    title: '学校与学习',
    level: 'senior',
    words: [
      { term: 'assignment', phonetic: '/əˈsaɪnmənt/', pos: 'n.', meaning: '作业，任务', example: 'The assignment is due tomorrow.', exampleMeaning: '作业明天截止。' },
      { term: 'concentrate', phonetic: '/ˈkɑːnsntreɪt/', pos: 'v.', meaning: '集中，专心', example: 'I can\'t concentrate in a noisy room.', exampleMeaning: '我在吵闹的房间里无法集中注意力。' },
      { term: 'knowledge', phonetic: '/ˈnɑːlɪdʒ/', pos: 'n.', meaning: '知识', example: 'Knowledge is power.', exampleMeaning: '知识就是力量。' },
      { term: 'method', phonetic: '/ˈmeθəd/', pos: 'n.', meaning: '方法', example: 'We need a new teaching method.', exampleMeaning: '我们需要一种新的教学方法。' },
      { term: 'progress', phonetic: '/ˈprɑːɡres/', pos: 'n./v.', meaning: '进步，进展', example: 'You have made great progress.', exampleMeaning: '你取得了很大进步。' },
      { term: 'schedule', phonetic: '/ˈskedʒuːl/', pos: 'n./v.', meaning: '日程，安排', example: 'My schedule is full today.', exampleMeaning: '我今天日程排满了。' },
      { term: 'subject', phonetic: '/ˈsʌbdʒɪkt/', pos: 'n.', meaning: '科目，主题', example: 'Math is my favorite subject.', exampleMeaning: '数学是我最喜欢的科目。' },
      { term: 'graduate', phonetic: '/ˈɡrædʒueɪt/', pos: 'v./n.', meaning: '毕业，毕业生', example: 'She graduated from Beijing University.', exampleMeaning: '她毕业于北京大学。' },
      { term: 'examine', phonetic: '/ɪɡˈzæmɪn/', pos: 'v.', meaning: '检查，考试', example: 'The doctor examined the patient.', exampleMeaning: '医生检查了病人。' },
      { term: 'educate', phonetic: '/ˈedʒukeɪt/', pos: 'v.', meaning: '教育', example: 'We must educate children about safety.', exampleMeaning: '我们必须教育孩子注意安全。' },
    ],
  },
  {
    id: 'senior-nature',
    title: '自然与环境',
    level: 'senior',
    words: [
      { term: 'atmosphere', phonetic: '/ˈætməsfɪr/', pos: 'n.', meaning: '大气，气氛', example: 'The atmosphere of the party was warm.', exampleMeaning: '聚会的气氛很温馨。' },
      { term: 'climate', phonetic: '/ˈklaɪmət/', pos: 'n.', meaning: '气候', example: 'The climate here is mild.', exampleMeaning: '这里的气候温和。' },
      { term: 'destroy', phonetic: '/dɪˈstrɔɪ/', pos: 'v.', meaning: '破坏，毁灭', example: 'The storm destroyed many houses.', exampleMeaning: '风暴摧毁了许多房屋。' },
      { term: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', pos: 'n.', meaning: '环境', example: 'We should protect the environment.', exampleMeaning: '我们应该保护环境。' },
      { term: 'pollute', phonetic: '/pəˈluːt/', pos: 'v.', meaning: '污染', example: 'Factories pollute the river.', exampleMeaning: '工厂污染了河流。' },
      { term: 'resource', phonetic: '/ˈriːsɔːrs/', pos: 'n.', meaning: '资源', example: 'Water is a precious resource.', exampleMeaning: '水是珍贵的资源。' },
      { term: 'surface', phonetic: '/ˈsɜːrfɪs/', pos: 'n.', meaning: '表面', example: 'The surface of the lake was calm.', exampleMeaning: '湖面很平静。' },
      { term: 'survive', phonetic: '/sərˈvaɪv/', pos: 'v.', meaning: '幸存，存活', example: 'Only three people survived the crash.', exampleMeaning: '只有三人在坠机中幸存。' },
      { term: 'temperature', phonetic: '/ˈtemprətʃər/', pos: 'n.', meaning: '温度', example: 'The temperature dropped to zero.', exampleMeaning: '气温降到了零度。' },
      { term: 'wildlife', phonetic: '/ˈwaɪldlaɪf/', pos: 'n.', meaning: '野生生物', example: 'We should protect wildlife.', exampleMeaning: '我们应该保护野生生物。' },
    ],
  },
  {
    id: 'senior-society',
    title: '社会与文化',
    level: 'senior',
    words: [
      { term: 'ancient', phonetic: '/ˈeɪnʃənt/', pos: 'adj.', meaning: '古代的，古老的', example: 'They visited an ancient temple.', exampleMeaning: '他们参观了一座古老的寺庙。' },
      { term: 'ceremony', phonetic: '/ˈserəməni/', pos: 'n.', meaning: '仪式，典礼', example: 'The wedding ceremony was beautiful.', exampleMeaning: '婚礼仪式很美。' },
      { term: 'communicate', phonetic: '/kəˈmjuːnɪkeɪt/', pos: 'v.', meaning: '交流，沟通', example: 'We communicate by email.', exampleMeaning: '我们通过电子邮件交流。' },
      { term: 'culture', phonetic: '/ˈkʌltʃər/', pos: 'n.', meaning: '文化', example: 'Chinese culture has a long history.', exampleMeaning: '中国文化历史悠久。' },
      { term: 'foreign', phonetic: '/ˈfɔːrən/', pos: 'adj.', meaning: '外国的', example: 'He speaks several foreign languages.', exampleMeaning: '他会说几种外语。' },
      { term: 'generation', phonetic: '/ˌdʒenəˈreɪʃn/', pos: 'n.', meaning: '一代人', example: 'The younger generation loves technology.', exampleMeaning: '年轻一代热爱科技。' },
      { term: 'traditional', phonetic: '/trəˈdɪʃənl/', pos: 'adj.', meaning: '传统的', example: 'Dumplings are a traditional Chinese food.', exampleMeaning: '饺子是中国的传统食物。' },
      { term: 'respect', phonetic: '/rɪˈspekt/', pos: 'v./n.', meaning: '尊重', example: 'We should respect our parents.', exampleMeaning: '我们应该尊重父母。' },
      { term: 'society', phonetic: '/səˈsaɪəti/', pos: 'n.', meaning: '社会', example: 'Everyone plays a role in society.', exampleMeaning: '每个人在社会中都扮演一个角色。' },
      { term: 'population', phonetic: '/ˌpɑːpjuˈleɪʃn/', pos: 'n.', meaning: '人口', example: 'The population of the city is growing.', exampleMeaning: '这座城市的人口在增长。' },
    ],
  },
];

// ============ 大学英语四级 CET4 词汇 ============
export const CET4_VOCAB: VocabGroup[] = [
  {
    id: 'cet4-abstract',
    title: '抽象概念',
    level: 'cet4',
    words: [
      { term: 'abstract', phonetic: '/ˈæbstrækt/', pos: 'adj./n.', meaning: '抽象的，摘要', example: 'Love and beauty are abstract concepts.', exampleMeaning: '爱与美是抽象的概念。' },
      { term: 'concept', phonetic: '/ˈkɑːnsept/', pos: 'n.', meaning: '概念', example: 'I don\'t understand this concept.', exampleMeaning: '我不理解这个概念。' },
      { term: 'conclusion', phonetic: '/kənˈkluːʒn/', pos: 'n.', meaning: '结论', example: 'We reached the same conclusion.', exampleMeaning: '我们得出了相同的结论。' },
      { term: 'evidence', phonetic: '/ˈevɪdəns/', pos: 'n.', meaning: '证据', example: 'There is no evidence to support the claim.', exampleMeaning: '没有证据支持这一说法。' },
      { term: 'factor', phonetic: '/ˈfæktər/', pos: 'n.', meaning: '因素', example: 'Weather is a key factor in farming.', exampleMeaning: '天气是农业的关键因素。' },
      { term: 'principle', phonetic: '/ˈprɪnsəpl/', pos: 'n.', meaning: '原则，原理', example: 'He sticks to his principles.', exampleMeaning: '他坚持自己的原则。' },
      { term: 'theory', phonetic: '/ˈθiːəri/', pos: 'n.', meaning: '理论', example: 'In theory, the plan should work.', exampleMeaning: '理论上，这个计划应该行得通。' },
      { term: 'viewpoint', phonetic: '/ˈvjuːpɔɪnt/', pos: 'n.', meaning: '观点', example: 'I respect your viewpoint.', exampleMeaning: '我尊重你的观点。' },
      { term: 'assumption', phonetic: '/əˈsʌmpʃn/', pos: 'n.', meaning: '假设，假定', example: 'His assumption turned out to be wrong.', exampleMeaning: '他的假设结果是错的。' },
      { term: 'definition', phonetic: '/ˌdefɪˈnɪʃn/', pos: 'n.', meaning: '定义', example: 'Give me the definition of this word.', exampleMeaning: '给我这个词的定义。' },
    ],
  },
  {
    id: 'cet4-business',
    title: '商业与经济',
    level: 'cet4',
    words: [
      { term: 'account', phonetic: '/əˈkaʊnt/', pos: 'n./v.', meaning: '账户，解释', example: 'I opened a bank account yesterday.', exampleMeaning: '我昨天开了一个银行账户。' },
      { term: 'benefit', phonetic: '/ˈbenɪfɪt/', pos: 'n./v.', meaning: '利益，受益', example: 'Exercise benefits your health.', exampleMeaning: '运动有益于你的健康。' },
      { term: 'budget', phonetic: '/ˈbʌdʒɪt/', pos: 'n./v.', meaning: '预算', example: 'We must stick to our budget.', exampleMeaning: '我们必须遵守预算。' },
      { term: 'compete', phonetic: '/kəmˈpiːt/', pos: 'v.', meaning: '竞争', example: 'They compete for the championship.', exampleMeaning: '他们为冠军而竞争。' },
      { term: 'consume', phonetic: '/kənˈsuːm/', pos: 'v.', meaning: '消费，消耗', example: 'Americans consume a lot of coffee.', exampleMeaning: '美国人消费大量咖啡。' },
      { term: 'economy', phonetic: '/ɪˈkɑːnəmi/', pos: 'n.', meaning: '经济', example: 'The economy is improving slowly.', exampleMeaning: '经济正在缓慢好转。' },
      { term: 'invest', phonetic: '/ɪnˈvest/', pos: 'v.', meaning: '投资', example: 'He invested all his money in stocks.', exampleMeaning: '他把所有的钱投资在股票上。' },
      { term: 'profit', phonetic: '/ˈprɑːfɪt/', pos: 'n.', meaning: '利润，益处', example: 'The company made a huge profit.', exampleMeaning: '公司获得了巨额利润。' },
      { term: 'purchase', phonetic: '/ˈpɜːrtʃəs/', pos: 'v./n.', meaning: '购买', example: 'She purchased a new car.', exampleMeaning: '她买了一辆新车。' },
      { term: 'trade', phonetic: '/treɪd/', pos: 'n./v.', meaning: '贸易，交易', example: 'International trade is growing fast.', exampleMeaning: '国际贸易增长迅速。' },
    ],
  },
  {
    id: 'cet4-verb',
    title: '高频动词',
    level: 'cet4',
    words: [
      { term: 'absorb', phonetic: '/əbˈzɔːrb/', pos: 'v.', meaning: '吸收，吸引', example: 'Plants absorb sunlight for energy.', exampleMeaning: '植物吸收阳光获取能量。' },
      { term: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', pos: 'v.', meaning: '积累', example: 'He accumulated a lot of experience.', exampleMeaning: '他积累了很多经验。' },
      { term: 'adapt', phonetic: '/əˈdæpt/', pos: 'v.', meaning: '适应，改编', example: 'She adapted quickly to the new environment.', exampleMeaning: '她很快适应了新环境。' },
      { term: 'adopt', phonetic: '/əˈdɑːpt/', pos: 'v.', meaning: '采纳，收养', example: 'We adopted a new teaching method.', exampleMeaning: '我们采纳了新的教学方法。' },
      { term: 'analyze', phonetic: '/ˈænəlaɪz/', pos: 'v.', meaning: '分析', example: 'Scientists analyze the data carefully.', exampleMeaning: '科学家仔细分析数据。' },
      { term: 'appreciate', phonetic: '/əˈpriːʃieɪt/', pos: 'v.', meaning: '感激，欣赏', example: 'I really appreciate your kindness.', exampleMeaning: '我非常感激你的好意。' },
      { term: 'convince', phonetic: '/kənˈvɪns/', pos: 'v.', meaning: '说服，使确信', example: 'He convinced me to join the team.', exampleMeaning: '他说服我加入团队。' },
      { term: 'demonstrate', phonetic: '/ˈdemənstreɪt/', pos: 'v.', meaning: '证明，演示', example: 'The experiment demonstrates the theory.', exampleMeaning: '实验证明了这一理论。' },
      { term: 'evaluate', phonetic: '/ɪˈvæljueɪt/', pos: 'v.', meaning: '评估', example: 'We need to evaluate the results.', exampleMeaning: '我们需要评估结果。' },
      { term: 'guarantee', phonetic: '/ˌɡærənˈtiː/', pos: 'v./n.', meaning: '保证', example: 'I guarantee you will love it.', exampleMeaning: '我保证你会喜欢它。' },
      { term: 'indicate', phonetic: '/ˈɪndɪkeɪt/', pos: 'v.', meaning: '表明，指示', example: 'The arrow indicates the direction.', exampleMeaning: '箭头指示方向。' },
      { term: 'influence', phonetic: '/ˈɪnfluəns/', pos: 'n./v.', meaning: '影响', example: 'Parents influence their children deeply.', exampleMeaning: '父母深深地影响他们的孩子。' },
    ],
  },
  {
    id: 'cet4-adj',
    title: '高频形容词',
    level: 'cet4',
    words: [
      { term: 'adequate', phonetic: '/ˈædɪkwət/', pos: 'adj.', meaning: '充足的，足够的', example: 'We have adequate food for the trip.', exampleMeaning: '我们有足够的食物供旅行用。' },
      { term: 'available', phonetic: '/əˈveɪləbl/', pos: 'adj.', meaning: '可获得的，可用的', example: 'This book is available online.', exampleMeaning: '这本书可以在网上获得。' },
      { term: 'complex', phonetic: '/kəmˈpleks/', pos: 'adj.', meaning: '复杂的', example: 'This is a complex problem.', exampleMeaning: '这是一个复杂的问题。' },
      { term: 'crucial', phonetic: '/ˈkruːʃl/', pos: 'adj.', meaning: '至关重要的', example: 'Sleep is crucial for health.', exampleMeaning: '睡眠对健康至关重要。' },
      { term: 'efficient', phonetic: '/ɪˈfɪʃnt/', pos: 'adj.', meaning: '高效的', example: 'She is an efficient worker.', exampleMeaning: '她是一位高效的员工。' },
      { term: 'essential', phonetic: '/ɪˈsenʃl/', pos: 'adj.', meaning: '必要的，本质的', example: 'Water is essential to life.', exampleMeaning: '水是生命所必需的。' },
      { term: 'flexible', phonetic: '/ˈfleksəbl/', pos: 'adj.', meaning: '灵活的', example: 'My schedule is quite flexible.', exampleMeaning: '我的日程很灵活。' },
      { term: 'genuine', phonetic: '/ˈdʒenjuɪn/', pos: 'adj.', meaning: '真正的，真诚的', example: 'She showed genuine concern.', exampleMeaning: '她表现出了真诚的关心。' },
      { term: 'obvious', phonetic: '/ˈɑːbviəs/', pos: 'adj.', meaning: '明显的', example: 'The answer is obvious to everyone.', exampleMeaning: '答案对每个人来说都很明显。' },
      { term: 'relevant', phonetic: '/ˈreləvənt/', pos: 'adj.', meaning: '相关的', example: 'This information is not relevant.', exampleMeaning: '这条信息不相关。' },
      { term: 'sufficient', phonetic: '/səˈfɪʃnt/', pos: 'adj.', meaning: '足够的', example: 'We have sufficient time to finish.', exampleMeaning: '我们有足够的时间完成。' },
      { term: 'valid', phonetic: '/ˈvælɪd/', pos: 'adj.', meaning: '有效的', example: 'This ticket is valid for three days.', exampleMeaning: '这张票三天内有效。' },
    ],
  },
  {
    id: 'cet4-academic',
    title: '学术与科技',
    level: 'cet4',
    words: [
      { term: 'approach', phonetic: '/əˈproʊtʃ/', pos: 'n./v.', meaning: '方法，接近', example: 'We need a new approach to the problem.', exampleMeaning: '我们需要用新方法解决这个问题。' },
      { term: 'conduct', phonetic: '/kənˈdʌkt/', pos: 'v./n.', meaning: '进行，行为', example: 'They conducted a survey of students.', exampleMeaning: '他们对学生进行了一项调查。' },
      { term: 'data', phonetic: '/ˈdeɪtə/', pos: 'n.', meaning: '数据', example: 'The data supports our hypothesis.', exampleMeaning: '数据支持我们的假设。' },
      { term: 'device', phonetic: '/dɪˈvaɪs/', pos: 'n.', meaning: '设备，装置', example: 'This device can save lives.', exampleMeaning: '这个装置能拯救生命。' },
      { term: 'experiment', phonetic: '/ɪkˈsperɪmənt/', pos: 'n./v.', meaning: '实验', example: 'The experiment was a success.', exampleMeaning: '实验成功了。' },
      { term: 'function', phonetic: '/ˈfʌŋkʃn/', pos: 'n./v.', meaning: '功能，起作用', example: 'What is the function of this button?', exampleMeaning: '这个按钮的功能是什么？' },
      { term: 'process', phonetic: '/ˈprɑːses/', pos: 'n./v.', meaning: '过程，处理', example: 'Learning is a long process.', exampleMeaning: '学习是一个漫长的过程。' },
      { term: 'research', phonetic: '/rɪˈsɜːrtʃ/', pos: 'n./v.', meaning: '研究', example: 'He is doing research on cancer.', exampleMeaning: '他在做癌症研究。' },
      { term: 'strategy', phonetic: '/ˈstrætədʒi/', pos: 'n.', meaning: '策略', example: 'We need a better marketing strategy.', exampleMeaning: '我们需要更好的营销策略。' },
      { term: 'technology', phonetic: '/tekˈnɑːlədʒi/', pos: 'n.', meaning: '技术', example: 'Technology changes our lives.', exampleMeaning: '技术改变了我们的生活。' },
    ],
  },
  {
    id: 'cet4-social',
    title: '社会现象',
    level: 'cet4',
    words: [
      { term: 'phenomenon', phonetic: '/fəˈnɑːmɪnən/', pos: 'n.', meaning: '现象', example: 'This is a common social phenomenon.', exampleMeaning: '这是一种常见的社会现象。' },
      { term: 'individual', phonetic: '/ˌɪndɪˈvɪdʒuəl/', pos: 'n./adj.', meaning: '个人，个别的', example: 'Each individual is unique.', exampleMeaning: '每个人都是独特的。' },
      { term: 'participate', phonetic: '/pɑːrˈtɪsɪpeɪt/', pos: 'v.', meaning: '参与', example: 'Many students participated in the event.', exampleMeaning: '许多学生参与了这项活动。' },
      { term: 'attitude', phonetic: '/ˈætɪtuːd/', pos: 'n.', meaning: '态度', example: 'Her attitude towards work is positive.', exampleMeaning: '她对工作的态度很积极。' },
      { term: 'behavior', phonetic: '/bɪˈheɪvjər/', pos: 'n.', meaning: '行为', example: 'His behavior surprised everyone.', exampleMeaning: '他的行为让所有人惊讶。' },
      { term: 'opportunity', phonetic: '/ˌɑːpərˈtuːnəti/', pos: 'n.', meaning: '机会', example: 'This is a great opportunity for you.', exampleMeaning: '这对你是个好机会。' },
      { term: 'challenge', phonetic: '/ˈtʃælɪndʒ/', pos: 'n./v.', meaning: '挑战', example: 'Life is full of challenges.', exampleMeaning: '生活充满挑战。' },
      { term: 'responsibility', phonetic: '/rɪˌspɑːnsəˈbɪləti/', pos: 'n.', meaning: '责任', example: 'Parents have a responsibility to their children.', exampleMeaning: '父母对孩子负有责任。' },
      { term: 'consequence', phonetic: '/ˈkɑːnsəkwens/', pos: 'n.', meaning: '后果', example: 'You must face the consequences.', exampleMeaning: '你必须承担后果。' },
      { term: 'awareness', phonetic: '/əˈwernəs/', pos: 'n.', meaning: '意识', example: 'We should raise environmental awareness.', exampleMeaning: '我们应该提高环保意识。' },
    ],
  },
];

/** 全部词汇分组（高中 + 四级） */
export const ALL_VOCAB_GROUPS: VocabGroup[] = [...SENIOR_VOCAB, ...CET4_VOCAB];

/** 按等级获取词汇组 */
export function getVocabByLevel(level: 'senior' | 'cet4'): VocabGroup[] {
  return ALL_VOCAB_GROUPS.filter((g) => g.level === level);
}
