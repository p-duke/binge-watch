import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import Errors from './Errors';
import { isEmpty } from 'lodash';
import SignUpForm from './SignUpForm';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.signUp = this.signUp.bind(this);
    this.state = {
      errors: [],
      redirect: false
    }
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

  signUp(e) {
    e.preventDefault();
    const self = this;
    const { values } = this.refs.form.ref.context.store.getState().form.signUp;

    axios({
      method: 'POST', 
      url: e.target.form.action,
      data: {
        username: values.username,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    }).then(function(response) {
      localStorage.setItem('user', JSON.stringify(response.data))
      self.context.store.dispatch({
        type: 'SIGN_UP',
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        isLoggedIn: false,
        redirect: true,
      });
    }).catch(function(error) {
      self.setState({ errors: error.response.data.errors })
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
          <SignUpForm ref='form' signUp={this.signUp} />
        </div>
    )
  }
}

SignUp.contextTypes = {
  store: React.PropTypes.object
};

