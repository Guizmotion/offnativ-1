import React, { useEffect, useState, useRef } from "react";
import {
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

import { ActivityIndicator, ToastAndroid } from "react-native";
import { Image as ImgLazy, Icon } from "react-native-elements";

import { Detail } from "./Detail";
import { Card } from "react-native-paper";
import styles from "../config/styles/StyleGeneral";
import WebView from "react-native-webview";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ShopContext } from "../store/ShopContext";
import { FavorisContext } from "../store/FavorisContext";
import Loader from "./Loader";
import { ADD_PRODUCT } from "../store/reducers";
import { StoreContext } from "../store/store";

//import LikeButton from "../components/LikeButton";
import ProgrammeCard from "./ProgrammeCard";

const baseUrl = "https://appli.ovh/off/app/";
const url_programme = baseUrl + "api2022.php?a=1";

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
  "description":"Le TOMA 2021 aura de multiples visages. Notre #eTOMA créera le lien avec vous où que vous soyez, avec Radio TOMA (depuis 2018) et TOMA TV (depuis 2020). Suivez notre page Facebook Chapelle du Verbe Incarné et www.verbeincarne.fr pour assister aux lives de Radio TOMA et TOMA TV. - Nous multiplierons les programmations en direct et les rediffusions autour de nos évènements (rencontres, débats, échanges avec les artistes) - - Radio TOMA - Une quotidienne, en direct du théâtre. Des plateaux animés par Savannah Macé et Benoit Artaud, les chroniques de Greg Germain, Marie-Cécile Drécourt, des podcasts... Toute notre programmation, de l'info, nos coups de cur... - - TOMA TV - Une programmation autour des captations de spectacles accueillis précédemment, en partenariat avec la Sorbonne Nouvelle. - - MARDI, C'EST EN DIRECT! (20 et 27\/7) - Une salle virtuelle pour vous permettre d'assister aux spectacles depuis votre canapé. - - De nombreuses surprises vous attendent, RESTEZ CONNECTES!",
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

