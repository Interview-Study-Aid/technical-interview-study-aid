import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { Col, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

const Notes = ({ isLoggedIn, username, userToken, questionObject }) => {
  // Will probably need to just take in TEXT as props

  const [noteText, setNoteText] = useState('');

  // This will continually set the "noteText" state to be equal to the value of the input, and vice versa
  const handleNotesInput = e => {
    const { name, value } = e.target;
    e.persist();
    setNoteText(value);
  };

  // How do we SEND something to the back end?

  const saveNote = async (noteText, questionObject) => {
    const url = `https://isa-server-401.herokuapp.com`;

    const note = { questionID: questionObject.id, text: noteText };

    console.log('NOTE OBJECT???', note);

    const data = {
      userToken,
      note,
    };

    console.log('NOTE DATA OBJECT TO SEND??', data);

    const res = await axios.post(`${url}/addNote`, data);

    console.log('RES???', res);

    // axios.post({
    //   method: 'POST'.
    //   url: `${url}/addNote`,
    //   data: req
    // })
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
      <Button variant="info" onClick={saveNote}>
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
  };
};

export default connect(mapStateToProps)(Notes);
