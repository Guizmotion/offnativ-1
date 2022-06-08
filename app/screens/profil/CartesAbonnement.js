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
import { Storage } from 'expo-storage';
import RNPickerSelect from "react-native-picker-select";
import {CartesAbonnementContext} from "../../store/storeCartesAbonnement";

import styles from "../../config/styles/StyleGeneral";
import { FlatList } from "react-native-gesture-handler";


export default function CartesAbonnement({ navigation }) {
  
  const { stateCartesAbonnement, dispatchCartesAbonnement } = React.useContext( CartesAbonnementContext );
  
  const [Cartes, setCartes] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  
  
 
const CartesAchetees = {
    
 
  Cartes: 
      

          [ 
             {
              "id": 1300,    
              "statut" : "achetée",
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
                  "photo": "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
              },
              {
                  "id": 2333,
                  "statut" : "achetée",
                  "numero_carte" : "123456789",
                  "code_promo": "",
                  "structure": "",
                  "nom" : "perodo2",
                  "prenom" : "nico",
                  "adresse" : "rue de la paix",
                  "ville" : "paris",
                  "codePostal" : "75000",
                  "telephone" : "0123456789",
                  "pays" : "france",
                  "livraison" : "courrier",
                  "photo": "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              },
          ]
  

  
      };
  
  const deleteCarteAbonnement = async (id) => {
    try {
     // await AsyncStorage.removeItem('CartesAbonnement');
     // await AsyncStorage.setItem('CartesAbonnement', JSON.stringify(Cartes.filter(carte => carte.id !== id)));
      
      await Storage.removeItem({ key: 'CartesAbonnement' }) 
      await Storage.setItem({
        key: 'CartesAbonnement',
        value: JSON.stringify(Cartes.filter(carte => carte.id !== id))
      });
      
      setCartes(Cartes.filter(carte => carte.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  
  
  
  
  useEffect(() => {
    setCartes(stateCartesAbonnement.Cartes);
    
  }, [stateCartesAbonnement.Cartes]);
  
  
  
  
  
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
        top: "0%",
      }}
      
      key="listecartes"
      >
      <Text style={{ fontSize: 20 }}>Mes cartes achetés</Text>
      <FlatList
      data={CartesAchetees.Cartes}
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
  <Button title="Découvrez tous les avantages" onPress={() => navigation.navigate("Avantages")} />

      <Text style={{ fontSize: 20 }}>Mes brouillons</Text>
      
      <FlatList
      data={Cartes}
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
  
  
  
  <Button
  title="Créer un brouillon"
  onPress={() => navigation.navigate("CreerCarteAbonnement")}
  />
  
  </View>
  );
}


