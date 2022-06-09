import React, { useEffect, useState, useContext } from "react";
import {
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
import styles from "../config/styles/StyleGeneral";
import Toast from "react-native-root-toast";
import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { StoreContext } from "../store/store";
//import { AuthContext } from "../App";

export const Login = ({ navigation }) => {
  const { state, dispatch } = React.useContext(StoreContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = React.useState(initialState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [EmailMdpOublie, setEmailMdpOublie] = useState("");


  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleMdpOublie = (event) => {
    setModalVisible(!modalVisible);
    let m = "Génération de nouveau mot de passe en cours...";"ios"===Platform.OS?Toast.show(m,Toast.SHORT):ToastAndroid.show(m,ToastAndroid.SHORT);

  }


  //https://api.festivaloffavignon.com/token
  const handleFormSubmit = (event) => {
    //event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    axios
      .post(
        "https://api.festivaloffavignon.com/token",
        {
          email: email, //'perodo@gmail.com',//JSON.stringify(data.email),//'perodo@gmail.com',
          password: "6876#ae57", // password,//'6876#ae57',//JSON.stringify(data.password),//'6876#ae57',

          device_id: "71b9555cfb0463ca",
          device_name: "M2007J17G",
        },
        {
          headers: {
            "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
          },
        }
      )
      .then((user) => {
        AsyncStorage.setItem("email", JSON.stringify(email));
        AsyncStorage.setItem("password", JSON.stringify(password));

        dispatch({
          type: "LOGIN",
          payload: user.data,
        });
        setData({
          ...data,
          isSubmitting: false,
         // errorMessage: error.message || error.statusText,
        });
        navigation.navigate("ProfilMenu");
      })

      .catch((error) => {
        console.log("connect nok");
        //console.log(error);

        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  //
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 30, paddingTop: 50 }}>
  

<TextInput
style={[styles.inputStyle]}
placeholder="Votre Email *"
placeholderTextColor="rgba(0,0,0,0.3)"
onChangeText={(email) => setEmail(email)}

/>

<TextInput
style={[styles.inputStyle]}
placeholder="Mot de passe *"
placeholderTextColor="rgba(0,0,0,0.3)"
secureTextEntry={!modalVisible}
onChangeText={(password) => setPassword(password)}

/>
<Pressable
                  style={{right: 45,position: 'absolute', top: 135}}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                  style={{
                    resizeMode: "cover",
                    height: 25,
                    width: 25,
                  }}
                  source={require("../assets/eye.png")}
                  />
                  </Pressable>



                  {data.errorMessage && (
  <Text>Erreur lors de la connexion</Text>
  )}
  
  
  
  <Pressable
  onPress={() => handleFormSubmit()} 
  
  
  style={[styles.labelCard, styles.labelAchat, styles.bigButton]}
  >
  <Text style={styles.textBigButton}> {data.isSubmitting ? (
    "Chargement en cours..."
    ) : (
      "Je me connecte"
      )}</Text>
      </Pressable>
      

      
      <Pressable
  onPress={() => setModalVisible(!modalVisible)}
  >
<Text style={{marginBottom: 15}}>Mot de passe oublié ? <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Cliquez-ici</Text> !</Text>

</Pressable>



<Text style={{marginBottom: 5}}>Pas encore inscrit ?</Text>

<View  style={{marginBottom: 30}}>
<Pressable

onPress={() => navigation.navigate("Inscription")}
>
<View   style={[styles.labelCard, styles.labelAchat, styles.bigButton]}><Text  style={styles.textBigButton}>Je m'inscris</Text></View>
</Pressable></View>



<Modal
                   animationType={'slide'}
                   hardwareAccelerated={true}
                   transparent={false}
                   visible={modalVisible}
                   //style={{ margin: 0 }}
                   onRequestClose={() => {
                    //Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    
                  }}>
          <Text>Mot de passe oublié ?</Text>
          <TextInput
          style={[styles.inputStyle]}
          placeholder="Votre Email *"
          placeholderTextColor="rgba(0,0,0,0.3)"
          onChangeText={(email) => setEmailMdpOublie(email)}
          value={EmailMdpOublie}
          />
          <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          >
          <Text>Annuler</Text>
          </Pressable>
          <Pressable
          onPress={handleMdpOublie}
          >
          <Text>Envoyer</Text>
          </Pressable>
                  
        </Modal>


      </View>
  );
};
export default Login;