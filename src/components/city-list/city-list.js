import React, {Component} from 'react';
import {connect} from 'react-redux';
import Graph from '../graph/graph';

import * as actions from '../../actions/';

class CityList extends Component {
  renderCity(data) {

    const name         = data.city.name,
          tempList     = data.list.map(weather => weather.main.temp),
          humidityList = data.list.map(weather => weather.main.humidity),
          pressureList = data.list.map(weather => weather.main.pressure),
          graphHeight  = 150,
          graphWidth   = 180;

    return (
      <tr key={name}>
        <td>{name}</td>
        <td><Graph data={tempList} color="orange" units="degrees" height={graphHeight} width={graphWidth} /></td>
        <td><Graph data={humidityList} color="blue" units="barometry things" height={graphHeight} width={graphWidth}/></td>
        <td><Graph data={pressureList} color="purple" units="pressures" height={graphHeight} width={graphWidth}/></td>
      </tr>
    )
  }

  componentWillMount() {
    this.props.fetchCityWeather();
  }

  render() {
    return (
      <div>
        {this.renderCityList()}
      </div>
    );
  }

  renderCityListLoading() {
    return (
      <div className="loader">Loading...</div>
    );
  }

  renderCityListEmpty() {
    //todo - some kind of enticement to add cities!!
    return <div>City is Empty!</div>
  }

  renderCityListTable() {
    return (
      <table className="table table-hover">
        <thead>
        <tr>
          <th>City</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Pressure</th>
        </tr>
        </thead>
        <tbody>
        {this.props.cities.map(this.renderCity)}
        </tbody>
      </table>
    );
  }

  renderCityListCatastrophe() {
    return <div>Uh oh...</div>
  }

  renderCityList() {
    // console.log(this.props.cities);
    //todo - set up initial state so that it's loading...
    if (this.props.cities == null) return this.renderCityListLoading();
    if (this.props.cities.length === 0) return this.renderCityListEmpty();
    if (this.props.cities.length > 0) return this.renderCityListTable();
  }
}

function mapStateToProps({cities}) {
  return {cities: cities.cities};
}

export default connect(mapStateToProps, actions)(CityList);
