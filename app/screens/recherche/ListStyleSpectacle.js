import React, { useEffect, useState,useMemo } from "react";
import { Pressable,View, Text } from "react-native";

import { ActivityIndicator, Colors } from "react-native-paper";

import { AlphabetList } from "react-native-section-alphabet-list";
import axios from "axios";

import { StoreContext } from "../../store/store";
import { RechercheContext } from "../../store/storeRecherche";
import styles from "../../config/styles/StyleGeneral";



export default function ListStyleSpectacle({ navigation}) {
  
  
  
  const data = [
    { key:0, value: "Art du récit"},
    { key:1,value: "Atelier"},
    {key:2, value: "Boulevard"},
    {key:3,value: "Café-théâtre"},
    {key:4,value: "Chanson"},
    {key:5,value: "Cirque contemporain"},     
    {key:6,value: "Clown"},
    {key:7,value: "Comédie"},
    {key:8,value: "Concert"},
    {key:9,value: "Conférence"},
    {key:10,value: "Conférence-spectacle"}, 
    {key:11,value: "Conte"},
    {key:12,value: "Cycle d'événements"},
    {key:13,value: "Danse"},
    {key:14,value: "Danse-théâtre"},
    {key:15,value: "Débat"},
    {key:16,value: "Improvisation"},
    {key:17,value: "Lecture"},
    {key:18,value: "Lecture / Causerie"},
    {key:19,value: "Magie"},
    {key:20,value: "Marionnette-objet"},
    {key:21,value: "Mime"},
    {key:22,value: "Performance"},
    {key:23,value: "Pluridisciplinaire"},
    {key:24,value: "Poésie"},
    {key:25,value: "Projection"},
    {key:26,value: "Rencontre"},
    {key:27,value: "Rencontre débat"},
    {key:28,value: "Scène ouverte"},
    {key:29,value: "Seul.e en scène"},
    {key:30,value: "Sketch"},
    {key:31,value: "Spectacle"},
    {key:32,value: "Spectacle musical"},
    {key:33,value: "Stand-up"},
    {key:34,value: "Tables rondes"},
    {key:35,value: "Théâtre citoyen"},
    {key:36,value: "Théâtre classique"},
    {key:37,value: "Théâtre contemporain"},
    {key:38,value: "Théâtre d'objet"},
    {key:39,value: "Théâtre expérimental"},
    {key:40,value: "Théâtre masqué"},
    {key:41,value: "Théâtre musical"},
    {key:42,value: "Tragédie"},
    {key:43,value: "Web TV"}
    
    
  ];
  
  const { state, dispatch } = React.useContext(StoreContext);
  const { stateRecherche, dispatchRecherche } = React.useContext(RechercheContext);
  //const StylesRecherches2 = {};

  useMemo(() => ({ value: "someValue" }))
  
  const addStylesRecherches =  (item) => {
    
  // state.StylesRecherches2[item.key] = true;

  dispatchRecherche({
    type: "SELECT_STYLES_RECHERCHES",
    payload: item.key,
  });

    dispatchRecherche({
      type: "ADD_STYLES_RECHERCHES",
      payload: item,
    });

  



  
  
 
/*
  Promise.resolve(() => {
    dispatch({
      type: "ADD_STYLES_RECHERCHES",
      payload: item,
    });
  });
  */
    
  };


  
  //const state={isClicked:false};


  //add this line
//const selectedStyle = [];

  
  const removeStylesRecherches = (item) => {
    
    dispatchRecherche({
      type: "UNSELECT_STYLES_RECHERCHES",
      payload: item.key,
    });
    dispatchRecherche({
      type: "DELETE_STYLES_RECHERCHES",
      payload: item,
    });
    
    
  };
  
  useEffect(() => {
   // console.log(stateRecherche.StylesRecherchesSelected);
    
    // const isSelected = false;
    
  }, [stateRecherche]);
  
  
  
  return (
    <AlphabetList
    data={data}

    style={{
      padding: 0,
      paddingTop: 40,
      flexDirection: "row",
      width: "100%",
      backgroundColor: "#e8e8e8",
      flex: 1,
      height:'100%',
    }}

    letterListContainerStyle={{ 
      
    //  padding: 10, 
     width: 300,
      backgroundColor: "#fff", 
      height: '70%',
      top: '11%',
      borderBottomLeftRadius: 30,
      borderTopLeftRadius: 30,
      shadowOpacity: 0.1,
      shadowColor: "black",
      shadowRadius: 5,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'nowrap',
    
    }}

    
    indexLetterStyle={{
      fontSize: 16,
      height: 30,
   
      
      fontWeight: 'bold',
      backgroundColor: 'rgba(0,0,0,0)',
    }}
    
    renderCustomItem={(item) => 
      {
        
    // const statut = stateRecherche.StylesRecherches.includes(item.value) ;
     //const statut = state.StylesRecherches.indexOf(item.value) != -1 ;
     //const statut = state.StylesRecherches.some(item.value)  ;
     //let statut = StylesRecherches2[item.key];
   let statut = stateRecherche.StylesRecherchesSelected[item.key];

        return (
          
          
          
          <View
          key={item.key} 
          
         // style={item.isClicked ? '#00cc00' : '#f2f2f2' }>
          >
          <Pressable 
          
          onPress={()  =>
            {
              //checkToChangeStyle(item);
              if(statut){
                removeStylesRecherches(item);
              }else{
                addStylesRecherches(item);
              }
              //console.log(styles_list);
            }
          }
          >
          <View 
          key="container_{item.key} "

          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10, 
            backgroundColor: statut ? '#f26522' : 'rgba(255,255,255,0)' 
          }}
          
          
          
          >
          
          <Text style={styles.listItemLabel}>{item.value}</Text>
          
          </View>
          </Pressable>
          </View>
          
          )}
          
        }
        
        renderCustomSectionHeader={(section) => (
          <View  key={section.key}>
           <Text style={styles.sectionHeader}>{section.title}</Text>
          </View>
          )}
          />
          )
          
          
        }