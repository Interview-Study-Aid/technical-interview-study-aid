// Questions

// Should render individual questions filtered based on the category chosen
//    Each question should be clickable/selectable to open a details view modal (https://react-bootstrap.github.io/components/modal/)

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function parseQuestion(data){
  console.log('Data:', data);
  let target = data.questionAnswer;
  let parsedData = JSON.parse(target);
  return parsedData;
}

// let parsedData = JSON.parse(response.data[0].questionAnswer);
    // console.log('Parsed Question:', parsedData.question);

const Questions = ({ questions }) => {


  return (
    <>
      <h2>Questions Component</h2>
      <ul>
        {questions.map(eachQuestion => {
          return (
          <li key={eachQuestion.id} onClick={() => console.log('Clicked this Question:', eachQuestion)}>{parseQuestion(eachQuestion).question}</li>
          )
        })}
      </ul>
    </>
  );
};

const mapStateToProps = state => {
  return {
    questions: state.questions.questions,
  }
}

export default connect(mapStateToProps)(Questions);
