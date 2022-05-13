import React, { useEffect, useState , useContext } from "react";
import {Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext}  from './services/Auth';
//import { AuthContext } from "../App";


export const Login = ({ navigation}) => {
  
  
  
  
  
  
  const { state,dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };
  const [data, setData] = React.useState(initialState);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  
  
  
  
  
  
  /***connect auto 
  
  useEffect(async () => {
    
    
    if( state.isAuthenticated === false ){
      
      try {
        let userEmail = await AsyncStorage.getItem("email");
        //let data = JSON.parse(userData);
        console.log(userEmail);
        
        
        try {
          let userPwd = await AsyncStorage.getItem("password");
          //let data = JSON.parse(userData);
          console.log(userPwd);
          
          if(userEmail !== null && userPwd !== null ) {
            
            
            setEmail(userEmail);
            setPassword(userPwd );
            
            axios.post('https://api.festivaloffavignon.com/token', {
            email    : data.email,//'perodo@gmail.com',
            password : data.password,//'6876#ae57',// b,
            
            device_id: "71b9555cfb0463ca",
            device_name: "M2007J17G"
            
          }, {
            headers: {
              'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8',
            } })
            
            .then(user => {
              
              
              dispatch({
                type: "LOGIN",
                payload: user.data
              });
              // console.log(user.data);
              navigation.navigate("ProfilMenu");
            })
            
            
            .catch(error => {
              console.log('connect nok ' + userEmail);
              console.log(error);
              
              setData({
                ...data,
                isSubmitting: false,
                errorMessage: null,//error.message || error.statusText
              });
            });
            
            
          }
          
          
          
          
          
          
          
          
          
          
          
        } catch (error) {
          console.log("mauvais mot de passe", error);
        }
        
      } catch (error) {
        console.log("mauvais email", error);
      }
      
      
    } 
    
    
    
    
  }, []);
  
  
  /****** fin connect auto */
  
  

/*
console.log(state.favorites);
console.log('in');
if(state.isAuthenticated === true){
// getFavorites(state.token);

// console.log (state.favorites.length);


dispatch({
type: "GET_FAVORITES",
payload: [11,22]
});

console.log(state.favorites);

}
  */
  
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  
  //https://api.festivaloffavignon.com/token
  const handleFormSubmit = event => {
    //event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    /* fetch("https://hookedbe.herokuapp.com/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: data.email,
      password: data.password
    })
  })*/
  //.data.token
  axios.post('https://api.festivaloffavignon.com/token', {
  email    : email,//'perodo@gmail.com',//JSON.stringify(data.email),//'perodo@gmail.com',
  password :'6876#ae57',// password,//'6876#ae57',//JSON.stringify(data.password),//'6876#ae57',
  
  device_id: "71b9555cfb0463ca",
  device_name: "M2007J17G"
  
}, {
  headers: {
    'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8',
  } })
  /*
  .then(res => {
    if (res.ok) {
      console.log('connect ok');
      return res.profil;//.json();
    }
    throw res;
  })
  .then(resJson => {
    dispatch({
      type: "LOGIN",
      payload: resJson
    })
  })*/
  .then(user => {
    
    AsyncStorage.setItem('email', JSON.stringify(email));
    AsyncStorage.setItem('password', JSON.stringify(password));
    
    
    
    dispatch({
      type: "LOGIN",
      payload: user.data
    });




   
    
    navigation.navigate("ProfilMenu");
  })
  
  
  .catch(error => {
    console.log('connect nok');
    //console.log(error);
    
    setData({
      ...data,
      isSubmitting: false,
      errorMessage: error.message || error.statusText
    });
  });
};
return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
  
  <Text>Login</Text>
  
  {/*		<Text >
  Email Address</Text>
  <TextInput
  tyle = {{borderBottomWidth : 1.0}}
  placeholder={data.email}
  
  onChangeText={(text) => handleInputChange(text, 'email')}
  name="email"
  id="email"
  />
  
  
  <Text >
  Password</Text>
  <TextInput
  tyle = {{borderBottomWidth : 1.0}}
  placeholder={data.password}
  
  onChangeText={(text) => handleInputChange(text, 'password')}
  
  />
*/}


<TextInput
style = {{borderBottomWidth : 1.0}}
placeholder="Email."
placeholderTextColor="#003f5c"
onChangeText={(email) => setEmail(email)}

/>

<TextInput
style = {{borderBottomWidth : 1.0}}
placeholder="Password."
placeholderTextColor="#003f5c"
secureTextEntry={true}
onChangeText={(password) => setPassword(password)}

/>


{data.errorMessage && (
  <Text>{data.errorMessage}</Text>
  )}
  
  
  
  <Pressable
  onPress={() => handleFormSubmit()} 
  
  style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
  
  
  >
  <Text > {data.isSubmitting ? (
    "Loading..."
    ) : (
      "Login"
      )}</Text>
      </Pressable>
      
      
      </View>
      );
    };
    export default Login;