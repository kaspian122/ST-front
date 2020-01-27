import React from 'react';
import { Input } from 'antd';
import QuestionConstants from '../../../constants/questions';

const QuestionTypes = QuestionConstants.questionTypes;

function InputNumber() {
  return <div>s</div>;
}

function Answers({ onChange, type }) {
  switch (type) {
    case QuestionTypes.INPUT_NUMBER:
      return <Input />;
    default:
  }
  return <></>;
}

export default Answers;
