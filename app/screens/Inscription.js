import React, { useCallback, useEffect, useState } from "react";
import {
    
    ToastAndroid,
    Image,
    Text,
    TextInput,
    
    View,
    
    ScrollView,
    
    Switch,
    Platform,
    Pressable,
    TouchableWithoutFeedback,
} from "react-native";
import Toast from 'react-native-root-toast';
import axios from "axios";

import RNPickerSelect from "react-native-picker-select";
import { StoreContext } from "../store/store";
import styles from "../config/styles/StyleGeneral";




export default function Inscription({ navigation }) {
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
    const [Newsletter, setNewsletter] = useState(false);
    const [Stats, setStats] = useState(false);
    const pickerStyle = {
        inputIOS: {
            textAlign: 'right',
            marginRight: 20,
            height: 50
            
        },
    }
    
    //verififcation des champs obligatoire
    const verif = () => {
       
        if (email === "" || password === "" || Nom === "" || Prenom === "" ||  Pays === "" || Ville === "" || CodePostal === "" ) {
            
            let m = "Veuillez remplir tous les champs obligatoires";"ios"===Platform.OS?Toast.show(m,Toast.SHORT):ToastAndroid.show(m,ToastAndroid.SHORT);
           // alert('yo');
                
            return false;
        }
        else {
            return true;
        }
    }
    
    
    
    //hande Insciption with axios
    const handleInscription = async () => {
       // alert(Platform.OS);
        if (verif()) {
            
          //  var data = '{\r\n    "firstname":"Prénom",\r\n    "lastname":"Nom",\r\n    "email":"gdumas9@digito.fr",\r\n    "password":"motdepasse",\r\n    "postalcode":"30000",\r\n    "city":"Nîmes",\r\n    "allow_news": false,\r\n    "allow_localnews": false\r\n}';
    var data = '{\r\n    "firstname":"'+Prenom+'",\r\n    "lastname":"'+Nom+'",\r\n    "email":"'+email+'",\r\n    "password":"'+password+'",\r\n    "postalcode":"'+CodePostal+'",\r\n    "city":"'+Ville+'",\r\n    "allow_news": '+Newsletter+',\r\n    "allow_localnews": '+Stats+'\r\n}';    
            var config = {
              method: 'post',
              url: 'https://api.festivaloffavignon.com/profile/create',
              headers: { 
                'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
                'Content-Type': 'text/plain', 
              },
              data : data
            };
            
            axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              if (response.data.success) {
                let m = "Inscription reussie, veuillez vous connecter";"ios"===Platform.OS?Toast.show(m,Toast.SHORT):ToastAndroid.show(m,ToastAndroid.SHORT);
            } else {
                let m = "Inscription erreur";"ios"===Platform.OS?Toast.show(m,Toast.SHORT):ToastAndroid.show(m,ToastAndroid.SHORT);
            
             } 
            })
            .catch(function (error) {
              console.log(error);
            });
            




           
        }

               
                };
                
                
                
                
                
                //use effect if is logged redirect to profilmenu
                useEffect(() => {
                    if (state.isAuthenticated) {
                        navigation.navigate("ProfilMenu");
                    }
                }, [state.isAuthenticated]);
                
                
                
                return (
                    <View  style={{flexDirection: 'column',
                    width: '90%',
                    margin: '5%',
                    marginLeft: '5%',
                    marginRight: '5%',
                    height: '100%'}}>
                    <ScrollView style={{flex: 1}}>
                    
                    <TextInput 
                    onChangeText={(text) => setPrenom(text)}
                    style={styles.inputStyle}  placeholder="Prénom" placeholderTextColor="rgba(0,0,0,0.3)"
                    value={Prenom}
                    />
                    <TextInput 
                    onChangeText={(text) => setNom(text)}
                    style={styles.inputStyle} placeholder="Nom"  placeholderTextColor="rgba(0,0,0,0.3)" 
                    value={Nom}
                    />
                    <TextInput 
                    onChangeText={(text) => setEmail(text)}
                    style={styles.inputStyle} placeholder="Email" placeholderTextColor="rgba(0,0,0,0.3)"  
                    value={email}
                    />
                    <TextInput 
                    onChangeText={(text) => setPassword(text)}
                    style={styles.inputStyle} placeholder="Mot de passe"  placeholderTextColor="rgba(0,0,0,0.3)" 
                    value={password}
                    />
                    <TextInput 
                   // onChangeText={(text) => setConfirmationMotDePasse(text)}
                    style={styles.inputStyle} placeholder="Confirmation mot de passe" placeholderTextColor="rgba(0,0,0,0.3)"  />
                    
                    <TextInput
                    keyboardType="numeric"
                    onChangeText={(text) => setCodePostal(text)}
                    style={styles.inputStyle} placeholder="Code postal"  placeholderTextColor="rgba(0,0,0,0.3)" 
                    value={CodePostal}
                    />
                    <TextInput 
                    onChangeText={(text) => setVille(text)}
                    style={styles.inputStyle} placeholder="Ville"  placeholderTextColor="rgba(0,0,0,0.3)" 
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
                            setPays(value);
                            
                        }
                    }
                    
                    
                    placeholder={{
                        label: "Sélectionner votre Pays",
                        value: "",
                    }}
                    
                    
                    
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
                    
                    onValueChange={() => setNewsletter(!Newsletter)}
                    value={Newsletter}
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
                    
                    onValueChange={() => setStats(!Stats)}
                    value={Stats}
                    /></View></View>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    </ScrollView>
                    
                    
                    <View style={{   flex: 2, position: 'absolute', bottom: 120, width: '90%', marginLeft: '5%', textAlign: 'center' }} >
                    
                    
                    
                    <Pressable 
                    onPress={handleInscription}  
                    style={[styles.labelCard, styles.labelAchat]}>
                <Text style={styles.textBigButton}>Je m'inscris</Text>
                    </Pressable>
                    
                    </View>
                    
                    
                    
                    </View>
                    );
                }