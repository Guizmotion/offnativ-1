import React, { useCallback, useEffect, useState } from "react";
import {
  useIsFocused,
  ToastAndroid,
  Image,
  Text,
  TextInput,
  DrawerContentScrollView,
  View,
  StyleSheet,
  ScrollViewButton,
  ScrollView,
  Button,
  Switch,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";

import { StoreContext } from "../../store/store";
import styles from "../../config/styles/StyleGeneral";



/*
{state.isAuthenticated && (
  <Text style={{fontSize: 20}}>Bonjour{state.user.nom}</Text>
  
  )}
  */

  
  
  export default function MofifierProfil({ navigation }) {
    const { state, dispatch } = React.useContext(StoreContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [DateNaissance, setDateNaissance] = useState("");
    const [Pays, setPays] = useState("");
    const [Ville, setVille] = useState("");
    const [CodePostal, setCodePostal] = useState("");
    const [Styles, setStyles] = useState("");
    const [Audience, setAudience] = useState("");
    const[Newsletter, setNewsletter] = useState(false);
    const [Stats, setStats] = useState(false);
    const pickerStyle = {
      inputIOS: {
        textAlign: 'right',
        marginRight: 20,
        height: 50
        
      },
    }


    const getProfile = async () => {
      var data = '';
    console.log(state.token);
      var config = {
        method: 'post',
        url: 'https://api.festivaloffavignon.com/profile',
        headers: { 
          'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
          'token': state.token
          
        },
        data : data
      };
      
      await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.profile));
      })
      .catch(function (error) {
        console.log(error);
      });
    
    }

useEffect(() => {
  getProfile();
}
, [state.token]);
    
    return (
      <View  style={{flexDirection: 'column',
      width: '90%',
      margin: '5%',
      marginLeft: '5%',
      marginRight: '5%',
      height: '100%'}}>
      <ScrollView style={{flex: 1}}>
 
      <TextInput style={styles.inputStyle}  placeholder="Prénom" placeholderTextColor="rgba(0,0,0,0.3)"
      value={Prenom}
      />
      <TextInput style={styles.inputStyle} placeholder="Nom"  placeholderTextColor="rgba(0,0,0,0.3)" 
      value={Nom}
      />
      <TextInput style={styles.inputStyle} placeholder="Email" placeholderTextColor="rgba(0,0,0,0.3)"  
      value={email}
      />
      <TextInput style={styles.inputStyle} placeholder="Mot de passe"  placeholderTextColor="rgba(0,0,0,0.3)" 
      value={password}
        />
      <TextInput style={styles.inputStyle} placeholder="Confirmation mot de passe" placeholderTextColor="rgba(0,0,0,0.3)"  />
      <TextInput style={styles.inputStyle} placeholder="Date de naissance"  placeholderTextColor="rgba(0,0,0,0.3)" 
          value={DateNaissance}
      />
      <TextInput style={styles.inputStyle} placeholder="Code postal"  placeholderTextColor="rgba(0,0,0,0.3)" 
      value={CodePostal}
      />
      <TextInput style={styles.inputStyle} placeholder="Ville"  placeholderTextColor="rgba(0,0,0,0.3)" 
      value={Ville}
      />

      
      <View style={{
        padding: 15,
        flexDirection: "row",
        alignContent: "space-between",
        width: "100%",
        alignItems: "center", 
      }}>
      <Text>
      Pays
      </Text>
      <View    style={{width: "70%",  right:0,   position: "absolute", minHeight: 30}}>
      
      <RNPickerSelect
      style={pickerStyle}
      onValueChange={(value) =>
        {
         console.log(value);
          
        }
      }
      /*
      
      placeholder={{
        label: type_public,
        value: type_public,
      }}
      
      
      value={type_public}
      onValueChange={(value) =>
        {
          setType_Public(value);
          
        }
      }
      */
      
      items={[
        { label: "France", value: "France" },
        { label: "Belgique", value: "Belgique" },
        { label: "Suisse", value: "Suisse" },
      ]}
      /></View>
      </View>
      
      <View style={{
        padding: 15,
        flexDirection: "row",
        alignContent: "space-between",
        width: "100%",
        alignItems: "center", 
      }}>
      <Text>
      Style
      </Text>
      <View    style={{width: "70%",  right:0,   position: "absolute", minHeight: 30}}>
      
      <RNPickerSelect
      style={pickerStyle}
      onValueChange={(value) =>
        {
         console.log(value);
          
        }
      }
      /*
      
      placeholder={{
        label: type_public,
        value: type_public,
      }}
      
      
      value={type_public}
      onValueChange={(value) =>
        {
          setType_Public(value);
          
        }
      }
      */
      items={[
        { label: "France", value: "France" },
        { label: "Belgique", value: "Belgique" },
        { label: "Suisse", value: "Suisse" },
      ]}
      /></View>
      </View>
      
      <View style={{
        padding: 15,
        flexDirection: "row",
        alignContent: "space-between",
        width: "100%",
        alignItems: "center", 
      }}>
      <Text>
      Audience
      </Text>
      <View    style={{width: "70%",  right:0,   position: "absolute", minHeight: 30}}>
      
      <RNPickerSelect
      style={pickerStyle}
      /*
      
      placeholder={{
        label: type_public,
        value: type_public,
      }}
      
      
      value={type_public}
      onValueChange={(value) =>
        {
          setType_Public(value);
          
        }
      }
      */
      items={[
        { label: "France", value: "France" },
        { label: "Belgique", value: "Belgique" },
        { label: "Suisse", value: "Suisse" },
      ]}
      /></View>
      </View>

      <View
      style={{
        padding: 15,
        flexDirection: "row",
        alignContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
      ><Text>Newsletter</Text>
      <View style={{ position: "absolute", right: 15, marginTop: 5 }}>
      <Switch
      
      //onValueChange=""
      value=""
      /></View></View>

      <View
      style={{
        padding: 15,
        flexDirection: "row",
        alignContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginBottom: 200
      }}
      ><Text>Stats</Text>
      <View style={{ position: "absolute", right: 15, marginTop: 5 }}>
      <Switch
      
      //onValueChange=""
      value=""
      /></View></View>




      
      
    
    
    
    
</ScrollView>
    
    
    <View style={{   flex: 2, position: 'absolute', bottom: 120, width: '90%', marginLeft: '5%', textAlign: 'center' }} >
  
                

        <Pressable 
          onPress={() => { navigation.navigate("Profil"); }}  
          style={[styles.labelCard, styles.labelAchat, styles.btnFixed]} >
            <Text style={[styles.textBigButton]}>Modifier mes infos</Text>
        </Pressable>

    </View>
    
    
    
    </View>
    );
  }