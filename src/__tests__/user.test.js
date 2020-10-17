import reducer, {
  setLogin,
  setLogout,
  getAllNotesForUser,
} from '../store/user';
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

it('should return a login action', () => {
  const data = {
    username: 'testBoySlim',
    token: 'testTokenSlim',
  };

  const action = setLogin(data);
  expect(action.type).toBe('LOGIN');
  expect(action.payload.username).toBe('testBoySlim');
  expect(action.payload.token).toBe('testTokenSlim');
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

it('should return a logout action', () => {
  const action = setLogout();
  expect(action.type).toBe('LOGOUT');
  expect(action.payload).toBe(null);
});

// May need to rework this
it('should be able to log a user out', async () => {
  let state = reducer(undefined, {
    type: 'LOGIN',
    payload: {
      username: 'CoolGuy2002',
      token: 'testtokenbusiness',
    },
  });
  expect(state.loggedIn).toBe(true);

  state = reducer(undefined, {
    type: 'LOGOUT',
    payload: null,
  });
  expect(state.loggedIn).toBe(false);
});

describe.skip('async actions for Users', () => {
  jest.mock('axios');

  afterEach(() => {
    fetchMock.restore();
  });

  it('should return a getNotes action', async () => {
    const token = '123456789';
    axios.get = jest.fn();
    axios.get.mockResolvedValue(token);
    const action = await getAllNotesForUser(token);

    expect(action.type).toBe('GET_NOTES');
  });

  it('should return getNotes action', () => {
    const token = '123456789';
    fetchMock.getOnce(`/notes/${token}`, {
      body: {},
    });
    const expectedActions = [
      {
        type: 'GET_NOTES',
        payload: [{ note: 'sweet testing note' }],
      },
    ];
    const store = mockStore({ userNotes: [] });
    return store.dispatch(getAllNotesForUser(token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
