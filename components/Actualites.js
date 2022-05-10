import React, { useEffect, useState } from "react";
import {Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

export default function Actualites({ navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Actualités</Text>
        <Text>Check this out !</Text>
         <Pressable
          onPress={() => navigation.openDrawer()}
          style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
        >
        <Text>Open Drawer</Text>
       
        </Pressable>
      </View>
    );
  }