export default function Programme({ navigation }) {
  const { state, dispatch } = React.useContext(StoreContext);
  const context = React.useContext(ShopContext);

  // initialize data state variable as an empty array

  const [data, setData] = useState([]);
  const [input, setInput] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(true);

  /*
    

  const [itemId, setItemId] = useState([]);

  const [itemAcces_handicape, setItemAcces_handicape] = useState([]);
  const [itemTitre_spectacle, setItemTitre_spectacle] = useState([]);
  const [itemAuteur_prenom, setItemAuteur_prenom] = useState([]);
  const [itemNom, setItemNom] = useState([]);

  const [itemTicket_off, setItemTickets_off] = useState([]);
  const [itemHoraire, setItemHoraire] = useState([]);
  const [itemImage, setItemImage] = useState([]);
  const [itemDuree, setItemDuree] = useState([]);

  const [itemType_public, setItemType_public] = useState([]);
  const [itemCategorie, setItemCategorie] = useState([]);
  const [itemLieu, setItemLieu] = useState([]);
  const [itemDescription, setItemDescription] = useState([]);
  const [itemStyle, setItemStyle] = useState([]);
  const [itemSalle, setItemSalle] = useState([]);
  const [itemTheatre, setItemTheatre] = useState([]);
  const [itemDeja_joue, setItemDeja_joue] = useState([]);
  const [itemNon_francophones, setItemNon_francophones] = useState([]);
  const [itemPlein_air, setItemPlein_air] = useState([]);
  const [itemClim, setItemClim] = useState([]);
  const [itemEspeces, setItemEspeces] = useState([]);
  const [itemCheques, setItemCheques] = useState([]);
  const [itemCb, setItemCb] = useState([]);
  const [itemTel_reservation, setItemTel_reservation] = useState([]);
  const [itemCompagnie, setItemCompagnie] = useState([]);
  const [itemAdresse, setItemAdresse] = useState([]);
  const [itemCp, setItemCp] = useState([]);
  const [itemVille, setItemVille] = useState([]);
  const [itemPays, setItemPays] = useState([]);
  const [itemSite_web, setItemSite_web] = useState([]);
  const [itemBande_annonce, setItemBande_annonce] = useState([]);
  const [itemTarif_reduit_precisions, setItemTarif_reduit_precisions] =
    useState([]);
  const [itemAge, setItemAge] = useState([]);
  const [itemDates_representations, setItemDates_representations] = useState(
    []
  );
  const [itemTarif, setItemTarif] = useState([]);
  const [itemTarif_adh, setItemTarif_adh] = useState([]);
  const [itemTarif_enfant, setItemTarif_enfant] = useState([]);
  const [itemUrl, setItemUrl] = useState([]);
  const [itemUrl_fav, setItemUrl_fav] = useState([]);
  const [itemUrl_rmfav, setItemUrl_rmfav] = useState([]);
  const [itemTitre, setItemTitre] = useState([]);
  const [itemDates, setItemDates] = useState([]);
  const [itemT_Rouge, setItemT_Rouge] = useState([]);
  const [itemT_jaune, setItemT_jaune] = useState([]);
  const [itemT_bleu, setItemT_bleu] = useState([]);
  const [itemT_vert, setItemT_vert] = useState([]);
  const [itemT_turquoise, setItemT_turquoise] = useState([]);
  const [itemCharg_diff, setItemCharg_diff] = useState([]);
  const [itemTelephone, setItemTelephone] = useState([]);
  const [itemCourriel, setItemCourriel] = useState([]);
  const [itemStructure, setItemStructure] = useState([]);
  const [itemCharg_diff_addresse, setItemCharg_diff_addresse] = useState([]);
  */

  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState("all");
  const [searchText, setSearchText] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    setIsLoading(true);
    axios.get(url_programme).then((response) => {
      // setData(response.data);
      dispatch({ type: "addData", payload: response.data });
      setIsLoading(false);
    });
  }, []);


  /*
  useEffect(() => {
    console.log("context cart length from Programme : :" + context.cart.length);
  }, []);
*/




  const filteredData = searchText
    ? state.programme.filter(
        (x) =>
          x.description.toLowerCase().includes(searchText.toLowerCase()) ||
          x.nom.toLowerCase().includes(searchText.toLowerCase()) ||
          x.lieu.toLowerCase().includes(searchText.toLowerCase())
      )
    : state.programme;

  let item_nom = "";


  
  /* HEADER PROGRAMME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

  return (
    <View>
      {isLoading && <Loader />}

      <View style={[{shadowOpacity: 0.5,zIndex:10,
       shadowRadius: 5,backgroundColor: '#fff', padding: 10,
       paddingTop: 0, display: isLoading ? "none" : "flex" }]}>

        <View style={{ flexDirection: "row", width: "80%", marginTop: 0 }}>
          <View style={[styles.labelCard, styles.btnBig, styles.labelAchat]}>
            <Pressable onPress={() => navigation.navigate("RechercheModal")}>
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
              style={{
                marginLeft: "25%",
              }}
            >
              <Text style={styles.textBigButton}> Affiner ma recherche </Text>
            </Pressable>
          </View>
          <View style={styles.btnBig}>
            <Image
              style={{
                resizeMode: "cover",
                height: 25,
                width: 25,
              }}
              source={require("../assets/filtre.png")}
            />
          </View>
        </View>

        
      </View>

      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FIN HEADER PROGRAMME */}

      {/* LISTE PROGRAMME APPEL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

      <FlatList
        data={filteredData}
        removeClippedSubviews={true}
        //getItemLayout={getItemLayout}

        maxToRenderPerBatch={7}
        initialNumToRender="5"
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd < 0) return;
        }}
        keyExtractor={(item, index) => {
          // console.log("index", index)
          return index.toString();
        }}
        renderItem={({ item }) => {
         // return renderData(item);
         return <ProgrammeCard item={item} />
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() =>
              dispatch({ type: "addData", payload: filteredData })
            }
          />
        }
      />
      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FIN LISTE PROGRAMME APPEL */}

      

      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FIN FICHE PROGRAMME */}
    </View>
  );
}
