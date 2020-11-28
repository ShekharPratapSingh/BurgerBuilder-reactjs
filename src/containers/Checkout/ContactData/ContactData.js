import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component{
    state = {
        orderForms:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your Name'
                },
                value:"",
                validation: {
                    required: true
                },
                valid: false,
               
                },
            street:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'Street'
                    },
                value: "",
                validation: {
                        required: true
                    },
                    valid: false
                },
            zipCode:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'ZIP'
                    },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                minLength: 5,
                maxLength:5
                },
            Contry:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'Country'
                    },
                value: "",
                validation: {
                    required: true
                },
                valid: false
                    },
            email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder:'Email'
                    },
                value: "",
                validation: {
                    required: true
                },
                valid: false
                    },
            deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: 'fastest', displayValue: 'Fastest' },
                            { value: 'cheapest', displayValue: 'Cheapest' }
                            
                        ]
                    },
                    value:""
                    }
        },
        loading:false
        
    }
    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForms) {
            formData[formElementIdentifier] = this.state.orderForms[formElementIdentifier].value
            
        }
        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            orderData: formData
            
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => this.setState({loading:false}));
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid;
        }
        return isValid
    }

    inputChangeHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForms
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForms: updatedOrderForm }); 

    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForms) {
            formElementArray.push({
                id: key,
                config:this.state.orderForms[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    />
                        
                   ))}
                    <Button btnType='Success'>ORDER</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact data</h4>
                {form}
            </div>
        )
    }
}
export default ContactData