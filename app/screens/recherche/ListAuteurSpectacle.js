import React, { useEffect, useState,useMemo } from "react";
import { Pressable,View, Text } from "react-native";

import { ActivityIndicator, Colors } from "react-native-paper";

import { AlphabetList } from "react-native-section-alphabet-list";
import axios from "axios";

import { StoreContext } from "../../store/store";
import { RechercheContext } from "../../store/storeRecherche";
import styles from "../../config/styles/StyleGeneral";



export default function ListAuteurSpectacle({ navigation}) {
    
    
    
    const data = [
        { key:0, value: "A"},
        { key:1,value: "B"},
        {key:2, value: "Boulevard"},
        {key:3,value: "Café-théâtre"},
        {key:4,value: "Chanson"},
        {key:5,value: "Cirque contemporain"},     
        {key:6,value: "Clown"},
        {key:7,value: "Comédie"},
        {key:8,value: "Concert"},
        {key:9,value: "Conférence"},
        {key:10,value: "Conférence-spectacle"}, 
        
        
        
    ];
    
    
    const { stateRecherche, dispatchRecherche } = React.useContext(RechercheContext);
    
    
    
    const addAuteursRecherches =  (item) => {
        
        
        dispatchRecherche({
            type: "SELECT_STYLES_RECHERCHES",
            payload: item.key,
        });
        
        dispatchRecherche({
            type: "ADD_STYLES_RECHERCHES",
            payload: item,
        });
        
        
        
        
        
        
    };
    
    

    const removeAuteursRecherches = (item) => {
        
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
        // console.log(stateRecherche.AuteursRecherchesSelected);
        
        // const isSelected = false;
        
    }, [stateRecherche]);
    
    
    
    return (
        <AlphabetList
        data={data}
        
        indexLetterStyle={{ 
            color: 'blue', 
            fontSize: 15,
        }}
        renderCustomItem={(item) => 
            {
                
                // const statut = stateRecherche.AuteursRecherches.includes(item.value) ;
                //const statut = state.AuteursRecherches.indexOf(item.value) != -1 ;
                //const statut = state.AuteursRecherches.some(item.value)  ;
                //let statut = AuteursRecherches2[item.key];
                let statut = stateRecherche.AuteursRecherchesSelected[item.key];
                
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
                                removeAuteursRecherches(item);
                            }else{
                                addAuteursRecherches(item);
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
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        backgroundColor: statut ? '#00cc00' : '#f2f2f2' 
                    }}
                    
                    
                    
                    >
                    
                    <Text style={styles.listItemLabel}>{item.value}</Text>
                    
                    </View>
                    </Pressable>
                    </View>
                    
                    )}
                    
                }
                
                renderCustomSectionHeader={(section) => (
                    <View style={styles.sectionHeaderContainer} key={section.key}>
                    <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
                    </View>
                    )}
                    />
                    )
                    
                    
                }