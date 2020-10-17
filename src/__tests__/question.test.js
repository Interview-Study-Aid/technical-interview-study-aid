import reducer, { closeQuestion, selectQuestion } from '../store/questions';

// Alex added

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import axios from 'axios';

jest.mock('axios');

// REDUCER Tests
it('should have initial state', () => {
  const state = reducer(undefined, {});
  expect(state.questions).toStrictEqual([]);
  expect(state.activeQuestion.category).toBe('');
});

it('should be able to switch active questions', () => {
  const state = reducer(undefined, {
    type: 'SELECT_QUESTION',
    payload: { category: 'JavaScript', id: '1', questionAnswer: '{}' },
  });
  expect(state.activeQuestion.category).toBe('JavaScript');
  expect(state.activeQuestion.id).toBe('1');
});

it('should be able to clear the active question', () => {
  let state = reducer(undefined, {
    type: 'SELECT_QUESTION',
    payload: { category: 'JavaScript', id: '1', questionAnswer: '{}' },
  });
  expect(state.activeQuestion.category).toBe('JavaScript');
  expect(state.activeQuestion.id).toBe('1');
  state = reducer(undefined, { type: 'CLOSE_QUESTION', payload: null });
  expect(state.activeQuestion.category).toBe('');
});

it('should return selectQuestion action', () => {
  const question = { category: 'JavaScript', id: '1', questionAnswer: '{}' };
  const action = selectQuestion(question);
  expect(action.type).toBe('SELECT_QUESTION');
  expect(action.payload).toStrictEqual({
    category: 'JavaScript',
    id: '1',
    questionAnswer: '{}',
  });
});

it('should return closeQuestion action', () => {
  const action = closeQuestion();
  expect(action.type).toBe('CLOSE_QUESTION');
  expect(action.payload).toBeNull();
});

describe('async actions for Questions', () => {
  // tests in here
  it('should return an active question', async () => {
    const data = {
      activeQuestion: 'cool question',
    };

    const expectedActions = [{ type: 'SELECT_QUESTION', payload: data }];
    const store = mockStore();

    axios.get = jest.fn();
    axios.get.mockResolvedValue({ data });
    await store.dispatch(selectQuestion(data));

    // return async actions here
    const actualActions = store.getActions();

    expect(actualActions.length).toBe(expectedActions.length);
    expect(actualActions[0].type).toBe(expectedActions[0].type);
    expect(actualActions[0].payload).toStrictEqual(expectedActions[0].payload);
  });

  it('should close an active question', async () => {
    const expectedActions = [{ type: 'CLOSE_QUESTION', payload: null }];
    const store = mockStore();

    await store.dispatch(closeQuestion());
    const actualActions = store.getActions();

    expect(actualActions.length).toBe(expectedActions.length);
    expect(actualActions[0].type).toBe(expectedActions[0].type);
    expect(actualActions[0].payload).toStrictEqual(expectedActions[0].payload);
  });
});
