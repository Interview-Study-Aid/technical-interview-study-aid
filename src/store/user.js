/* eslint-disable indent */
import axios from 'axios';

const initialState = {
  loggedIn: false,
  userName: 'Guest',
  token: '',
  userNotes: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        userName: payload.username,
        token: payload.token,
      };

    case 'LOGOUT':
      return { ...state, loggedIn: false, userName: 'Guest' };

    case 'GET_NOTES':
      return { ...state, userNotes: payload };

    default:
      return state;
  }
};

// ACTION
export function setLogin(loginData) {
  return {
    type: 'LOGIN',
    payload: loginData,
  };
}

export function setLogout() {
  return {
    type: 'LOGOUT',
    payload: null,
  };
}

export function getAllNotesForUser(token) {
  const url = 'https://isa-server-401.herokuapp.com';
  // const url = 'http://localhost:3000';

  return async function (dispatch) {
    let responseFromGetNotes;

    await axios({
      method: 'get',
      url: `${url}/notes/${token}`,
    }).then(function (response) {
      console.log('RESPONSE FROM GET NOTES>>>>>>', response.data);
      responseFromGetNotes = response.data;
    });

    dispatch({
      type: 'GET_NOTES',
      payload: responseFromGetNotes,
    });
  };
}
