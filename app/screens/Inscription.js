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
    Alert,
} from "react-native";
import Toast from 'react-native-root-toast';
import axios from "axios";

import RNPickerSelect from "react-native-picker-select";
import { StoreContext } from "../store/store";
import styles from "../config/styles/StyleGeneral";




export default function Inscription({ navigation }) {

    const  listPays= [
   
        { value:"AF", label:"Afghanistan"},
        { value:"ZA", label:"Afrique du Sud"},
        { value:"AX", label:"Åland, Îles"},
        { value:"AL", label:"Albanie"},
        { value:"DZ", label:"Algérie"},
        { value:"DE", label:"Allemagne"},
        { value:"AD", label:"Andorre"},
        { value:"AO", label:"Angola"},
        { value:"AI", label:"Anguilla"},
        { value:"AQ", label:"Antarctique"},
        { value:"AG", label:"Antigua-et-Barbuda"},
        { value:"AN", label:"Antilles Néerlandaises"},
        { value:"SA", label:"Arabie Saoudite"},
        { value:"AR", label:"Argentine"},
        { value:"AM", label:"Arménie"},
        { value:"AW", label:"Aruba"},
        { value:"AU", label:"Australie"},
        { value:"AT", label:"Autriche"},
        { value:"AZ", label:"Azerbaïdjan"},
        { value:"BS", label:"Bahamas"},
        { value:"BH", label:"Bahreïn"},
        { value:"BD", label:"Bangladesh"},
        { value:"BB", label:"Barbade"},
        { value:"BY", label:"Bélarus"},
        { value:"BE", label:"Belgique"},
        { value:"BZ", label:"Belize"},
        { value:"BJ", label:"Bénin"},
        { value:"BM", label:"Bermudes"},
        { value:"BT", label:"Bhoutan"},
        { value:"BO", label:"Bolivie"},
        { value:"BA", label:"Bosnie-herzégovine"},
        { value:"BW", label:"Botswana"},
        { value:"BV", label:"Bouvet, Île"},
        { value:"BR", label:"Brésil"},
        { value:"BN", label:"Brunéi Darussalam"},
        { value:"BG", label:"Bulgarie"},
        { value:"BF", label:"Burkina Faso"},
        { value:"BI", label:"Burundi"},
        { value:"KY", label:"Caïmanes, Îles"},
        { value:"KH", label:"Cambodge"},
        { value:"CM", label:"Cameroun"},
        { value:"CA", label:"Canada"},
        { value:"CV", label:"Cap-vert"},
        { value:"CF", label:"Centrafricaine, République"},
        { value:"CL", label:"Chili"},
        { value:"CN", label:"Chine"},
        { value:"CX", label:"Christmas, Île"},
        { value:"CY", label:"Chypre"},
        { value:"CC", label:"Cocos (keeling), Îles"},
        { value:"CO", label:"Colombie"},
        { value:"KM", label:"Comores"},
        { value:"CG", label:"Congo"},
        { value:"CD", label:"Congo, La République Démocratique du"},
        { value:"CK", label:"Cook, Îles"},
        { value:"KR", label:"Corée, République de"},
        { value:"KP", label:"Corée, République Populaire Démocratique de"},
        { value:"CR", label:"Costa Rica"},
        { value:"CI", label:"Côte d'Ivoire"},
        { value:"HR", label:"Croatie"},
        { value:"CU", label:"Cuba"},
        { value:"DK", label:"Danemark"},
        { value:"DJ", label:"Djibouti"},
        { value:"DO", label:"Dominicaine, République"},
        { value:"DM", label:"Dominique"},
        { value:"EG", label:"Égypte"},
        { value:"SV", label:"El Salvador"},
        { value:"AE", label:"Émirats Arabes Unis"},
        { value:"EC", label:"Équateur"},
        { value:"ER", label:"Érythrée"},
        { value:"ES", label:"Espagne"},
        { value:"EE", label:"Estonie"},
        { value:"US", label:"États-Unis"},
        { value:"ET", label:"Éthiopie"},
        { value:"FK", label:"Falkland, Îles (Malvinas)"},
        { value:"FO", label:"Féroé, Îles"},
        { value:"FJ", label:"Fidji"},
        { value:"FI", label:"Finlande"},
        { value:"FR", label:"France"},
        { value:"GA", label:"Gabon"},
        { value:"GM", label:"Gambie"},
        { value:"GE", label:"Géorgie"},
        { value:"GS", label:"Géorgie du Sud et les Îles Sandwich du Sud"},
        { value:"GH", label:"Ghana"},
        { value:"GI", label:"Gibraltar"},
        { value:"GR", label:"Grèce"},
        { value:"GD", label:"Grenade"},
        { value:"GL", label:"Groenland"},
        { value:"GP", label:"Guadeloupe"},
        { value:"GU", label:"Guam"},
        { value:"GT", label:"Guatemala"},
        { value:"GG", label:"Guernesey"},
        { value:"GN", label:"Guinée"},
        { value:"GQ", label:"Guinée Équatoriale"},
        { value:"GW", label:"Guinée-bissau"},
        { value:"GY", label:"Guyana"},
        { value:"GF", label:"Guyane Française"},
        { value:"HT", label:"Haïti"},
        { value:"HM", label:"Heard, Île et Mcdonald, Îles"},
        { value:"HN", label:"Honduras"},
        { value:"HK", label:"Hong-Kong"},
        { value:"HU", label:"Hongrie"},
        { value:"IM", label:"Île de Man"},
        { value:"UM", label:"Îles Mineures Éloignées des États-Unis"},
        { value:"VG", label:"Îles Vierges Britanniques"},
        { value:"VI", label:"Îles Vierges Des États-unis"},
        { value:"IN", label:"Inde"},
        { value:"ID", label:"Indonésie"},
        { value:"IR", label:"Iran, République Islamique d'"},
        { value:"IQ", label:"Iraq"},
        { value:"IE", label:"Irlande"},
        { value:"IS", label:"Islande"},
        { value:"IL", label:"Israël"},
        { value:"IT", label:"Italie"},
        { value:"JM", label:"Jamaïque"},
        { value:"JP", label:"Japon"},
        { value:"JE", label:"Jersey"},
        { value:"JO", label:"Jordanie"},
        { value:"KZ", label:"Kazakhstan"},
        { value:"KE", label:"Kenya"},
        { value:"KG", label:"Kirghizistan"},
        { value:"KI", label:"Kiribati"},
        { value:"KW", label:"Koweït"},
        { value:"LA", label:"Lao, République Démocratique Populaire"},
        { value:"LS", label:"Lesotho"},
        { value:"LV", label:"Lettonie"},
        { value:"LB", label:"Liban"},
        { value:"LR", label:"Libéria"},
        { value:"LY", label:"Libyenne, Jamahiriya Arabe"},
        { value:"LI", label:"Liechtenstein"},
        { value:"LT", label:"Lituanie"},
        { value:"LU", label:"Luxembourg"},
        { value:"MO", label:"Macao"},
        { value:"MK", label:"Macédoine, L'ex-République Yougoslave de"},
        { value:"MG", label:"Madagascar"},
        { value:"MY", label:"Malaisie"},
        { value:"MW", label:"Malawi"},
        { value:"MV", label:"Maldives"},
        { value:"ML", label:"Mali"},
        { value:"MT", label:"Malte"},
        { value:"MP", label:"Mariannes Du Nord, Îles"},
        { value:"MA", label:"Maroc"},
        { value:"MH", label:"Marshall, Îles"},
        { value:"MQ", label:"Martinique"},
        { value:"MU", label:"Maurice"},
        { value:"MR", label:"Mauritanie"},
        { value:"YT", label:"Mayotte"},
        { value:"MX", label:"Mexique"},
        { value:"FM", label:"Micronésie, États Fédérés de"},
        { value:"MD", label:"Moldova, République de"},
        { value:"MC", label:"Monaco"},
        { value:"MN", label:"Mongolie"},
        { value:"ME", label:"Monténégro"},
        { value:"MS", label:"Montserrat"},
        { value:"MZ", label:"Mozambique"},
        { value:"MM", label:"Myanmar"},
        { value:"NA", label:"Namibie"},
        { value:"NR", label:"Nauru"},
        { value:"NP", label:"Népal"},
        { value:"NI", label:"Nicaragua"},
        { value:"NE", label:"Niger"},
        { value:"NG", label:"Nigéria"},
        { value:"NU", label:"Niué"},
        { value:"NF", label:"Norfolk, Île"},
        { value:"NO", label:"Norvège"},
        { value:"NC", label:"Nouvelle-Calédonie"},
        { value:"NZ", label:"Nouvelle-Zélande"},
        { value:"IO", label:"Océan Indien, Territoire Britannique de l'"},
        { value:"OM", label:"Oman"},
        { value:"UG", label:"Ouganda"},
        { value:"UZ", label:"Ouzbékistan"},
        { value:"PK", label:"Pakistan"},
        { value:"PW", label:"Palaos"},
        { value:"PS", label:"Palestinien Occupé, Territoire"},
        { value:"PA", label:"Panama"},
        { value:"PG", label:"Papouasie-Nouvelle-Guinée"},
        { value:"PY", label:"Paraguay"},
        { value:"NL", label:"Pays-Bas"},
        { value:"PE", label:"Pérou"},
        { value:"PH", label:"Philippines"},
        { value:"PN", label:"Pitcairn"},
        { value:"PL", label:"Pologne"},
        { value:"PF", label:"Polynésie Française"},
        { value:"PR", label:"Porto Rico"},
        { value:"PT", label:"Portugal"},
        { value:"QA", label:"Qatar"},
        { value:"RE", label:"Réunion"},
        { value:"RO", label:"Roumanie"},
        { value:"GB", label:"Royaume-Uni"},
        { value:"RU", label:"Russie, Fédération de"},
        { value:"RW", label:"Rwanda"},
        { value:"EH", label:"Sahara Occidental"},
        { value:"BL", label:"Saint-Barthélemy"},
        { value:"SH", label:"Sainte-Hélène"},
        { value:"LC", label:"Sainte-lucie"},
        { value:"KN", label:"Saint-Kitts-et-Nevis"},
        { value:"SM", label:"Saint-Marin"},
        { value:"MF", label:"Saint-Martin"},
        { value:"PM", label:"Saint-Pierre-et-Miquelon"},
        { value:"VA", label:"Saint-siège (État de la Cité du Vatican)"},
        { value:"VC", label:"Saint-Vincent-et-les-Grenadines"},
        { value:"SB", label:"Salomon, Îles"},
        { value:"WS", label:"Samoa"},
        { value:"AS", label:"Samoa Américaines"},
        { value:"ST", label:"Sao Tomé-et-Principe"},
        { value:"SN", label:"Sénégal"},
        { value:"RS", label:"Serbie"},
        { value:"CS", label:"Seychelles"},
        { value:"SC", label:"Seychelles"},
        { value:"SL", label:"Sierra Leone"},
        { value:"SG", label:"Singapour"},
        { value:"SK", label:"Slovaquie"},
        { value:"SI", label:"Slovénie"},
        { value:"SO", label:"Somalie"},
        { value:"SD", label:"Soudan"},
        { value:"LK", label:"Sri Lanka"},
        { value:"SE", label:"Suède"},
        { value:"CH", label:"Suisse"},
        { value:"SR", label:"Suriname"},
        { value:"SJ", label:"Svalbard et Île Jan Mayen"},
        { value:"SZ", label:"Swaziland"},
        { value:"SY", label:"Syrienne, République Arabe"},
        { value:"TJ", label:"Tadjikistan"},
        { value:"TW", label:"Taïwan, Province de Chine"},
        { value:"TZ", label:"Tanzanie, République-Unie de"},
        { value:"TD", label:"Tchad"},
        { value:"CZ", label:"Tchèque, République"},
        { value:"TF", label:"Terres Australes Françaises"},
        { value:"TH", label:"Thaïlande"},
        { value:"TL", label:"Timor-leste"},
        { value:"TG", label:"Togo"},
        { value:"TK", label:"Tokelau"},
        { value:"TO", label:"Tonga"},
        { value:"TT", label:"Trinité-et-Tobago"},
        { value:"TN", label:"Tunisie"},
        { value:"TM", label:"Turkménistan"},
        { value:"TC", label:"Turks et Caïques, Îles"},
        { value:"TR", label:"Turquie"},
        { value:"TV", label:"Tuvalu"},
        { value:"UA", label:"Ukraine"},
        { value:"UY", label:"Uruguay"},
        { value:"VU", label:"Vanuatu"},
        { value:"VE", label:"Venezuela"},
        { value:"VN", label:"Viet Nam"},
        { value:"WF", label:"Wallis et Futuna"},
        { value:"YE", label:"Yémen"},
        { value:"YU", label:"Yougoslavie"},
        { value:"ZM", label:"Zambie"},
        { value:"ZW", label:"Zimbabwe"}
    ];


    const { state, dispatch } = React.useContext(StoreContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [DateNaissance, setDateNaissance] = useState("");
    const [Pays, setPays] = useState("");
    const [LabelPays,setLabelPays ] = useState("");
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

    useEffect(() => {
       
        
        console.log(Pays);
        console.log(LabelPays);
        if(Pays !== ""){
        let currentPaysLabel = listPays.find(item => item.value === Pays).label;
        setLabelPays(currentPaysLabel);

       console.log(currentPaysLabel);
     
        }


    }, [listPays]);

  
    
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
    
    
    

    const handleInscription = async () => {
       
        if (verif()) {
             let data = '{\r\n    "firstname":"'+Prenom+'",\r\n    "lastname":"'+Nom+'",\r\n    "email":"'+email+'",\r\n    "password":"'+password+'",\r\n    "postalcode":"'+CodePostal+'",\r\n    "city":"'+Ville+'",\r\n    "allow_news": '+Newsletter+',\r\n    "allow_localnews": '+Stats+'\r\n}';    
             let config = {
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
                    {LabelPays ? LabelPays : "Pays"}
                    </Text>
                    <View    style={{width: "70%",  right:0,   position: "absolute", minHeight: 30}}>
                    
                    <RNPickerSelect
                   // style={pickerStyle}
                    items={listPays}
                    onValueChange={(value) => 
                      {  
                        setPays(value);

                      }
                    }

                    placeholder={{
                        //label: LabelPays ?  Pays: 'Selectionner un pays' ,
                        label : 'Selectionner un pays',
                        value: null,
                     }}
/*
                     value={{
                        label: LabelPays,
                        value: Pays,
                     }}*/

                        value={Pays}
                    
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