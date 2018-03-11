import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
// import axios from 'axios';
import * as actions from '../../../actions';

class Additem extends Component {
    handleFormSubmit(formProps) {
        this.props.addItem(formProps);
    }
    
    // state = {
    //     selectedFile: null
    // };
    
    // fileSelectedHandler = event => {
    //     this.setState({
    //         selectedFile: event.target.files[0]
    //     });
    // }
    
    // fileUploadHandler = () => {
    //     const ROOT_URL = 'http://localhost:8000';
    //     const fd = new FormData();
    //     fd.append('img', this.state.selectedFile, this.state.selectedFile.name);
    //     axios.post(`${ROOT_URL}/imgupload`)
    //     .then(res => {
    //         console.log(res);
    //     });
    // }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className='alert alert-danger'>
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
        const {handleSubmit, fields: { name, price, desc }} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    {/* <fieldset className='form-group'>
                        <label>Upload image:</label>
                        <br></br>
                        <input type='file' onChange={this.fileSelectedHandler} {...img} />
                        <button onClick={this.fileUploadHandler}>Upload</button>
                    </fieldset> */}
                    <fieldset className='form-group'>
                        <label>Item Name:</label>
                        <input className='form-control' {...name} />
                        {name.touched && name.error && <div className='error'>{name.error}</div>}
                    </fieldset>
                    <fieldset className='form-group'>
                        <label>Price:</label>
                        <input className='form-control' {...price} />
                        {price.touched && price.error && <div className='error'>{price.error}</div>}
                    </fieldset>
                    <fieldset className='form-group'>
                        <label>Description:</label>
                        <input className='form-control' {...desc} />
                        {desc.touched && desc.error && <div className='error'>{desc.error}</div>}
                    </fieldset>
                    {this.renderAlert()}
                    <button action='submit' className='btn btn-primary'>Add Item</button>
                </form>
            </div>
        );
    };
}

function validate(formProps) {
    const errors = {};

    if(!formProps.name) {
        errors.name = 'Item name cannot be blank';
    }
    if(!formProps.price) {
        errors.price = 'Price cannot be blank';
    }
    if(!formProps.desc) {
        errors.desc = 'Description cannot be blank';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}

export default reduxForm({
    form: 'additem',
    fields: ['name', 'price', 'desc'],
    validate
}, mapStateToProps, actions)(Additem);