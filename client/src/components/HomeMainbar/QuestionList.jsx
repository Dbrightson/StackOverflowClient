import React from "react";
import Questions from './Questions'

const QuestionList = ({questionsList}) => {
  return (
    <>
        {
            questionsList.map((question) => (
                <Questions question={question} key={question} />
            ))
        }
    </>
  );
};

export default QuestionList;
