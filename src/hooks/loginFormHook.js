import axios from 'axios';
import { useState } from 'react';
// import { sha256 } from 'js-sha256';
// import { encode } from 'js-base64';

const useForm = callback => {
  const [values, setValues] = useState({}); // sets username and password as values.username & values.password

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

  const handleSubmit = async e => {
    if (e) {
      console.log(`SUBMIT WILL SEND: ${values.username}, ${values.password}`);
      e.preventDefault();
      const username = values.username;
      const password = values.password;

      const baseCreds = `${username}:${password}`;
      console.log(baseCreds);

      // const url = 'https://isa-server-401.herokuapp.com/login';
      const url = 'https://localhost:3000/login';

      const response = await axios.get(url, {
        method: 'GET',
        headers: {
          authorization: `Basic ${baseCreds}`,
        },
      });

      // console.log('RESPONSE FROM AXIOS:::::,', response);
    }

    e.target.reset();
  };

  const handleInputChange = e => {
    e.persist();
    console.log(`INPUT CHANGE HANDLER: ${e.target.name}: ${e.target.value}`);
    setValues(values => ({ ...values, [e.target.name]: e.target.value })); // maybe userName: e.target.value?
  };

  return {
    handleSubmit,
    handleInputChange,
    values,
  };
};

export default useForm;
