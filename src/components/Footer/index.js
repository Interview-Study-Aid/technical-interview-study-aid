// Footer
import React from 'react';
import Navbar from 'react-bootstrap/Navbar'

const Footer = () => {
  return (
    <>
      <Navbar
      className='justify-content-end'
      bg="light"
      fixed="bottom"
      >
      &copy; 2020 Jennifer Chinzi, Kateryna Shydlovska, &amp; Alex Whan
      </Navbar>
    </>
  );
};

export default Footer;
