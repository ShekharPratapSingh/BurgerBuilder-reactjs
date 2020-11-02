import React from 'react';
import Auxilary from '../../hoc/auxilary';
import Button from '../UI/Button/Button';
const OrderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredient).map((ikey) => {
        return (
            <li key={ikey}>
                <span style={{textTransform:"capitalize"}}>{ikey}</span>:{props.ingredient[ikey]}
            </li>
        )
    })

    return (
        <Auxilary>
        <h3>Your Order</h3>
        <p>A Delicious Burger with following ingredient</p>
        <ul>
            {ingredientSummary}
            </ul>
            <p><strong>Total Price:{props.Price}</strong></p>
            <p>Continue to Checkout?</p>
              <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button> 
            

    </Auxilary> 
    )
   
}
export default OrderSummary;