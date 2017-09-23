import React from 'react';

export const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be longer than 6 characters';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Required'
  } else if (values.passwordConfirmation !== values.password) {
    errors.passwordConfirmation = 'Passwords must be identical';
  }

  return errors;
}

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) =>
  <div className="form-group">
    <label>{ label }</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" />
      {touched && (
        (error && <div className="alert alert-warning"><strong><span> {error} </span></strong></div>)
      )}
      </div>
   </div>

