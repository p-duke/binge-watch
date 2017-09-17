import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, validate } from './formValidation';

class SignUpForm extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form ref='form' action="/users" method="post" onSubmit={handleSubmit}>
        <Field label="Username" type="text" ref="username" name="username" component={renderField}  required />
        <Field label="Email Address" type="email" ref="email" name="email" component={renderField}  required />
        <Field label="Password (6 characters minimum)" type="password" ref="password" name="password" component={renderField}  />
        <Field label="Password Confirmation" type="password" ref="passwordConfirmation" name="passwordConfirmation" component={renderField}  required />
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting} onClick={this.props.signUp}>Submit</button>
        </div>
      </form>
    )
  }
}

SignUpForm = reduxForm({
  form: 'signUp',
  validate,
})(SignUpForm);

export default SignUpForm;
