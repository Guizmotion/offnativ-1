import React, {  useCallback, useEffect, useState } from "react";
import { useIsFocused , ToastAndroid, Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';


import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext}  from '../services/Auth';

import styles from "../styles/StyleGeneral";

/*
{state.isAuthenticated && (
  <Text style={{fontSize: 20}}>Bonjour{state.user.nom}</Text>
  
  )}
  */
  
  export default function CreerCarteAbonnement({ navigation}) {
    

    const handleSubmit = () => {
      console.log("submit");
    };


    const { state, dispatch } = React.useContext(AuthContext);

    const nom = (value) => {
        setNom(value)
    }

    const prenom = useState('');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top:'10%' }}>
        
        
          <Text style={{fontSize: 20}}>creer carte</Text>
          <TextInput style={styles.input} placeholder="Prénom" onChangeText={(text) => prenom.setState(text)}/>
        
            <TextInput style={styles.input} placeholder="Nom" onChangeText={(text) => nom.setState(text)}/>


        
          
          

          <Pressable
      onPress={() => navigation.navigate('Photo')}
      
      
      >
      <View
      style={[styles.labelCard, styles.labelAchat ]}
      
      >
      <Text style={styles.textBigButton}>
      
      Suivant
      </Text>
      </View>
      </Pressable>
        
        </View>
    );
    
}