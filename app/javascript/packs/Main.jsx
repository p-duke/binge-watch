import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import LogIn from './LogIn';
import LogOut from './LogOut';
import Profile from './Profile';

export default class Main extends React.Component {
  render() {
    return(
      <main>
        <Switch>
          <Route exact path='/' render={() => (
            <Home />
          )} />

          <Route exact path='/users/sign_up' render={() => (
             <SignUp />
          )} />

          <Route exact path='/users/sign_in' render={() => (
             <LogIn />
          )} />

          <Route exact path='/users/sign_out' render={() => (
             <LogOut />
          )} />

          <Route path='/users/*/' render={() => (
            <Profile />
          )} />
        </Switch>
      </main>
    )
  }
}

