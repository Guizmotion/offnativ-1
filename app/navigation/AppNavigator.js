import React from "react";



import { View, Text,Image,Dimensions,Pressable } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Programme from "../screens/Programme";
import Menu from "../screens/Menu";

import ProfilMenu from "../screens/ProfilMenu";
import Favoris from "../screens/profil/Favoris";
import Archives from "../screens/Archives";
import Actualites from "../screens/Actualites";
import Carte from "../screens/Carte";
import Annonces from "../screens/Annonces";
import Fondation from "../screens/Fondation";
import CarteAbonnementWebview from "../screens/CarteAbonnementWebview";
import Photo from "../screens/Photo";
import Login from "../screens/Login";
import RechercheModal from "../screens/RechercheModal";
import RechercheAuteurs from "../screens/RechercheAuteurs";
import ListStyleSpectacle from "../screens/recherche/ListStyleSpectacle";
import ListDateSpectacle from "../screens/recherche/ListDateSpectacle";
import ListAuteurSpectacle from "../screens/recherche/ListAuteurSpectacle";
import ListLieuSpectacle from "../screens/recherche/ListLieuSpectacle";

import ModifierProfil from "../screens/profil/ModifierProfil";
import PlacesSpectacles from "../screens/profil/PlacesSpectacles";
import CartesAbonnement from "../screens/profil/CartesAbonnement";
import CreerCarteAbonnement from "../screens/profil/CreerCarteAbonnement";
import Factures from "../screens/profil/Factures";
import CartPage from "../screens/CartPage";
import Partenaires from "../screens/Partenaires";
import Inscription from "../screens/Inscription";

import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "../config/styles/StyleGeneral";

const Drawer = createDrawerNavigator();



const DEVICE_WIDTH = Dimensions.get("screen").width - 115;

