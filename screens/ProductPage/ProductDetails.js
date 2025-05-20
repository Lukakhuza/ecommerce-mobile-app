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

function Product() {
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

  const favoriteProducts = fetchedProductsData.filter((productData) => {
    let favoriteProductIds = favoritesCtx.favorites;
    if (
      favoriteProductIds.includes(productData.id) ||
      productsCtx.selectedCategory === "All"
    ) {
      return true;
    } else {
      return false;
    }
  });

  let content = <View></View>;

  if (favoriteProducts.length === 0) {
    content = <Text style={styles.noFavorites}>No Favorites Selected</Text>;
  }
  return (
    <View
      style={{
        backgroundColor: "#C6373C",
        // borderColor: "brown",
        // borderWidth: 10,
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <View style={styles.fl}>
        <View style={styles.header}></View>
        <View
          style={{
            // borderWidth: 5,
            // borderColor: "green",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {content}
        </View>
        <FlatList
          data={favoriteProducts}
          renderItem={(itemData) => {
            return (
              <View style={styles.productContainer}>
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
          contentContainerStyle={{
            padding: 15,
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
  },
  favIcon: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 1,
  },
  noFavorites: {
    // flex: 1,
    // marginTop: 100,
    // borderColor: "blue",
    // borderWidth: 5,
    color: "white",
    textDecorationLine: "",
    justifyContent: "center",
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 500,
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

export default ProductDetails;
