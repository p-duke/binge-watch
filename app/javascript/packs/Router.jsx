//Main.js Component - This is handling the routes
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';

class Router extends React.Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path='/' component={Home} />

          <Route exact path='/users/new' render={() => (
              <SignUp loginUser={this.props.loginUser} />
          )} />
        </Switch>
      </div>
    )
  }
}

export default Router;
