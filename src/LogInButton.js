import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-button-container"> 
      <Button
        onClick={() => loginWithRedirect()}
        className="login-button"
      >
        Log In
      </Button>
    </div>
  );
};

export default LoginButton;
