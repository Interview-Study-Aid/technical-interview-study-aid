/* eslint-disable indent */
import axios from 'axios';

const initialState = {
  categories: ['category1', 'category2', 'category3'],
  activeCategory: null,
};

// Reducer

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CHANGE_CATEGORY':
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
      `https://isa-server-401.herokuapp.com/categories/${category}`
      // `https://localhost:3000/categories/${category}`
    );
    // console.log('selectCategory RESPONSE', response.data);
    // let parsedData = JSON.parse(response.data[0].questionAnswer);
    // console.log('Parsed Question:', parsedData.question);
    dispatch({
      type: 'CHANGE_CATEGORY',
      payload: response.data,
    });
  };
};

export function getCategories() {
  return async function (dispatch) {
    const response = await axios.get(
      'https://isa-server-401.herokuapp.com/categories/'
    );
    // const response = await axios.get('https://localhost:3000/categories/');

    // console.log('getCategories RESPONSE', response);

    let categories = response.data;
    let filteredArray = [];
    let filteredResponse = categories.filter(category => {
      if (!filteredArray.includes(category.category)) {
        filteredArray.push(category.category);
      }
    });

    dispatch({
      type: 'GET_CATEGORIES',
      payload: filteredArray,
    });
  };
}
