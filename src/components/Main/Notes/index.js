import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { Col, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

const Notes = ({ userToken, activeQuestion, userNotes }) => {
  // if the userNotes state array contains/includes the active question id, we need to use that as the noteText state - else, blank

  // conditionally setting state with React?
  // What is the shape of activeQuestion? Does it have "notes"?
  // match activeQuestion with userNotes

  // note.questionId, note.note

  const [noteText, setNoteText] = useState('');
  if (userNotes.includes(activeQuestion.id)) {
    setNoteText(userNotes.text);
    // We need to know this exact shape
  }

  // This will continually set the "noteText" state to be equal to the value of the input, and vice versa
  const handleNotesInput = e => {
    const { name, value } = e.target;
    e.persist();
    setNoteText(value);
  };

  // How do we SEND something to the back end?

  // const saveNote = async (noteText, id) => {
  //   // const url = `https://isa-server-401.herokuapp.com`;
  //   const url = `http://localhost:3000`;

  //   console.log('QUESTION ID COMIN IN HOT', id);

  //   const note = { questionID: id, text: noteText };

  //   console.log('NOTE OBJECT???', note);

  //   const data = {
  //     jwt: userToken,
  //     note,
  //   };

  //   console.log('NOTE DATA OBJECT TO SEND??', data);

  //   try {
  //     const response = await axios.post(`${url}/addNote`, data);
  //   } catch (err) {
  //     console.log(err.message);
  //   }

  //   // console.log('RES???', response);
  // };

  const saveNote = async (noteText, activeQuestion) => {
    // const url = `https://isa-server-401.herokuapp.com`;
    const url = `http://localhost:3000`;
    const note = { questionID: activeQuestion.id, text: noteText };

    axios({
      method: 'post',
      url: `${url}/addNote`,
      data: {
        jwt: userToken,
        note,
      },
    }).then(data => console.log('NOTE RESPONSE FROM SERVER:', data));

    // const data = {
    //   jwt: userToken,
    //   note,
    // };

    // console.log('NOTE DATA OBJECT TO SEND??', data);

    // const response = await axios.post(`${url}/addNote`, data);

    // console.log('RES???', response);
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
      <Button
        variant="info"
        onClick={() => saveNote(noteText, activeQuestion.id)}
      >
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
