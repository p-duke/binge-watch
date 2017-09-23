import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import Errors from './Errors';
import { isEmpty } from 'lodash';
import LogInForm from './LogInForm';

export default class LogIn extends React.Component {
  constructor() {
    super();
    this.logIn = this.logIn.bind(this);
    this.state = {
      errors: [],
    }
  }

  componentDidMount(nextProps) {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  logIn(e) {
    e.preventDefault();
    const self = this;
    const { values } = this.refs.form.ref.context.store.getState().form.logIn;

    axios({
      method: 'POST', 
      url: e.target.formAction,
      data: {
        email: values.email,
        password: values.password,
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    }).then(function(response) {
      localStorage.setItem('user', JSON.stringify(response.data))
      self.context.store.dispatch({
        type: 'LOG_IN',
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        isLoggedIn: false,
        redirect: true,
      });
    }).catch(function(error) {
      self.setState({ errors: error.response.data })
    });
  }


  render() {
    const { store } = this.context;
    const user = store.getState().user[0];

    if (user && user.redirect) {
      return <Redirect to='/' />;
    }

    return (
      <div className="container">

        { !_.isEmpty(this.state.errors) ? <Errors errors={this.state.errors} /> : '' }

        <LogInForm ref='form' logIn={this.logIn} />
      </div>
    )
  }
}

LogIn.contextTypes = {
  store: React.PropTypes.object
};

