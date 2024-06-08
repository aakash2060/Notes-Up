import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Simulate a login request
    console.log('Logging in with', email, password);
    
    // TODO: Implement actual login logic here
  };

  const handleForgotPassword = () => {
    // Implement your logic for handling forgot password functionality here
    console.log('Forgot password clicked');
  };

  const handleGoogleSignIn = () => {
    // Implement your logic for handling Google sign-in functionality here
    console.log('Google sign-in clicked');
  };

  return (
    <div className="page create">
    <form onSubmit={handleSubmit}>
      <div style={{ fontWeight: "bold", textAlign: "center" }}>
        Login
      </div>
      <label htmlFor="email"> Email: </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password"> Password: </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-button">Login Bro</button>
      {error && <p className="error">{error}</p>}

    </form>
    <div style={{ textAlign: "center", marginTop: "20px" }}>
        <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
      </div>
      
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="login-button" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    
    <ToastContainer className="custom-toast-container" />
  </div>
  );
};

export default Login;
