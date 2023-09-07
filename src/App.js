import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequestForm from './RequestForm';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import Account from './Account';
import Footer from './Footer';



class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route exact path='/' element={ this.props.auth0.isAuthenticated ?  <RequestForm /> : <HomePage/>}  />
            <Route exact path='/about-us' element={<AboutUs />}/>
            <Route exact path='/account' element={this.props.auth0.isAuthenticated ? < Account /> : <h2>Please Log In</h2>}/> 
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
