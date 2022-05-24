import React, { useEffect, useState } from "react";
import {
  Linking,
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

import { useRoute } from "@react-navigation/native";

import styles from "../config/styles/StyleGeneral";

import axios from "axios";

import { StoreContext } from "../store/store";
import { FavorisContext } from "../store/storeFavoris";

export default function ProfilMenu({ navigation }) {
  const { state, dispatch } = React.useContext(StoreContext);
  const {stateFavoris, dispatchFavoris} = React.useContext(FavorisContext);


  const route = useRoute();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [nom, setNom] = useState("");
  const [isLogged, setIsLogged] = useState("");

  const deconnexion = async () => {
    try {
      console.log("dispatch logout");
      dispatch({
        type: "LOGOUT",
      });
      navigation.navigate("Login");
    } catch (exception) {
      console.log(exception);
    }
  };

  const favoris = () => {
    navigation.navigate("Favoris");
  };



  useEffect(() => {
    axios
      .get("https://api.festivaloffavignon.com/favorite", {
        headers: {
          "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
          token: state.token,
        },
      })
      .then((response) => {
        console.log("query fav: " + response.data.favoris);

       

        dispatchFavoris({
          type: "SET_FAVORITES",
          //SET_FAVORITE
          payload: response.data.favoris,
        });

        dispatchFavoris({
          type: "SELECT_FAVORITES",
          //SET_FAVORITE
          payload: response.data.favoris,
        });


        // map
       //response.data.favoris.map((ud) => {
       //  dispatchFavoris({
       //    type: "SELECT_FAVORIS",
       //    payload: ud,
       //  });
//});
       


      });
    console.log("favoris enregistrés");


  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top:'10%', padding: 30 }}>
    {/*
    {state.isAuthenticated && (
      <Text style={{fontSize: 20}}>Bonjour {state.user.prenom}</Text>
      
      )}*/}
      
      <View style={[styles.blocGris, styles.flexColumn]}>
        <View style={{width: '100%', alignItems: "center"}}>
          <Text style={[styles.colorOrange, styles.ParagraphBold]}>Personnel</Text>
        </View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Image style={{resizeMode: "cover",height: 35,width: 35,alignItems: 'flex-start'}} 
          source={require("../assets/profil-profil.png")} />
            <Button color="#231f20" title="Mon profil" onPress={ () => { navigation.navigate('ModifierProfil');  }}  />
            <Image style={{resizeMode: "cover",height: 35,width: 35,position: 'absolute', right:0}} 
          source={require("../assets/next.png")} />
        </View>

        <View style={styles.SeparateurSmall}></View>
        <View >
         
          <Pressable onPress={favoris} style={{width: '100%', flexDirection: 'row'}}>
          <Image style={{resizeMode: "cover",height: 35,width: 35,alignItems: 'flex-start'}} 
          source={require("../assets/profil-favoris.png")} />
            <Text style={{alignItems:'center'}}>Mes favoris</Text>
            <Image style={{resizeMode: "cover",height: 35,width: 35,position: 'absolute', right:0}} 
          source={require("../assets/next.png")} />
          </Pressable>

        </View>
        
      </View>

      <View style={[styles.blocGris, styles.flexColumn]}>
        <View style={{width: '100%', alignItems: "center"}}>
          <Text style={[styles.colorOrange, styles.ParagraphBold]}>Mes réservations & cartes</Text>
        </View>

        <View style={{width: '100%', flexDirection: 'row'}}>
          <Image style={{resizeMode: "cover",height: 35,width: 35,alignItems: 'flex-start'}} 
          source={require("../assets/profil-panier.png")} />
            <Button color="#231f20"  title="Mon panier"  onPress={ () => { navigation.navigate('CartPage');  }} />
            <Image style={{resizeMode: "cover",height: 35,width: 35,position: 'absolute', right:0}} 
          source={require("../assets/next.png")} />
        </View>
        <View style={styles.SeparateurSmall}></View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Image style={{resizeMode: "cover",height: 35,width: 35,alignItems: 'flex-start'}} 
          source={require("../assets/profil-ticketoff.png")} />
            <Button color="#231f20" title="Mes places de spectacles" onPress={ () => { navigation.navigate('PlacesSpectacles');  }}  />
            <Image style={{resizeMode: "cover",height: 35,width: 35,position: 'absolute', right:0}} 
          source={require("../assets/next.png")} />
        </View>
        <View style={styles.SeparateurSmall}></View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Image style={{resizeMode: "cover",height: 35,width: 35,alignItems: 'flex-start'}} 
          source={require("../assets/profil-carte.png")} />
            <Button color="#231f20" title="Mes cartes d'abonnement" onPress={ () => { navigation.navigate('CartesAbonnement');  }}   />
            <Image style={{resizeMode: "cover",height: 35,width: 35,position: 'absolute', right:0}} 
          source={require("../assets/next.png")} />
        </View>
        <View style={styles.SeparateurSmall}></View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Image style={{resizeMode: "cover",height: 35,width: 35,alignItems: 'flex-start'}} 
          source={require("../assets/profil-factures.png")} />
            <Button color="#231f20" title="Mes factures" onPress={ () => { navigation.navigate('Factures');  }}   />
            <Image style={{resizeMode: "cover",height: 35,width: 35,position: 'absolute', right:0}} 
          source={require("../assets/next.png")} />
        </View>

        
      </View>


      <View style={[styles.blocGris, styles.flexColumn]}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Image style={{resizeMode: "cover",height: 35,width: 35,alignItems: 'flex-start'}} 
          source={require("../assets/profil-pdf.png")} />
            <Button color="#231f20" title="Programme PDF" onPress={() => Linking.openURL('https://appli.ovh/off/pdf-tcra/test.pdf')}  />
            <Image style={{resizeMode: "cover",height: 35,width: 35,position: 'absolute', right:0}} 
          source={require("../assets/next.png")} />
        </View>




      
      </View>

      
      {/*state.isAuthenticated && (
        
        <Text style={{fontSize: 20}}>Token : {state.token}</Text>
        
      )*/}

  <View style={{ flex: 1, justifyContent: 'flex-end', bottom:'15%' }}>
  
  <Image
      source={require("../assets/logo.png")}
      style={{position: "absolute", right: 10,width: 100, height: 100, bottom: 20}}
      />
  
    <Pressable
      onPress={deconnexion}       
      style={[styles.labelCard, styles.labelAchat, styles.bigButton]}      >
      <Text style={styles.textBigButton}>Déconnexion</Text>
    </Pressable>




    {/*<Button title="Déconnexion" onPress={deconnexion} /> */}



  </View>
</View>
  );
}
