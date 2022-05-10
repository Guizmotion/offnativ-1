import React, { useEffect, useState } from "react";
import {Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import Loader from "./Loader";

export default function Annonces({ navigation}) {

    const jsCode = "document.querySelector('.navbar-default').style.display = 'none'; document.querySelector('footer').style.display = 'none';";
  
    return (  
    
     
    <WebView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    source={{ uri: 'https://www.festivaloffavignon.com/plateforme-solidaire/' }}
    style={{ marginTop: 20 }}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
    scalesPageToFit={true}
    renderLoading={(e) => { return ( <Loader />  );  }}

    injectedJavaScript={jsCode}
    />
  
      );
  }