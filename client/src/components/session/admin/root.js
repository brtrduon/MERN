import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions';

class Root extends Component {
    componentWillMount() {
        this.props.getItems();
    }

    render() {
        return (
            <div>
                <Link className='link' to='/admin/additem'>Add Item</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.auth.items
    };
}

export default connect(mapStateToProps, actions)(Root);