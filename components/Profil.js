import React, { useEffect, useState } from "react";
import {Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

import {AuthContext}  from './services/Auth';


export default function Profil({ navigation}) {
  
  
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
  
  
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    
    {state.isAuthenticated && (
      <Text style={{fontSize: 20}}>Bonjour{state.user.nom}</Text>
      
      )}
      
      {state.isAuthenticated && (
        
        <Text style={{fontSize: 20}}>Token : {state.token}</Text>
        
        )}
        
        
        
        <Button title="Déconnexion" onPress={deconnexion} /> 
        <Button title="Favoris" onPress={favoris} />
        
        
        </View>
        );
        
        
      }
      
      
      