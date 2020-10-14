import React from 'react';
import Categories from './Categories';
import Questions from './Questions';
import Detail from './Detail';
import Login from './Login';

const Main = () => {
  return (
    <>
      <section>
        <p>All the other components go in here (Main)</p>
      </section>
      <Login />
      <Categories />
      <Questions />
    </>
  );
};

export default Main;
