import axios from 'axios';

const initialState = {
  categories: {},
  activeCategory: {},
};

// Reducer

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CHANGE_CATEGORY':
      // TODO: Confirm the shape of the payload - we may need to be more specific
      return { ...state, activeCategory: payload };

    case 'GET_CATEGORIES':
      return { ...state, categories: payload };

    default:
      return state;
  }
};

// Action Creators

export const selectCategory = category => {
  return async function (dispatch) {
    let response = await axios.get(
      `http://localhost:3000/categories/${category}`
    );
    console.log('selectCategory RESPONSE', response);
    dispatch({
      type: 'CHANGE_CATEGORY',
      payload: response.data,
      // TODO: Confirm shape of response => what do we need to pull out?
    });
  };
};

export function getCategories() {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3000/categories');
    console.log('getCategories RESPONSE', response);
    dispatch({
      type: 'GET_CATEGORIES',
      payload: response.data.results,
    });
  };
}
