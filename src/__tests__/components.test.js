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

describe('Connected Component tests', () => {
  it('should display the user name in the header', () => {
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

    screen.findByText('lameguy2001');
  });

  it('should correctly render the footer', () => {
    render(<Footer />);
    screen.getByText(
      '© 2020 Jennifer Chinzi, Kateryna Shydlovska, & Alex Whan'
    );
  });
});
