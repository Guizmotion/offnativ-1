import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import GlobalState from "./app/store/GlobalState";
import AppNavigator from "./app/navigation/AppNavigator";
import { StoreContainer } from "./app/store/store";
import { RechercheContainer } from "./app/store/storeRecherche";
import {FavorisContainer} from './app/store/storeFavoris';
import { CartesAbonnementContainer } from "./app/store/storeCartesAbonnement";


function App() {
  return (
    <StoreContainer>
      <GlobalState>
        <NavigationContainer>
         <RechercheContainer>
         <FavorisContainer>
           <CartesAbonnementContainer>
          <AppNavigator />
          </CartesAbonnementContainer>
         </FavorisContainer>
          </RechercheContainer>
        </NavigationContainer>
      </GlobalState>
    </StoreContainer>
  );
}

export default App;
