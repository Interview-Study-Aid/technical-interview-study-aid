/* eslint-disable indent */
import axios from 'axios';

const initialState = {
  questions: [],
  activeQuestion: {},
};

// REDUCER
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CHANGE_CATEGORY':
      return { ...state, questions: payload };
    default:
      return state;
  }
};
