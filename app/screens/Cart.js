import React, { Component } from 'react';
import { View } from 'react-native';
import Header from './cart/Header';
import ItemsContainer from './cart/ItemsContainer';
import BasketContainer from './cart/BasketComponent';
import Footer from './cart/Footer';


export default function Cart({ navigation}) {


    return (
        <View style={{ flex: 1 }}>
          <Header />
          <ItemsContainer />
          <BasketContainer />
          <Footer />
        </View>
        
      );

}
    /*
export default class Cart extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <ItemsContainer />
        <BasketContainer />
        <Footer />
      </View>
      
    );
  }
}*/