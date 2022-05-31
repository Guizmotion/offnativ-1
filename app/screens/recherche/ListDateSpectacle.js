
import React, { useEffect, useState,useMemo } from "react";
import { SectionList, Pressable,View, Text } from "react-native";

import { ActivityIndicator, Colors } from "react-native-paper";

import { AlphabetList } from "react-native-section-alphabet-list";
import axios from "axios";

import { StoreContext } from "../../store/store";
import { RechercheContext } from "../../store/storeRecherche";
import styles from "../../config/styles/StyleGeneral";

import { ListItem } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";

export default function ListDateSpectacle({ navigation}) {
  
  const [checked, setChecked] = useState(false);
  const { stateRecherche, dispatchRecherche } = React.useContext(RechercheContext);
  
  
  const data = [
    { key:0,  value:"", checked:false } ,
    { key:1,  value:"", checked:false } ,
    {key:2,   value:"", checked:false } ,
    {key:3,   value:"", checked:false } ,
    {key:4,   value:"", checked:false } ,
    {key:5,   value:"", checked:false } ,   
    {key:6,   value:"", checked:false } ,
    {key:7 , value:"7  Juillet 2022", checked:false   },
    {key:8 , value:"8  Juillet 2022", checked:false   },
    {key:9 , value:"9  Juillet 2022", checked:false   },
    {key:10, value:"10 Juillet 2022", checked:false   },
    {key:11, value:"11 Juillet 2022", checked:false   },
    {key:12, value:"12 Juillet 2022", checked:false   },
    {key:13, value:"13 Juillet 2022", checked:false   },
    {key:14, value:"14 Juillet 2022", checked:false   },
    {key:15, value:"15 Juillet 2022", checked:false   },
    {key:16, value:"16 Juillet 2022", checked:false   },
    {key:17, value:"17 Juillet 2022", checked:false   },
    {key:18, value:"18 Juillet 2022", checked:false   },
    {key:19, value:"19 Juillet 2022", checked:false   },
    {key:20, value:"20 Juillet 2022", checked:false   },
    {key:21, value:"21 Juillet 2022", checked:false   },
    {key:22, value:"22 Juillet 2022", checked:false   },
    {key:23, value:"23 Juillet 2022", checked:false   },
    {key:24, value:"24 Juillet 2022", checked:false   },
    {key:25, value:"25 Juillet 2022", checked:false   },
    {key:26, value:"26 Juillet 2022", checked:false   },
    {key:27, value:"27 Juillet 2022", checked:false   },
    {key:28, value:"28 Juillet 2022", checked:false   },
    {key:29, value:"29 Juillet 2022", checked:false   },
    {key:30, value:"30 Juillet 2022", checked:false   },
    {key:31, value:"31 Juillet 2022", checked:false   },

    
    
  ];
  
  
  const bgColor = "#f5f5f5";
  
  const handleDatesRecherches = () => {
    
   
    stateData.map((item, index) => {
      

      //console.log(item.checked);
      
      if (item.checked === true ) {
        
        
        dispatchRecherche({
          type: "ADD_DATES_RECHERCHES",
          payload: item,
        });
        
      }else{

      dispatchRecherche({
          type: "DELETE_DATES_RECHERCHES",
          payload: item,
        });
      }
      
      
    });
    
    navigation.navigate('RechercheModal') ;
    
  };
  
  
function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}  
  
  
 
  const [stateData, setState] = useState(data);
  


  function uniq(a) {
    return Array.from(new Set(a));
 }


 function arrayRemove(arr, value) { 
    
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}


  const clickButton = (item) => {

    console.log(item.value);

    
    if(item.checked === false ){
      // 1. Make a shallow copy of the array
      let temp_state = [...stateData];
      
      // 2. Make a shallow copy of the element you want to mutate
      let temp_element = { ...temp_state[item.key] };

     
      // 3. Update the property you're interested in
      temp_element.checked = true;
      
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      //temp_state[0] = temp_element;
      //console.log(	temp_element);
      temp_state[item.key] = temp_element;
      
      
      
     
      
      // 5. Set the state to our new copy
      setState( uniq(temp_state) );
      
    }else{
      
      let temp_state = [...stateData];
      
      // 2. Make a shallow copy of the element you want to mutate
      let temp_element = { ...temp_state[item.key] };
      
      // 3. Update the property you're interested in
      temp_element.checked = false;
      
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      //temp_state[0] = temp_element;
     // console.log(	temp_element);
      temp_state[item.key] = temp_element;
      
      
      
      // 5. Set the state to our new copy
      setState( uniq(temp_state) );
      
    }
    
  }
  
  /*
  
  let fil = '';
  useEffect(() => {
    //fil = data;
    
    
  }, {stateData});
  
  */



  
  return (
    
    <View 
    style={{
      flex: 1,
      backgroundColor: "#7CA1B4",
      alignItems: "center",
      justifyContent: "center",
     // paddingBottom: 200
    }}
    >
      <ScrollView>
      
  {
    stateData
    .filter((item) => (item.value !== ""))
    .map((item, i) => (
     
      <View key={item.key}
      style={{
        borderColor: "#fff",
        borderWidth: 1,
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: item.checked ? '#f26522' : 'rgba(255,255,255,0)' 
        // backgroundColor: bgColor
        // backgroundColor: 'rgba(255,255,255,0)' 
      }}
      >
        
        <Pressable 
          
          onPress={()  =>
            {
              //handleStylesRecherches(item)
              clickButton(item)
            }}
            >
      <Text>{item.value}</Text>
      </Pressable>
      </View>
    ))
  }
</ScrollView>
            
            <View style={{justifyContent: "flex-end", flex: 3,
            position: "absolute", bottom: 10, width: '80%', marginLeft: '10%'}} key="btn_select">
            
            <Pressable
            
            onPress={() => {
              handleDatesRecherches()
              //clickButton(item)
              
            }}
            
            >
            <View style={[styles.labelCard, styles.labelAchat, styles.bigButton]} >
            <Text style={styles.textBigButton}> Valider ma sélection </Text>
            </View>
            </Pressable>
            
            </View>
            
            </View>
            
            
            )
            
            
          }