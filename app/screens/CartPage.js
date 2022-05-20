import React, { useContext, useEffect } from "react";
import { View, Button, Text, Dimensions } from "react-native";

import { ShopContext } from "../store/ShopContext";
//import MainNavigation from "../components/MainNavigation";
// import { removeProductFromCart } from '../store/actions';

const CartPage = (props) => {
  const context = React.useContext(ShopContext);
  //const { state, dispatch } = React.useContext(AuthContext);

  useEffect(() => {
    // console.log('context cart length:' + context.cart.length);
  }, []);

  return (
    <View style={{ flexDirection: "row", width: "80%", marginTop: 50 }}>
      <Text>
        nb produits du panier :
        {context.cart.reduce((count, curItem) => {
          return count + curItem.quantity;
        }, 0)}
      </Text>

      <View className="cart">
        {context.cart.length <= 0 && <Text>Votre panier est vide!</Text>}

        {context.cart.map((cartItem) => (
          <Text key={cartItem.id}>
            <View>
              <Text>
                {cartItem.title} - {cartItem.price} Eur ({cartItem.quantity})
              </Text>
            </View>
            <View>
              <Button
                title="X"
                onPress={context.removeProductFromCart.bind(this, cartItem.id)}
              />
              {/*
                
                */}
            </View>
          </Text>
        ))}
      </View>
    </View>
  );
};

// const mapStateToProps = state => {
//   return {
//     cartItems: state.cart,
//     cartItemCount: state.cart.reduce((count, curItem) => {
//       return count + curItem.quantity;
//     }, 0)
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     removeProductFromCart: id => dispatch(removeProductFromCart(id))
//   };
// };

export default CartPage;
