import React, { useEffect, useState } from "react";
import {Image, Text,TextInput, View, StyleSheet, searchText,ScrollViewButton, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';
import { ActivityIndicator, ToastAndroid } from 'react-native';
import { Image as ImgLazy } from 'react-native-elements';
import { Detail } from './Detail';
import {Card} from 'react-native-paper';

import WebView from "react-native-webview";
import styles from './styles/StyleGeneral';

export default function RechercheModal() {
console.log('recherche');
    return (
        
        <View style={{width: '100%', backgroundColor: '#fff', height: '100%'}}>
            

            <View style={{padding: 20, paddingTop: 40, flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '20%'}} >
                        <Image
                            style={{
                                resizeMode: "cover",
                                height: 25,
                                width: 25,
                            }}
                            source={require("../assets/recherche-black.png")}
                        />
                    </View>
                    <View style={{width: '60%', alignItems: 'center'}} ><Text style={[styles.titrePage, styles.alignCenter]}>Rechercher</Text></View>

                    <View style={{width: '30%', alignItems: 'flex-end', right: 0}}>
                        <Pressable
                            style={styles.alignCenter}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Image
                                    style={{
                                        resizeMode: "cover",
                                        height: 25,
                                        width: 25,
                                    }}
                                    source={require("../assets/closemenu.png")}
                                    />
                        </Pressable>
                    </View>
                    
            </View>
            <View style={styles.Separateur}  />
            <View style={{padding: 0,  flexDirection: 'row', width: '100%'}}>
                <TextInput
                style = {{padding:10,  width: '90%', margin: 0,marginLeft: '5%',}}
                autoCapitalize="none"
                placeholder="Tapez votre recherche..."
                onChangeText={(text) => {
                setSearchText(text);
                }}
                value={searchText}
                />  
            </View>
            <View style={styles.Separateur}  />
            <View style={{padding:10,  width: '90%', margin: 0,marginLeft: '5%', flexDirection: 'row', alignContent: 'space-between', width: '100%', }}>
                <Text>Style de pièce</Text>
                <Text style={{position: 'absolute', right: 80, marginTop: 10, fontWeight: 'bold'}}>Humour</Text>
                <View style={{position:"absolute", right: 40, marginTop: 5}}><Image
                                    style={{
                                        resizeMode: "cover",
                                        height: 30,
                                        width: 30,                                        
                                    }}
                                    source={require("../assets/next.png")}
                                    /></View>
            </View>
            <View style={styles.Separateur}  />

            <View style={{padding:10,  width: '90%', margin: 0,marginLeft: '5%', flexDirection: 'row', alignContent: 'space-between', width: '100%', }}>
                <Text>Type de public</Text>
                <View style={{position:"absolute", right: 40, marginTop: 5}}><Image
                                    style={{
                                        resizeMode: "cover",
                                        height: 30,
                                        width: 30,                                        
                                    }}
                                    source={require("../assets/next.png")}
                                    /></View>
            </View>
            <View style={styles.Separateur}  />

            <View style={{padding:10,  width: '90%', margin: 0,marginLeft: '5%', flexDirection: 'row', alignContent: 'space-between', width: '100%', }}>
                <Text>Date</Text>
                <View style={{position:"absolute", right: 40, marginTop: 5}}><Image
                                    style={{
                                        resizeMode: "cover",
                                        height: 30,
                                        width: 30,                                        
                                    }}
                                    source={require("../assets/next.png")}
                                    /></View>
            </View>
            <View style={styles.Separateur}  />

            <View style={{padding:10,  width: '90%', margin: 0,marginLeft: '5%', flexDirection: 'row', alignContent: 'space-between', width: '100%', }}>
                <Text>Horaires</Text>
                <View style={{position:"absolute", right: 40, marginTop: 5}}><Image
                                    style={{
                                        resizeMode: "cover",
                                        height: 30,
                                        width: 30,                                        
                                    }}
                                    source={require("../assets/next.png")}
                                    /></View>
            </View>
            <View style={styles.Separateur}  />

            <View style={{padding:10,  width: '90%', margin: 0,marginLeft: '5%', flexDirection: 'row', alignContent: 'space-between', width: '100%', }}>
                <Text>Théâtre</Text>
                <View style={{position:"absolute", right: 40, marginTop: 5}}><Image
                                    style={{
                                        resizeMode: "cover",
                                        height: 30,
                                        width: 30,                                        
                                    }}
                                    source={require("../assets/next.png")}
                                    /></View>
            </View>
            <View style={styles.Separateur}  />

            <View style={{padding:10,  width: '90%', margin: 0,marginLeft: '5%', flexDirection: 'row', alignContent: 'space-between', width: '100%', }}>
                <Text>Auteur</Text>
                
                <Text style={{position: 'absolute', right: 80, marginTop: 10, fontWeight: 'bold'}}>Sélection multiple</Text>
                <View style={{position:"absolute", right: 40, marginTop: 5}}><Image
                                    style={{
                                        resizeMode: "cover",
                                        height: 30,
                                        width: 30,                                        
                                    }}
                                    source={require("../assets/next.png")}
                                    /></View>
            </View>
            <View style={styles.Separateur}  />


            <View style={{padding:10,  width: '90%', margin: 0,marginLeft: '5%', flexDirection: 'row', alignContent: 'space-between', width: '100%', }}>
                <Text>Metteur en scène</Text>
                <View style={{position:"absolute", right: 40, marginTop: 5}}><Image
                                    style={{
                                        resizeMode: "cover",
                                        height: 30,
                                        width: 30,                                        
                                    }}
                                    source={require("../assets/next.png")}
                                    /></View>
            </View>
            <View style={styles.Separateur}  />


            <View style={{padding:10,  width: '90%', margin: 0,marginLeft: '5%', flexDirection: 'row', alignContent: 'space-between', width: '100%', }}>
                <Text>Divers</Text>
                <View style={{position:"absolute", right: 40, marginTop: 5}}><Image
                                    style={{
                                        resizeMode: "cover",
                                        height: 30,
                                        width: 30,                                        
                                    }}
                                    source={require("../assets/next.png")}
                                    /></View>
            </View>
            <View style={styles.Separateur}  />


            <View style={{padding:10,  width: '90%', margin: 0,marginLeft: '5%', flexDirection: 'row', alignContent: 'space-between', width: '100%', }}>
                <Text>Autour des spectacles</Text>
                <View style={{position:"absolute", right: 40, marginTop: 5}}><Image
                                    style={{
                                        resizeMode: "cover",
                                        height: 30,
                                        width: 30,                                        
                                    }}
                                    source={require("../assets/next.png")}
                                    /></View>
            </View>
            <View style={styles.Separateur}  />

            <View style={{justifyContent: "flex-end", flex: 1}}>
                <View style={[styles.labelCard, styles.labelAchat, styles.btnFixed]}><Text style={styles.textBigButton}> Afficher les résultats</Text></View>
            </View>

 
        
        </View>
        

    );


}
