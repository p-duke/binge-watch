import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

class LogOut extends React.Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    this.logOutSuccess = this.props.logOutSuccess.bind(this);
  }

  logOut() {
    const self = this;

    axios({
      method: "DELETE",
      url: '/users/sign_out',
      data: {
        id: self.props.state.id
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      },
    }).then(function() {
      self.props.logOutSuccess();
      window.location.href = "/";
    }).catch(function(error) {
      console.log(error);
      window.location.href = "/";
    });
  }

  render() {
    if (!this.props.state.isLoggedIn) {
      return <Redirect to='/' />;
    }

    { this.props.state.isLoggedIn ? this.logOut() : null }
    return ( null );
  }
}

export default LogOut;
