import React, { useCallback, useEffect, useState } from "react";
import {
  useIsFocused,
  ToastAndroid,
  Image,
  Text,
  TextInput,
  DrawerContentScrollView,
  View,
  StyleSheet,
  ScrollViewButton,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";

import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRoute } from "@react-navigation/native";
import { StoreContext } from "../../store/store";

/*
{state.isAuthenticated && (
  <Text style={{fontSize: 20}}>Bonjour{state.user.nom}</Text>
  
  )}
  */

export default function Favoris({ navigation }) {
  const { state, dispatch } = React.useContext(StoreContext);

  const route = useRoute();
  const [listFavorites, setlistFavorites] = useState([]);
  const [token, setToken] = useState();

  async function rm_favorite(id, tok) {
    await axios
      .delete("https://api.festivaloffavignon.com/favorite", {
        headers: {
          "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
          token: tok, //state.token
        },
        data: {
          sh_id: id,
        },
      })

      .then((user) => {
        console.log(user.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          //console.log(error.response.data); // => the response payload
        }
      });
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      axios
        .get("https://api.festivaloffavignon.com/favorite", {
          headers: {
            "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
            token: state.token,
          },
        })
        .then((response) => {
          console.log("query fav: " + response.data);

          let mynewarray = JSON.stringify(response.data.favoris).split(",");

          setlistFavorites(mynewarray);
          console.log(listFavorites);
        });
      console.log("view has loaded!");
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        top: "10%",
      }}
    >
      <ScrollView>
        {listFavorites.map((item, i) => (
          <View key={i}>
            <Button
              title="DelFav"
              onPress={() =>
                rm_favorite(item.replace("[", "").replace("]", ""), state.token)
              }
            />

            <Text>Fav id : {item.replace("[", "").replace("]", "")}</Text>
          </View>
        ))}

        <TouchableOpacity></TouchableOpacity>
      </ScrollView>
    </View>
  );

  //[row]
}
