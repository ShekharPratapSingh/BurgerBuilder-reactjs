import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl' 

const Controls = [
    { label:"Salad", type: "salad" },
    { label:"Bacon", type: "bacon" },
    { label:"Cheese", type: "cheese" },
    { label:"Meat", type: "meat" }
    
]

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong> </p>
        {Controls.map(ctrl => {
            return <BuildControl
                key={ctrl.label}
                Label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={()=>props.ingredientRemoved(ctrl.type)}/>
        })};
        <button
            className={classes.OrderButton}
        disabled={ !props.purchasable}>ORDER NOW</button>
    </div>
)
export default BuildControls;