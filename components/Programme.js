import React, { useEffect, useState,useRef } from "react";
import {Image, Text,TextInput,DrawerContentScrollView, View, StyleSheet, ScrollViewButton, ScrollView, Button,FlatList, TouchableOpacity,Modal,Pressable,TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';
import { ActivityIndicator, ToastAndroid } from 'react-native';
import { Image as ImgLazy } from 'react-native-elements';
import { Detail } from './Detail';
import {Card} from 'react-native-paper';
import styles from './styles/StyleGeneral';
import WebView from "react-native-webview";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext}  from './services/Auth';

import {ShopContext}  from "./services/ShopContext";
import {FavorisContext}  from "./services/FavorisContext";

const baseUrl = 'https://appli.ovh/off/app/';
const url_programme = baseUrl+'api2022.php?a=1';



export default function Programme({ navigation}) {
  
  
  const { state, dispatch } = React.useContext(AuthContext);
  const context = React.useContext(ShopContext);
  
  // initialize data state variable as an empty array
  const [data, setData] = useState([]);
  const [input, setInput] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [itemNom, setItemNom] = useState([]);
  const [itemDescription, setItemDescription] = useState([]);
  const [itemDate, setItemDate] = useState([]);
  const [itemLieu, setItemLieu] = useState([]);
  const [itemImage, setItemImage] = useState([]);
  const [itemId, setItemId] = useState([]);  
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState("all");
  const [searchText, setSearchText] = useState();
  
  
  
  
  
  
  
  const ITEM_HEIGHT = 35; // fixed height of item component
  const getItemLayout = (data, index) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * data.length,
      index,
    };
  };
  
  
  
  
  // make the fetch the first time your component mounts
  useEffect(() => {
    
    
    
    axios.get(url_programme).then(response => {
      setData(response.data);
      //console.log(state.favorites);

    });

  }, []);
  
  
  
  
  useEffect(() => {
    console.log('context cart length:' + context.cart.length);
  }, []);
  
  
  async function getFavorites(tok)
  {
    
    var myHeaders = new Headers();
    myHeaders.append("api-key", "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8");
    myHeaders.append("token", tok);// "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvZmYtand0IiwidG9rZW5faWQiOiI5MWQ3MjBhYS1kOTZhLTRjZmEtYWVkNS03OGZkZTBiOWVjNTYiLCJ1c2VyX2lkIjo2MjQwMSwiaWF0IjoxNjUyMzYyMzU0LCJleHAiOjE2NTQ5NTQzNTR9.LOWg61EohuE3379lnoPMxDi5E-za0GPAiy_9ILxa9m-rujDYQNSPu0uthL9zt67scXVV0vfe8OfSWKKv4QSwXEWI70h3mhjHolcBo6dspuojqfDSpocv1s1AGF5hc3XOST8_p1NFhZacO5Eje6-6iPItCh4c2OBwP6MkeJe7PDI");
    //myHeaders.append("Cookie", ".ASPXANONYMOUS=C5AaxfWW2AEkAAAAMjZlMGI5YzUtMzZhNC00ZmI3LWJhOWUtYjcxMzEwNjJmMWZmJnHD8r3JRaHoMX5AiBpQOd6w5NNFbICO7Y56PMvrWz81");
    
    var raw = "";
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    return await fetch("https://api.festivaloffavignon.com/favorite", requestOptions)
    .then(response => response.text())
    .then(result => console.log( result))
    .catch(error => console.log('error', error));
    
    
    
  }
  
  
  
  async function add_favorite(id, tok) {
    console.log(id);
    console.log(tok);
    
    var data = '{\r\n"sh_id": '+ id + '\r\n}';
    
    var config = {
      method: 'post',
      url: 'https://api.festivaloffavignon.com/favorite',
      headers: { 
        'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
        'token': tok,//'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvZmYtand0IiwidG9rZW5faWQiOiJlYmU0YzM1MC1mODQwLTRmM2ItYWU5NS04ZjFjZmZkNTJlMTEiLCJ1c2VyX2lkIjo2MjQwMSwiaWF0IjoxNjUyMzY4NTA5LCJleHAiOjE2NTQ5NjA1MDl9.JewUZHVK4sybvGfH9zwRKhRqB6ItcBrd40SVYd-W-TSN-TI3FVcuAp4fY0-i_TqeNWjadOLYNMKwk44VEt60FcrpSKps9O9zdBpoBnx-KD3G0N5BOYyB56IhBC9-OTOR-R-63zjF0eeiu0u4g_RmHRIt79E6v7sJ1380FwPUDW8', 
        'Content-Type': 'text/plain', 
        //'Cookie': '.ASPXANONYMOUS=C5AaxfWW2AEkAAAAMjZlMGI5YzUtMzZhNC00ZmI3LWJhOWUtYjcxMzEwNjJmMWZmJnHD8r3JRaHoMX5AiBpQOd6w5NNFbICO7Y56PMvrWz81'
      },
      data : data
    };
    
    await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
  }
  
  async function rm_favorite(id, tok) {
    
    await axios.delete('https://api.festivaloffavignon.com/favorite',{
    
    headers: {
      'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8',
      'token': tok,//state.token
    },
    data: {
      sh_id: id
      
    }
    
  })
  
  .then(user => {
    
    console.log(user.data);
    
  }
  
  ).catch((error) => {
    if( error.response ){
      console.log(error);
      //console.log(error.response.data); // => the response payload
    }
  }
  );
  
  
}

