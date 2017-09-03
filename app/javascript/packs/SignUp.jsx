import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import Errors from './Errors';
import { isEmpty } from 'lodash';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.signUp = this.signUp.bind(this);
    this.state = {
      errors: [],
      redirect: false
    }
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

  signUp(e) {
    e.preventDefault();
    const self = this;

    axios({
      method: 'POST', 
      url: this.refs.form.action,
      data: {
        username: this.refs.username.value,
        email: this.refs.email.value,
        password: this.refs.password.value,
        password_confirmation: this.refs.passwordConfirmation.value
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    }).then(function(response) {
      self.context.store.dispatch({
        type: 'SIGN_UP',
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        isLoggedIn: false,
        redirect: true,
      });
    }).catch(function(error) {
      self.setState({ errors: error.response.data.errors })
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

          <form ref='form' action="/users" method="post">
            <div className="form-group">
              <label>Username</label>
              <input type="text" ref="username" name="username" className="form-control" placeholder="Username" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" ref="email" name="email" className="form-control" placeholder="Email" required />
            </div>
            <div className="form-group">
              <label>Password (6 characters minimum)</label>
              <input type="password" ref="password"  name="password" className="form-control" placeholder="Password" required />
            </div>
            <div className="form-group">
              <label>Password Confirmation</label>
              <input type="password" ref="passwordConfirmation" name="passwordConfirmation" className="form-control" placeholder="Password" required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.signUp}>Submit</button>
          </form>

        </div>
    )
  }
}

SignUp.contextTypes = {
  store: React.PropTypes.object
};

