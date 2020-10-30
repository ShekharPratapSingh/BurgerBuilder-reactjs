import React from 'react';
import classes from '../Burger/Burger.css';
import BurgerIngredient from '../Burger/BurgerIngridient/BurgerIngredient';


const Burger = (props) => {
    let transformBurger = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, i) => {
            return <BurgerIngredient key={igkey + i} type={igkey} />
        })
    }).reduce((acc, cur) => {
        return acc.concat(cur)
    }, []);
    if (transformBurger.length === 0) {
        transformBurger=<p>Please start adding ingredient</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformBurger}
            <BurgerIngredient type="bread-bottom"/>
            
       </div> 
    );
};
export default Burger;