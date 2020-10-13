// Questions

// Should render individual questions filtered based on the category chosen
//    Each question should be clickable/selectable to open a details view modal (https://react-bootstrap.github.io/components/modal/)

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { selectQuestion, closeQuestion } from '../../../store/questions';
import Detail from '../Detail';

function parseQuestion(data){
  console.log('Data:', data);
  let target = data.questionAnswer;
  let parsedData = JSON.parse(target);
  return parsedData;
}

// let parsedData = JSON.parse(response.data[0].questionAnswer);
    // console.log('Parsed Question:', parsedData.question);

const Questions = ({ questions, activeQuestion, activeCategory, selectQuestion, closeQuestion }) => {
  // console.log('Test:', questions);
  return (
    <>
      <h2>{ activeCategory ? activeCategory[0].category : 'Test' } Questions Component</h2>
      <ul 
      style={{display: 'flex', flexDirection: 'row'}}
      >
        {questions.map(eachQuestion => {
          return (
          // <li key={eachQuestion.id} onClick={() => selectQuestion(eachQuestion)}>{parseQuestion(eachQuestion).question}</li>
          <Card 
          border="primary"
          style={{ width: '18rem'}}
          bg="danger"
          >
            <Card.Body>
              <Card.Title>{parseQuestion(eachQuestion).question}</Card.Title>
              <Button
                onClick={() => selectQuestion(eachQuestion)}
              >
              View Details
              </Button>
            </Card.Body>
            <Card.Footer>
              <small>
                Category: {activeCategory ? activeCategory[0].category : null}
              </small>
            </Card.Footer>
          </Card>
          )
        })}
      </ul>



      {activeQuestion ? <Detail /> : 'No active question'}
    </>
  );
};

const mapStateToProps = state => {
  return {
    questions: state.questions.questions,
    activeQuestion: state.questions.activeQuestion,
    showModal: state.questions.showModal,
    activeCategory: state.categories.activeCategory,
  }
}

const mapDispatchToProps = { selectQuestion, closeQuestion };

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
