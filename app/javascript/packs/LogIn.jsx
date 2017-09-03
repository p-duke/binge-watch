import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import Errors from './Errors';
import { isEmpty } from 'lodash';

export default class LogIn extends React.Component {
  constructor() {
    super();
    this.logIn = this.logIn.bind(this);
    this.state = {
      errors: [],
    }
  }

  componentDidMount(nextProps) {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  logIn(e) {
    e.preventDefault();
    const self = this;

    axios({
      method: 'POST', 
      url: this.refs.form.action,
      data: {
        email: this.refs.email.value,
        password: this.refs.password.value,
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    }).then(function(response) {
      self.context.store.dispatch({
        type: 'LOG_IN',
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        isLoggedIn: false,
        redirect: true,
      });
    }).catch(function(error) {
      self.setState({ errors: error.response.data })
    });
  }


  render() {
    const { store } = this.context;
    const user = store.getState().user[0];

    if (user && user.redirect) {
      return <Redirect to='/' />;
    }

    return (
      <div className="container">

        { !_.isEmpty(this.state.errors) ? <Errors errors={this.state.errors} /> : '' }

        <form ref='form' action="/users/sign_in" method="post">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" ref="email" name="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" ref="password"  name="password" className="form-control" placeholder="Password" required />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.logIn}>Submit</button>
        </form>

      </div>
    )
  }
}

LogIn.contextTypes = {
  store: React.PropTypes.object
};

