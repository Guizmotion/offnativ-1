import React, {  useCallback, useEffect, useState } from "react";
import { useIsFocused , ToastAndroid, Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { useRoute } from '@react-navigation/native';
import {AuthContext}  from './services/Auth';

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
    
    
    
    /*
    useEffect(() => {
      
      
      axios.get('https://api.festivaloffavignon.com/favorite', {
      headers: {
        'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8',
        'token': state.token
      } 
      
    }).then((response) => {
      console.log(response.data);
      
      let mynewarray=JSON.stringify(response.data.favoris).split(',')
      
      
      setlistFavorites( mynewarray);
      console.log(listFavorites);
      
      
      
      
    });
    
  }, []);
  */
  
  /*
  useEffect(async () => {
    await axios.get('https://api.festivaloffavignon.com/favorite', {
    
    // sh_id: id
    
  }, {
    headers: {
      'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8',
      'token': route.params.token,//'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvZmYtand0IiwidG9rZW5faWQiOiI1NTUwOTczMi1iMmM0LTRkYTctYTZmZi0xYmQwZTk3ZGIxYjAiLCJ1c2VyX2lkIjo2MjQwMSwiaWF0IjoxNjUxODIxMzYwLCJleHAiOjE2NTQ0MTMzNjB9.gWrMzaa9axRmKDkNrXwm8R5wROL7PLxAzi0mVpWDElsJBhHXD7HjX0faKX5-MYQtYp8iIsTd_ksgUAU7UaEV8FPWapmlNcIcuUdVEhbjuz419JnLomOT_F5JYSXH9BFLdPsZ0pm2YFBPkyDML_rXFcPxzMxBmOeVTlApLMnEZkI'
      
    } })
    
    .then(favoris => {
      
      alert(favoris);
      // setlistFavorites(favoris);
      
      console.log(favoris);
      
      
      // alert(user.data.profil.nom);
      //
      //navigation.navigate("Profil");
      //navigation.openDrawer()
      
      //console.log('etienne');
      
      
      
      
      
    }
    
    ).catch((error) => {
      if( error.response ){
        console.log(error.response); // => the response payload 
      }
    });
    
  }, []);
  
  
  */
  /*
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{fontSize: 20}}>{listFavorites} - test </Text>
    <TouchableOpacity
    
    onPress={getDataUsingAsyncAwaitGetCall}>
    <Text>Get Data Using Async Await GET</Text>
    </TouchableOpacity>
    </View>
    );*/
    
   
  
   
  function onLayout(event) {

    axios.get('https://api.festivaloffavignon.com/favorite', {
      headers: {
        'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8',
        'token': state.token
      } 
      
    }).then((response) => {
      console.log(response.data);
      
      let mynewarray=JSON.stringify(response.data.favoris).split(',')
      
      
      setlistFavorites( mynewarray);
      console.log(listFavorites);
      
      
      
      
    });
      console.log("view has loaded!");
  }
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top:'10%' }} onLayout={onLayout}>
      
      <ScrollView>
      
      {listFavorites.map(
        (item,i) => (
          
          <View  >
          
          <Text>Fav id : {item.replace('[','').replace(']','')}</Text>
          
          </View>
          
          )
          
          ) }
       
          
          
          <TouchableOpacity >
          
          </TouchableOpacity>
          </ScrollView>
          </View>
          );
          
          //[row]
          
        }
        
        
        