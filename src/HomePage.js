import React from 'react';
import AuthButtons from './AuthButtons';
import homepage from './img/homepage.png';
import './HomePage.css';

function HomePage() {
  return (
    <div>
      <img src={homepage} alt='A large variety of foods'/>
      <h1>HungryHelper</h1>
      <p>Please log in so that you can submit your request for a random restaurant.</p>
      <AuthButtons />
    </div>
  )
}

export default HomePage;
