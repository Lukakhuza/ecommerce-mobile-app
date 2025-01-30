import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import PurpleButton from "../../components/ui/PurpleButton";
import { AuthContext } from "../../store/context/auth-context";
import { useContext, useEffect, useState } from "react";
import { fetchData, fetchProductsData } from "../../util/auth";
import { UserInputContext } from "../../store/context/userInputContext";
import { Colors } from "../../constants/colors";
import FavoriteIcon from "../../components/ui/FavoriteIcon";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../../store/context/favoritesContext";
import { ProductsContext } from "../../store/context/productsContext";
import { jsx } from "react/jsx-runtime";

function Welcome() {
  const authCtx = useContext(AuthContext);
  const userInputCtx = useContext(UserInputContext);
  const favoritesCtx = useContext(FavoritesContext);
  const productsCtx = useContext(ProductsContext);
  const [fetchedUserData, setFetchedUserData] = useState([]);
  const [fetchedProductsData, setFetchedProductsData] = useState([]);

  useEffect(() => {
    async function getUserData() {
      const userData = await fetchData();
      setFetchedUserData(userData);
    }

    getUserData();
  }, []);

  useEffect(() => {
    async function getProductsData() {
      const productsData = await fetchProductsData();
      setFetchedProductsData(productsData);
    }
    getProductsData();
  }, []);

  const filteredProducts = fetchedProductsData.filter((productData) => {
    let categoryProductIds = [];
    if (productsCtx.selectedCategory === "Jackets") {
      categoryProductIds = [3, 15, 16, 17];
    } else if (productsCtx.selectedCategory === "Tops") {
      categoryProductIds = [2, 4, 18, 19, 20];
    } else if (productsCtx.selectedCategory === "Tech") {
      categoryProductIds = [9, 10, 11, 12, 13, 14];
    } else if (productsCtx.selectedCategory === "Jewelry") {
      categoryProductIds = [5, 6, 7, 8];
    } else if (productsCtx.selectedCategory === "Other") {
      categoryProductIds = [1];
    }

    if (
      categoryProductIds.includes(productData.id) ||
      productsCtx.selectedCategory === "All"
    ) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <View>
      <View style={styles.fl}>
        <View style={styles.header}></View>
        <Text style={styles.category}>
          {" "}
          {productsCtx.selectedCategory} ({filteredProducts.length})
        </Text>
        <FlatList
          data={filteredProducts}
          renderItem={(itemData) => {
            return (
              <View style={styles.productContainer}>
                <View style={styles.favIcon}>
                  <FavoriteIcon
                    name={
                      favoritesCtx.favorites.includes(itemData.item.id)
                        ? "heart"
                        : "heart-outline"
                    }
                    size={30}
                    color="black"
                    onPress={() => {
                      if (!favoritesCtx.favorites.includes(itemData.item.id)) {
                        favoritesCtx.addFavorite(itemData.item.id);
                      } else {
                        favoritesCtx.removeFavorite(itemData.item.id);
                      }
                    }}
                  />
                </View>
                <Image
                  source={{ uri: itemData.item.image }}
                  style={styles.image}
                />
                <Text numberOfLines={1}>{itemData.item.title}</Text>
                <Text>{`$${itemData.item.price}`}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          numColumns={2}
          // columnWrapperStyle={}
          contentContainerStyle={{
            // alignItems: "stretch",
            padding: 15,
            // borderColor: "brown",
            // borderWidth: 4,
            // rowGap: 10,
            // columnGap: 0,
            // alignContent: "flex-end",
          }}
        />
      </View>
      <View>
        <PurpleButton
          onPress={() => {
            userInputCtx.resetInputs();
            authCtx.logout();
          }}
        >
          Log Out
        </PurpleButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.bgLight2,
    // marginBottom: 30,
  },
  favIcon: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 1,
    // top: 10,
  },
  category: {
    marginLeft: 30,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 500,
    // borderColor: "yellow",
    // borderWidth: 5,
  },
  header: {
    height: 100,
  },
  test: {
    color: "black",
    fontSize: 30,
  },
  image: {
    width: "100%",
    height: 300,
    zIndex: 0,
    overflow: "hidden",
    resizeMode: "contain",
  },
  productContainer: {
    // width: "30%",
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },
  flatlistContainer: {
    // marginBottom: 30,
    // backgroundColor: "blue",
  },
  fl: {
    // flex: 2,
    // flexGrow: 600,
    height: 840,
  },
});

export default Welcome;
