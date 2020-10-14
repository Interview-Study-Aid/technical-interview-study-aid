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
      return { ...state, profile: payload, formSubmitted: false };
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
  const url = 'https://localhost:3000/login';
  return async function (dispatch) {
    const response = await axios.post(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInput),
    });

    const jsonResponse = response.json();

    if (jsonResponse.msg === 'success') {
      dispatch(setLoginState({ ...jsonResponse }));
    } else {
      console.log('LOGIN FAILED!!');
    }
  };
};

export const createUser = user => {
  return {
    type: 'CREATE_USER',
    payload: user,
  };
};
