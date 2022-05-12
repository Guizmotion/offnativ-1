import React, { useEffect, useState } from "react";
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

const baseUrl = 'https://appli.ovh/off/app/';
const url_programme=baseUrl+'api2022.php?a=1';



export default function Programme({ navigation}) {
 
  const { state, dispatch } = React.useContext(AuthContext);
  const context = React.useContext(ShopContext);
/*


 
 
 {data.map((r,index) => (

 <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', {
 id: r.id,
 nom: r.nom,
 description: r.description,
 date: r.date,
 lieu: r.lieu,
 image: r.image,
 

 })}>
 <View key={index}>
 <ImgLazy
 source={{uri: r.image}}
 style={{width: 100, height: 100}}
 key={index}
 PlaceholderContent={<ActivityIndicator />}
 />

 <Text >{r.nom} {r.lieu} {r.date}</Text>

 </View>
 </TouchableOpacity>
 
 ))}


 

 */
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
//

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
 axios.get(url_programme).then(response => setData(response.data));
}, []);


useEffect(() => {
  console.log('context cart length:' + context.cart.length);
}, []);






async function add_favorite(id, tok) {
console.log(id);
console.log(tok);
/*
  await axios.post('https://api.festivaloffavignon.com/favorite',{
    
     headers: {
       'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8',
       'token': tok,//state.token
       'Content-Type': 'text/plain', 
      
     },
     data : {sh_id: 28592 }
 
   })
 
   .then(user => {
 
     console.log(user.data);
 
   }
 
   ).catch((error) => {
     if( error.response ){
       console.log(error);
        console.log(error.response.data); // => the response payload
     }
   }
   );*/
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

//setLoaderVisible(false);


const filteredData = searchText
 ? data.filter((x) =>
 x.description.toLowerCase().includes(searchText.toLowerCase()) ||
 x.nom.toLowerCase().includes(searchText.toLowerCase()) ||
 x.lieu.toLowerCase().includes(searchText.toLowerCase())

 )
 : data;




 
/*
return (
 <FlatList 
data={data}
keyExtractor={(r, index) => {
 // console.log("index", index)
 return index.toString();
}}
renderItem={(r, index) => 

<TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', {
 id: r.id,
 nom: r.nom,
 description: r.description,
 date: r.date,
 lieu: r.lieu,
 image: r.image,
 

 })}>
<View key={index}>
 <ImgLazy
 source={{uri: r.image}}
 style={{width: 100, height: 100}}
 key={index}
 PlaceholderContent={<ActivityIndicator />}
 />

 <Text >{r.nom} {r.lieu} {r.date}</Text>

 </View>
</TouchableOpacity>
} 

/>
);
*/
/*
function Detail({ item }) {
 return (
 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
 <Text>Details Screen {item.nom}</Text>
 <Button
 title="Go to Details... again"
 onPress={() => navigation.navigate('Details')}
 />
 </View>
 );
}*/

let item_nom = '';



/* LISTE PROGRAMME GLOBAL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

const renderData = (item) => {

 return(

<View>
  {state.isAuthenticated && (
      
    <Button title="Fav" onPress={() => add_favorite(item.id, state.token)} />

    )}
     {state.isAuthenticated && (
    
 
    <Button title="DelFav" onPress={() => rm_favorite(item.id, state.token)} />
  
    )}
{state.isAuthenticated && (
<Button title="panier" 

onPress={context.addProductToCart.bind(this, item)} 

/>
  )}


 <TouchableWithoutFeedback 
 delayPressIn={10}
 onPress={fillModal.bind(this,item.id,item.nom,item.description,item.date,item.lieu,item.image)}
 >
 

 <Card style = {styles.cardList}>

<View  style={styles.blocContent}> 
   <Text style={styles.Titre}>{item.nom}</Text>
   <Text style={[styles.defautText, styles.ParagraphBold]}>du 5 au 28 juillet</Text>
   <Text style={styles.defautText}>relâche les 10, 17, 24 à 12h00 - Durée 1h25</Text>
   <View style={styles.labelCard}><Text style={styles.smallText}> Humour</Text></View>
   <View style={styles.labelCard}><Text  style={styles.smallText}> Tout public</Text></View>
   <View style={[styles.labelCard, styles.labelPlace]}><Text  style={styles.smallTextNoir}>nom du théâtre</Text></View>
   <View style={[styles.labelCard, styles.labelAchat]}><Text  style={styles.smallText}> Achat sur Ticket'Off</Text></View>
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


 /*


 {visible && <View
 style={{
 ...StyleSheet.absoluteFill,
 justifyContent: 'center',
 alignItems: 'center',
 }}>
 <ActivityIndicator
 size="large"
 color="#00B8D4"
 animating={visible}
 style={{ marginBottom: 20 }} />
 </View>} 

 */


/*

renderItem={({ item }) => {


 return (
<TouchableOpacity 
 onPress={() => navigation.navigate('Detail', {item}) 
}>

 
<View>
 <ImgLazy
 source={{uri: item.image}}
 style={{width: 100, height: 100}}
 
 PlaceholderContent={<ActivityIndicator />}
 />

 <Text >{item.nom} </Text>

 </View>
 </TouchableOpacity>

 )
 }}

 */



 }