const AppNavigator = ({ navigation }) => {
  
  
  function HeaderPrincipal() {
    
    
    const route = useRoute();
    const navigation = useNavigation();
    
    let titre = route.name;
    
    if(route.name=="ProfilMenu"){
      titre ='Mon compte';
    }
    if(route.name=="Actualites"){
      titre ='Actualités';
    }
    if(route.name=="Carte"){
      titre ='plan interactif';
    }
    if(route.name=="Fondation"){
      titre ='La fondation';
    }
    if(route.name=="Login"){
      titre ='Connexion';
    }
    if(route.name=="Login"){
      titre ='Connexion';
    }
    if(route.name=="CarteAbonnementWebview"){
      titre ='Carte d\'abonnement';
    }
    if(route.name=="Archives"){
      titre ='Ressources & archives';
    }
    if(route.name=="Annonces"){
      titre ='Plateforme solidaire';
    }
    if(route.name=="Favoris"){
      titre ='Mes favoris';
    }
    if(route.name=="ModifierProfil"){
      titre ='Mon profil';
    }
    if(route.name=="CartPage"){
      titre ='Mon panier';
    }
    if(route.name=="PlacesSpectacles"){
      titre ='Mes places de spectacles';
    }
    if(route.name=="CartesAbonnement"){
      titre ='Mes cartes d\'abonnement';
    }
    if(route.name=="Factures"){
      titre ='Mes factures';
    }



    if(route.name=="ListDateSpectacle"){
      titre ='Choisir une date';
      return (

        <View style={{flexDirection:'row'}}>
                
                <Text style={{   
                  fontSize: 20,
                  fontWeight: "bold",
                  width: '97%',textAlign: 'center'
             }}>
                {titre}
                </Text>
               
                
                <View
              >
                <Pressable
                  
                  //onPress={() => navigation.goBack()}
                  onPress={() => navigation.navigate("RechercheModal")}
                >
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
              );
    }

    if(route.name=="ListLieuSpectacle"){
      titre ='Choisir un théâtre';
      return (

        <View style={{flexDirection:'row'}}>
                
                <Text style={{   
                  fontSize: 20,
                  fontWeight: "bold",
                  width: '97%',textAlign: 'center'
             }}>
                {titre}
                </Text>
               
                
                <View
              >
                <Pressable
                  
                  onPress={() => navigation.navigate("RechercheModal")}
                >
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
              );
    }

    if(route.name=="ListAuteurSpectacle"){
      titre ='Choisir un auteur';
      return (

        <View style={{flexDirection:'row'}}>
                
                <Text style={{   
                  fontSize: 20,
                  fontWeight: "bold",
                  width: '97%',textAlign: 'center'
             }}>
                {titre}
                </Text>
               
                
                <View
              >
                <Pressable
                  
                  onPress={() => navigation.navigate("RechercheModal")}
                >
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
              );
    }

    if(route.name=="ListStyleSpectacle"){
      titre ='Choisir un style';
      return (

        <View style={{flexDirection:'row'}}>
                
                <Text style={{   
                  fontSize: 20,
                  fontWeight: "bold",
                  width: '97%',textAlign: 'center'
             }}>
                {titre}
                </Text>
               
                
                <View
              >
                <Pressable
     onPress={() => navigation.navigate("RechercheModal")}
                >
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
              );
    }
    
    if(route.name=="RechercheModal"){
      titre ='Recherche';
      return (

<View style={{ flexDirection:'row'}}>
        
        <Text style={{   
          fontSize: 20,
     fontWeight: "bold",
     width: '97%',textAlign: 'center'

     }}>
        Rechercher
        </Text>
       
        
        <View
        style={{ }}
      >
        <Pressable
          
          onPress={() => navigation.navigate("Programme")}
        >
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
      );
    }
    
    
    return (
      <View style={[styles.headView]}>
      
      <Text style={styles.titrePage}>{titre}</Text>
      
      </View>
      );
    }
    
    function HeaderLeft() {
      
      const navigation = useNavigation();
      const route = useRoute();
      
      let titre = route.name;

  
      
      
      let icon_menu = require("../assets/menu.png");
      
      if ((route.name=="RechercheModal") || (route.name=="ListStyleSpectacle"))
      {
        icon_menu = require("../assets/recherche-black.png") ;
      }


      return (
        <View style={[styles.headerLeft]}>
        <Pressable onPress={() => navigation.openDrawer()}>
        <Image
        style={{
          resizeMode: "cover",
          height: 25,
          width: 25,
        }}
        source={icon_menu}
        />
        </Pressable>
        </View>
        );
      }
      
    
      
      
      return (
        <Drawer.Navigator
        
        screenOptions={() => ({
          
          
          headerShown: true,
          headerTitle: (props) =>  <HeaderPrincipal {...props} />,
          
          headerLeft: (props) => <HeaderLeft {...props} />,
          
          
        })}
        
        
        
        
        
        //, headerTitle: (props) =>  <HeaderPrincipal {...props} />
        
        drawerContent={(props) => (
          <Menu
          {...props}
          style={{
            backgroundColor: "transparent",
            width: DEVICE_WIDTH,
            height: "100%",
          }}
          />
          )}
          >
          
          
          <Drawer.Screen name="Programme" component={Programme} />
          <Drawer.Screen
          name="RechercheModal"
          component={RechercheModal}
          options={{ drawerLabel: () => null }}
          />
          <Drawer.Screen
          name="ListStyleSpectacle"
          component={ListStyleSpectacle}
          options={{ drawerLabel: () => null }}
          />
          <Drawer.Screen
          name="ListDateSpectacle"
          component={ListDateSpectacle}
          options={{ drawerLabel: () => null }}
          />
                    <Drawer.Screen
          name="ListAuteurSpectacle"
          component={ListAuteurSpectacle}
          options={{ drawerLabel: () => null }}
          />

          <Drawer.Screen
          name="ListLieuSpectacle"
          component={ListLieuSpectacle}
          options={{ drawerLabel: () => null }}
          />
          
          <Drawer.Screen name="Actualites" component={Actualites}   />
          <Drawer.Screen name="Carte" component={Carte} />
          <Drawer.Screen name="Annonces" component={Annonces} />
          <Drawer.Screen name="Fondation" component={Fondation} />
          <Drawer.Screen name="CarteAbonnementWebview" component={CarteAbonnementWebview} />
          <Drawer.Screen name="Archives" component={Archives} />
          <Drawer.Screen name="Partenaires" component={Partenaires} />
          
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Inscription" component={Inscription} />
          <Drawer.Screen name="ProfilMenu" component={ProfilMenu} />
          <Drawer.Screen name="Favoris" component={Favoris} />
          <Drawer.Screen name="ModifierProfil" component={ModifierProfil} />
          <Drawer.Screen name="PlacesSpectacles" component={PlacesSpectacles} />
          <Drawer.Screen name="CartesAbonnement" component={CartesAbonnement} />
          <Drawer.Screen
          name="CreerCarteAbonnement"
          component={CreerCarteAbonnement}
          />
          <Drawer.Screen name="Factures" component={Factures} />
          <Drawer.Screen name="Photo" component={Photo} />
          <Drawer.Screen name="CartPage" component={CartPage} />
          </Drawer.Navigator>
          );
        };
        
        export default AppNavigator;