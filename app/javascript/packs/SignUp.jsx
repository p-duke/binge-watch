import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <p>This is the signup page.</p>
        <ul>
          <li>Create sign up form markup</li>
          <li>Add post axios request to devise controller</li>
          <li>Configure devise controller to make user</li>
          <li>Return json object to component</li>
          <li>Kick data up to parent and setState</li>
        </ul>
      </div>
    )
  }
}

export default SignUp;
