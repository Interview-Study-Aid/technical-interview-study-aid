import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import useForm from '../../../hooks/loginFormHook';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const LoginForm = props => {
  const { handleSubmit, handleInputChange } = useForm(props.handleSubmit);

  const [username, setUsername] = useState('');

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row className="align-items-center">
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" srOnly>
            Name
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            name="username"
            placeholder="username"
            onChange={handleInputChange}
          />
        </Col>
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInputGroup" srOnly>
            Username
          </Form.Label>
          <InputGroup className="mb-2">
            <FormControl
              id="inlineFormInputGroup"
              name="password"
              placeholder="password"
              onChange={handleInputChange}
            />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2">
            Login
          </Button>
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2">
            SignUp
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default LoginForm;
