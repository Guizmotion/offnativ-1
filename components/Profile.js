

import React, { useEffect, useState } from "react";
import {Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';

import useSWR from 'swr';
import { renderNode } from "react-native-elements/dist/helpers";

const fetcher = url => axios.post(url).then(user => {
 
  alert(user);
 /*
   AsyncStorage.mergeItem('isLogged', "1");
   AsyncStorage.mergeItem('email', a);
   AsyncStorage.mergeItem('password', b);
   AsyncStorage.mergeItem('token', user.data.token);
   AsyncStorage.mergeItem('nom', user.data.profil.nom);
  //console.log(user.data);
  */
  //navigation.navigate("Profil");
 
 }
 
  )
  .catch((error) => {
   if( error.response ){
       console.log(error.response.data); // => the response payload 
   }
 });

export default function  Profile () {
/*
  const credentials =  [{
    email    : 'perodo@gmail.com',
    password : '6876#ae57',// b,
    device_id: "71b9555cfb0463ca",
    device_name: "M2007J17G"

  }, {
    headers: {
      'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8',
    } }];

  const { data, error } = useSWR([ 'https://api.festivaloffavignon.com/token',credentials], fetcher)

  if (error) return(<View><Text>failed to load</Text></View>);
  if (!data) return(<View><Text>loading...</Text></View>);

  // render data
  return (<View><Text>lhello {data.nom}!</Text></View>);

*/
return ;
}


/*


// global config because this part won't change
const getRequest: AxiosRequestConfig = {
  baseURL: 'https://api.example.com',
  withCredentials: true,
  method: 'GET'
};

const fetchTerm = (url, term) =>
  axios({ ...getRequest, url, params: { term } }).then(res => res.data)

function App () {
  // inside component
  useSWR(['/search', term], fetchTerm)
}


*/