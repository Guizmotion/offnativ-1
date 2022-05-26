import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useReducer, createContext } from "react";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  favorites: [], //[27722,29126,28685,28895,27916,27977,28749,28194,28770,28832,28942],
  programme: [],
  //carteAbonnement: [],

};



export const StoreContext = createContext(initialState);



const reducer = (state, action) => {

  //console.log('current fav' + state.favorites);

  switch (action.type) {
 /*   case "ADD_STYLES_RECHERCHES":
     

      // setInterval(() => {
       // state.StylesRecherches2[action.payload.key] = true;
      // }, 50);
     // state[action.payload.key] = true;

      return {
        ...state,
        
        StylesRecherches: [...state.StylesRecherches, action.payload.value],
      //  StylesRecherches2: {  ...state.StylesRecherches2, [action.payload.key]: true },
      };

      case "DELETE_STYLES_RECHERCHES" : 
      
      // state.StylesRecherches2[action.payload.key] = false;
 
         var array = [...state.StylesRecherches]; // make a separate copy of the array
         var index = array.indexOf(action.payload.value)
         if (index !== -1) {
           array.splice(index, 1);
           
         }
 
         return {
           ...state,
           StylesRecherches: array,
          // StylesRecherches2: {  ...state.StylesRecherches2, [action.payload.key]: false },
         };

      case "SELECT_STYLES_RECHERCHES":

     // state.StylesRecherches2[action.payload]  = true;
     stateRecherche.StylesRecherches[action.payload] = true;
      return {
       ...stateRecherche,
        StylesRecherches: {  ...stateRecherche.StylesRecherches}
      };

      case "UNSELECT_STYLES_RECHERCHES" : 
      
       state.StylesRecherches2[action.payload] = false;

       return {
        ...state
      };
      
*/

        
    
    case "addData":
      return { ...state, programme: action.payload };


    case "SET_CARTE_ABONNEMENT":
      return {
        ...state,
        carteAbonnement: [...state.carteAbonnement, action.payload],
      };

    case "LOGIN":
      AsyncStorage.setItem("user", JSON.stringify(action.payload.profil));
      AsyncStorage.setItem("token", JSON.stringify(action.payload.token));

      console.log("user payload : " + JSON.stringify(action.payload.profil));

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.profil,
        token: action.payload.token,
      };

    case "LOGOUT":
      console.log("logout user");

      AsyncStorage.clear();

      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export const StoreContainer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
