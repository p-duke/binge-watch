import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import Errors from './Errors';
import { isEmpty } from 'lodash';
<<<<<<< HEAD
import LogInForm from './LogInForm';
=======
import { Link } from 'react-router-dom';
>>>>>>> WIP

export default class LogIn extends React.Component {
  constructor() {
    super();
    this.logIn = this.logIn.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.togglePasswordReset = this.togglePasswordReset.bind(this);
    this.state = {
      errors: [],
      forgetPasswordToggle: false,
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

  togglePasswordReset(e) {
    e.preventDefault();
    this.setState({ forgetPasswordToggle: !this.state.forgetPasswordToggle });
  }

  resetPassword(e) {
    e.preventDefault();
    const self = this;

    axios({
      method: 'PATCH',
      url: '/users/password',
      data: {
        email: this.refs.email.value,
        new_password: this.refs.newPassword.value,
        new_password_confirmation: this.refs.newPasswordConfirmation.value,
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      debugger;
    }).catch(function(error) {
      debugger;
      self.setState({ errors: error.response.data })
    });
  }

  logIn(e) {
    e.preventDefault();
    const self = this;
    const { values } = this.refs.form.ref.context.store.getState().form.logIn;

    axios({
      method: 'POST', 
      url: e.target.formAction,
      data: {
        email: values.email,
        password: values.password,
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    }).then(function(response) {
      localStorage.setItem('user', JSON.stringify(response.data))
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

<<<<<<< HEAD
        <LogInForm ref='form' logIn={this.logIn} />
=======
          { this.state.forgetPasswordToggle
              ?
              <form ref='form' action="/users/sign_in" method="post">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" ref="email" name="email" className="form-control" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <label>New Password (6 characters minimum)</label>
                  <input type="password" ref="newPassword"  name="new_password" className="form-control" placeholder="New Password" required />
                </div>
                <div className="form-group">
                  <label>New Password Confirmation</label>
                  <input type="password" ref="newPasswordConfirmation"  name="new_password_confirmation" className="form-control" placeholder="New Password" required />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary" onClick={this.resetPassword}>Submit</button>
                </div>
                <div className="form-group">
                  <a type="submit"  onClick={this.togglePasswordReset}>Back to Login</a>
                </div>
              </form>
              :
              <form ref='form' action="/users/sign_in" method="post">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" ref="email" name="email" className="form-control" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" ref="password"  name="password" className="form-control" placeholder="Password" required />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary" onClick={this.logIn}>Submit</button>
                </div>
                <div className="form-group">
                  <a type="submit"  onClick={this.togglePasswordReset}>Forgot password?</a>
                </div>
              </form>
          }
>>>>>>> WIP
      </div>
    )
  }
}

LogIn.contextTypes = {
  store: React.PropTypes.object
};

