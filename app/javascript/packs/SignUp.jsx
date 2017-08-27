import React from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount(nextProps) {
    this.loginUser = this.props.loginUser.bind(this);
  }

  signUp(e) {
    e.preventDefault();
    const loginUser = this.loginUser;

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
      loginUser(response.data);
      window.location.href = "/";
    }).catch(function(error) {
      console.log(error);
    });
  }


  render() {
    return (
      <div className="container">
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
          <button type="submit" className="btn btn-default" onClick={this.signUp}>Submit</button>
        </form>
      </div>
    )
  }
}

// Notes:
// Kick data up to parent and setState
