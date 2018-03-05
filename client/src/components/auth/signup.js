import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    handleFormSubmit(formProps) {
        this.props.signupAdmin(formProps);
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
        const {handleSubmit, fields: { username, first_name, last_name, password, confirm_password }} = this.props;
    
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className='form-group'>
                    <label>Username:</label>
                    <input className='form-control' {...username} />
                    {username.touched && username.error && <div className='error'>{username.error}</div>}
                </fieldset>
                <fieldset className='form-group'>
                    <label>First Name:</label>
                    <input className='form-control' {...first_name} />
                    {first_name.touched && first_name.error && <div className='error'>{first_name.error}</div>}
                </fieldset>
                <fieldset className='form-group'>
                    <label>Last Name:</label>
                    <input className='form-control' {...last_name} />
                    {last_name.touched && last_name.error && <div className='error'>{last_name.error}</div>}
                </fieldset>
                <fieldset className='form-group'>
                    <label>Password:</label>
                    <input className='form-control' type='password' {...password} />
                    {password.touched && password.error && <div className='error'>{password.error}</div>}
                </fieldset>
                <fieldset className='form-group'>
                    <label>Confirm Password:</label>
                    <input className='form-control' type='password' {...confirm_password} />
                    {confirm_password.touched && confirm_password.error && <div className='error'>{confirm_password.error}</div>}
                </fieldset>
                <button action='submit' className='btn btn-primary'>Sign Up</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if(!formProps.username) {
        errors.username = 'Username cannot be blank';
    }
    if (!formProps.first_name) {
        errors.first_name = 'First Name cannot be blank';
    }
    if (!formProps.last_name) {
        errors.last_name = 'Last Name cannot be blank';
    }
    if (!formProps.password) {
        errors.password = 'Password cannot be blank';
    }
    if (formProps.password !== formProps.confirm_password) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}

export default reduxForm({
    form: 'signup',
    fields: ['username', 'first_name', 'last_name', 'password', 'confirm_password'],
    validate
}, mapStateToProps, actions)(Signup);