//Main.js Component - This is handling the routes
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import LogIn from './LogIn';
import LogOut from './LogOut';

export default class Main extends React.Component {
  render() {
    return(
      <main>
        <Switch>
          <Route exact path='/' render={() => (
            <Home state={this.props.state} />
          )} />

          <Route exact path='/users/sign_up' render={() => (
             <SignUp state={this.props.state} loginUserSuccess={this.props.loginUserSuccess} />
          )} />

          <Route exact path='/users/sign_in' render={() => (
             <LogIn state={this.props.state} loginUserSuccess={this.props.loginUserSuccess} />
          )} />

          <Route exact path='/users/sign_out' render={() => (
             <LogOut state={this.props.state} logOutSuccess={this.props.logOutSuccess} />
          )} />
        </Switch>
      </main>
    )
  }
}

