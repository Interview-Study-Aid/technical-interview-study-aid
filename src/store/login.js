/* eslint-disable indent */
import axios from 'axios';

const initialState = {
  profile: {
    username: '',
    password: '',
  },
  formSubmitted: false,
  isLoggedIn: false,
};

console.log('PROFILE IN LOGIN FORM:', initialState.profile);

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_LOGIN':
      return { ...state, payload, isLoggedIn: true };
    case 'CREATE_USER':
      console.log('CREATE USER PAYLOAD', payload, type);
      return { ...state, profile: payload };
    default:
      return state;
  }
};

// EXPERIMENTAL

// need a URL to log in with:
// https://localhost:3000/categories/login
export const setLoginState = loginData => {
  return {
    type: 'SET_LOGIN',
    payload: loginData,
  };
};

export const login = loginInput => {
  const { username, password } = loginInput;
  // const url = 'https://localhost:3000/login';
  const url = 'https://isa-server-401.herokuapp.com/login';
  return async function (dispatch) {
    const response = await axios.post(url, {
      // method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInput),
    });

    console.log('RESPONSE IN LOGIN THINGY?', response);

    //   const jsonResponse = response.json();

    //   if (jsonResponse.msg === 'success') {
    //     dispatch(setLoginState({ ...jsonResponse }));
    //   } else {
    //     console.log('LOGIN FAILED!!');
    //   }
    // };
    dispatch({
      type: 'SET_LOGIN',
      payload: response.data,
    });
  };
};

export const createUser = user => {
  const { username, password } = user;
  const url = 'https://isa-server-401.herokuapp.com/signup'; // seems to work with real route
  // const url = 'https://localhost:3000/signup';
  return async function (dispatch) {
    const response = await axios.post(url, {
      url: url,
      userName: username,
      userPassword: password,
    });

    console.log('RESPONSE IN MY LOGIN THUNK??', response);
    console.log('RESPONSE DATA', response.data);

    dispatch({
      type: 'CREATE_USER',
      payload: response.data,
    });
  };
};
