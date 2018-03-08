import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from '../header';
import * as actions from '../../actions';

class Root extends Component {

    render() {
        return (
            <div>
                <Header />
                {/* loop through items from models here */}
                <Link className='link' to='/root/additem'>Add Item</Link>
            </div>
        );
    }
}

export default connect(null, actions)(Root);