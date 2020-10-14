import React, { useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import useForm from '../../../hooks/loginFormHook';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const LoginForm = props => {
  // const { handleInputChange } = useForm(props.handleSubmit);

  // const [username, setUsername] = useState('');

  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // const [user, setUser] = useState('');

  const handleSubmit = e => {
    // setSubmitted(false);
    let username = values.username;
    let password = values.password;
    const user = { username, password };
    e.preventDefault();
    props.dispatch({ type: 'CREATE_USER', payload: user });
  };

  const handleInputChange = e => {
    e.persist();
    console.log(`INPUT CHANGE HANDLER: ${e.target.name}: ${e.target.value}`);
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

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

const mapStateToProps = state => {
  return {
    profile: state.login.profile,
  };
};

export default connect(mapStateToProps)(LoginForm);

// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// // import Card from 'react-bootstrap/Card';
// import useForm from '../../../hooks/loginFormHook';
// import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';

// const LoginForm = props => {
//   const { handleSubmit, handleInputChange } = useForm(props.handleSubmit);

//   const [username, setUsername] = useState('');

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Row className="align-items-center">
//         <Col xs="auto">
//           <Form.Label htmlFor="inlineFormInput" srOnly>
//             Name
//           </Form.Label>
//           <Form.Control
//             className="mb-2"
//             id="inlineFormInput"
//             name="username"
//             placeholder="username"
//             onChange={handleInputChange}
//           />
//         </Col>
//         <Col xs="auto">
//           <Form.Label htmlFor="inlineFormInputGroup" srOnly>
//             Username
//           </Form.Label>
//           <InputGroup className="mb-2">
//             <FormControl
//               id="inlineFormInputGroup"
//               name="password"
//               placeholder="password"
//               onChange={handleInputChange}
//             />
//           </InputGroup>
//         </Col>
//         <Col xs="auto">
//           <Button type="submit" className="mb-2">
//             Login
//           </Button>
//         </Col>
//         <Col xs="auto">
//           <Button type="submit" className="mb-2">
//             SignUp
//           </Button>
//         </Col>
//       </Form.Row>
//     </Form>
//   );
// };

// export default LoginForm;
