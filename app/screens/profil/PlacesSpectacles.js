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

import RNPickerSelect from "react-native-picker-select";
import {CartesAbonnementContext} from "../../store/storeCartesAbonnement";

import styles from "../../config/styles/StyleGeneral";


/*
{state.isAuthenticated && (
  <Text style={{fontSize: 20}}>Bonjour{state.user.nom}</Text>
  
  )}


  */

export default function PlacesSpectacles({ navigation }) {
 // const { state, dispatch } = React.useContext(StoreContext);
const [Places, setPlaces] = useState([]);
const [isLoading, setIsLoading] = useState(true);
 // var axios = require('axios');

 const getFactures = async() => {
var data = '{\r\n    fes_id : 21\r\n}';

var config = {
  method: 'post',
  url: 'https://api.festivaloffavignon.com/tickets',
  headers: { 
    'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
    'token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvZmYtand0IiwidG9rZW5faWQiOiJjZGVhMzcwMy05OWRiLTQ5MTQtOTExNS1iZDFiNWFkMjM4Y2YiLCJ1c2VyX2lkIjo2ODA4MywiaWF0IjoxNjUyNzE3MzQ3LCJleHAiOjE2NTUzMDkzNDd9.ha7S4Mx_L2keGXHBP_jO6LxA89Z2e0mRmaGlQ0axPuH87PFABpN8iO1EdQRwYRKP_zWgnLhCA3DZQ4yUFgPfuKZtPHOjqBXT1HGUrfR843HMCSZBmjwKyDjP3bLhVcG5yAB42SL73Pm0XdLM9W_rgvmbi2YFRtyQXYLcIaSV3Qg', 
    'Content-Type': 'text/plain', 
    'Cookie': '.ASPXANONYMOUS=C5AaxfWW2AEkAAAAMjZlMGI5YzUtMzZhNC00ZmI3LWJhOWUtYjcxMzEwNjJmMWZmJnHD8r3JRaHoMX5AiBpQOd6w5NNFbICO7Y56PMvrWz81'
  },
  data : data
};



await axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  setPlaces(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


};
/*
useEffect(async() => {

await getFactures();


}, []);


*/

  
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
     <Text style={styles.carteAbonnement_header_text}>Carte Abonnement</Text>
     </View>
     <View style={styles.carteAbonnement_body}>
     <View style={styles.carteAbonnement_body_left}>
     
     <Pressable
     
     onPress={() => {
       
       deleteCarteAbonnement(item.id);
       
     }}
     ><Text>Supp</Text>
     </Pressable> 
     
     </View>
     <View style={styles.carteAbonnement_body_right}>
     <Text style={styles.carteAbonnement_header_text}>{item.nom} {item.prenom}</Text>
     
     <Image
     source={{ uri: 'data:image/jpeg;base64,' + item.photo }}
     style={{ width: 100, height: 100 }}
     />
     
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
    >
     <FlatList
      data={Places}
      // extraData={newCartes}
      renderItem={(item) => renderItem(item)}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "black" }} />}
      style={{ width: "100%", height: "100%" }}
      
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
