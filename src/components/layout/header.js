import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import * as actions from '../../actions';

class Header extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  signOutUser(e) {
    console.log('clicked');
    e.preventDefault();
    this.props.signOutUser();
    this.context.router.push('/');
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/app">Weatherspace</Link>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/app">Home</Link></li>
            <li><Link to="/app/add">Add</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/admin">Admin</Link></li>
            <li><a href="#" onClick={this.signOutUser.bind(this)} >Signout</a></li>
          </ul>
        </div>
      </nav>

    );
  }
}

export default connect(null, actions)(Header);
