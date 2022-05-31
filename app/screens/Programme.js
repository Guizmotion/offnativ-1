import React, { useEffect, useState, useRef,useMemo } from "react";
import {
  Image,
  Text,
  
  View,
  
  FlatList,
  
  RefreshControl,
  
} from "react-native";
import axios from "axios";


import { ShopContext } from "../store/ShopContext";
import { FavorisContext } from "../store/FavorisContext";
import Loader from "./Loader";
import { ADD_PRODUCT } from "../store/reducers";
import { StoreContext } from "../store/store";
import { RechercheContext } from "../store/storeRecherche";

//import LikeButton from "../components/LikeButton";
import ProgrammeCard from "./ProgrammeCard";
import ProgrammeHeader from "./ProgrammeHeader";

import {  Button, Overlay } from 'react-native-elements';


const baseUrl = "https://appli.ovh/off/app/";
const url_programme = baseUrl + "api2022.php?a=1&limit=";


export default function Programme({ navigation }) {
  const { state, dispatch } = React.useContext(StoreContext);

  const { stateRecherche, dispatchRecherche } = React.useContext(RechercheContext);
  const context = React.useContext(ShopContext);
  
  // initialize data state variable as an empty array
  
  const [data, setData] = useState([]);
  const [input, setInput] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  //const [visible, setVisible] = useState(true);
  
  
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState("all");
  const [searchText, setSearchText] = useState();
  
  const [refreshing, setRefreshing] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [visible, setVisible] = useState(false);
  


const memo = callback => {
  const cache = new Map();
  return (...args) => {
    const selector = JSON.stringify(args);
    if (cache.has(selector)) return cache.get(selector);
    const value = callback(...args);
    cache.set(selector, value);
    return value;
  };
};

const memoizedAxiosGet = memo(axios.get);
  
  useEffect(() => {
    setIsLoading(true);
    axios.get(url_programme + stateRecherche.limite ).then(response => {
  //  memoizedAxiosGet(url_programme + stateRecherche.limite ).then((response) => {
      // setData(response.data);
      dispatch({ type: "addData", payload: response.data });
      setIsLoading(false);
    });
        
    
  }, [stateRecherche]);
  
  
  /*
  useEffect(() => {
    console.log("context cart length from Programme : :" + context.cart.length);
  }, []);
  */
  
  
  const getItemLayout = (data, index) => (
    { length: 100, offset: 100 * index, index }
  )
  
  
  const filteredData = state.programme;/*searchText
  ? state.programme.filter(
    (x) =>
    x.description.toLowerCase().includes(searchText.toLowerCase()) ||
    x.nom.toLowerCase().includes(searchText.toLowerCase()) ||
    x.lieu.toLowerCase().includes(searchText.toLowerCase())
    )
    : state.programme;*/
    
   // const memoizedValue = useMemo(() => renderItem, [state.programme]);
      

    
      return (
        <View>
        {isLoading && <Loader />}
        
        
        <ProgrammeHeader />
         
   
        
        <FlatList
        
        //  ListHeaderComponent={() => { return <ProgrammeHeader />}}
        
        data={filteredData }
       // extraData={stateRecherche} 
        
        removeClippedSubviews={true}
        // updateCellsBatchingPeriod={5} 
        maxToRenderPerBatch={12}
        initialNumToRender={8}
        windowSize={8}
       // getItemLayout={() => getItemLayout() }
        
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd < 0) return;
        }}

        keyExtractor={(item, index) => {
          // console.log("index", index)
          return item.id.toString();
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
          } />
        }
        
        
        />
        </View>
        );
      }
      