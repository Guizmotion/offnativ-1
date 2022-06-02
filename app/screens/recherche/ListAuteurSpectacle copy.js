
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

export default function ListAuteurSpectacle({ navigation}) {
  
  const [checked, setChecked] = useState(false);
  const { stateRecherche, dispatchRecherche } = React.useContext(RechercheContext);
  
  
  const data = [
    { key:0,  value:"nico", checked:false } ,
    { key:1,  value:"jon", checked:false } ,
    {key:2,   value:"test", checked:false } ,
    {key:3,   value:"ss", checked:false } ,
    {key:4,   value:"ss", checked:false } ,
    {key:5,   value:"ss", checked:false } ,   
    {key:6,   value:"ss", checked:false } ,
    {key:7 , value:"ss", checked:false   },
    {key:8 , value:"ss", checked:false   },
    {key:9 , value:"ss", checked:false   },
    {key:10, value:"ss", checked:false   },
    {key:11, value:"ss", checked:false   },
    {key:12, value:"ss", checked:false   },
    {key:13, value:"ss", checked:false   },
    {key:14, value:"ss", checked:false   },
    {key:15, value:"ss", checked:false   },
    {key:16, value:"ss", checked:false   },
    {key:17, value:"ss", checked:false   },
    {key:18, value:"ss", checked:false   },
    {key:19, value:"ss", checked:false   },
    {key:20, value:"ss", checked:false   },
    {key:21, value:"ss", checked:false   },
    {key:22, value:"ss", checked:false   },
    {key:23, value:"", checked:false   },
    {key:24, value:"", checked:false   },
    {key:25, value:"", checked:false   },
    {key:26, value:"", checked:false   },
    {key:27, value:"", checked:false   },
    {key:28, value:"", checked:false   },
    {key:29, value:"", checked:false   },
    {key:30, value:"", checked:false   },
    {key:31, value:"", checked:false   },

    
    
  ];
  
  
  const bgColor = "#f5f5f5";
  
  const handleAuteursRecherches = () => {
    
   
    stateData.map((item, index) => {
      

      //console.log(item.checked);
      
      if (item.checked === true ) {
        
        
        dispatchRecherche({
          type: "ADD_AUTEURS_RECHERCHES",
          payload: item,
        });
        
      }else{

      dispatchRecherche({
          type: "DELETE_AUTEURS_RECHERCHES",
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

     
      // 3. UpAuteur the property you're interested in
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
      
      // 3. UpAuteur the property you're interested in
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
       // flexDirection: 'row',
        padding: 15,
       // justifyContent: 'center',
       // alignItems: 'center',
    }}
    >
      <ScrollView>
      
  {
    stateData
    .filter((item) => (item.value !== ""))
    .map((item, i) => 
    
    (
     
      <View key={item.key}
      style={{
        flex: 1,
        height: 50,
        width: 100,
       // textAlign: 'center',
        // Highlight header
        
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
              handleAuteursRecherches()
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