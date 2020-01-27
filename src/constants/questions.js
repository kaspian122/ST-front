const questionTypes = {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
  INPUT_STRING: 'INPUT_STRING',
  INPUT_NUMBER: 'INPUT_NUMBER',
};

const questionTypesTitles = {
  [questionTypes.SINGLE]: 'Выбор варианта',
  [questionTypes.MULTIPLE]: 'Выбор нескольких вариантов',
  [questionTypes.INPUT_NUMBER]: 'Ввод числа',
  [questionTypes.INPUT_STRING]: 'Ввод текста',
};

const allowedQuestionTypes = [
  questionTypes.SINGLE,
  questionTypes.MULTIPLE,
  questionTypes.INPUT_STRING,
  questionTypes.INPUT_NUMBER,
];

const QuestionConstants = { questionTypes, questionTypesTitles, allowedQuestionTypes };

export default QuestionConstants;
