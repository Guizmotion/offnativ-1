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
  
  export default function CartesAbonnement({ navigation}) {
    
    
    const handleSubmit = () => {
      
      navigation.navigate('CreerCarteAbonnement');
      console.log("submit");
    };
    
    
    const { state, dispatch } = React.useContext(AuthContext);
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top:'10%' }}>
      
      
      
      
      
      <Text style={{fontSize: 20}}>Mes cartes achetés</Text>
      <Text style={{fontSize: 20}}>Mes brouillons</Text>
      <Text style={{fontSize: 20}}>Mes autres cartes</Text>
      <Text style={{fontSize: 20}}>Associer une carte</Text>
      
      
      
      <Pressable
      onPress={() => navigation.navigate('CreerCarteAbonnement')}
      
      
      >
      <View
      style={[styles.labelCard, styles.labelAchat ]}
      
      >
      <Text style={styles.textBigButton}>
      
      Acheter une nouvelle carte
      </Text>
      </View>
      </Pressable>
      
      
      </View>
      );
      
    }