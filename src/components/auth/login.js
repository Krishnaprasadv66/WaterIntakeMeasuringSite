import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    // Simulate API call
    setTimeout(() => {
      const user = { email, password };
      dispatch(setUser(user));
      localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
      navigate('/'); // Redirect to home page
    }, 1000);
  };

  return (
    <div className='login'>
      <Navbar />
      <div className="container ">
        <div className="row">
          <div className="col-8 offset-2">
            <h1>Login</h1>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success float-right" onClick={loginUser}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;