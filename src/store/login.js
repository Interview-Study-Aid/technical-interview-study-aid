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

export const loginUser = (username, password) => {
  return async function (dispatch) {
    const response = await axios.get('url');

    dispatch({ type: '' });
  };
};
