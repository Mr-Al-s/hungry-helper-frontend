import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import canOfBooks from './img/can-of-books.png';
import './Header.css';
import logo from './img/logo.png'

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' className='navBar'>
        <Navbar.Brand className='navBarTitle'>
          <Link to='/home'>
            <img src={logo} alt='HungryHelper logo' id='navBarLogo'/>
          </Link>
        </Navbar.Brand>
        <div className='navItems'>
          <NavItem><Link to='/request-restaurant' className='nav-link'>Request Restaurant</Link></NavItem>
          <NavItem><Link to='/reservationform' className='nav-link'>Reservation Form</Link></NavItem>
          <NavItem><Link to='/reservations' className='nav-link'>Reservations</Link></NavItem>
          <NavItem><Link to='/about-us' className='nav-link'>About Us</Link></NavItem>
          <NavItem><Link to='/account' className='nav-link'>My Account</Link></NavItem>
        </div>
      </Navbar>
    );
  }
}

export default Header;
