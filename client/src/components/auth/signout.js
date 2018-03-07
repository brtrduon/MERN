import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../header';
import * as actions from '../../actions';

class Signout extends Component {
    componentWillMount() {
        this.props.signoutAdmin();
    }

    render() {
        return <div>
            <Header />
            Successfully signed out
            </div>
    }
}

export default connect(null, actions)(Signout);