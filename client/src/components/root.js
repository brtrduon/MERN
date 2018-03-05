import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import * as actions from '../actions';

class Root extends Component {
    render() {
        return (
            <div>
                <Header />
                You have logged in
            </div>
        );
    }
}

export default Root;