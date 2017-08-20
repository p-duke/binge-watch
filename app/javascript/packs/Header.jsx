import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-light bg-light">
    <a className="navbar-brand">GroovyMovie</a>
    <div className="navbar-nav">
      <Link className="nav-item nav-link" to='/'>Home</Link>
      <Link className="nav-item nav-link" to='/users/sign_up'>Sign Up</Link>
    </div>
  </nav>
  )

export default Header;
