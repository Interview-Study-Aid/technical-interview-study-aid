import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { Col, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

const Notes = ({ isLoggedIn, username, userToken, id }) => {
  // Will probably need to just take in TEXT as props

  const [noteText, setNoteText] = useState('');

  // This will continually set the "noteText" state to be equal to the value of the input, and vice versa
  const handleNotesInput = e => {
    const { name, value } = e.target;
    e.persist();
    setNoteText(value);
  };

  // How do we SEND something to the back end?

  const saveNote = async (noteText, id) => {
    // const url = `https://isa-server-401.herokuapp.com`;
    const url = `http://localhost:3000`;

    console.log('QUESTION ID COMIN IN HOT', id);

    const note = { questionID: id, text: noteText };

    console.log('NOTE OBJECT???', note);

    const data = {
      jwt: userToken,
      note,
    };

    console.log('NOTE DATA OBJECT TO SEND??', data);

    const response = await axios.post(`${url}/addNote`, data);

    console.log('RES???', response);
  };

  // const saveNote = async (noteText, id) => {
  //   // const url = `https://isa-server-401.herokuapp.com`;
  //   const url = `http://localhost:3000`;
  //   const note = { questionID: id, text: noteText };

  //   axios({
  //     method: 'post',
  //     url: `${url}/addNote`,
  //     data: {
  //       jwt: userToken,
  //       note,
  //     },
  //   }).then(data => console.log('NOTE RESPONSE FROM SERVER:', data));

  //   // const data = {
  //   //   jwt: userToken,
  //   //   note,
  //   // };

  //   // console.log('NOTE DATA OBJECT TO SEND??', data);

  //   // const response = await axios.post(`${url}/addNote`, data);

  //   // console.log('RES???', response);
  // };

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
      <Button variant="info" onClick={() => saveNote(noteText, id)}>
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
    id: state.questions.activeQuestion.id,
  };
};

export default connect(mapStateToProps)(Notes);
