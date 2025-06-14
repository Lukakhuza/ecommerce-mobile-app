import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  Pressable,
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

function ProductDetails({ route }) {
  const productsCtx = useContext(ProductsContext);
  const product = route.params.product;
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.productStyle} onPress={() => {}}>
          <Image source={{ uri: product.image }} style={styles.image1} />
          <View style={styles.productInfoContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {product.title}
            </Text>
            <Text style={styles.price}>{`$${product.price.toFixed(2)}`}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.prodDescHeader}>Shipping & Returns</Text>
            <Text style={{ marginBottom: 10 }}>
              Free standard shipping and free 60-day returns
            </Text>
            <Text style={styles.prodDescHeader}>Reviews</Text>
            <Text style={styles.rating}>{product.rating.rate} Ratings</Text>
          </View>
        </View>
        <PurpleButton>Add to Cart</PurpleButton>
      </ScrollView>
    </SafeAreaView>
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
  header: {
    height: 100,
  },
  test: {
    color: "black",
    fontSize: 30,
  },
  title: {
    fontWeight: 600,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    zIndex: 0,
    overflow: "hidden",
    resizeMode: "contain",
  },
  image1: {
    width: "100%",
    height: 200,
    zIndex: 0,
    overflow: "hidden",
    resizeMode: "contain",
    marginBottom: 20,
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
  productInfoContainer: {
    marginHorizontal: 25,
  },
  description: {
    fontWeight: 350,
    marginBottom: 20,
  },
  price: {
    color: "purple",
    fontWeight: 400,
    marginBottom: 10,
  },
  prodDescHeader: {
    fontWeight: 600,
    marginBottom: 10,
  },
  rating: {
    fontSize: 25,
    fontWeight: 700,
  },
  fl: {
    // flex: 2,
    // flexGrow: 600,
    height: 840,
  },
});

export default ProductDetails;
