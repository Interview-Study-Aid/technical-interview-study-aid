import reducer, {selectCategory} from '../store/categories';

it('should have initial state', () => {
  const state = reducer(undefined, {});
  expect(state.activeCategory).toBe('General');
});

// it('should be able to switch categories', () => {
//   const state = reducer(undefined, selectCategory('JavaScript'));
//   expect(state.activeCategory).toBe('JavaScript');
// });