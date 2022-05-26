import React, { useReducer, createContext } from "react";



const initialCartesAbonnementState = {
    
 
    Cartes: 
        /*
        {
                "nom" : "perodo",
                "prenom" : "nico",
                "adresse" : "rue de la paix",
                "ville" : "paris",
                "codePostal" : "75000",
                "telephone" : "0123456789",
                "pays" : "france",
                "livraison" : "courrier",
                "photo": ""


        }
        */

            [
               {
                "id": 1,    
                "statut" : "brouillon",
                    "numero_carte" : "123456789",
                    "code_promo": "",
                    "structure": "",
                    "nom" : "perodo",
                    "prenom" : "nico",
                    "adresse" : "rue de la paix",
                    "ville" : "paris",
                    "codePostal" : "75000",
                    "telephone" : "0123456789",
                    "pays" : "france",
                    "livraison" : "courrier",
                    "photo": ""
                },
                {
                    "id": 2,
                    "statut" : "brouillon",
                    "numero_carte" : "123456789",
                    "code_promo": "",
                    "structure": "",
                    "nom" : "perodo2",
                    "prenom" : "nico",
                    "adresse" : "rue de la paix",
                    "ville" : "paris",
                    "codePostal" : "75000",
                    "telephone" : "0123456789",
                    "pays" : "france",
                    "livraison" : "courrier",
                    "photo": ""
                },
            ]
    

    
        };


export const CartesAbonnementContext = createContext(initialCartesAbonnementState);



const reducer = (stateCartesAbonnement, action) => {
    
    switch (action.type) {


        
        case "ADD_CARTES_ABONNEMENT":
        
        
        stateCartesAbonnement.Cartes.push(action.payload);



        return {
            ...stateCartesAbonnement,
            Cartes: {  ...stateCartesAbonnement.Cartes}
        };
        
        case "DELETE_CARTES_ABONNEMENT":
        
        var array = [...stateCartesAbonnement.Cartes]; // make a separate copy of the array
        var index = array.indexOf(action.payload)
        if (index !== -1) {
            array.splice(index, 1);

        }

        return {
            ...stateCartesAbonnement,
            Cartes: array,
        };
        

        
        
        default:
        return stateCartesAbonnement;
    }
};

export const CartesAbonnementContainer = ({ children }) => {
    const [stateCartesAbonnement, dispatchCartesAbonnement] = useReducer(reducer, initialCartesAbonnementState);
    return (
        <CartesAbonnementContext.Provider value={{ stateCartesAbonnement, dispatchCartesAbonnement }}>
        {children}
        </CartesAbonnementContext.Provider>
        );
    };
    