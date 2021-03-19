import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import '../Detail/detail.scss';

const Notes = ({ userToken, activeQuestion, userNotes }) => {
  const [noteText, setNoteText] = useState('');
  const prevText = useRef('');

  // Will check all existing notes (if any) to see if any match the current question id, and will pre-populate the notes form field if so
  useEffect(() => {
    let existingNote = userNotes.filter(
      note => note.questionId === activeQuestion.id
    );

    if (existingNote.length > 0) {
      prevText.current = existingNote[0].note;
      setNoteText(prevText.current);
    }
  }, []);

  const handleNotesInput = e => {
    const { value } = e.target;
    e.persist();
    setNoteText(value);
  };

  const saveNote = async (noteText, activeQuestion) => {
    const url = `https://isa-server-401.herokuapp.com`;
    const rawNotes = { questionId: activeQuestion.id, note: noteText };
    const notes = JSON.stringify(rawNotes);
    const jwt = userToken;

    axios({
      method: 'post',
      url: `${url}/addNote`,
      data: {
        jwt,
        notes,
      },
    }).then(data => console.log('NOTE RESPONSE FROM SERVER: ', data));
  };

  return (
    <>
      <Form>
        {/* <Form.Control */}
        <textarea
          type="textarea"
          placeholder="This is your personal notepad!"
          value={noteText}
          name="notes"
          rows="5"
          cols="50"
          onChange={handleNotesInput}
        ></textarea>
        {/* ></Form.Control> */}
      </Form>
      <Button
        variant="info"
        className="n_button"
        onClick={() => saveNote(noteText, activeQuestion)}
      >
        Save Notes
      </Button>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.loggedIn,
    username: state.user.userName,
    userToken: state.user.token,
    activeQuestion: state.questions.activeQuestion,
    userNotes: state.user.userNotes,
  };
};

export default connect(mapStateToProps)(Notes);
