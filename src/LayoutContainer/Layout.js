import React, { Component } from 'react';
import Header from './Header';
import "../common/commonStyle.scss";

class Layout extends Component{
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
};

export default Layout;