// src/components/Login.js
import React from 'react';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3297/auth/google";
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
