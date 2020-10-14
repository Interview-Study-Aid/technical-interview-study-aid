/* eslint-disable indent */
const initialState = {
  loggedIn: false,
  userName: 'Guest',
  token: '',
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
