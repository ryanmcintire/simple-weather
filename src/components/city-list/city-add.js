import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import CityAddSearchList from './city-add-search-list';

import * as actions from '../../actions';

class CityAdd extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleClick(e) {
    console.log('Searching!');
    console.log('value: ' + this.state.value);
    this.props.citySearch(this.state.value);
  }

  render() {
    console.log(this.props.searchResults);
    return (
      <div className="container">
        <div className="container">
          <div className="row">
            <form className="form-city-search" onSubmit={this.handleSubmit}>
              <h2 className="search-city-heading">Enter name of city to search for:</h2>
              <input className="form-control" value={this.state.value} onChange={this.handleChange.bind(this)} autofocus/>
              <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleClick.bind(this)}>Search</button>
            </form>
          </div>
        </div>
        <div className="container">
          <CityAddSearchList />
        </div>
      </div>
    )
  }
}

function mapStateToProps({cities}) {
  return {
    searchResults: cities.searchResults
  }
}


export default connect(mapStateToProps, actions)(CityAdd);
