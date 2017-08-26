import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class SignUp extends React.Component {
  render() {
    return (
      <div className="container">
        <form action="/users" method="post">
          <div className="form-group">
            <label for="name">Username</label>
            <input type="text" className="form-control" placeholder="Username" required />
          </div>
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

// Notes:
// Add post axios request to devise controller
// Configure devise controller to make user
// Return json object to component
// Kick data up to parent and setState
