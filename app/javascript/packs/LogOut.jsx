import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

export default class LogOut extends React.Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  logOut() {
    const self = this;
    const { user } = this.context.store.getState();

    axios({
      method: "DELETE",
      url: '/users/sign_out',
      data: {
        id: user[0].id
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      },
    }).then(function() {
      localStorage.removeItem('user');
      self.context.store.dispatch({
        type: 'LOG_OUT',
      });
      window.location.href = "/";
    }).catch(function(error) {
      console.log(error);
      window.location.href = "/";
    });
  }

  render() {
    const { store } = this.context;
    const user = store.getState().user[0];

    if (user) {
      this.logOut()
    }

    return ( <Redirect to='/' /> );
  }
}

LogOut.contextTypes = {
  store: React.PropTypes.object
};

