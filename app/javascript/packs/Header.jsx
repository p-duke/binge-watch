import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <nav className="navbar navbar-default">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse">

        </button>
        <a className="navbar-brand">GroovyMovie</a>
      </div>

      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li><Link to='/'>Movie Search</Link></li>
          <li><Link to='/users/sign_up'>Sign Up</Link></li>
          <li><Link to='/users/sign_in'>Log In</Link></li>
          <li><Link to='/users/sign_out'>Log Out</Link></li>
        </ul>
      </div>
    </nav>
  </div>
)

export default Header;
