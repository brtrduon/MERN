import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import * as actions from '../../../actions';

class Root extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        };
    }

    componentWillMount() {
        const ROOT_URL = 'http://localhost:8000';

        axios.get(`${ROOT_URL}/getitems`)
        .then(response => {
            this.setState({ items: response.data });
        });
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <th>Item name |</th>
                        <th>Price |</th>
                        <th>Description</th>
                    </thead>
                    {this.state.items.map(item => {
                        return <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.desc}</td>
                        </tr>
                        },
                    )}
                </table>
                <hr></hr>
                <Link to='/admin/additem'>Add item</Link>
            </div>
        )
    }
}

export default Root;