import React from 'react';
import Header from './Header';
import Router from './Router';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
      username: '',
      email: ''
    };

    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(data) {
    this.setState({ id: data.id, username: data.username, email: data.email })
  }

  render() {
    return (
      <div>
        <Header />
        <Router loginUser={this.loginUser} />
      </div>
    )
  }
}
