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
  
  /*
  
  <input type='text' name='uc_firstname' id='uc_firstname' required  placeholder=''><label for='uc_firstname'>Votre Prénom *</label> 
  <input type='text' name='uc_lastname' id='uc_lastname' required  placeholder=''><label for='uc_lastname'>Votre Nom *</label> 
  </fieldset> 
  <input type='email' name='login' id='uc_login' required  placeholder=''><label for='uc_login'>Votre Email *</label> 
  <input type='password' name='uc_pwd' id='uc_pwd' required  placeholder=''><label for='uc_pwd'>Votre Mdp *</label> 
  <label for='uc_gender'>Vous êtes </label> 
  <input type='radio' name='uc_gender' value='1'>Homme   
  <input type='radio' name='uc_gender' value='2'>Femme  
  <input type='radio' name='uc_gender' value='4'>Non renseigné 
  <input type='date' name='uc_birthday' id='uc_birthday' placeholder=''><label for='uc_birthday'>Votre date de naissance </label> 
  <input type='text' name='uc_postalcode' id='uc_birthday' placeholder=''><label for='uc_postalcode'>Votre code postal </label> 
  <input type='text' name='uc_city' id='uc_city'  placeholder=''><label for='uc_city'>Votre Ville</label> 
  <select class='country'></select><label for='uc_country'>Votre Pays</label> 
  <select class='styles' multiple='yes'></select><label for='uc_styles'>Vos Styles favoris</label> 
  <select class='audience' multiple='yes'></select><label for='uc_audience'>Venez-vous au festival ? </label> 
  <input type='checkbox' id='ep_localmailing'/><label for='ep_localmailing'>J’accepte que le courriel que j’ai fourni soit utilisé pour l’envoi de la newsletter du festival OFF.</label> 
  <input type='checkbox' id='uc_stats'/><label for='uc_stats'>Je refuse l’utilisation de mes données personnelles. </label> 
  <input type='button' id='btnCreate' value='Créer mon compte'> 
  
  <a href="#" id="linkLoginFromCreate">Déjà inscrit ? Connectez-vous !</a>
  
  */
  
  export default function MofifierProfil({ navigation }) {
    const { state, dispatch } = React.useContext(StoreContext);
    const pickerStyle = {
      inputIOS: {
        textAlign: 'right',
        marginRight: 20,
        height: 50
        
      },
    }
    return (
      <View  style={{flexDirection: 'column',
      width: '90%',
      margin: '5%',
      marginLeft: '5%',
      marginRight: '5%',
      height: '100%'}}>
      <ScrollView style={{flex: 1}}>
 
      <TextInput style={styles.inputStyle} placeholder="Prénom" placeholderTextColor="rgba(0,0,0,0.3)" />
      <TextInput style={styles.inputStyle} placeholder="Nom"  placeholderTextColor="rgba(0,0,0,0.3)" />
      <TextInput style={styles.inputStyle} placeholder="Email" placeholderTextColor="rgba(0,0,0,0.3)"  />
      <TextInput style={styles.inputStyle} placeholder="Mot de passe"  placeholderTextColor="rgba(0,0,0,0.3)" />
      <TextInput style={styles.inputStyle} placeholder="Confirmation mot de passe" placeholderTextColor="rgba(0,0,0,0.3)"  />
      <TextInput style={styles.inputStyle} placeholder="Date de naissance"  placeholderTextColor="rgba(0,0,0,0.3)" />
      <TextInput style={styles.inputStyle} placeholder="Code postal"  placeholderTextColor="rgba(0,0,0,0.3)" />
      <TextInput style={styles.inputStyle} placeholder="Ville"  placeholderTextColor="rgba(0,0,0,0.3)" />

      
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