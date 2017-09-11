import React from 'react';
import Header from './Header';
import Main from './Main';
import { localRestore } from './helpers';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    { user ? localRestore(this.context) : null }

    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

App.contextTypes = {
  store: React.PropTypes.object
};
