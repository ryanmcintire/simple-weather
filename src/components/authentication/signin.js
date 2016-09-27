import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';

import * as actions from '../../actions';

//todo - make into react component.
import errorMsg from '../../helpers/errormsg';

export default class SignIn extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };


  handleFormSubmit({email, password}) {
    this.props.signInUser({email, password});
  }

  renderAlert() {
    return errorMsg(this.props.errorMessage);
  }

  componentWillMount() {
    if (this.props.userAuthenticated) {
      this.context.router.push('/app');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userAuthenticated) {
      this.context.router.push('/app');
    }
  }

  render() {

    const {handleSubmit, fields: {email, password}} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <h2 className="form-signin-heading">Please sign in</h2>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input {...email} type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                     autofocus/>
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input {...password} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
              {this.renderAlert()}
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
              <Link className="btn btn-lg btn-info btn-block" to="/signup">Sign up</Link>
            </form>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    userAuthenticated: state.auth.userAuthenticated
  };
}

export default reduxForm({
  form: 'signin', fields: ['email', 'password']
}, mapStateToProps, actions)(SignIn);
