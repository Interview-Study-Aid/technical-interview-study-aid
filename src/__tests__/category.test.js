import reducer from '../store/categories';

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
