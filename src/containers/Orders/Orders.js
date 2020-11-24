import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state = {
        orders:[],
        loading:true
    }
    componentDidMount() {
        axios
            .get('/orders.json')
            .then(res => {
                const fetchedData = [];
                for (let key in res.data) {
                    fetchedData.push({
                        ...res.data[key],
                        id:key
                    })
                }
               
                this.setState({ loading: false, orders: fetchedData });
            })
        .catch(err=>console.log(err))

    }
    render() {
        return (
            <div>
                {this.state.orders.map(orders => (
                    <Order
                        key={orders.id}
                        ingredients={orders.ingredient}
                        price={+orders.price }/>
                ))}
            </div>

        );
}
}

export default WithErrorHandler(Orders, axios);