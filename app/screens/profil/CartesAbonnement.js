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

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../config/styles/StyleGeneral";
import { StoreContext } from "../../store/store";
import {CartesAbonnementContext} from "../../store/storeCartesAbonnement";
import { ListItem } from "react-native-elements";



export default function CartesAbonnement({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("CreerCarteAbonnement");
    console.log("submit");
  };

  const { state, dispatch } = React.useContext(StoreContext);
  const { stateCartesAbonnement, dispatchCartesAbonnement } = React.useContext( CartesAbonnementContext );
  const [cartes, setCartes] = useState([stateCartesAbonnement.cartes]);

  useEffect(() => {

    setCartes(stateCartesAbonnement.cartes);

  }, [stateCartesAbonnement.cartes]);


  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        top: "10%",
      }}
    >
      <Text style={{ fontSize: 20 }}>Mes cartes achetés</Text>
      <Text style={{ fontSize: 20 }}>Mes brouillons</Text>
      

      <FlatList

        data={cartes}

        renderItem={({ item,index }) => ( console.log(item) )}
      /* renderItem={({ item,index }) => (
          <ListItem
            key={index.toString()}
            title={item.nom}
            subtitle={item.prenom}
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              margin: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: "#ddd",
              width: "100%",
            }}

            leftAvatar={{ source: { uri: item.image } }}
            bottomDivider
            chevron
            onPress={() => {
              navigation.navigate("DetailCarteAbonnement", {
                id: item.id,
              });
            }}

           
          />
        )}
*/
        keyExtractor={(item, index) => {
          // console.log("index", index)
          return index.toString();
        }}
      />





      <Text style={{ fontSize: 20 }}>Mes autres cartes</Text>
      <Text style={{ fontSize: 20 }}>Associer une carte</Text>

      <Pressable onPress={() => navigation.navigate("CreerCarteAbonnement")}>
        <View style={[styles.labelCard, styles.labelAchat]}>
          <Text style={styles.textBigButton}>Acheter une nouvelle carte</Text>
        </View>
      </Pressable>
    </View>
  );
}


