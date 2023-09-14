import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import HomePage from './HomePage';
import RequestForm from './RequestForm';
import AboutUs from './AboutUs';
import Account from './Account';
import Footer from './Footer';
import Header from './Header';
import ReservationForm from './ReservationForm';
import ReservationPage from './ReservationPage'
import RestaurantModal from './RestaurantModal';

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;

    return (
        <Router>
          {isAuthenticated && <Header />}
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Add a route for the root URL */}
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/request-restaurant"
              element={
                isAuthenticated ? (
                  <RequestForm />
                ) : (
                  <HomePage />
                )
              }
            />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/account"
              element={
                isAuthenticated ? (
                  <Account />
                ) : (
                  <h2>Please Log In</h2>
                )
              }
            />
            <Route path="/restaurantmodal" element={<RestaurantModal />} />
            <Route path="/reservationform" element={<ReservationForm />} />
            <Route path="/reservations" element={<ReservationPage />} />
          </Routes>
          <Footer />
        </Router>
    );
  }
}

export default withAuth0(App);
