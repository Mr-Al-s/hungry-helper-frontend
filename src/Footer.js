import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='footer-container'>
        <Navbar.Brand>© 2023 Mr. Al's HungryHelper</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
