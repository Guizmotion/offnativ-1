import React from "react";

export const FavorisContext = React.createContext({
    favorites: [
        'avocado',
        'carrot'
      ],
  addFavorite: favoriteId => {},
  removeFavorite: favoriteId => {}
});