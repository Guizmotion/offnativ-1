import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  Text,
  TextInput,
  Linking,
  DrawerContentScrollView,
  View,
  StyleSheet,
  ScrollViewButton,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  RefreshControl,
  Share
} from "react-native";
import axios from "axios";

import { ActivityIndicator, ToastAndroid } from "react-native";
import { Image as ImgLazy, Icon } from "react-native-elements";

import { Detail } from "./Detail";
import { Card } from "react-native-paper";
import styles from "../config/styles/StyleGeneral";

import { StoreContext } from "../store/store";



  const ProgrammeCard = ({item}) => {
      
    
    const { state, dispatch } = React.useContext(StoreContext);
    const [modalVisible, setModalVisible] = useState(false);

    const [itemId, setItemId] = useState([]);

    const [itemAcces_handicape, setItemAcces_handicape] = useState([]);
    const [itemTitre_spectacle, setItemTitre_spectacle] = useState([]);
    const [itemAuteur_prenom, setItemAuteur_prenom] = useState([]);
    const [itemNom, setItemNom] = useState([]);
  
    const [itemTicket_off, setItemTickets_off] = useState([]);
    const [itemHoraire, setItemHoraire] = useState([]);
    const [itemImage, setItemImage] = useState([]);
    const [itemDuree, setItemDuree] = useState([]);
  
    const [itemType_public, setItemType_public] = useState([]);
    const [itemCategorie, setItemCategorie] = useState([]);
    const [itemLieu, setItemLieu] = useState([]);
    const [itemDescription, setItemDescription] = useState([]);
    const [itemStyle, setItemStyle] = useState([]);
    const [itemSalle, setItemSalle] = useState([]);
    const [itemTheatre, setItemTheatre] = useState([]);
    const [itemDeja_joue, setItemDeja_joue] = useState([]);
    const [itemNon_francophones, setItemNon_francophones] = useState([]);
    const [itemPlein_air, setItemPlein_air] = useState([]);
    const [itemClim, setItemClim] = useState([]);
    const [itemEspeces, setItemEspeces] = useState([]);
    const [itemCheques, setItemCheques] = useState([]);
    const [itemCb, setItemCb] = useState([]);
    const [itemTel_reservation, setItemTel_reservation] = useState([]);
    const [itemCompagnie, setItemCompagnie] = useState([]);
    const [itemAdresse, setItemAdresse] = useState([]);
    const [itemCp, setItemCp] = useState([]);
    const [itemVille, setItemVille] = useState([]);
    const [itemPays, setItemPays] = useState([]);
    const [itemSite_web, setItemSite_web] = useState([]);
    const [itemBande_annonce, setItemBande_annonce] = useState([]);
    const [itemTarif_reduit_precisions, setItemTarif_reduit_precisions] =
      useState([]);
    const [itemAge, setItemAge] = useState([]);
    const [itemDates_representations, setItemDates_representations] = useState(
      []
    );
    const [itemTarif, setItemTarif] = useState([]);
    const [itemTarif_adh, setItemTarif_adh] = useState([]);
    const [itemTarif_enfant, setItemTarif_enfant] = useState([]);
    const [itemUrl, setItemUrl] = useState([]);
    const [itemUrl_fav, setItemUrl_fav] = useState([]);
    const [itemUrl_rmfav, setItemUrl_rmfav] = useState([]);
    const [itemTitre, setItemTitre] = useState([]);
    const [itemDates, setItemDates] = useState([]);
    const [itemT_Rouge, setItemT_Rouge] = useState([]);
    const [itemT_jaune, setItemT_jaune] = useState([]);
    const [itemT_bleu, setItemT_bleu] = useState([]);
    const [itemT_vert, setItemT_vert] = useState([]);
    const [itemT_turquoise, setItemT_turquoise] = useState([]);
    const [itemCharg_diff, setItemCharg_diff] = useState([]);
    const [itemTelephone, setItemTelephone] = useState([]);
    const [itemCourriel, setItemCourriel] = useState([]);
    const [itemStructure, setItemStructure] = useState([]);
    const [itemCharg_diff_addresse, setItemCharg_diff_addresse] = useState([]);


    async function getFavorites(tok) {
        var myHeaders = new Headers();
        myHeaders.append("api-key", "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8");
        myHeaders.append("token", tok); // "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvZmYtand0IiwidG9rZW5faWQiOiI5MWQ3MjBhYS1kOTZhLTRjZmEtYWVkNS03OGZkZTBiOWVjNTYiLCJ1c2VyX2lkIjo2MjQwMSwiaWF0IjoxNjUyMzYyMzU0LCJleHAiOjE2NTQ5NTQzNTR9.LOWg61EohuE3379lnoPMxDi5E-za0GPAiy_9ILxa9m-rujDYQNSPu0uthL9zt67scXVV0vfe8OfSWKKv4QSwXEWI70h3mhjHolcBo6dspuojqfDSpocv1s1AGF5hc3XOST8_p1NFhZacO5Eje6-6iPItCh4c2OBwP6MkeJe7PDI");
        //myHeaders.append("Cookie", ".ASPXANONYMOUS=C5AaxfWW2AEkAAAAMjZlMGI5YzUtMzZhNC00ZmI3LWJhOWUtYjcxMzEwNjJmMWZmJnHD8r3JRaHoMX5AiBpQOd6w5NNFbICO7Y56PMvrWz81");
    
        var raw = "";
    
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        return await fetch(
          "https://api.festivaloffavignon.com/favorite",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      }
    
      async function add_favorite(id, tok) {
        console.log(id);
        console.log(tok);
    
        var data = '{\r\n"sh_id": ' + id + "\r\n}";
    
        var config = {
          method: "post",
          url: "https://api.festivaloffavignon.com/favorite",
          headers: {
            "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
            token: tok, //'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvZmYtand0IiwidG9rZW5faWQiOiJlYmU0YzM1MC1mODQwLTRmM2ItYWU5NS04ZjFjZmZkNTJlMTEiLCJ1c2VyX2lkIjo2MjQwMSwiaWF0IjoxNjUyMzY4NTA5LCJleHAiOjE2NTQ5NjA1MDl9.JewUZHVK4sybvGfH9zwRKhRqB6ItcBrd40SVYd-W-TSN-TI3FVcuAp4fY0-i_TqeNWjadOLYNMKwk44VEt60FcrpSKps9O9zdBpoBnx-KD3G0N5BOYyB56IhBC9-OTOR-R-63zjF0eeiu0u4g_RmHRIt79E6v7sJ1380FwPUDW8',
            "Content-Type": "text/plain",
            //'Cookie': '.ASPXANONYMOUS=C5AaxfWW2AEkAAAAMjZlMGI5YzUtMzZhNC00ZmI3LWJhOWUtYjcxMzEwNjJmMWZmJnHD8r3JRaHoMX5AiBpQOd6w5NNFbICO7Y56PMvrWz81'
          },
          data: data,
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
        await axios
          .delete("https://api.festivaloffavignon.com/favorite", {
            headers: {
              "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
              token: tok, //state.token
            },
            data: {
              sh_id: id,
            },
          })
    
          .then((user) => {
            console.log(user.data);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error);
              //console.log(error.response.data); // => the response payload
            }
          });
      }
    

  const shareData = async () => {
    try {
        await Share.share({
            message:
            itemTitre_spectacle + ', ' + 

         //  + '  , lieu : ' + 
           

         ', Lieu : ' + itemLieu + ' ' + 

           // itemSalle + ' ' + 
          //  itemTheatre + ' ' + 
            ', tel resa : ' + itemTel_reservation + ' ' + 
            ', tarif : ' + itemTarif + ' Eur ' 
          //  ', lien web : ' + itemUrl 
            
            
            ,
        });
    } catch (error) {
        alert(error.message);
    }
};


    function fillModal(item) {
        console.log(item.nom);
      //  setIsLoading(true);
        setItemId(item.id);
        setItemTitre_spectacle(item.titre_spectacle);
        setItemAuteur_prenom(item.auteur_prenom);
        setItemNom(item.nom);
        setItemTickets_off(item.tickets_off);
        setItemHoraire(item.horaire);
        setItemImage(item.image);
        setItemDuree(item.duree);
        setItemType_public(item.type_public);
        setItemCategorie(item.categorie);
        setItemLieu(item.lieu);
        setItemDescription(item.description);
        setItemStyle(item.style);
        setItemSalle(item.salle);
        setItemTheatre(item.theatre);
        setItemDeja_joue(item.deja_joue);
        setItemNon_francophones(item.non_francophones);
        setItemPlein_air(item.plein_air);
        setItemClim(item.clim);
        setItemEspeces(item.especes);
        setItemCheques(item.cheques);
        setItemCb(item.cb);
        setItemAcces_handicape(item.acces_handicape);
        setItemTel_reservation(item.tel_reservation);
        setItemCompagnie(item.compagnie);
        setItemAdresse(item.adresse);
        setItemCp(item.cp);
        setItemVille(item.ville);
        setItemPays(item.pays);
        setItemSite_web(item.site_web);
        setItemBande_annonce(item.bande_annonce);
        setItemTarif_reduit_precisions(item.tarif_reduit_precisions);
        setItemAge(item.age);
        setItemDates_representations(item.dates_representations);
        setItemTarif(item.tarif);
        setItemTarif_adh(item.tarif_adh);
        setItemTarif_enfant(item.tarif_enfant);
        setItemUrl(item.url);
        setItemUrl_fav(item.url_fav);
        setItemUrl_rmfav(item.url_rmfav);
        setItemDates(item.dates);
        setItemT_Rouge(item.t_Rouge);
        setItemT_jaune(item.t_jaune);
        setItemT_bleu(item.t_bleu);
        setItemT_vert(item.t_vert);
        setItemT_turquoise(item.t_turquoise);
        setItemCharg_diff(item.charg_diff);
        setItemTelephone(item.telephone);
        setItemCourriel(item.courriel);
        setItemStructure(item.structure);
        setItemCharg_diff_addresse(item.charg_diff_addresse);
       // setIsLoading(false);
        setModalVisible(true);
      }


    let show_ticket_off = false;

    //console.log(item.ticket_off);
    if (item.ticket_off === "Non") {
      show_ticket_off = true;
    }

   

    return (
      <View>
        <TouchableWithoutFeedback
          delayPressIn={10}
          onPress={() => fillModal(item)}
        >
         
       <Card style={styles.cardList}>
           
      
            <View style={styles.blocContent}>
              <Text ellipsizeMode='tail' numberOfLines={1}  style={styles.Titre}>{item.titre_spectacle}</Text>

              <View style={{flexDirection:'row', flexWrap:'nowrap',alignItems: 'flex-start', width: '95%',alignSelf: "flex-start",}}>
                <Text style={[styles.defautText]}>Durée {item.duree} - <Text style={[styles.defautText, styles.ParagraphBold]}>
                  {item.dates_representations}</Text></Text>  
              </View>



              <View style={{flexDirection:'row', flexWrap:'wrap',alignSelf: "flex-start"}}>
        <View style={styles.labelCard}><Text  style={styles.smallText}>{item.type_public  } </Text></View>
        <View style={styles.labelCard}><Text  style={styles.smallText}>{item.categorie  } </Text></View>
        <View style={[styles.labelCard, styles.labelPlace]}>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.smallTextNoir}>{item.lieu} {/*item.salle*/}</Text>
        </View>
        <View style={[styles.labelCard, styles.labelAchat
          , show_ticket_off ? styles.hideElement : null
        ]}><Text  style={styles.smallText}> Achat sur Ticket'Off </Text></View></View>
            </View>

            <View style={styles.blocImage}>
              <ImgLazy
                source={{ uri: item.image }}
                style={{
                  width: 130,
                   height: 180,
                   
                  }}
                PlaceholderContent={<ActivityIndicator />}
              />


            </View>
          </Card>
        </TouchableWithoutFeedback>

        
        <View
          style={(
         //   [styles.favorisBtn],
            { 
              
              display: state.isAuthenticated ? "flex" : "none" ,
              position:'absolute',
              top : 140,
              left: 0,
             // zIndex: 600000000,
              


            })
                }
              >


                {!state.favorites.includes(Number(item.id)) && (
                 <Pressable
                 activeOpacity={false}
                 underlayColor="#DDDDDD"
                 onPress={() => alert('Pressed!')}>  
               
                   


                  <Image
                    style={{
                      resizeMode: "cover",
                      height: 20,
                      width: 20,
                      //marginTop: -30,
                    }}
                    source={require("../assets/favoris.png")}
                  />
                  </Pressable>
                  
                )}
                {/*} 


   <Pressable
                  onPress={() => add_favorite(item.id, state.token)} >

                 <Pressable
  activeOpacity={false}
  underlayColor="#DDDDDD"
  onPress={() => alert('Pressed!')}>
                 <Pressable
                  onPress={() => add_favorite(item.id, state.token)} >
                
                <Button title="Fav" onPress={() => add_favorite(item.id, state.token)} /> */}

                {state.favorites.includes(Number(item.id)) && (
                  <Pressable
                  onPress={() => rm_favorite(item.id, state.token)} >
                  <Image
                    style={{
                      resizeMode: "cover",
                      height: 20,
                      width: 20,
                    }}
                    source={require("../assets/favoris-active.png")}
                  />
                  </Pressable>
                )}
              </View>
              <Modal
                   animationType={'slide'}
                   hardwareAccelerated={true}
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
                  {/* DEBUT BLOC CONTENU BLANC */}
                  <View style={{borderRadius: 30, padding: 30, marginTop:-30, backgroundColor: '#fff', width: '100%', paddingBottom: 100}}>
                  <View style={{flexDirection: 'row', width: '100%', alignContent: 'space-between'}}>
                  <View style={styles.iconStyle}>
                  <Image
                  style={{
                    resizeMode: "cover",
                    height: 35,
                    width: 35,
                    alignItems: 'flex-start',
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
                    alignItems: 'flex-start',
                  }}
                  source={require("../assets/picto1.png")}
                  />
                  </View>
                  <View style={styles.labelBigplace}><Text>{itemLieu}</Text>
                  
                  </View>
                  </View>
                  <View style={{marginTop: '5%'}}>
                  <Text style={styles.titreFiche}>{itemTitre_spectacle}</Text>
                  <Text>à {itemHoraire} - Durée {itemDuree}</Text>
                  {/* <Text style={[styles.defautTextFiche]}>Salle : {itemTheatre} {itemSalle}</Text>
                  <Text  style={[styles.defautTextFiche]}>{itemAuteur_prenom} {itemNom}</Text>
                  <Text>{itemDates}</Text> */ }
                  </View>
                  
                  <View style={{marginTop: '5%', flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
                  <View style={styles.labelCard}><Text style={styles.smallText}>{itemCategorie}</Text></View>
                  <View style={styles.labelCard}><Text style={styles.smallText}>{itemStyle}</Text></View>

                  {itemDeja_joue === "Non" &&  <View style={styles.labelCard}><Text style={styles.smallText}> Nouveau au festival</Text></View>}
                  {itemClim === "Oui" && <View style={styles.labelCard}><Text style={styles.smallText}> Climatisation</Text></View>}
                  {itemAcces_handicape === "Oui" && <View style={styles.labelCard}><Text  style={styles.smallText}> Accès handicapé</Text></View>}
                  
                  
                  {itemPlein_air === "Oui" &&  <View  style={styles.labelCard}><Text  style={styles.smallText}>Plein air</Text></View>}
                  
                  {itemNon_francophones === "Oui" &&  <View  style={styles.labelCard}><Text  style={styles.smallText}>Non francophone</Text></View>}
                  
                 {/* <Button onPress={shareData} title="Envoyer à un ami" /> */}
                  </View>
                  


                  <View style={[styles.blocGris, styles.alignCenter, styles.justifyElement]}>
                  
                    <View style={{width: '25%', height:70, alignItems: "center", justifyContent: "space-between"}}>
                      <Text  style={[styles.smallTextNoir, styles.ParagraphBold]}>Abonné</Text>
                      <Text  style={[styles.titreFiche, styles.alignCenter]}>{ itemTarif_adh} €</Text>
                    </View> 
                    <View style={styles.SeparateurVertical}></View>
                    <View style={{width: '25%',height:70, alignItems: "center", justifyContent: "space-between"}}>
                      <Text  style={[styles.smallTextNoir, styles.ParagraphBold]}>Plein tarif</Text>
                      <Text  style={[styles.titreFiche, styles.alignCenter]}>{itemTarif} €</Text>
                    </View> 
                    <View style={styles.SeparateurVertical}></View>
                    {itemTarif_enfant > 0 && 
                      <View style={{width: '25%',height:70, alignItems: "center", justifyContent: "space-between"}}>
                        <Text  style={[styles.smallTextNoir, styles.ParagraphBold]}>Enfant</Text>
                        <Text  style={styles.smallTextNoir}> (- de 12 ans)</Text>
                        <Text style={[styles.titreFiche, styles.alignCenter]}>{itemTarif_enfant} €</Text>
                      </View>
                    }
                    {itemTarif_enfant > 0 && 
                    <View style={styles.SeparateurVertical}></View>
                    } 
                    <View style={{width: '25%',height:70, alignItems: "center", justifyContent: "space-between"}}>
                      <Text  style={[styles.smallTextNoir, styles.alignCenter, styles.ParagraphBold]}>Réduit</Text>
                      <Text  style={[styles.smallTextNoir, styles.alignCenter]}> {itemTarif_reduit_precisions} (chômeur, étudiant, -18)</Text>
                      <Text style={[styles.titreFiche, styles.alignCenter]}>{itemTarif_adh} €</Text>
                    
                    </View> 
                    {/*}
                    <Text>{itemT_Rouge}</Text>
                    <Text>{itemT_bleu}</Text>
                    <Text>{itemT_vert}</Text>
                    <Text>{itemT_jaune}</Text>
                    <Text>{itemT_turquoise}</Text>
                  */}
                </View>
                




                <View  style={ styles.Separateur} ></View>

                <Text style={ styles.TextSousTitre}>Moyens de paiement acceptés</Text>

                
                {itemCb === "Oui" && <Image
                  style={{
                    resizeMode: "cover",
                    height: 35,
                    width: 35,
                    alignItems: 'flex-start',
                  }}
                  source={require("../assets/money.png")}
                  />}

                  {itemEspeces === "Oui" &&  <Image
                  style={{
                    resizeMode: "cover",
                    height: 35,
                    width: 35,
                    alignItems: 'flex-start',
                  }}
                  source={require("../assets/credit-card.png")}
                  />}

                <View  style={ styles.Separateur} ></View>

                <Text style={ styles.TextSousTitre}>Dates</Text>
                <View style={{width: '80%'}}><Text>{itemDates_representations}</Text></View>
                

                <View  style={ styles.Separateur} ></View>

                <Text style={ styles.TextSousTitre}>Lieu</Text>
                <Text style={styles.ParagraphBold}>{itemLieu}</Text>
                <Text>{itemAdresse}</Text>
                <Text>{itemCp} {itemVille} </Text>



                
                <View  style={ styles.Separateur} ></View>

                <Text style={ styles.TextSousTitre}>Infos & reservations</Text>
                <View  style={[styles.labelCard, styles.labelGris]}>
                  <Text style={styles.TextPhone}
                      onPress={ ()=>{ Linking.openURL('tel:'+itemTel_reservation)}}>
                    {itemTel_reservation}
                  </Text>
                </View>

                <View  style={ styles.Separateur} ></View>

                <Text style={ styles.TextSousTitre}>Résumé du spectacle</Text>
                <Text style={{textAlign:'left'}}>{itemDescription}</Text>
                
                <View  style={ styles.Separateur} ></View>
                


                <Text style={ styles.TextSousTitre}>Auteur</Text>
                <Text style={{textAlign:'left'}}></Text>

                

                <View  style={ styles.Separateur} ></View>

                <Text style={ styles.TextSousTitre}>Compagnie</Text>
                <Text style={{textAlign:'left'}}>{itemCompagnie}</Text>
                


                
                  <View  style={{marginTop: '5%'}}>
                <Text>{itemTicket_off}</Text>
                <TouchableOpacity
                onPress={() => addTicketToCartState(itemId)}
                style={ styles.labelAchat}
                >
                <Text > Acheter sur Ticket'Off</Text>
                
                </TouchableOpacity>

                
                
                
                </View>

                
                <Text>{itemPays}</Text>
                
                <Text>{itemStructure}</Text>
                <Text>{itemCharg_diff}</Text>
                <Text>{itemCharg_diff_addresse}</Text>
                
                <Text>{itemCourriel}</Text>
                <Text>{itemTelephone}</Text>
                
                
                
                
                
                </View>
                
                <View style={{justifyContent: "flex-end", flex: 2}}>
                
                <TouchableOpacity
                onPress={() => addTicketToCartState(itemId)}
                >
                <View style={[styles.labelCard, styles.labelAchat, styles.btnFixed]}>
                <Text style={styles.textBigButton}> Acheter sur Ticket'Off</Text>
                </View>
                </TouchableOpacity>
                </View>
                
                
                </View>
                </ScrollView>
                </Modal>


      </View>
    );
  };
  {
    /*  <Button title="DelFav" onPress={() => rm_favorite(item.id)} /> */
  }

  export default ProgrammeCard;