const questionTypes = {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
  INPUT_STRING: 'INPUT_STRING',
  INPUT_NUMBER: 'INPUT_NUMBER',
  SEQUENCE: 'SEQUENCE',
  CONFORMITY: 'CONFORMITY',
};

const questionTypesTitles = {
  [questionTypes.SINGLE]: 'Выбор одного правильного',
  [questionTypes.MULTIPLE]: 'Выбор нескольких правильных',
  [questionTypes.INPUT_NUMBER]: 'Ввод числа',
  [questionTypes.INPUT_STRING]: 'Ввод фразы',
  [questionTypes.SEQUENCE]: 'Установление последовательности',
  [questionTypes.CONFORMITY]: 'Установление соответствий',
};

const questionTypesLabels = {
  [questionTypes.SINGLE]: 'Выберите правильный вариант ответа',
  [questionTypes.MULTIPLE]: 'Выберите правильные варианты ответа',
  [questionTypes.INPUT_NUMBER]: 'Введите ответ',
  [questionTypes.INPUT_STRING]: 'Введите ответ',
  [questionTypes.SEQUENCE]: 'Введите варианты ответа в верном порядке, начиная с первого',
  [questionTypes.CONFORMITY]: 'Введите левую часть соответствия',
};

const allowedQuestionTypes = [
  questionTypes.SINGLE,
  questionTypes.MULTIPLE,
  questionTypes.INPUT_STRING,
  questionTypes.INPUT_NUMBER,
  questionTypes.SEQUENCE,
  questionTypes.CONFORMITY,
];

const QuestionConstants = {
  questionTypes,
  questionTypesTitles,
  allowedQuestionTypes,
  questionTypesLabels,
};

export default QuestionConstants;
