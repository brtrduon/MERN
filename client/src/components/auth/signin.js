import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit({ username, password }) {
        console.log(username, password);
        this.props.signinAdmin({ username, password});
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className='alert alert-danger'>
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, fields: { username, password }} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className='form-group'>
                    <label>Username:</label>
                    <input className='form-control' {...username} />
                </fieldset>
                <fieldset className='form-group'>
                    <label>Password:</label>
                    <input className='form-control' type='password' {...password} />
                </fieldset>
                {this.renderAlert()}
                <button action='submit' className='btn btn-primary'>Sign in</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}

export default reduxForm({
    form: 'signin',
    fields: ['username', 'password']
}, mapStateToProps, actions)(Signin);