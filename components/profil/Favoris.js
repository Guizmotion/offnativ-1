import React, {  useCallback, useEffect, useState } from "react";
import { useIsFocused , ToastAndroid, Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { useRoute } from '@react-navigation/native';
import {AuthContext}  from '../services/Auth';

/*
{state.isAuthenticated && (
  <Text style={{fontSize: 20}}>Bonjour{state.user.nom}</Text>
  
  )}
  */
  
  export default function Favoris({ navigation}) {
    

   
    const { state, dispatch } = React.useContext(AuthContext);
    
    const route = useRoute();
    const [listFavorites, setlistFavorites] = useState([]);
    const [token, setToken] = useState();
    
    
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        
        


        axios.get('https://api.festivaloffavignon.com/favorite', {
          headers: {
            'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8',
            'token': state.token
          } 
          
        }).then((response) => {
    
    
          console.log('query fav: '+response.data);
          
          let mynewarray=JSON.stringify(response.data.favoris).split(',')
          
          
          setlistFavorites( mynewarray);
          console.log(listFavorites);
          
          
          
          
        });
          console.log("view has loaded!");


      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [navigation]);
   
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top:'10%' }} >
      
      <ScrollView>
      
      {listFavorites.map(
        (item,i) => (
          
         
          
          <Text key={i}>
           Fav id : {item.replace('[','').replace(']','')}</Text>
          
        
          
          )
          
          ) }
       
          
          
          <TouchableOpacity >
          
          </TouchableOpacity>
          </ScrollView>
          </View>
          );
          
          //[row]
          
        }
        
        
        