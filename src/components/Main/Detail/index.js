// Detail View - Modal

// View should display the question in full, as well as:
//    -Answers (hidden/toggle option to display)
//    -Notes *if user is logged in* (hidden/toggle option to display)
//      - Notes should be an editable field and include a save/update button to update persistent data
//      - Cancel button should revert to last save upon closing (disregarding any edits).

import React, { Children, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeQuestion } from '../../../store/questions';

function parseQuestion(data){
  let target = data.questionAnswer;
  let parsedData = JSON.parse(target);
  console.log('Parsed Data:', parsedData);
  return parsedData;
}

const Detail = ({ showModal, questionObject, closeQuestion }) => {

  const showHideClassName = showModal ? "modal display-block" : "modal display-none";

  const [hideAnswer, setHideAnswer] = useState(true);
  function toggleAnswer(){
    setHideAnswer(!hideAnswer);
  }

  const id = questionObject.id;
  const category = questionObject.category;
  const question = questionObject ? parseQuestion(questionObject).question : '';
  const answer = questionObject ? parseQuestion(questionObject).answer : '';


  return(
    <Modal 
    show={showModal} 
    onHide={closeQuestion} 
    className={showHideClassName}
    >
      <Modal.Header>
        <Modal.Title>{question}</Modal.Title>
      </Modal.Header>
      <section className="modal-main">
          {/* <br />
          {id}
          <br />
          {category}
          <br />
          {question} */}
          <button
          onClick={toggleAnswer}
          >View Answer</button>
          <br />
          {!hideAnswer && answer}
          <br />
        <button onClick={closeQuestion}>Close</button>
      </section>
    </Modal>

  ) 
};

const mapStateToProps = state => {
  return {
    questionObject: state.questions.activeQuestion,
    showModal: state.questions.showModal,
  };
};

const mapDispatchToProps = { closeQuestion };

export default connect(mapStateToProps, mapDispatchToProps)(Detail);