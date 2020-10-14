import { useState } from 'react';
import { connect } from 'react-redux';
import { setLogin } from '../store/user';
const axios = require('axios');

const useForm = ({ setLogin }) => {
  const [values, setValues] = useState({});

  const handleSignup = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3000/signup',
      data: {
        userName: values.userName,
        userPassword: values.userPassword,
      },
    })
      .then(data => console.log(data))
      .then();
  };

  const handleSubmit = e => {
    console.log(e, 'login');
    e.preventDefault();
    axios
      .get('http://localhost:3000/login', {
        headers: {
          Authorization: `Bearer ${values.userName}:${values.userPassword}`,
        },
      })
      .then(data => {
        if (data.data.token) {
          localStorage.setItem('token', data.data.token);
          // Call Login emitter here
          console.log('DATA FROM SUBMIT', data.data);
          setLogin(data.data);
        }
      })
      .catch(er => console.log(er.message));
  };

  const handleInputChangeName = e => {
    e.persist();
    // e.preventDefault();
    console.log(e);
    setValues(values => ({ ...values, userName: e.target.value }));
  };

  const handleInputChangePassword = e => {
    e.persist();
    console.log(e);
    setValues(values => ({ ...values, userPassword: e.target.value }));
  };

  return {
    handleSubmit,
    handleSignup,
    handleInputChangeName,
    handleInputChangePassword,
    values,
  };
};

const mapDispatchToProps = { setLogin };

export default connect(mapDispatchToProps)(useForm);
