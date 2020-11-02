import React, { Component } from 'react';
import Auxilary from '../../hoc/auxilary';
import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls'
import Modal from '../../Component/UI/Modal/Modal';
import OrderSummary from '../../Component/OrderSummary/OrderSummary'
const INGREDIENT_PRICE={
    salad: 0.5,
    bacon: 1.4,
    cheese: 0.4,
    meat:0.5
}

class burgerbuilder extends Component {
    state = { 
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0
        },
        totalPrice:4,
        purchasable: false,
        purchasing:false
        
    }
    
    updatePurchasable = (ingredient) => {
        const update = Object.keys(ingredient).map(igKey => {
            return ingredient[igKey]
        }).reduce((update, el) => {
            return update + el
        }, 0);
        
        this.setState({purchasable: update>0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const UpdatedIngredient = {
            ...this.state.ingredients
        };
        UpdatedIngredient[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const PriceAddition = INGREDIENT_PRICE[type];

        const UpdatedPrice = PriceAddition + oldPrice;

        this.setState({
            totalPrice: UpdatedPrice, ingredients: UpdatedIngredient
        })

        this.updatePurchasable(UpdatedIngredient)
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const UpdatedIngredient = {
            ...this.state.ingredients
        };
        UpdatedIngredient[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const PriceDeduction = INGREDIENT_PRICE[type];

        const UpdatedPrice = oldPrice - PriceDeduction;

        this.setState({
            totalPrice: UpdatedPrice, ingredients: UpdatedIngredient
        });
        this.updatePurchasable(UpdatedIngredient)
    };

    purchaseHandler=()=> {
        this.setState({purchasing:true})
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        alert("You CAn Continue")
    }
    render() {
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    <OrderSummary
                        Price={this.state.totalPrice}
                        ingredient={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancleHandler}
                        purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Auxilary>
        );
    }
}

export default burgerbuilder;