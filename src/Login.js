import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Login() {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form className="login-form">
          <div className="form-group">
            <input type="email" required className="form-input" placeholder=" " />
            <label className="form-label">Email</label>
          </div>
          <div className="form-group">
            <input type="password" required className="form-input" placeholder=" " />
            <label className="form-label">Password</label>
          </div>
          <button type="submit" className="form-btn">Login</button>
        </form>
        <div style={{marginTop: 18, fontSize: '1rem'}}>
          Don't have an account?{' '}
          <Link to="/signup" style={{color: '#ff7a00', fontWeight: 'bold', textDecoration: 'none'}}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login; 