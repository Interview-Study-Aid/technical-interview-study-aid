import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import useForm from '../../../hooks/loginFormHook';
import { connect } from 'react-redux';
import { setLogout } from '../../../store/user';

const LoginForm = props => {
  const {
    handleSubmit,
    handleSignup,
    handleInputChangeName,
    handleInputChangePassword,
  } = useForm(props.handleSubmit);

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

const mapStateToProps = state => {
  return {
    userName: state.user.userName,
  };
};

const mapDispatchToProps = { setLogout };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
