import React, { useEffect, useState, useRef } from "react";
import {
  Picker,
  Image,
  Text,
  TextInput,
  Linking,
  DrawerContentScrollView,
  View,
  StyleSheet,
  ScrollViewButton,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  RefreshControl,
  Share
} from "react-native";
import axios from "axios";
import Loader from "./Loader";
import {Overlay, Input} from 'react-native-elements';
import styles from "../config/styles/StyleGeneral";

import { StoreContext } from "../store/store";
import { RechercheContext } from "../store/storeRecherche";

import { useNavigation } from '@react-navigation/native';
import {debounce, _} from 'lodash';


const baseUrl = "https://appli.ovh/off/app/";
const url_programme = baseUrl + "api2022.php?a=1&limit=";

const ProgrammeHeader = () => {
  const {state, dispatch} = React.useContext(StoreContext);
  const { stateRecherche, dispatchRecherche } = React.useContext(RechercheContext);
  const [visible, setVisible] = useState(false);
  
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const setLimite= (limite) => {
    dispatchRecherche({ type: "SET_LIMITE", payload: limite });
  }
  
  const navigation = useNavigation();

  const filtrerProgramme = (col,orderby) => {
    let programme = state.programme;
    
    let result = _.orderBy(programme, col, orderby);
    
    dispatch({ type: "addData", payload: result });

   // console.log(result);
  };
  
  const chercherProgramme = (searchText) => {
    let programme = state.programme;

    let result = _.filter(programme, function(o) {
      return Object.keys(o).some(function(k) {
        return String(o[k]).toLowerCase().includes(searchText.toLowerCase());
      });
    });

    dispatch({ type: "addData", payload: result });
  };

  function myFilter(coll, regex) {
    return _.filter(
      coll,
      _.unary(_.partialRight(_.some, _.method('match', regex)))
    );
  }

  const trierProgramme = (col,value) => {
    let programme = state.programme;

    let result = _.find(programme, function(obj) {
      if (obj.value === 'Oui' ) {
          return true;
      }
  });

   // let result = _.sortBy(programme, col).value(value);

    dispatch({ type: "addData", payload: result });
  };

  const filtrerCategorie = (categorie) => {
    let programme = state.programme;

    let result = _.filter(programme, function(o) {
      return o.categorie === categorie;
    });

    dispatch({ type: "addData", payload: result });
  };

  //_.sortBy(data, [element], [direction]);

  
  
  return (
    <View style={[{
      shadowOpacity: 0.5,
      //zIndex:10,
      shadowRadius: 5
      ,backgroundColor: '#fff', 
      //padding: 10,
      //  paddingTop: 0, 
      //  display: isLoading ? "none" : "flex"
      
    }]
    
  }>
  
  <View style={{ flexDirection: "row", width: "90%", margin: '5%', marginTop: 0, marginBottom: 5 }}>
  <View>
  <View style={[styles.labelCard, styles.btnBig, styles.labelAchat]}>

  <Pressable onPress={() => navigation.navigate("RechercheModal")} style={{paddingRight: 15, paddingLeft: 15}}  >
  <Image
  style={{
    resizeMode: "cover",
    height: 25,
    width: 25,
  }}
  source={require("../assets/recherche.png")}
  />
  </Pressable>
  <Pressable
  onPress={() => navigation.navigate("RechercheModal")}
  >
  <Text style={styles.textBigButton}> Affiner ma recherche </Text>
  </Pressable>
  </View>
  </View>
  <View style={{width:'15%', flexDirection: 'row', marginLeft: '10%'}}>

  <Pressable
 onPress={toggleOverlay} 
  style={[styles.labelCard, styles.btnBig]}
  >
  <Image
  style={{
    resizeMode: "cover",
    height: 25,
    width: 25,
  }}
  source={require("../assets/filtre.png")}
  />
    </Pressable>
  </View>
  </View>

 
  <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
    <Text>Limite de résultats :</Text>
   
    <TextInput
      style={{
        //resizeMode: "cover",
        height: 35,
        width: 125,
        borderColor: "#000",
      }}
      onChangeText={(text) => setLimite(text)}

      keyboardType="number-pad"
      placeholder="nb resultats"
    
      maxLength={2000} 

      value={stateRecherche.limite.toString()}
    />

    <Button
      title="Trier par ordre alphabétique A-Z"

      onPress={() => {
        filtrerProgramme("titre_spectacle", "asc");
        toggleOverlay();
      }}
    />
        <Button
      title="Trier par ordre alphabétique Z-A"

      onPress={() => {
        filtrerProgramme("titre_spectacle", "desc");
        toggleOverlay();
      }}
    />
            <Button
      title="Trier par horaire ascendant"

      onPress={() => {
        filtrerProgramme("horaire", "asc");
        toggleOverlay();
      }}
    />
                <Button
      title="Trier par horaire descendant"

      onPress={() => {
        filtrerProgramme("horaire", "desc");
        toggleOverlay();
      }}
    />  

    <Button
      title="Trier par durée ascendant"

      onPress={() => {
        filtrerProgramme("duree", "asc");
        toggleOverlay();
      }}
    />

    <Button

      title="Trier par durée descendante"

      onPress={() => {
        filtrerProgramme("duree", "desc");
        toggleOverlay();
      }}
    />

    <Button

      title="Trier par prix ascendant"

      onPress={() => {
        filtrerProgramme("tarif", "asc");
        toggleOverlay();
      }}
    />

    <Button

      
      title="Trier par prix descendant"

      onPress={() => {
        filtrerProgramme("tarif", "desc");
        toggleOverlay();
      }}

    />
    <Button

      
title="Afficher Ticket OFF"

onPress={() => {
  trierProgramme("ticket_off", "Oui");
  toggleOverlay();
}}

/>
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
width: "50%",
}}
>


    
    <Input
    style={{
      //resizeMode: "cover",
      height: 35,
      width: 15,
      borderColor: "#000",
    }}

      placeholder="Rechercher un spectacle, un artiste, un lieu..."
      onChangeText={(text) => chercherProgramme(text)}
    />

    <Button
      title="Annuler"
      onPress={() => {
        axios.get(url_programme + stateRecherche.limite ).then((response) => {
          // setData(response.data);
          dispatch({ type: "addData", payload: response.data });
         
        });
        toggleOverlay();
      }}
    />


