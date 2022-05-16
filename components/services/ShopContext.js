import React from "react";

export const ShopContext = React.createContext({
  products: [
    { id: "p1", title: "shakespear spectacle 1", price: 29.99 },
    { id: "p2", title: "moliere spectacle 1", price: 9.99 },
    { id: "p3", title: "Used plastic bottle", price: 0.99 },
    { id: "p4", title: "Half-dried plant", price: 2.99 },
    { id: "28073", title: "28995Gaming Mouse", price: 29.99 },
  ],
  cart: [
    { id: "p1", title: "shakespear spectacle 1", price: 29.99,quantity:1 },
    { id: "p2", title: "moliere spectacle 1", price: 9.99,quantity:1 },
  ],
  addProductToCart: product => {},
  removeProductFromCart: productId => {}
});


