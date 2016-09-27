import React, {Component} from 'react';
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';

function average(data) {
  var sum = 0;
  data.forEach(function(element) {
    sum += element;
  });
  return Math.round(sum/data.length);
}

export default class Graph extends Component {
  render() {
    return (
      <div>
        <Sparklines height={this.props.height} width={this.props.width} data={this.props.data}>
          <SparklinesLine color={this.props.color} />
          <SparklinesReferenceLine type="avg" />
          </Sparklines>
        <div>{average(this.props.data)} {this.props.units}</div>
      </div>
    );
  }
}


