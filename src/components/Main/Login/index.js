import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useForm from '../../../hooks/loginFormHook';

const LoginForm = (props) => {
  const { handleSubmit, handleInputChange } = useForm(props.handleSubmit);
 
  return (
    <Form onSubmit={handleSubmit}>
      <Card>
        <Form.Label>Login Form</Form.Label>
        <Form.Control 
          type="text"
          name="text"
          placeholder="username"
          onChange={handleInputChange}
        />
        <Form.Control 
          type="text"
          name="text"
          placeholder="password"
          onChange={handleInputChange}
        />
        
        <Button variant="primary" type="submit">Log In!</Button>
        <Button variant="primary" type="submit">Sign Up!</Button>
      </Card>
    </Form>
  )
}

export default LoginForm;
