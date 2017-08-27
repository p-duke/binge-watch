import React from 'react';
import Header from './Header';
import Main from './Main';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
      username: '',
      email: '',
      isLoggedIn: false,
    };

    this.loginUserSuccess = this.loginUserSuccess.bind(this);
  }

  loginUserSuccess(data) {
    this.setState({ id: data.id, username: data.username, email: data.email, isLoggedIn: true, errors: [] });
  }

  render() {
    return (
      <div>
        <Header />
        <Main state={this.state} loginUserSuccess={this.loginUserSuccess} />
      </div>
    )
  }
}
