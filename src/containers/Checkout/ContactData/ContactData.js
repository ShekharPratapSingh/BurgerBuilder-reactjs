import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        },
        loading:false
        
    }
    orderHandler = (event) => {
        event.preventDefault()
         this.setState({loading:true})
        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Shekhar Pratap Singh",
                address: {
                    street: "BTM 2nd stage"
                },
                email: "shekharpratapsingh26@gmail.com"
            },
            deliveryMethod: "fastest"
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => this.setState({loading:false}));
    }
    render() {
        let form = (
            <form>
                    <input className={classes.Input} type="text" name='name' placeholder="your name" />
                    <input className={classes.Input} type="email" name='name' placeholder="Email " />
                    <input className={classes.Input} type="text" name='name' placeholder="Street" />
                    <input className={classes.Input} type="text" name='name' placeholder="Postal Code" /> 
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