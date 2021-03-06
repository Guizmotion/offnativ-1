import React, { useReducer, createContext } from "react";
import {debounce, _} from 'lodash';




const initialRechercheState = {
    StylesRecherches: [],
    StylesRecherchesSelected: {},

    AuteursRecherches: [],
    DatesRecherches: [],
    LieusRecherches: [],
    SpectaclesIdRecherches: [],
    limite: 250,
};


export const RechercheContext = createContext(initialRechercheState);

function uniq(a) {
    return Array.from(new Set(a));
 }

const reducer = (stateRecherche, action) => {
    
    switch (action.type) {

        case "SET_LIMITE":

            return {
                ...stateRecherche,
                
                limite: action.payload,
               
            };

        case 'RESET_RECHERCHE':
            return {
                ...stateRecherche,
                StylesRecherches: [],
                StylesRecherchesSelected: {},
                AuteursRecherches: [],
                DatesRecherches: [],
                LieusRecherches: [],
                SpectaclesIdRecherches: [],
                limite: 100,
            };


        case "ADD_STYLES_RECHERCHES":


           // const uniqueArr = [...new Set(stateRecherche)];
        return {
            ...stateRecherche,
            
            StylesRecherches: [...new Set(stateRecherche.StylesRecherches), action.payload.value],
            
        };
        
        case "DELETE_STYLES_RECHERCHES" : 
        
        
        var array = [...stateRecherche.StylesRecherches]; 
        var index = array.indexOf(action.payload.value)
        if (index !== -1) {
            array.splice(index, 1);
            console.log('effacer style '+ action.payload.value);
            
        }

        
        
        return {
            ...stateRecherche,
            StylesRecherches: uniq(array),
            
            
        };
        
        
        case "ADD_AUTEURS_RECHERCHES":


            // const uniqueArr = [...new Set(stateRecherche)];
         return {
             ...stateRecherche,
             
            // AuteursRecherches: [...new Set(stateRecherche.AuteursRecherches), action.payload.value],
            AuteursRecherches: [...new Set(stateRecherche.AuteursRecherches),
                 action.payload.value
                
                ],
            SpectaclesIdRecherches: [...new Set(stateRecherche.SpectaclesIdRecherches), action.payload.id_spectacle],
           
         };
         
         case "DELETE_AUTEURS_RECHERCHES" : 
         
         
         var arrayIdpsectacles = [...stateRecherche.SpectaclesIdRecherches];



         var array = [...stateRecherche.AuteursRecherches]; 
         
         var index = array.indexOf(action.payload.value);
         //var index = array.indexOf(action.payload.key);
         
         if (index !== -1) {
             array.splice(index, 1);
             console.log('effacer Auteur '+ action.payload.value);
            
             var indexIdpsectacles = arrayIdpsectacles.indexOf(action.payload.id_spectacle)
             if (indexIdpsectacles !== -1) {
                
                 arrayIdpsectacles.splice(indexIdpsectacles, 1);
                 console.log('effacer id_spectacle '+ action.payload.id_spectacle);
    
             }
             
         }
       
  

         return {
             ...stateRecherche,
             AuteursRecherches: uniq(array),
             SpectaclesIdRecherches: uniq(arrayIdpsectacles)
           
             
         };


        case "ADD_DATES_RECHERCHES":


            // const uniqueArr = [...new Set(stateRecherche)];
         return {
             ...stateRecherche,
             
             DatesRecherches: [...new Set(stateRecherche.DatesRecherches), action.payload.value],
            
         };
         
         case "DELETE_DATES_RECHERCHES" : 
         
         
         var array = [...stateRecherche.DatesRecherches]; 
         var index = array.indexOf(action.payload.value)
         if (index !== -1) {
             array.splice(index, 1);
             console.log('effacer date '+ action.payload.value);
             
         }
         
         return {
             ...stateRecherche,
             DatesRecherches: uniq(array),
             
         };


        case "ADD_LIEUS_RECHERCHES":


            // const uniqueArr = [...new Set(stateRecherche)];
         return {
             ...stateRecherche,
             
             LieusRecherches: [...new Set(stateRecherche.LieusRecherches), action.payload.value],
            
         };
         
         case "DELETE_LIEUS_RECHERCHES" : 
         
         
         var array = [...stateRecherche.LieusRecherches]; 
         var index = array.indexOf(action.payload.value)
         if (index !== -1) {
             array.splice(index, 1);
             console.log('effacer Lieu '+ action.payload.value);
             
         }
         
         return {
             ...stateRecherche,
             LieusRecherches: uniq(array),
             
         };
        
        
        

        //todo: verify its not use, then delete it
        case "SELECT_STYLES_RECHERCHES":
            stateRecherche.StylesRecherchesSelected[action.payload] = true;
        return {
            ...stateRecherche,
            StylesRecherchesSelected: {  ...stateRecherche.StylesRecherchesSelected}
        };
         //todo: verify its not use, then delete it
        case "UNSELECT_STYLES_RECHERCHES" :
            stateRecherche.StylesRecherchesSelected[action.payload] = false;
        
        return {
            ...stateRecherche ,
            StylesRecherchesSelected: {  ...stateRecherche.StylesRecherchesSelected}
        };
        

        

        
        default:
        return stateRecherche;
    }
};

export const RechercheContainer = ({ children }) => {
    const [stateRecherche, dispatchRecherche] = useReducer(reducer, initialRechercheState);
    return (
        <RechercheContext.Provider value={{ stateRecherche, dispatchRecherche }}>
        {children}
        </RechercheContext.Provider>
        );
    };
    