import React, { Component } from 'react';
// import { connect } from 'react-redux';
import axios from 'axios';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
        };
        this.updateImg = this.updateImg.bind(this);
    };

    onChange = event => {
        const state = this.state;

        switch(event.target.name) {
            case 'img':
                state.img = event.target.files[0];
                break;
            default:
                state[event.target.name] = event.target.value;
        };
        this.setState(state);
    }

    onSubmit = event => {
        event.preventDefault();
        const { img } = this.state;
        const ROOT_URL = 'http://localhost:8000';

        let fd = new FormData();
        fd.append('img', img);

        axios.post(`${ROOT_URL}/upload`, fd)
            .then(res => {
                console.log(res);
            });
    };

    render() {
        const { img } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <input type='file' name='img' onChange={this.onChange} />
                <input type='submit' value='Upload' />
            </form>
        );
    }
}

// export default connect(Upload);