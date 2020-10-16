import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import { Provider } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Categories from '../components/Main/Categories';
import Questions from '../components/Main/Questions';

describe('Connected Component tests', () => {
  it('should display the user name in the header', async () => {
    const store = mockStore({
      user: {
        userName: 'CoolGuy2002',
        loggedIn: false,
      },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    await screen.findByText(/CoolGuy2002/);
  });

  it('should correctly render the footer', async () => {
    render(<Footer />);
    await screen.findByText(
      /Jennifer Chinzi, Kateryna Shydlovska, & Alex Whan/
    );
  });

  it('should correctly render the category buttons', async () => {
    const store = mockStore({
      categories: {
        categories: ['General!', 'JavaScript!', 'ASP.NET!'],
      },
    });

    render(
      <Provider store={store}>
        <Categories />
      </Provider>
    );

    await screen.findByText(/General/);
    await screen.findByText(/JavaScript/);
    await screen.findByText(/ASP.NET/);
    const items = await screen.findAllByText(/!/);
    expect(items.length).toEqual(3);
  });

  it.skip('should correctly render questions for the active category', async () => {
    const store = mockStore({
      categories: {
        categories: ['General', 'JavaScript', 'ASP.NET'],
        activeCategory: 'General',
      },

      questions: {
        questions: [
          {
            category: 'General',
            id: '001',
            questionAnswer:
              '{"question": "Nothing like a good general question, right?", "answer":""}',
          },
          {
            category: 'JavaScript',
            id: '002',
            questionAnswer: '{"question": "", "answer":""}',
          },
          {
            category: 'General',
            id: '003',
            questionAnswer:
              '{"question": "Do you love event loops as much as I do?", "answer":""}',
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Categories />
        <Questions />
      </Provider>
    );

    await screen.findByText(/event loops/);
  });
});
