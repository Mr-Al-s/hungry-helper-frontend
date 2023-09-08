import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import canOfBooks from './img/can-of-books.png';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' className='navBar'>
        <img className='navBarImg' src={canOfBooks} alt='can-of-books-logo'/>
        <Navbar.Brand className='navBarTitle'>My Favorite Restaurants</Navbar.Brand>
        <div className='navItems'>
          <NavItem><Link to='/' className='nav-link'>Home</Link></NavItem>
          {/* PLACEHOLDER: render a navigation link to the about page */}
          <NavItem><Link to='/request-restaurant' className='nav-link'>Request Restaurant</Link></NavItem>
          <NavItem><Link to='/reservations' className='nav-link'>Reservations</Link></NavItem>
          <NavItem><Link to='/about-us' className='nav-link'>About Us</Link></NavItem>
          <NavItem><Link to='/my-account' className='nav-link'>My Account</Link></NavItem>
        </div>
      </Navbar>
    );
  }
}

export default Header;
