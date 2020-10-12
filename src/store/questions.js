/* eslint-disable indent */
// import axios from 'axios';

const initialState = {
  // questions: ['question1', 'question2', 'question3'],
  questions: [{
    'category': 'General',
    'id': '4',
    'questionAnswer': '{"question": "When a user types in google.com in their bar, what is happening under the hood?", "answer":"What happens next is Google takes the phrase you entered and goes into its database and returns a list of what it thinks is the most relevant pages to your search… ... The Content – Google loves words. When it\'s indexing a page, it looks at the words on the page and determines the topic of the page."}'
    },
    {
    'category': 'General',
    'id': '3',
    'questionAnswer': '{"question":"How does the internet work?", "answer":"The information used to get packets to their destinations are contained in routing tables kept by each router connected to the Internet. Routers are packet switches. A router is usually connected between networks to route packets between them. Each router knows about it\'s sub-networks and which IP addresses they use."}'
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
