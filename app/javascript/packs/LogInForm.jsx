import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, validate } from './formValidation';

class LogInForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form ref='form' action="/users/sign_in" method="post" onSubmit={handleSubmit}>
        <Field label="Email" type="email" ref="email" name="email" component={renderField}  required />
        <Field label="Password" type="password" ref="password" name="password" component={renderField}  />
        <div className="form-group">
          <button type="submit" disabled={pristine || submitting} className="btn btn-primary" onClick={this.props.logIn}>Submit</button>
        </div>
      </form>
    )
  }
}

LogInForm = reduxForm({
  form: 'logIn',
  validate,
})(LogInForm);

export default LogInForm;
