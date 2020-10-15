import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, InputGroup, FormControl } from 'react-bootstrap';

const Notes = (props) => {

  // Will probably need to just take in TEXT as props

  const [noteText, setNoteText] = useState('');

  // This will continually set the "noteText" state to be equal to the value of the input, and vice versa
  const handleNotesInput = e => {
    const { name, value } = e.target;
    e.persist();
    setNoteText(value);
  };

  // How do we SEND something to the back end?

  console.log('NOTES TEXT??', noteText);

  return (
    <>
      <Form>
        <Form.Control type="textarea" placeholder="This is your personal notepad!" value={noteText} name="notes" onChange={handleNotesInput}>
        </Form.Control>
      </Form>
      <Button>Make Me Save the Notes</Button>
    </>
  )
};

export default Notes;