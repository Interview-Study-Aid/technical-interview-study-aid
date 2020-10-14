import { useState } from 'react';
const axios = require('axios');


const useForm = callback => {
  const [values, setValues] = useState({});


  const handleSignup = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3000/signup',
      data: {
        userName: values.userName,
        userPassword: values.userPassword,
      }
    }).then(data => console.log(data)).then();
  }


  const handleSubmit = e => {
    console.log(e, 'login')
    e.preventDefault();
    axios.get('http://localhost:3000/login', {
      headers: {
        Authorization:  `Bearer ${values.userName}:${values.userPassword}`
      }
     }).then(data => console.log(data));
  };

  const handleInputChangeName = e => {
    e.persist();
    // e.preventDefault();
    console.log(e);
    setValues(values => ({ ...values, "userName": e.target.value }));
  };


  const handleInputChangePassword = e => {
    e.persist();
    console.log(e);
    setValues(values => ({ ...values, "userPassword": e.target.value }));
  };

  return { handleSubmit, handleSignup, handleInputChangeName, handleInputChangePassword, values };
};

export default useForm;