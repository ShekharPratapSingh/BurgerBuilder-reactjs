import React, { Component } from 'react';
import Auxilary from '../../hoc/auxilary';
import Burger from '../../Component/Burger/Burger';
class burgerbuilder extends Component {
    state = { 
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0
        }
     }
    render() {
        return (
            <Auxilary>
                <Burger ingredients={this.state.ingredients} />
            </Auxilary>
        );
    }
}

export default burgerbuilder;