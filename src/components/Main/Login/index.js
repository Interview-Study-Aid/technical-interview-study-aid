import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setLogin, setLogout } from '../../../store/user';

const LoginForm = props => {
  const [values, setValues] = useState({});

  const handleSignup = e => {
    // const url = `http://localhost:3000`;
    const url = `https://isa-server-401.herokuapp.com`;
    e.preventDefault();
    axios({
      method: 'post',
      url: `${url}/signup`,
      data: {
        userName: values.userName,
        userPassword: values.userPassword,
      },
    })
      .then(data => console.log(data))
      .then();
  };

  const handleSubmit = e => {
    // const url = `http://localhost:3000`;
    const url = `https://isa-server-401.herokuapp.com`;
    e.preventDefault();
    // console.log('Are we getting here?');
    axios
      .get(`${url}/login`, {
        headers: {
          Authorization: `Bearer ${values.userName}:${values.userPassword}`,
        },
      })
      .then(data => {
        console.log('Sign In Data', data.data);
        if (data.data.token) {
          localStorage.setItem('token', data.data.token);
          let loginData = data.data;
          setLogin(loginData);
        }
      })
      .catch(er => console.log(er.message));
  };

  const handleInputChangeName = e => {
    e.persist();
    // e.preventDefault();
    setValues(values => ({ ...values, userName: e.target.value }));
  };

  const handleInputChangePassword = e => {
    e.persist();
    setValues(values => ({ ...values, userPassword: e.target.value }));
  };

  return (
    <Form>
      <Form.Row className="align-items-center">
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" srOnly>
            Name
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="User Name"
            onChange={handleInputChangeName}
          />
        </Col>
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInputGroup" srOnly>
            Username
          </Form.Label>
          <InputGroup className="mb-2">
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Password"
              onChange={handleInputChangePassword}
            />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2" onClick={handleSubmit}>
            Login
          </Button>
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2" onClick={handleSignup}>
            SignUp
          </Button>
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2" onClick={setLogout}>
            Log Out
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default LoginForm;
