import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(id) {
    // console.log(id);
    console.log(favorites);
    setFavorites((currentFavorites) => {
      return [...currentFavorites, id];
    });
  }
  function removeFavorite(id) {
    setFavorites((currentFavorites) => {
      return currentFavorites.filter((favoriteItem) => {
        return favoriteItem !== id;
      });
    });
  }

  const value = {
    favorites: favorites,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
