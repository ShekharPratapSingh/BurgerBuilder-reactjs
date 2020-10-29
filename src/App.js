import React, { Component } from 'react';
import Layout from "./Component/Layout/layout";
import BurgerBuilder from './Container/BurgerBuilder/burgerbuilder'
class App extends Component {
  state = {  }
  render() {
    return (
      <Layout>
       <BurgerBuilder />
      </Layout>
    );
  }
}

export default App;