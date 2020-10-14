import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import useForm from '../../../hooks/loginFormHook';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const LoginForm = props => {
  const {
    handleSubmit,
    handleInputChangeName,
    handleInputChangePassword,
  } = useForm(props.handleSubmit);

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
    // <Form onSubmit={handleSubmit}>
    //   <Card>
    //     <Form.Label>Login Form</Form.Label>
    //     <Form.Control
    //       type="text"
    //       name="text"
    //       placeholder="username"
    //       onChange={handleInputChange}
    //     />
    //     <Form.Control
    //       type="text"
    //       name="text"
    //       placeholder="password"
    //       onChange={handleInputChange}
    //     />

    //     <Button variant="primary" type="submit">Log In!</Button>
    //     <Button variant="primary" type="submit">Sign Up!</Button>
    //   </Card>
    // </Form>
  );
};

export default LoginForm;
