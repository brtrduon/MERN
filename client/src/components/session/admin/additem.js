import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Upload from './upload/upload';
import * as actions from '../../../actions';

class Additem extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         img: '',
    //     };
    // };

    // onChange = event => {
    //     const state = this.state;

    //     switch(event.target.name) {
    //         case 'img':
    //             state.img = event.target.files[0];
    //             break;
    //         default:
    //             state[event.target.name] = event.target.value;
    //     };

    //     this.setState(state);
    // }

    handleFormSubmit(formProps) {
        // onSubmit = event => {
        //     event.preventDefault();
        //     const { img } = this.state;
        //     const ROOT_URL = 'http://localhost:8000';
        //     let fd = new FormData();

        //     fd.append('img', img);

        //     axios.post(`${ROOT_URL}/upload`, fd)
        //         .then(res => {
        //             console.log(res);
        //         });
        //     }
        
        this.props.addItem(formProps);
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

    render(){
        const {handleSubmit, fields: { name, price, desc, img }} = this.props;
        return (
            <div>
                <Upload />
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    {/* <fieldset className='form-group'>
                        <label>Upload an image</label>
                        <input type='file' encType='multipart/form-data' onChange={this.onChange} {...img} value={null} />
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
    // if(!formProps.img) {
    //     errors.img = 'Please select an image';
    // }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}

export default reduxForm({
    form: 'additem',
    fields: ['name', 'price', 'desc', 'img'],
    validate
}, mapStateToProps, actions)(Additem);