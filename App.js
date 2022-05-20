import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import GlobalState from "./app/store/GlobalState";
import AppNavigator from "./app/navigation/AppNavigator";
import { StoreContainer } from "./app/store/store";
import { RechercheContainer } from "./app/store/storeRecherche";


function App() {
  return (
    <StoreContainer>
      <GlobalState>
        <NavigationContainer>
         <RechercheContainer>
          <AppNavigator />
          </RechercheContainer>
        </NavigationContainer>
      </GlobalState>
      {/* <Text>{!state.isAuthenticated ? 'off' : 'on'}</Text> */}
    </StoreContainer>
  );
}

export default App;
