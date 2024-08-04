import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { removeUser } from '../store/authSlice';
import { useNavigate, NavLink } from 'react-router-dom';
// import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var user = useSelector(store=>store.auth.user);
  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem('user'); // Clear user from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand">
            <h4>Water Intake</h4>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-controls="navbarNav"aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className="collapse navbar-collapse mr-auto" id="navbarNav"  style={{ float: "left" }}>
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                <li className="nav-item mr-3" style={{fontSize:"15px"}}>
                <NavLink to={"/"} className={'nav-link'+(({isActive})=>(isActive?'active':''))}>
                    HOME
                </NavLink>
                </li>
                <li className="nav-item mr-3" style={{fontSize:"15px"}}>
                <NavLink to={"/aboutus"} className={'nav-link'+(({isActive})=>(isActive?'active':''))}>
                    ABOUTUS
                </NavLink>
                </li>
                <li className="nav-item mr-3" style={{fontSize:"15px"}}>
                <NavLink to={"/crud"} className={'nav-link'+(({isActive})=>(isActive?'active':''))}>
                    WATER INTAKE
                </NavLink>
                </li>
                <li className="nav-item mr-3" style={{fontSize:"15px"}}>
                <NavLink to={"/register"} className={'nav-link'+(({isActive})=>(isActive?'active':''))}>
                    REGISTER
                </NavLink>
                </li>
          
        
                {user?
                <li className="nav-item"  style={{fontSize:"15px"}}>
                    <span className="nav-link" onClick={handleLogout}>LOGOUT</span>
                </li>:
                <li className="nav-item"  style={{fontSize:"15px"}}>
                <NavLink 
                to={"/login"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    LOGIN
                </NavLink>
                </li>
            }
         
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;