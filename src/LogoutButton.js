import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from "react-bootstrap/Button";
import './LogoutButton.css'; // Import a CSS file for styling

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="outline-primary"
      className="logout-button"
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