function clearModal() {
  setVisible( true );
  setItemNom(null);
  setItemDescription(null);
  setItemDate(null);
  setItemLieu(null);
  setItemImage(null);
  setItemId(null);
}

function fillModal(id,nom,description,date,lieu,image){
  
  
  
  // clearModal();
  
  //setLoaderVisible( !loaderVisible );
  
  
  
  
  setItemNom(nom);
  
  setItemDescription(description);
  setItemDate(date);
  setItemLieu(lieu);
  setItemImage(image);
  setItemId(id);
  //add_favorite(id) ;
  
  
  setModalVisible(true);
  
  
}


const filteredData = searchText
? data.filter((x) =>
x.description.toLowerCase().includes(searchText.toLowerCase()) ||
x.nom.toLowerCase().includes(searchText.toLowerCase()) ||
x.lieu.toLowerCase().includes(searchText.toLowerCase())

)
: data;



let item_nom = '';



/* LISTE PROGRAMME GLOBAL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

const renderData = (item) => {
  
  let show_ticket_off = false;
  
  //console.log(item.ticket_off);
  if(item.ticket_off === 'Non'){
    show_ticket_off = true;
  }
  
  //console.log(item.id);
  
  
  // const arrayOfObject = [{ id: 1, name: 'john' }, {id: 2, name: 'max'}];
  
  
  
  
  
  
  return(
    
    <View>
    {state.isAuthenticated && (
      
      <Button title="Fav" onPress={() => add_favorite(item.id, state.token)} />
      
      )}
      {state.isAuthenticated && (
        
        
        <Button title="DelFav" onPress={() => rm_favorite(item.id, state.token)} />
        
        )}
        {/*state.isAuthenticated && (
          <Button title="panier" 
          
          onPress={context.addProductToCart.bind(this, item)} 
          
          />
        )*/}
        
        
        <TouchableWithoutFeedback 
        delayPressIn={10}
        onPress={fillModal.bind(this,item.id,item.nom,item.description,item.date,item.lieu,item.image)}
        >
        
        
        <Card style = {styles.cardList}>
        
        <View  style={styles.blocContent}> 
        <Text style={styles.Titre}>{item.titre_spectacle}</Text>
        <Text style={[styles.defautText, styles.ParagraphBold]}>{item.dates_representations}</Text>
        <Text style={styles.defautText}>-  Durée {item.duree}</Text>
        {/* <Text style={styles.defautText}>-  Horaire {item.horaire} </Text> */}
        <View style={styles.labelCard}><Text style={styles.smallText}>{item.style} </Text></View>
        
        <View style={styles.labelCard}><Text  style={styles.smallText}>{item.type_public  } </Text></View>
        <View style={styles.labelCard}><Text  style={styles.smallText}>{item.categorie  } </Text></View>
        <View style={[styles.labelCard, styles.labelPlace]}><Text  style={styles.smallTextNoir}>{item.lieu} {item.salle}</Text></View>
        <View style={[styles.labelCard, styles.labelAchat
          , show_ticket_off ? styles.hideElement : null
        ]}><Text  style={styles.smallText}> Achat sur Ticket'Off </Text></View>
        </View> 
        
        
        <View style={styles.blocImage}> 
        <ImgLazy
        source={{uri: item.image}}
        style={{width: 120, height: 160}}
        PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.favorisBtn}> 
        <Image
        style={{
          resizeMode: "cover",
          height: 20,
          width: 20,
        }}
        source={require("../assets/favoris.png")}
        />
        </View>
        </View>
        
        
        
        
        
        </Card> 
        </TouchableWithoutFeedback>
        </View>
        )}
        {/*  <Button title="DelFav" onPress={() => rm_favorite(item.id)} /> */}
        
        /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FIN LISTE PROGRAMME GLOBAL  */
        
        /* HEADER PROGRAMME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        
        return (
          <View >
          
          
          
          <View style={styles.headView}>
          
          <Pressable
          onPress={() => navigation.openDrawer()}
          style={styles.openMenu}
          >
          
          <Image
          style={{
            resizeMode: "cover",
            height: 20,
            width: 20,
          }}
          source={require("../assets/menu.png")}
          />
          </Pressable>
          
          <Text style={styles.titrePage}>Programme</Text>
          
          <View style={{flexDirection: 'row', width: '80%',marginTop: 10}}>
          <View style={[styles.labelCard,styles.btnBig, styles.labelAchat]}>
          <Pressable
          onPress={() => navigation.navigate("RechercheModal")}
          
          >
          
          <Image
          style={{
            resizeMode: "cover",
            height: 25,
            width: 25,
          }}
          source={require("../assets/recherche.png")}
          />
          
          
          </Pressable>
          <Text style={styles.textBigButton}> Affiner ma recherche</Text>
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
          initialNumToRender="7"
          
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd < 0) return;
            
          }}
          
          
          
          
          
          keyExtractor={(item, index) => {
            // console.log("index", index)
            return index.toString();
          }}
          
          renderItem = {({item}) => {
            return renderData(item)
          }}
          />
          
          {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FIN LISTE PROGRAMME APPEL */}
          
          {/* FICHE PROGRAMME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          
          
          <Modal
          // animationType={'slide'}
          transparent={true}
          visible={modalVisible}
          style={{ margin: 0 }}
          onRequestClose={() => {
            //Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            
          }}>
          <ScrollView>
          <View style=
          {{flex: 1, 
            height: '100%',
            width: '100%',
            backgroundColor: '#FFFFFF',
            elevation: 1,
            overflow: 'scroll'
          }}>
          
          
          
          <Pressable
          style={styles.closeFiche}
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
          
          <View style={styles.imageFiche}>
          <ImgLazy 
          PlaceholderContent={<ActivityIndicator />}
          source={{uri: itemImage}} style={{width: '100%', height: 300,resizeMode: "cover"}}/>
          </View>
          
          <View style={{borderRadius: 30, padding: 30, marginTop:-30, backgroundColor: '#fff', width: '100%'}}>
          <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={styles.iconStyle}>
          <Image
          style={{
            resizeMode: "cover",
            height: 35,
            width: 35,
          }}
          source={require("../assets/public2.png")}
          />
          </View>
          <View style={styles.iconStyle}>
          <Image
          style={{
            resizeMode: "cover",
            height: 35,
            width: 35,
          }}
          source={require("../assets/picto1.png")}
          />
          </View>
          <View style={styles.labelBigplace}><Text>{itemLieu}</Text></View>
          </View>
          <View style={{marginTop: '5%'}}>
          <Text style={styles.titreFiche}>{itemNom}</Text>
          <Text opacity={0.5} style={[styles.defautTextFiche]}>à 12h00 - Durée 1h25</Text>
          </View>
          
          <View style={{marginTop: '5%', flexDirection: 'row'}}>
          <View style={styles.labelCard}><Text style={styles.smallText}> Nouveau au festival</Text></View>
          <View style={styles.labelCard}><Text  style={styles.smallText}> Climatisation</Text></View>
          <View style={styles.labelCard}><Text  style={styles.smallText}> Accès PMR</Text></View>
          </View>
          
          <View style={styles.blocGris}>
          <View style={{width: '25%', alignItems: "center", justifyContent: "space-between"}}>
          <Text  style={styles.smallTextNoir}> Abonné</Text>
          <Text  style={[styles.titreFiche, styles.alignCenter]}>14 €</Text>
          </View> 
          <View style={{width: '25%', alignItems: "center", justifyContent: "space-between"}}>
          <Text  style={styles.smallTextNoir}> Plein tarif</Text>
          <Text  style={[styles.titreFiche, styles.alignCenter]}>14 €</Text>
          </View> 
          <View style={{width: '25%', alignItems: "center", justifyContent: "space-between"}}>
          <Text  style={styles.smallTextNoir}> enfant</Text>
          <Text  style={styles.smallTextNoir}> (- de 12 ans)</Text>
          <Text style={[styles.titreFiche, styles.alignCenter]}>14 €</Text>
          </View> 
          <View style={{width: '25%', alignItems: "center", justifyContent: "space-between"}}>
          <Text  style={[styles.smallTextNoir, styles.alignCenter]}> Réduit</Text>
          <Text  style={[styles.smallTextNoir, styles.alignCenter]}> (chômeur, étudiant, -18)</Text>
          <Text style={[styles.titreFiche, styles.alignCenter]}>14 €</Text>
          </View> 
          </View>
          
          <View  style={{marginTop: '5%'}}>
          <Text style={{textAlign:'left'}}>{itemDescription}</Text>
          <Text style={{textAlign:'left'}}>{itemDescription}</Text>
          <Text style={{textAlign:'left'}}>{itemDescription}</Text>
          <Text >{itemDate}</Text>
          <Text >{itemLieu}</Text>
          </View>
          
          </View>
          <View style={{justifyContent: "flex-end", flex: 1}}>
          <View style={[styles.labelCard, styles.labelAchat, styles.btnFixed]}><Text style={styles.textBigButton}> Acheter sur Ticket'Off</Text></View>
          </View>
          
          </View>
          </ScrollView>
          </Modal>
          
          
          {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FIN FICHE PROGRAMME */}
          
          </View>
          
          );
          
          
          
        }
        
        
        
        
        
        
        
        