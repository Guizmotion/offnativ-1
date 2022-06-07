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
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CartesAbonnementContext} from "../../store/storeCartesAbonnement";
import { NavigationContainer } from "@react-navigation/native";

import styles from "../../config/styles/StyleGeneral";

import * as ImagePicker from 'expo-image-picker';

export default function CreerCarteAbonnement({ navigation }) {


  const { stateCartesAbonnement, dispatchCartesAbonnement } = React.useContext( CartesAbonnementContext );

  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [CodePostal, setCodePostal] = useState("");
  const [Ville, setVille] = useState("");
  const [Pays, setPays] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [livraison, setLivraison] = useState("");
  const [photo, setPhoto] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
      base64: true,

    });

    console.log(result);

    if (!result.cancelled) {
      setImage( result.uri);
      setPhoto(result.base64);
      //'data:image/jpeg;base64,'
    }
  };


  const addCarteAbonnement = async() => {

   // AsyncStorage.setItem("CartesAbonnement", JSON.stringify(stateCartesAbonnement.Cartes));

   
    console.log("CartesAbonnement saved");


    const carteAbonnement = {
      "id": stateCartesAbonnement.Cartes.length + 1,
      "statut" : "brouillon",
      "numero_carte" : "123456789",
      "code_promo": "",
      "structure": "",
      "nom" : Nom,
      "prenom" : Prenom,
      "adresse" : Adresse,
      "ville" : Ville,
      "codePostal" : CodePostal,
      "telephone" : Telephone,
      "pays" : Pays,
      "livraison" : livraison,
      "photo": photo
    }
    
      dispatchCartesAbonnement({type: "ADD_CARTE_ABONNEMENT", payload: carteAbonnement})
    
 
      
   
    

    navigation.navigate("CartesAbonnement");
  }

  useEffect(() => {


//add values to async storage




  }, [stateCartesAbonnement.Cartes]);
  /*
    JSON.stringify(stateCartesAbonnement.Cartes))
  }, [stateCartesAbonnement.Cartes]);
*/

//useEffect to save new carteAbonnement in AsyncStorage
/*
  useEffect(() => {
    AsyncStorage.setItem("CartesAbonnement", JSON.stringify(stateCartesAbonnement.Cartes));
  }, [stateCartesAbonnement.Cartes]);

  */


  


  return (

    <View

      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        top: "0%",
      }}

      key="creerCartesAbonnement"
    >
      <ScrollView>
      <Text style={{ fontSize: 20 }}>Créer une carte d'abonnement</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 20, height: 20 }} />}
    
      <Text style={{ fontSize: 20 }}>Nom</Text>
      <TextInput

        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
        }}
        onChangeText={(text) => setNom(text)}
        value={Nom}
      />

      <Text style={{ fontSize: 20 }}>Prenom</Text>
      <TextInput

        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
        }}
        onChangeText={(text) => setPrenom(text)}
        value={Prenom}
      />

      <Text style={{ fontSize: 20 }}>Adresse</Text>
      <TextInput
       style={{
        height: 40,
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
      }}
        onChangeText={(text) => setAdresse(text)}
        value={Adresse}
      />

      <Text style={{ fontSize: 20 }}>Code postal</Text>
      <TextInput
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
        }}
        onChangeText={(text) => setCodePostal(text)}
        value={CodePostal}
      />

      <Text style={{ fontSize: 20 }}>Ville</Text>
      <TextInput
       style={{
        height: 40,
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
      }}
        onChangeText={(text) => setVille(text)}
        value={Ville}
      />

      <Text style={{ fontSize: 20 }}>Pays</Text>
      <TextInput
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
        }}
        onChangeText={(text) => setPays(text)}
        value={Pays}
      />

      <Text style={{ fontSize: 20 }}>Telephone</Text>
      <TextInput
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
        }}
        onChangeText={(text) => setTelephone(text)}
        value={Telephone}
      />

      <Text style={{ fontSize: 20 }}>Livraison</Text>
      <TextInput
       style={{
        height: 40,
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
      }}
        onChangeText={(text) => setLivraison(text)}
        value={livraison}
      />

      <Button
        title="Créer"
        onPress={() => {

          addCarteAbonnement(Nom, Prenom, Adresse, CodePostal, Ville, Pays, Telephone, livraison);
          
        }}
      />
      </ScrollView>
    </View>



  );
 
}