import React, { useEffect, useState } from "react";
import {Linking,Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';

import { useRoute } from '@react-navigation/native';

import axios from 'axios';

import {AuthContext}  from './services/Auth';


export default function ProfilMenu({ navigation}) {
  
  
  const { state, dispatch } = React.useContext(AuthContext);
  
  
  const route = useRoute();
  
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [nom, setNom] = useState('');
  const [isLogged, setIsLogged] = useState('');
  
  
  
  
  
  
  const deconnexion = async () => {
    
    
    
    try {
      console.log('dispatch logout');
      dispatch({
        type: "LOGOUT"
      });
      navigation.navigate("Login");
      
    }
    catch(exception) {
      console.log(exception)
    }
    
  }
  
  
  const favoris = () => {
    navigation.navigate("Favoris");
  }
  
  useEffect(() => {
    
    
    axios.get('https://api.festivaloffavignon.com/favorite', {
        headers: {
          'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8',
          'token': state.token
        } 
        
      }).then((response) => {
  
  
        console.log('query fav: '+response.data.favoris);
        
        dispatch({
          type: "ADD_FAVORITES",
          payload: response.data
        });
        
        
        
      });
        console.log("favs loaded!");


  }, []);

  
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top:'10%' }}>
    
    {state.isAuthenticated && (
      <Text style={{fontSize: 20}}>Bonjour {state.user.prenom}</Text>
      
      )}
      
      
      
      <Button title="Mon profil" onPress={ () => { navigation.navigate('ModifierProfil');  }}  />
      <Button title="Mes favoris" onPress={favoris} />

      <Button title="Mon panier"  onPress={ () => { navigation.navigate('CartPage');  }} />
      <Button title="Mes places de spectacles" onPress={ () => { navigation.navigate('PlacesSpectacles');  }}  />
      <Button title="Mes cartes d'abonnement" onPress={ () => { navigation.navigate('CartesAbonnement');  }}   />
      <Button title="Mes factures" onPress={ () => { navigation.navigate('Factures');  }}   />
      <Button title="Programme PDF" onPress={() => Linking.openURL('https://appli.ovh/off/pdf-tcra/test.pdf')}  />


      
      {/*state.isAuthenticated && (
        
        <Text style={{fontSize: 20}}>Token : {state.token}</Text>
        
      )*/}

<View style={{ flex: 1,
    justifyContent: 'flex-end', bottom:'15%' }}>
      <Button title="Déconnexion" onPress={deconnexion} /> 
      </View>
      </View>

 
      );
      
      
    }
    
    
    