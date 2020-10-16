import reducer, { setLogin, setLogout } from '../store/user';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import axios from 'axios';

it('should have initial state', () => {
  const state = reducer(undefined, {});
  expect(state.userName).toBe('Guest');
  expect(state.loggedIn).toBe(false);
  expect(state.token).toBe('');
  expect(state.userNotes).toEqual([]);
});

it('should be able to set a user as logged in', () => {
  const state = reducer(undefined, {
    type: 'LOGIN',
    payload: {
      username: 'CoolGuy2002',
      token: 'testtokenbusiness',
    },
  });

  expect(state.loggedIn).toBe(true);
  expect(state.userName).toBe('CoolGuy2002');
  expect(state.token).toBe('testtokenbusiness');
});
