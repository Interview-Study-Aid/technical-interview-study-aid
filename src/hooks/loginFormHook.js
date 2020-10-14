import { useState } from 'react';
// import { sha256 } from 'js-sha256';
// import { encode } from 'js-base64';

const useForm = callback => {
  const [values, setValues] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleSignup = e => {
  //   //   e.preventDefault();
  //   //   let encryptedName = sha256.create();
  //   //   encryptedName.update(values.userName).hex();
  //   //   let encryptedPassword = sha256.create();
  //   //   encryptedPassword.update(values.userPassword).hex();
  //   //     fetch('https://isa-server-401.herokuapp.com/login', {
  //   //         method: 'POST',
  //   //         headers: {
  //   //             'Content-type': 'application/json',
  //   //         },
  //   //          body: JSON.stringify({
  //   //             username: 'myUserName',
  //   //             password: 'myPassword',
  //   //             Authorization: 'TheReturnedToken',
  //   //         })
  //   //     }) /*end fetch */
  //   //     .then(results => results.json())
  //   //     .then(data => this.setState({ data: data })
  //   //     )
  //   // }
  // };

  // const handleSubmit = e => {
  //   if (e) {
  //     e.preventDefault();
  //     const baseCreds = `${username}:${password}`;

  //     fetch('https://isa-server-401.herokuapp.com/login', {
  //       method: 'GET',
  //       headers: {
  //         authorization: `Basic ${baseCreds}`,
  //       },
  //     }).then(results => {
  //       console.log(results, 'result');
  //     });
  //   }
  //   e.target.reset();
  // };

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
      console.log(`SUBMIT WILL SEND: ${username}, ${password}`);
      const baseCreds = `${username}:${password}`;

      // const url = 'https://isa-server-401.herokuapp.com/login';
      const url = 'https://localhost:3000/categories/login';

      // fetch(url, {
      //   method: 'GET',
      //   headers: {
      //     authorization: `Basic ${baseCreds}`,
      //   },
      // }).then(results => {
      //   console.log(results, 'result');
      // });
    }
    e.target.reset();
  };

  const handleInputChange = e => {
    e.persist();
    console.log(`INPUT CHANGE HANDLER: ${e.target.name}: ${e.target.value}`);
    setValues(values => ({ ...values, [e.target.name]: e.target.value })); // maybe userName: e.target.value?
  };

  // const handleInputChangeName = e => {
  //   e.persist();
  //   // e.preventDefault();
  //   console.log(e);
  //   setValues(values => ({ ...values, userName: e.target.value }));
  // };

  // const handleInputChangePassword = e => {
  //   e.persist();
  //   console.log(e);
  //   setValues(values => ({ ...values, userPassword: e.target.value }));
  // };

  return {
    handleSubmit,
    handleInputChange,
    // handleInputChangePassword,
    values,
  };
};

export default useForm;
