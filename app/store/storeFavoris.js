import React, { useReducer, createContext } from "react";



const initialFavorisState = {
    Spectacles: [],
    SpectaclesSelected: {},

};


export const FavorisContext = createContext(initialFavorisState);



const reducer = (stateFavoris, action) => {
   
    
   
    switch (action.type) {
     
        case "GET_FAVORITES":
      
           // console.log(action.payload);
              return {
                  ...stateFavoris,
                //  Spectacles: [...stateFavoris.Spectacles, action.payload],
              };

          case "SET_FAVORITES":
      
       //   console.log(action.payload);
            return {
                ...stateFavoris,
                Spectacles: [...stateFavoris.Spectacles, action.payload],
            };


     
        case "ADD_FAVORIS":
            //console.log('action.payload.value' + action.payload);
            
        return {
            ...stateFavoris,
            
            Spectacles: [...stateFavoris.Spectacles, action.payload],
           
        };
        
        case "DELETE_FAVORIS" : 
        
        
        var array = [...stateFavoris.Spectacles]; 
        var index = array.indexOf(action.payload)
        if (index !== -1) {
            array.splice(index, 1);
            
        }
        
        return {
            ...stateFavoris,
            Spectacles: array,
            
        };
        

        case "SELECT_FAVORITES":
      
            action.payload.map((ud) => {
                //  dispatchFavoris({
                //    type: "SELECT_FAVORIS",
                //    payload: ud,
                stateFavoris.SpectaclesSelected[ud] = true;
                  });
            //   console.log(action.payload);
                 return {
                     ...stateFavoris,
                     SpectaclesSelected: [...stateFavoris.SpectaclesSelected, action.payload],
                 };


        case "SELECT_FAVORIS":
        
        
        stateFavoris.SpectaclesSelected[action.payload] = true;
        return {
            ...stateFavoris,
            SpectaclesSelected: {  ...stateFavoris.SpectaclesSelected}
        };
        
        case "UNSELECT_FAVORIS" : 
        
        stateFavoris.SpectaclesSelected[action.payload] = false;
        
        return {
            ...stateFavoris
        };
        
        
        
        
        default:
        return stateFavoris;
    }
};

export const FavorisContainer = ({ children }) => {
    const [stateFavoris, dispatchFavoris] = useReducer(reducer, initialFavorisState);
    return (
        <FavorisContext.Provider value={{ stateFavoris, dispatchFavoris }}>
        {children}
        </FavorisContext.Provider>
        );
    };
    