</View>
<View>
  <Text>Filtrer par catégorie</Text>
  <Picker
    selectedValue={stateRecherche.categorie}
    style={{ height: 50, width: 100 }}
    onValueChange={(itemValue, itemIndex) => {
    //  setCategorie(itemValue);
      filtrerCategorie(itemValue);
    }}
  >

   
    <Picker.Item label="Danse" value="danse" />
    <Picker.Item label="Théâtre" value="Théâtre" />
    <Picker.Item label="Spectacle" value="Spectacle" />
    <Picker.Item label="Autre" value="Autre" />
    <Picker.Item label="Tous" value="Tous" />
    <Picker.Item label="Musique" value="musique" />
  </Picker>


</View>

  





    
   
  </Overlay>
  
  
  </View>
  );
};
{
  /*  <Button title="DelFav" onPress={() => rm_favorite(item.id)} /> */
}

export default ProgrammeHeader;



/*

"id":"28895",
"acces_handicape":"Oui",
"titre_spectacle":"Le TOMA 2021 sur les ondes !",
"auteur_prenom":" ",
"nom":" ",
"ticket_off":"Non",
"horaire":"00h00",
"image":"https:\/\/www.festivaloffavignon.com\/resources\/off\/visuels\/2021\/spectacle\/web2\/spectacle_28895.jpg",
"duree":"24h00",
"type_public":"Tout public",
"categorie":"événement",
"lieu":"CHAPELLE DU VERBE INCARNÉ",
"description":"Le TOMA 2021 aura de multiples visages. Notre #eTOMA créera le lien avec vous où que vous soyez, avec Radio TOMA (depuis 2018) et TOMA TV (depuis 2020). Suivez notre page Facebook Chapelle du Verbe Incarné et www.verbeincarne.fr pour assister aux lives de Radio TOMA et TOMA TV. - Nous multiplierons les programmations en direct et les rediffusions autour de nos évènements (rencontres, débats, échanges avec les artistes�) - - Radio TOMA - Une quotidienne, en direct du théâtre. Des plateaux animés par Savannah Macé et Benoit Artaud, les chroniques de Greg Germain, Marie-Cécile Drécourt, des podcasts... Toute notre programmation, de l'info, nos coups de cœur... - - TOMA TV - Une programmation autour des captations de spectacles accueillis précédemment, en partenariat avec la Sorbonne Nouvelle. - - MARDI, C'EST EN DIRECT! (20 et 27\/7) - Une salle virtuelle pour vous permettre d'assister aux spectacles depuis votre canapé. - - De nombreuses surprises vous attendent, RESTEZ CONNECTES!",
"style":"Web TV",
"salle":"Salle Edouard Glissant",
"theatre":"",
"deja_joue":"Non",
"non_francophones":"Non",
"plein_air":"Non",
"clim":"Oui",
"especes":"Non",
"cheques":"Non",
"cb":"Non",
"tel_reservation":"+33 (0)4 90 14 07 49",
"compagnie":"Théâtre de la Chapelle du Verbe Incarné",
"adresse":"21G, rue des lices (en face du n°60)",
"cp":"84000",
"ville":"Avignon",
"pays":"France",
"site_web":"www.verbeincarne.fr",
"bande_annonce":"",
"tarif_reduit_precisions":"",
"age":"",
"dates_representations":"du 9 au 28 juillet - 24h\/24",
"tarif":"0",
"tarif_adh":"0",
"tarif_enfant":"0",
"url":"https:\/\/www.festivaloffavignon.com\/programme\/2021\/le-toma-2021-sur-les-ondes-s28895\/",
"url_fav":"https:\/\/www.festivaloffavignon.com\/programme\/2021\/le-toma-2021-sur-les-ondes-af28895",
"url_rmfav":"https:\/\/www.festivaloffavignon.com\/programme\/2021\/le-toma-2021-sur-les-ondes-rf28895",
"titre":"",
"dates":"09\/07\/2021-00h00|10\/07\/2021-00h00|11\/07\/2021-00h00|13\/07\/2021-00h00|14\/07\/2021-00h00|16\/07\/2021-00h00|17\/07\/2021-00h00|18\/07\/2021-00h00|20\/07\/2021-00h00|21\/07\/2021-00h00|23\/07\/2021-00h00|24\/07\/2021-00h00|26\/07\/2021-00h00|27\/07\/2021-00h00|28\/07\/2021-00h00|19\/07\/2021-00h00|25\/07\/2021-00h00|12\/07\/2021-00h00|15\/07\/2021-00h00|22\/07\/2021-00h00",
"t_Rouge":"0",
"t_jaune":"0",
"t_bleu":"0",
"t_vert":"0",
"t_turquoise":"0",
"charg_diff":"",
"telephone":"000000000",
"courriel":"toma@verbeincarne.fr",
"structure":"ADOC",
"charg_diff_addresse":""

*/