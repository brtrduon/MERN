import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../../actions';

class Root extends Component {
    componentWillMount() {
        this.props.getItems;
    }

    render() {
        return (
            <div>
                {/* loop through items from models here */}
                <Link className='link' to='/admin/additem'>Add Item</Link>
            </div>
        );
    }
}

export default Root;