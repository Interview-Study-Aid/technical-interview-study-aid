import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './questions.scss';
import { selectQuestion, closeQuestion } from '../../../store/questions';
import Detail from '../Detail';

function parseQuestion(data) {
  let target = data.questionAnswer;
  let parsedData = JSON.parse(target);
  return parsedData;
}

const Questions = ({
  questions,
  activeQuestion,
  activeCategory,
  selectQuestion,
  closeQuestion,
}) => {
  return (
    <>
      <h2 className="q_title">
        {activeCategory[0].category === undefined
          ? 'Please Select a Category'
          : `${activeCategory[0].category} Questions`}
      </h2>
      <ul className="q_ul" style={{ display: 'flex', flexDirection: 'row' }}>
        {questions.map(eachQuestion => {
          return (
            <Card
              className="eachQuestion"
              border="dark"
              style={{ width: '18rem' }}
              bg="info"
              key={eachQuestion.id}
            >
              <Card.Body>
                <Card.Title>{parseQuestion(eachQuestion).question}</Card.Title>
                <Button
                  className="viewDetailButton"
                  variant="light"
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
          );
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
  };
};

const mapDispatchToProps = { selectQuestion, closeQuestion };

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
