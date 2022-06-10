
import React, { useEffect, useState, useRef,useMemo, useCallback } from "react";
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
import { _ } from "lodash";

//import LikeButton from "../components/LikeButton";
import ProgrammeCard from "./ProgrammeCard";
import ProgrammeHeader from "./ProgrammeHeader";

import {  Button, Overlay } from 'react-native-elements';


const baseUrl = "https://appli.ovh/off/app/";
const url_programme = baseUrl + "api2022.php?a=1&limit=";


export default function Programme({ navigation }) {

  //const [visible, setVisible] = useState(false);
  
    const toggleOverlay = () => {
      setVisible(!visible);
    };


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
  
  const [visible, setVisible] = useState(true);
  const flatListRef = useRef(); 

  useEffect(() => {
    setIsLoading(true);
    axios.get(url_programme + stateRecherche.limite ).then(response => {

      dispatch({ type: "addData", payload: response.data });
      setIsLoading(false);
    });
    

    
  }, [stateRecherche]);

  //force flat list to go on top
  flatListRef.current.scrollToOffset({ animated: false, offset: 0 });


  


  const filteredData = state.programme;/*searchText
  ? state.programme.filter(
    (x) =>
    x.description.toLowerCase().includes(searchText.toLowerCase()) ||
    x.nom.toLowerCase().includes(searchText.toLowerCase()) ||
    x.lieu.toLowerCase().includes(searchText.toLowerCase())
    )
    : state.programme;*/
    
   // const memoizedValue = useMemo(() => renderItem, [state.programme]);
      

  
  const getItemLayout = (data, index) => (
    { length: 100, offset: 100 * index, index }
  )

 

  const renderData = useCallback(
    ({ item }) => (
      <ProgrammeCard

      item={item}
     

    />
    ),[state.programme]);

  
  
    
      return (
        <View>




        {isLoading && <Loader />}
        
        
        <ProgrammeHeader />
         
   
        
        <FlatList style={{paddingTop: 15, marginBottom: 170}}
        
        //  ListHeaderComponent={() => { return <ProgrammeHeader />}}
        ref={flatListRef}
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

        ListEmptyComponent={() => {
          if (isLoading) {
            return null;
          }
          return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 600 }}>
              <Text>Aucun résultat</Text>
            </View>
          );
        }
        }

       
        
        renderItem={renderData}

       
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={() =>
            dispatch({ type: "addData", payload: filteredData })
          } />
        }
        
        
        />



        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
        animationType={'slide'}
        hardwareAccelerated={true}
        style={{padding: 0, margin: 0,backgroundColor: 'red'}}
        >
          <Image style={{height: 300,width: 300, padding: 0, margin: 0,backgroundColor: 'red', borderWidth: 0}} 
  source={require("../assets/images/modal-ticket-off.jpg")} />

        </Overlay>
        </View>
        );
      }