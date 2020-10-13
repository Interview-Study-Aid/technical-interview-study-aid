/* eslint-disable indent */
// import axios from 'axios';

const initialState = {
  questions: [{
    'category': 'General',
    'id': '4',
    'questionAnswer': '{"question": "", "answer":""}'
    },
    {
    'category': 'General',
    'id': '3',
    'questionAnswer': '{"question":"", "answer":""}'
    }],
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
