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
                value:""
                },
            street:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'Street'
                    },
                    value:""
                },
            zipCode:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'ZIP'
                    },
                    value:""
                },
            Contry:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'Country'
                    },
                    value:""
                    },
            email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder:'Email'
                    },
                    value:""
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
         this.setState({loading:true})
        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => this.setState({loading:false}));
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
            <form>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}/>
                        
                   ))}
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
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