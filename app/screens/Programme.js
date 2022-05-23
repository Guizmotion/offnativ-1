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


export default function Programme({ navigation }) {
  const { state, dispatch } = React.useContext(StoreContext);
  const context = React.useContext(ShopContext);

  // initialize data state variable as an empty array

  const [data, setData] = useState([]);
  const [input, setInput] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(true);


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
