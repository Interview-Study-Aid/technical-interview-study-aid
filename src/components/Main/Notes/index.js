import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { Col, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

const Notes = ({ userToken, activeQuestion, userNotes }) => {
  const [noteText, setNoteText] = useState('');
  const prevText = useRef('');

  // Will check all existing notes (if any) to see if any match the current question id, and will pre-populate the notes form field if so
  useEffect(() => {
    let existingNote = userNotes.filter(
      note => note.questionId === activeQuestion.id
    );

    console.log('MY SOON-TO-BE NOTE TEXT: ', existingNote);

    if (existingNote.length > 0) {
      prevText.current = existingNote[0].note;
      // setNoteText(myNoteText); // getting infinite re-render here
      console.log('TEXT???', prevText.current);
      setNoteText(prevText.current);
    }
  }, []);

  const handleNotesInput = e => {
    const { value } = e.target;
    e.persist();
    setNoteText(value);
  };

  const saveNote = async (noteText, activeQuestion) => {
    // const url = `https://isa-server-401.herokuapp.com`;
    const url = `http://localhost:3000`;

    console.log('ACTIVE QUESTION TO SAVE NOTE TO: ', activeQuestion);

    const rawNotes = { questionId: activeQuestion.id, note: noteText };
    const notes = JSON.stringify(rawNotes);
    const jwt = userToken;

    console.log('NOTES TO SEND TO /addNote ROUTE:', notes, jwt);

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
        <Form.Control
          type="textarea"
          placeholder="This is your personal notepad!"
          value={noteText}
          name="notes"
          onChange={handleNotesInput}
        ></Form.Control>
      </Form>
      <Button variant="info" onClick={() => saveNote(noteText, activeQuestion)}>
        Make Me Save the Notes
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
