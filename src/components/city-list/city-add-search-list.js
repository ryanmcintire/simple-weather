import React, {Component} from 'react';

import {Link} from 'react-router';

import * as actions from '../../actions';

export default class CityAddSearchList extends Component {
  render() {
    return (
      <div>
        From the search list!
      </div>
    )
  }
}


//todo -
/*
CityAdd will kick off the search.  It will dispatch an action that
will make a call to the api and get the city list.
Then it will update the city search results object with the list of cities from the
search result.
CityAddSearchList will be expecting that data.
 */
