/* eslint-disable indent */
import axios from 'axios';

const initialState = {
  isLoggedIn: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_LOGIN':
      return { ...state, payload, isLoggedIn: true };
    default:
      return state;
  }
};

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
  const url = 'https://localhost:3000/categories/login';
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
