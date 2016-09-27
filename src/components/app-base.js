import React, {Component} from 'react';

import Header from './layout/header';
import Footer from './layout/footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        {this.props.children}
        <br />
        <Footer />
      </div>
    );
  }
}
