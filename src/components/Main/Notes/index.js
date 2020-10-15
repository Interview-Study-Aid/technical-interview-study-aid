import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { Col, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../Detail/detail.scss'

const Notes = ({ userToken, activeQuestion, userNotes }) => {
  // note.questionId, note.note
  const [noteText, setNoteText] = useState('');

  // if the userNotes state array contains/includes the active question id, we need to use that as the noteText state - else, blank
  if (userNotes) {
    let existingNote = userNotes.filter(
      note => note.questionId === activeQuestion.id
    );
    setNoteText(existingNote.note); // need to be like "existingNote.text" or "existingNote.note" - or something similar
  }

  // This will continually set the "noteText" state to be equal to the value of the input, and vice versa
  const handleNotesInput = e => {
    const { name, value } = e.target;
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
