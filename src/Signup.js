import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Signup() {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className="signup-page">
      <div className="login-card signup-card">
        <h2>Sign Up</h2>
        <form className="login-form">
          <div className="form-group">
            <input type="text" required className="form-input" placeholder=" " />
            <label className="form-label">Name</label>
          </div>
          <div className="form-group">
            <input type="email" required className="form-input" placeholder=" " />
            <label className="form-label">Email</label>
          </div>
          <div className="form-group">
            <input type="password" required className="form-input" placeholder=" " />
            <label className="form-label">Password</label>
          </div>
          <button type="submit" className="form-btn">Sign Up</button>
        </form>
        <div style={{marginTop: 18, fontSize: '1rem'}}>
          Already have an account?{' '}
          <Link to="/login" style={{color: '#ff7a00', fontWeight: 'bold', textDecoration: 'none'}}>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup; 