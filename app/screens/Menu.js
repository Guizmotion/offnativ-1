// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useEffect } from "react";
import {
  Dimensions,
  Share,
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
  Image,
  Button,
  Text,
  Linking,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../config/styles/StyleGeneral";

import { version_app_offnativ } from "../../package.json";
import { StoreContext } from "../store/store";
//var pkg = require('../package.json');
//console.log(pkg.version_app_offnativ);

const Menu = (props) => {
  const { state, dispatch } = React.useContext(StoreContext);

  const BASE_PATH = "https://www.appli.ovh/off/web/img/";
  const proileImage = "logo.png";

  function share() {
    Share.share(
      {
        message: "Voici le lien vers la nouvelle application du OFF",
        url: "https://play.google.com/store/apps/details?id=com.nympheastudio.off",
        title: "Application Android",
      },
      {
        // Android only:
        dialogTitle: "Partager l'application du OFF",
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
      }
    );
  }

  function redirectUser() {
    if (state.isAuthenticated) {
      return props.navigation.navigate("ProfilMenu");
    } else {
      return props.navigation.navigate("Login");
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView>
        <View
          style={{
            flex: 1,
            padding: "5%",
            width: "100%",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/*Top Large Image */}

          <Pressable
            onPress={() => props.navigation.closeDrawer()}
            style={styles.closeMenu}
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

          <Image
            source={{ uri: BASE_PATH + proileImage }}
            style={styles.sideMenuProfileIcon}
          />

          {/*   <DrawerItemList {...props} /> */}

          <View style={{ marginTop: -15, width: "90%" }}>
            <Pressable
              onPress={async () => {
                await redirectUser();
              }}
            >
              <View
                style={[styles.labelCard, styles.btnBig, styles.labelAchat]}
              >
                <Text style={styles.textBigButton}> Mon compte</Text>
                <Image
                  style={{
                    resizeMode: "cover",
                    height: 25,
                    width: 25,
                  }}
                  source={require("../assets/next-white.png")}
                />
              </View>
            </Pressable>
          </View>

          <DrawerItem
            style={styles.lienMenu}
            label="Programme"
            onPress={() => props.navigation.navigate("Programme")}
          />

          <DrawerItem
            style={styles.lienMenu}
            label="Actualités"
            onPress={() => props.navigation.navigate("Actualites")}
          />

          <DrawerItem
            style={styles.lienMenu}
            label="Venir / se déplacer / se loger"
            onPress={() => props.navigation.navigate("Carte")}
          />

          <DrawerItem
            style={styles.lienMenu}
            label="La fondation"
            onPress={() => props.navigation.navigate("Fondation")}
          />
          <DrawerItem
            style={styles.lienMenu}
            label="Archives"
            onPress={() => props.navigation.navigate("Archives")}
          />
          {/*    
        
        

         <DrawerItem
      style={styles.lienMenu}
      label="Panier"
      onPress={() => props.navigation.navigate('CartPage')}
      />
        
        <DrawerItem
        style={styles.lienMenu}
        label="lien externe"
        onPress={() => Linking.openURL('https://google.com/')}
        />
        
        
        
        <View style={styles.customItem}>
        <Text
        onPress={() => {
          ToastAndroid.show('Afficher un Toast',2000);
        }}>
        Afficher un Toast
        </Text>
        <Image
        source={{uri: BASE_PATH + 'star_filled.png'}}
        style={styles.iconStyle}
        />
        </View>
      */}

          <View style={{ flex: 1, justifyContent: "flex-end" }}></View>
          <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 230 }}>
            <View
              style={{
                flexDirection: "row",
                width: "70%",
                marginLeft: "15%",
                justifyContent: "space-between",
              }}
            >
              <Pressable
                onPress={async () => {
                  await share();
                }}
                style={styles.iconStyle}
              >
                <Image
                  style={{
                    resizeMode: "cover",
                    width: 35,
                    height: 35,
                  }}
                  source={require("../assets/partage.png")}
                />
              </Pressable>

              <Pressable onPress={async () => {}} style={styles.iconStyle}>
                <Image
                  style={{
                    resizeMode: "cover",
                    width: 35,
                    height: 35,
                  }}
                  source={require("../assets/partenaires.png")}
                />
              </Pressable>
              <Pressable onPress={async () => {}} style={styles.iconStyle}>
                <Image
                  style={{
                    resizeMode: "cover",
                    width: 35,
                    height: 35,
                  }}
                  source={require("../assets/programme.png")}
                />
              </Pressable>
              <Pressable
                onPress={() => props.navigation.navigate("Annonces")}
                style={styles.iconStyle}
              >
                <Image
                  style={{
                    resizeMode: "cover",
                    width: 35,
                    height: 35,
                  }}
                  source={require("../assets/sociaux.png")}
                />
              </Pressable>
            </View>

            <Text style={[styles.smallTextNoir, styles.alignCenter]}>
              festivaloffavignon - V {version_app_offnativ} - Mentions légales
            </Text>
            <View
              style={{
                width: "90%",
                height: 'auto',
                margin: 0,
                marginTop: 10,
                marginLeft: "5%",
                marginRight: "5%",
                borderTopLeftRadius: 15,
                overflow: "hidden",
                borderTopRightRadius: 15,
                bottom: 0,
                backgroundColor: "red",
                
              }}
            >
              <Pressable onPress={() => Linking.openURL('https://www.festivaloffavignon.com/')}  >
           
              <Image
                style={{
                  resizeMode: "cover",
                  width: 260,
                  height: 90,
                }}
                source={require("../assets/off-les-murs-bandeau.jpg")}
              />

              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

export default Menu;
