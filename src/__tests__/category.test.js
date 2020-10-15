import reducer, {selectCategory, getCategories} from '../store/categories';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('should have initial state', () => {
  const state = reducer(undefined, {});
  expect(state.activeCategory).toBe('General');
});

it('should be able to switch categories', () => {
  const state = reducer(undefined, {
    type: 'CHANGE_CATEGORY',
    payload: { category: 'JavaScript', id: '1', questionAnswer: '{}' },
  });
  expect(state.activeCategory.category).toBe('JavaScript');
});

it('should be able to set initial categories', () => {
  const state = reducer(undefined, {
    type: 'GET_CATEGORIES',
    payload: ['JavaScript', '201', 'General'],
  });
  expect(state.categories.length).toEqual(3);
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  
  it('should return getCategory action', () => {
    fetchMock.getOnce('/categories', {
      body: {},
      headers: {'content-type': 'application/json'}
    });
    const expectedActions = [
      {type: 'GET_CATEGORIES', payload: ['JavaScript', 'ASP.NET', '201', '301', '401', 'General']}
    ];
    const store = mockStore({categories: []});
    return store.dispatch(getCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return selectCategory action', () => {
    const category = {category: 'JavaScript', id: '1', questionAnswer:'{}' };
    fetchMock.getOnce('/categories/JavaScript', {
      body: category,
      headers: {'content-type': 'application/json'}
    });
    const expectedActions = [
      {type: 'CHANGE_CATEGORY', payload: []}
    ];
    const store = mockStore({activeCategory: {}});
    return store.dispatch(selectCategory(category)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
