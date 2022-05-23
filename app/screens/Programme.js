import React, { useEffect, useState, useRef } from "react";
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

//import LikeButton from "../components/LikeButton";
import ProgrammeCard from "./ProgrammeCard";
import ProgrammeHeader from "./ProgrammeHeader";

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
    
 
      
      return (
        <View>
        {isLoading && <Loader />}
        
        
        <ProgrammeHeader />
        
        <FlatList
        
        //  ListHeaderComponent={() => { return <ProgrammeHeader />}}
        
        data={filteredData}
        removeClippedSubviews={true}
        
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        
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
          } />
        }
        
        
        />
        </View>
        );
      }
      