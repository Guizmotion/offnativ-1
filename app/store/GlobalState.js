import React, { useState, useReducer } from "react";


import {ShopContext}  from "./ShopContext";
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT } from "./reducers";

const GlobalState = props => {
  const products = [
    { id: "p1", title: "shakespear spectacle 1", price: 29.99 },
    { id: "p2", title: "moliere spectacle 1", price: 9.99 },
    { id: "p3", title: "Used plastic bottle", price: 0.99 },
    { id: "p4", title: "Half-dried plant", price: 2.99 },
    { id: "p9", title: "28995Gaming Mouse", price: 29.99 },
    { id: "28073", title: "28995Gaming Mouse", price: 29.99 },
  ];
  // const [cart, setCart] = useState([]);
  const [cartState, dispatch] = useReducer(shopReducer, { cart: [
    { id: "p1", title: "shakespear spectacle 1", price: 29.99,quantity:1 },
    { id: "p2", title: "moliere spectacle 1", price: 9.99,quantity:1 },
  ] });

  const addProductToCart = product => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_PRODUCT, product: product });
    }, 700);
  };

  const removeProductFromCart = productId => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: REMOVE_PRODUCT, productId: productId });
    }, 700);
  };

  return (
    <ShopContext.Provider
      value={{
        products: products,
        cart: cartState.cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default GlobalState;
