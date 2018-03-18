import React, { Component } from 'react';
import Adminheader from './adminheader';

export default class Adminapp extends Component {
  render() {
    return (
      <div>
        <Adminheader />
        {this.props.children}
      </div>
    );
  }
}
