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

function ProductDetails({ route, navigation }) {
  const productsCtx = useContext(ProductsContext);
  const userInputCtx = useContext(UserInputContext);
  const authCtx = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const product = route.params.product;

  async function addProductToCart() {
    // work here and send both product data, as well as user data.
    const productData = {
      id: route.params.product.id,
      title: route.params.product.title,
      price: route.params.product.price,
      quantity: quantity,
    };
    const userData = {
      email: userInputCtx.input.email,
      password: userInputCtx.input.passwordPlaceholder,
      firstName: userInputCtx.input.firstName,
      lastName: userInputCtx.input.lastName,
      phoneNumber: userInputCtx.input.phoneNumber,
      address: userInputCtx.input.address,
      shopFor: userInputCtx.input.shopFor,
      ageRange: userInputCtx.input.ageRange,
      cart: userInputCtx.input.cart,
    };
    const data = {
      productData: productData,
      userData: userData,
    };

    fetch(
      "https://backend-ecommerce-mobile-app.onrender.com/product/add-to-cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((resData) => {
        console.log(resData.title);
      });
  }
  // addProductToCart();

  // async function testStripe() {
  //   const productData = {
  //     id: route.params.product.id,
  //     title: route.params.product.title,
  //     price: route.params.product.price,
  //     quantity: quantity,
  //   };
  //   const userData = {
  //     email: userInputCtx.input.email,
  //     password: userInputCtx.input.passwordPlaceholder,
  //     firstName: userInputCtx.input.firstName,
  //     lastName: userInputCtx.input.lastName,
  //     phoneNumber: userInputCtx.input.phoneNumber,
  //     address: userInputCtx.input.address,
  //     shopFor: userInputCtx.input.shopFor,
  //     ageRange: userInputCtx.input.ageRange,
  //     cart: userInputCtx.input.cart,
  //   };
  //   const data = {
  //     productData: productData,
  //     userData: userData,
  //   };
  //   fetch(
  //     "https://backend-ecommerce-mobile-app.onrender.com/product/payment-sheet",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((resData) => {
  //       console.log(resData.data);
  //     });
  // }
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 60 }}>
      <ScrollView>
        <View style={styles.outerContainer}>
          <View>
            <Image source={{ uri: product.image }} style={styles.image1} />
            <View style={styles.productInfoContainer}>
              <Text numberOfLines={2} style={styles.title}>
                {product.title}
              </Text>
              <Text style={styles.price}>{`$${product.price.toFixed(2)}`}</Text>
              <View
                style={{
                  borderColor: "black",
                  borderWidth: 2,
                  borderRadius: 40,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginBottom: 20,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: 500 }}>
                    Quantity
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={35}
                    onPress={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 17,
                      marginHorizontal: 5,
                    }}
                  >
                    {quantity}
                  </Text>
                  <Ionicons
                    name="add-circle-outline"
                    size={35}
                    onPress={() => {
                      setQuantity(quantity + 1);
                    }}
                  />
                </View>
              </View>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.prodDescHeader}>Shipping & Returns</Text>
              <Text style={{ marginBottom: 10 }}>
                Free standard shipping and free 60-day returns
              </Text>
              <Text style={styles.prodDescHeader}>Reviews</Text>
              <Text style={styles.rating}>
                {product.rating.rate.toFixed(1)} Ratings
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <PurpleButton
        onPress={() => {
          addProductToCart();
          navigation.navigate("Cart");
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            // borderWidth: 3,
            // borderColor: "brown",
          }}
        >
          <View>
            <Text style={{ color: "white", fontWeight: 700 }}>
              ${(product.price * quantity).toFixed(2)}
            </Text>
          </View>
          <View>
            <Text style={{ color: "white", fontWeight: 700 }}>Add to Cart</Text>
          </View>
        </View>
      </PurpleButton>
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
  outerContainer: {
    height: 850,
    justifyContent: "space-between",
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
