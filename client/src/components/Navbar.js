import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <div className="layer">
    <nav className="navbar navbar-expand-lg navbar-light nv">
      <Link className="navbar-brand" to="/">
        curren$ee
      </Link>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-item nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
        </div>
      </div>
    </nav>
  </div>
);

export default Navbar;
