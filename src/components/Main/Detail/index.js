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
import { getAllNotesForUser } from '../../../store/user';
import Notes from '../Notes';

function parseQuestion(data) {
  let target = data.questionAnswer;
  let parsedData = JSON.parse(target);
  // console.log('Parsed Data:', parsedData);
  return parsedData;
}

const Detail = ({
  showModal,
  questionObject,
  closeQuestion,
  isLoggedIn,
  getAllNotesForUser,
  token,
}) => {
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
    getAllNotesForUser(token);
  }

  function closeAndReset() {
    closeQuestion();
    getAllNotesForUser(token);
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
    token: state.user.token,
  };
};

const mapDispatchToProps = { closeQuestion, getAllNotesForUser };

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
