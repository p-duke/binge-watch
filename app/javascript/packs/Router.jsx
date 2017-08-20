//Main.js Component - This is handling the routes
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';

const Router = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/users/sign_up' component={SignUp} />
    </Switch>
  </div>
)

export default Router;
