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
import Notes from '../Notes';

function parseQuestion(data) {
  let target = data.questionAnswer;
  let parsedData = JSON.parse(target);
  // console.log('Parsed Data:', parsedData);
  return parsedData;
}

// questionObject = activeQuestion
// will need activeQuestion.id to get the appropriate Notes
// activeQuestion.notes - assuming they match with the user?
// Do a check for the notes to see if they exist, and check the user?

const Detail = ({ showModal, questionObject, closeQuestion, isLoggedIn }) => {
  const showHideClassName = showModal
    ? 'modal display-block'
    : 'modal display-none';

  const [hideAnswer, setHideAnswer] = useState(true);
  const [hideNotes, setHideNotes] = useState(true);

  function toggleAnswer() {
    setHideAnswer(!hideAnswer);
  }

  function toggleNotes() {
    setHideNotes(!hideNotes);
  }

  function closeAndReset() {
    closeQuestion();
    setHideAnswer(true);
  }

  const id = questionObject.id;
  const category = questionObject.category;
  const question = questionObject ? parseQuestion(questionObject).question : '';
  const answer = questionObject ? parseQuestion(questionObject).answer : '';

  if (isLoggedIn) {
    return (
      <Modal
        show={showModal}
        onHide={closeAndReset}
        className={showHideClassName}
      >
        <Modal.Header>
          <Modal.Title>{question}</Modal.Title>
        </Modal.Header>
        <section className="modal-main">
          <button onClick={toggleAnswer}>View Answer</button>
          <br />
          {!hideAnswer && answer}
          <br />
          <button onClick={toggleNotes}>View Notes</button>
          <br />
          {!hideNotes && <Notes />}
          <br />
          <button onClick={closeAndReset}>Close</button>
        </section>
      </Modal>
    );
  } else {
    return (
      <Modal
        show={showModal}
        onHide={closeAndReset}
        className={showHideClassName}
      >
        <Modal.Header>
          <Modal.Title>{question}</Modal.Title>
        </Modal.Header>
        <section className="modal-main">
          <button onClick={toggleAnswer}>View Answer</button>
          <br />
          {!hideAnswer && answer}
          <br />
          <button onClick={closeAndReset}>Close</button>
        </section>
      </Modal>
    );
  }
};

const mapStateToProps = state => {
  return {
    questionObject: state.questions.activeQuestion,
    showModal: state.questions.showModal,
    isLoggedIn: state.user.loggedIn,
  };
};

const mapDispatchToProps = { closeQuestion };

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
