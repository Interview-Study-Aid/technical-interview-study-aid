import reducer from '../store/questions';

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
