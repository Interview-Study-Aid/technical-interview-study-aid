import axios from 'axios';

/* eslint-disable indent */
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
      // this is not logging/updating properly
      console.log('IN TYPE DEF:', type, payload);
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
  // if verified, emit this
  console.log('LOGIN DATA???', loginData);
  return {
    type: 'LOGIN',
    payload: loginData,
  };
}

export function setLogout() {
  // if verified, emit this
  return {
    type: 'LOGOUT',
    payload: null,
  };
}

// This is still not yet working
// export function getAllNotesForUser(token) {
//   console.log('GET ALL NOTES FUNCTION', token);
//   // const url = 'https://isa-server-401.herokuapp.com';
//   const url = 'https://localhost:3000';

//   return async function (dispatch) {
//     const response = await axios.get(`${url}/notes`, {
//       data: {
//         jwt: token,
//       },
//     });

//     const notesBack = response.data;

//     console.log('NOTES BACK FOR USER!', notesBack);

//     dispatch({
//       type: 'GET_NOTES',
//       payload: notesBack,
//     });
//   };
// }

export function getAllNotesForUser(token) {
  console.log('GET ALL NOTES FUNCTION', token);
  // const url = 'https://isa-server-401.herokuapp.com';
  const url = 'https://localhost:3000';

  const jwt = token;

  return async function (dispatch) {
    const req = {
      // can we even await this?
      method: 'get',
      url: `${url}/notes`,
      data: {
        jwt,
      },
    };

    console.log('REQQQQQQ?', req);

    const response = await axios(req)
      .then(data => console.log('NOTE GET RESPONSE>>>>> ', data))
      .catch(err => console.log(err));

    const notesBack = response;

    console.log('NOTES BACK FOR USER!', notesBack);

    dispatch({
      type: 'GET_NOTES',
      payload: response, // notesBack
    });
  };
}
