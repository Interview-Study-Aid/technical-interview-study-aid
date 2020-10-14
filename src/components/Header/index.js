// Header
import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
// import user from '../../store/user';

const Header = props => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className='h_title'>Interview Study Aid</Navbar.Brand>
        <Navbar.Text className='subtitle'>
          Welcome, {props.username}. You are logged{' '}
          {props.loggedIn ? 'IN' : 'OUT'}
        </Navbar.Text>
      </Navbar>
    </>
  );
};

const mapStateToProps = state => {
  return {
    username: state.user.userName,
    loggedIn: state.user.loggedIn,
  };
};

export default connect(mapStateToProps)(Header);
