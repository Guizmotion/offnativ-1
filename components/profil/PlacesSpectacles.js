import React, {  useCallback, useEffect, useState } from "react";
import { useIsFocused , ToastAndroid, Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';


import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext}  from '../services/Auth';

/*
{state.isAuthenticated && (
  <Text style={{fontSize: 20}}>Bonjour{state.user.nom}</Text>
  
  )}
  */
  
  export default function PlacesSpectacles({ navigation}) {
    

   
    const { state, dispatch } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top:'10%' }}>
        
        
          <Text style={{fontSize: 20}}>PlacesSpectacles</Text>
      
        
        </View>
    );
    
}