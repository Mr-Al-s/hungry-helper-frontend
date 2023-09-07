import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN} // where the site goes to when it prompts you to login
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID} // 
    authorizationParams={{
      redirect_uri: process.env.REACT_APP_AUTH_REDIRECT_URI_REACT_URL // where the site goes when logging in is successful
    }}
  >
    <App />
  </Auth0Provider>
);
