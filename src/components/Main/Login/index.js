import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setLogin, setLogout, getAllNotesForUser } from '../../../store/user';

const LoginForm = ({ setLogin, setLogout, isLoggedIn, getAllNotesForUser }) => {
  const [values, setValues] = useState({});

  const handleSignup = e => {
    const url = `http://localhost:3000`;
    // const url = `https://isa-server-401.herokuapp.com`;
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
      .catch(err => console.log(err.message));
  };

  const handleSubmit = e => {
    const url = `http://localhost:3000`;
    // const url = `https://isa-server-401.herokuapp.com`;
    e.preventDefault();

    axios
      .get(`${url}/login`, {
        headers: {
          Authorization: `Bearer ${values.userName}:${values.userPassword}`,
        },
      })
      .then(data => {
        // console.log('Sign In Data', data.data);
        if (data.data.token) {
          localStorage.setItem('token', data.data.token);
          let loginData = data.data;
          setLogin(loginData);
          console.log('lof')
          getAllNotesForUser(loginData.token);
        }
      })
      .catch(err => console.log(err.message));
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

  if (!isLoggedIn) {
    return (
      <>
        <Form>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Username"
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
                  type="password"
                />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Button
                type="submit"
                className="mb-2"
                onClick={handleSubmit}
                variant="secondary"
              >
                Login
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                type="submit"
                className="mb-2"
                onClick={handleSignup}
                variant="outline-secondary"
              >
                Sign Up
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <Col xs="auto">
          <Button
            type="submit"
            className="mb-2"
            onClick={setLogout}
            variant="secondary"
          >
            Log Out
          </Button>
        </Col>
      </>
    );
  }
};

// };

const mapDispatchToProps = { setLogin, setLogout, getAllNotesForUser };

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.loggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
// export default LoginForm;
