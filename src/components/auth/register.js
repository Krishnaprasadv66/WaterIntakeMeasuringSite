import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerRequest, registerSuccess, registerFailure } from '../../store/authSlice';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import "./register.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const registerUser = () => {
    dispatch(registerRequest());
    // Simulate API call
    setTimeout(() => {
      if (password !== passwordConf) {
        dispatch(registerFailure('Passwords do not match'));
        setErrorMessage('Passwords do not match');
        return;
      }
      const user = { name, email, password };
      dispatch(registerSuccess(user));
      localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
      navigate('/login'); // Redirect to login page
    }, 1000);
  };

  return (
    <div className='register'>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1>Register</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
              />
            </div>
            <button className="btn btn-danger form-control " onClick={registerUser}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;