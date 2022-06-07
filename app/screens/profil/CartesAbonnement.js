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
import { FlatList } from "react-native-gesture-handler";


export default function CartesAbonnement({ navigation }) {

const { stateCartesAbonnement, dispatchCartesAbonnement } = React.useContext( CartesAbonnementContext );
const [CartesFromState, setCartesFromState] = useState();
const [CartesFromAsyncStorage, setCartesFromAsyncStorage] = useState();
const [Cartes, setCartes] = useState([]);
const [newCartes, setNewCartes] = useState([]);
const [isLoading, setIsLoading] = useState(true);

/*
const getCartes = async () => {
    try {
        const valueString = await AsyncStorage.getItem('CartesAbonnement');
        const value = JSON.parse(valueString);
       // console.log(valueString + 'test');
        setCartes(value);
    } catch (error) {
        console.log(error);
    }
};
*/

const fetchCartes = async () => {
  
  try {
    console.log('before get');
    const value = await AsyncStorage.getItem('CartesAbonnement');
    if (value !== null) {
        setCartes(JSON.parse(value));
       // console.log(value + 'test');
    }
  } catch (error) {
    console.log(error);
  }
};

  
 

 
useEffect(() => {
// fetchCartes();
   // setCartes([...Cartes,stateCartesAbonnement.Cartes]);
  // AsyncStorage.setItem("CartesAbonnement", JSON.stringify(stateCartesAbonnement.Cartes));
  // fetchCartes();
   setCartes(stateCartesAbonnement.Cartes);
   // setIsLoading(false);
  }, [stateCartesAbonnement.Cartes]);



   
  
const renderItem = ({ item,i }) => {
console.log(item.photo);
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
                    */

                    return(
                        <View style={styles.carteAbonnement} key={item.id}>
                            <View style={styles.carteAbonnement_header}>
                                <Text style={styles.carteAbonnement_header_text}>{item.nom} {item.prenom}</Text>
                            </View>
                            <View style={styles.carteAbonnement_body}>
                                <View style={styles.carteAbonnement_body_left}>
                               
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

      <Text style={{ fontSize: 20 }}>Mes brouillons</Text>
      <FlatList
        data={Cartes}
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


