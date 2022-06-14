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
  Switch,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import {CartesAbonnementContext} from "../../store/storeCartesAbonnement";

import styles from "../../config/styles/StyleGeneral";
import { FlatList, State } from "react-native-gesture-handler";
import { StoreContext } from "../../store/store";


/*
{state.isAuthenticated && (
  <Text style={{fontSize: 20}}>Bonjour{state.user.nom}</Text>
  
  )}
  */

export default function Factures({ navigation }) {
 
  const { state, dispatch } = React.useContext(StoreContext);

  const [isLoading, setIsLoading] = useState(true);
  
  
 
  var axios = require('axios');
  var data = '';
  
  var config = {
    method: 'post',
    url: 'https://api.festivaloffavignon.com/profile/invoices',
    headers: { 
      'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
      'token': state.token },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  


const handleDownload = ({ item }) => {
  console.log("download" + item.id);
};


  
  const renderItem = ({ item,i }) => {
   // console.log(item.photo);
    //item data
    /*
    "id": 1,    
    "statut" : "brouillon",
    "numero_carte" : "123456789",
    "code_promo": "",
    "structure": "",
    "nom" : "perodo",
    "prenom" : "nico",
    "adresse" : "rue de la paix",
    "ville" : "paris",
    "codePostal" : "75000",
    "telephone" : "0123456789",
    "pays" : "france",
    "livraison" : "courrier",
    "photo": ""

    "fes_id": 22,
    "card_birthday" : "12/12/1960",
    "card_type_id" : 1,
    	"skip_step" : false,
	"transport_card" : true,
	"culture_card" : true,
	"partner_festival" : true,
	"reduced_card" : true
    */
    
    return(
      <View style={styles.carteAbonnement} key={item.id}>
      <View style={styles.carteAbonnement_header}>
      <Text style={styles.carteAbonnement_header_text}>Facture N° {item.id}</Text>
      </View>
      <View style={styles.carteAbonnement_body}>
      <View style={styles.carteAbonnement_body_left}>
      
      <Pressable
      
      onPress={() => {
        
        handleDownload(item.id);
        
      }}
      ><Text>Télécharger</Text>
      </Pressable> 
      
      </View>
      <View style={styles.carteAbonnement_body_right}>
      <Text style={styles.carteAbonnement_header_text}>{item.nom} {item.prenom}</Text>
      
     
      
      </View>
      
      </View>
      </View>

      
      );
      
    }



  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        top: "10%",
      }}
    ><Text>Tickets</Text>
  <FlatList
      data={Factures.Tickets}
      // extraData={newCartes}
      renderItem={(item) => renderItem(item)}
      keyExtractor={(item) => item.id}
      
      style={{ width: "100%", height: "100%" }}
      
      onEndReached={() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }
        , 2000);
      }
    }
    
    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "black" }} />}
    onEndReachedThreshold={0.5}
    refreshing={isLoading}
    onRefresh={() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }
      , 2000);
      
    }
  }
  
  
  
  />

<Text>Cartes</Text>
  <FlatList
      data={Factures.Cartes}
      // extraData={newCartes}
      renderItem={(item) => renderItem(item)}
      keyExtractor={(item) => item.id}
      
      style={{ width: "100%", height: "100%" }}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "black" }} />}
      onEndReached={() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }
        , 2000);
      }
    }
    
    onEndReachedThreshold={0.5}
    refreshing={isLoading}
    onRefresh={() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }
      , 2000);
      
    }
  }
  
  
  
  />
    </View>
  );
}
