import React, { useEffect, useState, useRef } from "react";
import {
  Picker,
  Image,
  Text,
  TextInput,
  Linking,
  DrawerContentScrollView,
  View,
  StyleSheet,
  ScrollViewButton,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  RefreshControl,
  Share
} from "react-native";
import axios from "axios";
import Loader from "./Loader";
import {Overlay, Input} from 'react-native-elements';
import styles from "../config/styles/StyleGeneral";


import { StoreContext } from "../store/store";
import { RechercheContext } from "../store/storeRecherche";

import { useNavigation } from '@react-navigation/native';
import {debounce, _} from 'lodash';


const baseUrl = "https://appli.ovh/off/app/";
const url_programme = baseUrl + "api2022.php?a=1&limit=";

const ProgrammeHeader = () => {
  const {state, dispatch} = React.useContext(StoreContext);
  const { stateRecherche, dispatchRecherche } = React.useContext(RechercheContext);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const setLimite= (limite) => {
    dispatchRecherche({ type: "SET_LIMITE", payload: limite });
  }
  
  const navigation = useNavigation();

  const filtrerProgramme = (col,orderby) => {
    let programme = state.programme;
    
    let result = _.orderBy(programme, col, orderby);
    
    dispatch({ type: "addData", payload: result });

   // console.log(result);
  };
  
  const chercherProgramme = (searchText) => {
    let programme = state.programme;

    let result = _.filter(programme, function(o) {
      return Object.keys(o).some(function(k) {
        return String(o[k]).toLowerCase().includes(searchText.toLowerCase());
      });
    });

    dispatch({ type: "addData", payload: result });
  };

  function myFilter(coll, regex) {
    return _.filter(
      coll,
      _.unary(_.partialRight(_.some, _.method('match', regex)))
    );
  }

  const trierProgramme = (col,value) => {
    let programme = state.programme;
    //setIsLoading(true);

    let filteredProg = null;

    
    
   
    
      if(col ==='all' )
      {
       console.log(value.length);
       if(value.length > 4){
       // filteredProg = _.filter(programme, spectacle => spectacle['titre_spectacle'].toLowerCase().includes(value.toLowerCase()));
        //let filteredProg2 = _.filter(programme, spectacle => spectacle['description'].toLowerCase().includes(value.toLowerCase()));
        //let filteredProg3 = _.filter(programme, spectacle => spectacle['categorie'].toLowerCase().includes(value.toLowerCase()));
       // filteredProg = _.concat(filteredProg,filteredProg2);
       // filteredProg = _.concat(filteredProg,filteredProg3);

       filteredProg = _.filter(programme, function(o) {
        return Object.keys(o).some(function(k) {
          return String(o[k]).toLowerCase().includes(value.toLowerCase());
        });
      });
      dispatch({ type: "addData", payload: filteredProg  });
    
    }

      }else{
       // filteredProg = _.filter(programme, spectacle => spectacle[col].toLowerCase().includes(value.toLowerCase()));
  
      }
    
   // setIsLoading(false);
  };



  const filtrerCategorie = (categorie) => {
    let programme = state.programme;

    let result = _.filter(programme, function(o) {
      return o.categorie === categorie;
    });

    dispatch({ type: "addData", payload: result });
  };

  //_.sortBy(data, [element], [direction]);

  
  
  return (
    <View style={[{
      shadowOpacity: 0.5,
      //zIndex:10,
      shadowRadius: 5
      ,backgroundColor: '#fff', 
      //padding: 10,
      //  paddingTop: 0, 
      //  display: isLoading ? "none" : "flex"
      
    }]
    
  }>
  
        
  <View style={{ flexDirection: "row", width: "90%", margin: '5%', marginTop: 0, marginBottom: 5 }}>
  <View>
  <View style={[styles.labelCard, styles.btnBig, styles.labelAchat]}>

  <Pressable onPress={() => navigation.navigate("RechercheModal")} style={{paddingRight: 15, paddingLeft: 15}}  >
  <Image
  style={{
    resizeMode: "cover",
    height: 25,
    width: 25,
  }}
  source={require("../assets/recherche.png")}
  />
  </Pressable>
  <Pressable
  onPress={() => navigation.navigate("RechercheModal")}
  >
  <Text style={styles.textBigButton}> Affiner ma recherche </Text>
  </Pressable>
  </View>
  </View>
  <View style={{width:'15%', flexDirection: 'row', marginLeft: '10%'}}>

  <Pressable
 onPress={toggleOverlay} 
  style={[styles.labelCard, styles.btnBig]}
  >
  <Image
  style={{
    resizeMode: "cover",
    height: 25,
    width: 25,
  }}
  source={require("../assets/filtre.png")}
  />
    </Pressable>
  </View>
  </View>

 
  <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
    <Text>Limite de résultats :</Text>
   
    <TextInput
      style={{
        //resizeMode: "cover",
        height: 35,
        width: 125,
        borderColor: "#000",
      }}
      onChangeText={(text) => setLimite(text)}

      keyboardType="number-pad"
      placeholder="nb resultats"
    
      maxLength={2000} 

      value={stateRecherche.limite.toString()}
    />

    <Button
      title="Trier par ordre alphabétique A-Z"

      onPress={() => {
        filtrerProgramme("titre_spectacle", "asc");
        toggleOverlay();
      }}
    />
        <Button
      title="Trier par ordre alphabétique Z-A"

      onPress={() => {
        filtrerProgramme("titre_spectacle", "desc");
        toggleOverlay();
      }}
    />
            <Button
      title="Trier par horaire ascendant"

      onPress={() => {
        filtrerProgramme("horaire", "asc");
        toggleOverlay();
      }}
    />
                <Button
      title="Trier par horaire descendant"

      onPress={() => {
        filtrerProgramme("horaire", "desc");
        toggleOverlay();
      }}
    />  

    <Button
      title="Trier par durée ascendant"

      onPress={() => {
        filtrerProgramme("duree", "asc");
        toggleOverlay();
      }}
    />

    <Button

      title="Trier par durée descendante"

      onPress={() => {
        filtrerProgramme("duree", "desc");
        toggleOverlay();
      }}
    />

    <Button

      title="Trier par prix ascendant"

      onPress={() => {
        filtrerProgramme("tarif", "asc");
        toggleOverlay();
      }}
    />

    <Button

      
      title="Trier par prix descendant"

      onPress={() => {
        filtrerProgramme("tarif", "desc");
        toggleOverlay();
      }}

    />

    {/*
    <Button

      
title="Afficher Ticket OFF"

onPress={() => {
  trierProgramme("ticket_off", "Oui");
  toggleOverlay();
}}

/>
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
width: "50%",
}}
>


    
    <Input
    style={{
      //resizeMode: "cover",
      height: 35,
      width: 15,
      borderColor: "#000",
    }}

      placeholder="Rechercher un spectacle, un artiste, un lieu..."
     // onChangeText={(text) => chercherProgramme(text)}
     onChangeText={(text =>  trierProgramme("all", text) )}
    />

    <Button
      title="Annuler les tris"
      onPress={() => {
        axios.get(url_programme + stateRecherche.limite ).then((response) => {
          // setData(response.data);
          dispatch({ type: "addData", payload: response.data });
         
        });
        toggleOverlay();
      }}
    />


</View>

<View>
  <Text>Filtrer par catégorie</Text>
  <Picker
    selectedValue={stateRecherche.categorie}
    style={{ height: 50, width: 100 }}
    onValueChange={(itemValue, itemIndex) => {
    //  setCategorie(itemValue);
      filtrerCategorie(itemValue);
    }}
  >

   
    <Picker.Item label="Danse" value="danse" />
    <Picker.Item label="Théâtre" value="Théâtre" />
    <Picker.Item label="Spectacle" value="Spectacle" />
    <Picker.Item label="Autre" value="Autre" />
    <Picker.Item label="Tous" value="Tous" />
    <Picker.Item label="Musique" value="musique" />
  </Picker>


</View>

  */}





    
   
  </Overlay>
  {isLoading && <Loader />}
  
  </View>
  );
};
{
  /*  <Button title="DelFav" onPress={() => rm_favorite(item.id)} /> */
}

export default ProgrammeHeader;

