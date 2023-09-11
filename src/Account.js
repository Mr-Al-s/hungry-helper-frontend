import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import './Account.css'; // Import the CSS file

const Account = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Loading state
  if (isLoading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  // Authenticated user view
  return (
    isAuthenticated && (
      <div className="account-container">
        <div className="user-info">
          <img className="user-picture" src={user.picture} alt={user.name} />
          <h2 className="user-name">{user.name}</h2>
          <p className="user-email">{user.email}</p>
          <LogoutButton />
        </div>
      </div>
    )
  );
};

export default Account;
