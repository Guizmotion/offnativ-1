import React, { useReducer, createContext } from "react";



const initialRechercheState = {
    StylesRecherches: [],
    StylesRecherchesSelected: {},
    AuteursRecherches: [],
    AuteursRecherchesSelected: {},
    DatesRecherches: [],
    limite: 100,
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
        
        case "SELECT_STYLES_RECHERCHES":
        
           // data[key].checked = true;
        stateRecherche.StylesRecherchesSelected[action.payload] = true;
       // stateRecherche.StylesRecherchesSelected.checked[action.payload] = true;
        return {
            ...stateRecherche,
            StylesRecherchesSelected: {  ...stateRecherche.StylesRecherchesSelected}
        };
        
        case "UNSELECT_STYLES_RECHERCHES" : 
        
        stateRecherche.StylesRecherchesSelected[action.payload] = false;
        
        return {
            ...stateRecherche
            ,
            StylesRecherchesSelected: {  ...stateRecherche.StylesRecherchesSelected}
        };
        

        
        
        case "ADD_AUTEURS_RECHERCHES":


            // const uniqueArr = [...new Set(stateRecherche)];
         return {
             ...stateRecherche,
             
             AuteursRecherches: [...new Set(stateRecherche.AuteursRecherches), action.payload.value],
            
         };
         
         case "DELETE_AUTEURS_RECHERCHES" : 
         
         
         var array = [...stateRecherche.AuteursRecherches]; 
         var index = array.indexOf(action.payload.value)
         if (index !== -1) {
             array.splice(index, 1);
             console.log('effacer Auteur '+ action.payload.value);
             
         }
         
         return {
             ...stateRecherche,
             AuteursRecherches: uniq(array),
             
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
    