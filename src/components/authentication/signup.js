import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';

import * as actions from '../../actions/';
import errorMsg from '../../helpers/errormsg';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    return errorMsg(this.props.errorMessage);
  }

  render() {
    const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input className="form-control" {...passwordConfirm} />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email address.';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a confirm password.'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a confirm password.'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match.'
  }

  return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error}
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
