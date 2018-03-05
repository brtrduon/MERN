import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
    componentWillMount() {
        this.props.signoutAdmin();
    }

    render() {
        return <div>Successfully signed out</div>
    }
}

export default connect(null, actions)(Signout);