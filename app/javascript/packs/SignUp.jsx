import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class SignUp extends React.Component {
  render() {
    return (
      <div className="container">
        <p>This is the signup page.</p>
        <ul>
          <li>Create sign up form markup</li>
          <li>Add post axios request to devise controller</li>
          <li>Configure devise controller to make user</li>
          <li>Return json object to component</li>
          <li>Kick data up to parent and setState</li>
        </ul>
        <form action="/users" method="post">
          <div className="form-group">
            <label for="email">Email Address</label>
            <input type="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="form-group">
            <label for="password">Password (6 characters minimum)</label>
            <input type="password" className="form-control" placeholder="Password" required />
          </div>
          <div className="form-group">
            <label for="password">Password Confirmation</label>
            <input type="password" className="form-control" placeholder="Password" required />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
}

export default SignUp;
