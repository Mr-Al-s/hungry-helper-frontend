import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0
import AuthButtons from './AuthButtons';
import homepage from './img/homepage.png';
import hungryhelperTitle from './img/hungryhelper.png'
import './HomePage.css';

function HomePage() {
  const { isAuthenticated } = useAuth0(); // Get the isAuthenticated status

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <img src={homepage} alt='A large variety of foods' className="homepage-image" />
        <img src={hungryhelperTitle} alt='HungryHelper Title' id='hungryhelperTitle' />
        <p className="homepage-subtitle">
          Discover Dining Adventures with Mr. Al's HungryHelper: Your Go-To Random Restaurant Generator and Reservation Maker!
        </p>
      </div>
      <div className="homepage-content">
        {/* Conditionally render the message and AuthButtons */}
        {isAuthenticated ? (
          <div>
            <p className="homepage-message">
              You are authenticated. You can now submit your request for a random restaurant.
            </p>
            <div id='linkDiv'>
              <a href='/request-restaurant' id='homePageButton'>Submit Request</a>
            </div>
          </div>
        ) : (
          <>
            <p className="homepage-message">
              Please log in so that you can submit your request for a random restaurant.
            </p>
            <AuthButtons />
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
