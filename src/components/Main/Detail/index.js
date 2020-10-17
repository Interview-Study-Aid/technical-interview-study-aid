import React, { Children, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { closeQuestion } from '../../../store/questions';
import { getAllNotesForUser } from '../../../store/user';
import Notes from '../Notes';
import './detail.scss';

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
    setHideNotes(true);
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
          <Modal.Title className="m_title">{question}</Modal.Title>
        </Modal.Header>
        <section className="modal-main">
          <Button
            onClick={toggleAnswer}
            className="m_a_button"
            variant="outline-secondary"
          >
            {!hideAnswer ? 'Hide Answer' : 'View Answer'}
          </Button>
          <br />
          <p className="answer">{!hideAnswer && answer}</p>
          <br />
          <Button
            onClick={toggleNotes}
            className="m_n_button"
            variant="outline-info"
          >
            {!hideNotes ? 'Hide Notes' : 'View Notes'}
          </Button>
          <br />
          <p className="notes">{!hideNotes && <Notes />}</p>
          <br />
          {/* <button onClick={closeAndReset}>Close</button> */}
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
          <Modal.Title className="m_title">{question}</Modal.Title>
        </Modal.Header>
        <section className="modal-main">
          <Button
            onClick={toggleAnswer}
            variant="outline-secondary"
            className="m_a_button"
          >
            {!hideAnswer ? 'Hide Answer' : 'View Answer'}
          </Button>
          <br />
          <p className="answer">{!hideAnswer && answer}</p>
          <br />
          {/* <button onClick={closeAndReset}>Close</button> */}
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
