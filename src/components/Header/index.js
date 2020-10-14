// Header
import React from 'react';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
// import user from '../../store/user';

const Header = props => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Interview Study Aid</Navbar.Brand>
        <Navbar.Text>Welcome, {props.userName}</Navbar.Text>
      </Navbar>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.userName,
    loggedIn: state.user.loggedIn,
  };
};

export default connect(mapStateToProps)(Header);
