	
  import React, { useState, useReducer } from 'react';
  import { Text,Dimensions } from 'react-native';
  
  import { NavigationContainer } from '@react-navigation/native';
  import { createDrawerNavigator } from '@react-navigation/drawer';
  
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  
  import Programme from './components/Programme';
  import Cart from './components/Cart';
  import Menu from './components/Menu';
  
  import ProfilMenu from './components/ProfilMenu';
  import Favoris from './components/profil/Favoris';
  import Archives from './components/Archives';
  import Actualites from './components/Actualites';
  import Carte from './components/Carte';
  import Annonces from './components/Annonces';
  import Fondation from './components/Fondation';
  import Photo from './components/Photo';
  import Login from './components/Login';
  import RechercheModal from './components/RechercheModal';
  
  
  import ModifierProfil from './components/profil/ModifierProfil';
  import PlacesSpectacles from './components/profil/PlacesSpectacles';
  import CartesAbonnement from './components/profil/CartesAbonnement';
  import Factures from './components/profil/Factures';

  
  import {AuthContext}  from './components/services/Auth';

  import GlobalState from "./components/services/GlobalState";

import CartPage from "./components/CartPage";
  
  
  
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
      
      
      AsyncStorage.setItem('user', JSON.stringify(action.payload.profil));
      AsyncStorage.setItem('token', JSON.stringify(action.payload.token));
      
      
      console.log('user payload : ' + JSON.stringify(action.payload.profil));
      
      
      
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.profil,
        token: action.payload.token
      };
      
      
      case "LOGOUT":
      
      console.log('logout user');
      
      AsyncStorage.clear();
      
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
      default:
      return state;
    }
  };
  
  const DEVICE_WIDTH = Dimensions.get('screen').width - 115;
  
  const Drawer = createDrawerNavigator();
  
  function App() {
    
    
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    
    return (
      
      <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
      >
      <GlobalState>
      <NavigationContainer
      
      >
      <Drawer.Navigator
      
        drawerContent={(props) => <Menu  {...props}  style={{ backgroundColor: 'transparent', width: DEVICE_WIDTH , height: '100%' }}  />}>
      
      {/*<Drawer.Screen name="Cart" component={Cart} /> options={{ drawerLabel: () => null, }}  />*/}
     
      <Drawer.Screen name="Programme" component={Programme}   />
      <Drawer.Screen name="Actualites" component={Actualites}   />
      <Drawer.Screen name="Carte" component={Carte} />
      <Drawer.Screen name="Annonces" component={Annonces} />
      <Drawer.Screen name="Fondation" component={Fondation} />
      <Drawer.Screen name="Archives" component={Archives} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="ProfilMenu" component={ProfilMenu} />
      <Drawer.Screen name="Favoris" component={Favoris} />
      <Drawer.Screen name="CartPage" component={CartPage}   />
     
      
      <Drawer.Screen name="ModifierProfil" component={ModifierProfil}   />
  
      <Drawer.Screen name="PlacesSpectacles" component={PlacesSpectacles}   />
      <Drawer.Screen name="CartesAbonnement" component={CartesAbonnement}   />
      <Drawer.Screen name="Factures" component={Factures}   />
      <Drawer.Screen name="Photo" component={Photo}   />

      <Drawer.Screen name="RechercheModal" component={RechercheModal} options={{ drawerLabel: () => null, }}  />
      
      
      </Drawer.Navigator>
      
      </NavigationContainer>
      </GlobalState>
        {/* <Text>{!state.isAuthenticated ? 'off' : 'on'}</Text> */}
      </AuthContext.Provider>
      
      
      );
    }
    
    
    
    
    export default App;
    