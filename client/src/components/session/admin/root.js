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
                {this.state.items.map(item => {
                    return <div key={item.id}>
                        <p>Item name: {item.name}</p>
                        <p>Price: {item.price}</p>
                        <p>Description: {item.desc}</p>
                        <hr></hr>
                    </div>
                },
                    // <li key={item.id}>Item name: {item.name} </li>
                )}
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         items: state.auth.items
//     };
// }

// export default connect(mapStateToProps, actions)(Root);

export default Root;