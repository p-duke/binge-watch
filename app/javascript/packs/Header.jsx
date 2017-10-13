import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

export default class Header extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const user = store.getState().user[0];

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"></button>
            <a className="navbar-brand">BingeWatch</a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-left">
              <li><Link to='/'>Movie Search</Link></li>
              { user
                  ? null
                  : <li><Link to='/users/sign_up'>Sign Up</Link></li>
              }
              { user
                  ? <li><Link to='/users/sign_out'>Log Out</Link></li>
                  : <li><Link to='/users/sign_in'>Log In</Link></li>
              }
              { user
                  ? <li><Link to={`/users/${user.id}/movies`}>Profile</Link></li>
                  : null
              }
            </ul>
            { user
                ?  <ul className="nav navbar-nav navbar-right"><li><Link to='#'>Welcome, {capitalize(user.username)}!</Link></li></ul>
                :  <ul className="nav navbar-nav navbar-right"><li><Link to='#'>Welcome, movie nerd!</Link></li></ul>
            }
          </div>
        </nav>
      </div>
    )
  }
}

Header.contextTypes = {
  store: React.PropTypes.object
};

