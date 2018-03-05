import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Root extends Component {
    render() {
        return (
            <div>
                You have logged in
            </div>
        );
    }
}

export default Root;