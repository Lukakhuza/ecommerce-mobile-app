import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PurpleButton from "../../components/ui/PurpleButton";
import { UserInputContext } from "../../store/context/userInputContext";
import { ProductsContext } from "../../store/context/productsContext";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CurrentRenderContext } from "@react-navigation/native";
import { CartContext } from "../../store/context/cartContext";

type Props = {
  navigation: any;
};

const Cart = ({ navigation }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const productsCtx: any = useContext(ProductsContext);
  const cartCtx: any = useContext(CartContext);

  // console.log("Test 52", cartCtx.cartItems.length);
  // useEffect(() => {
  //     const fetchUserData = async ()=> {
  //       const userData = {
  //         email: authCtx.authEmail,
  //       };
  //
  //       if (authCtx.authEmail) {
  //         fetch(
  //           "https://backend-ecommerce-mobile-app.onrender.com/user/get-user-by-email",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(userData),
  //           }
  //         )
  //           .then((response) => {
  //             return response.json();
  //           })
  //           .then((resData) => {
  //             console.log("Test 11", resData);
  //           });
  //       }
  //     }
  //     fetchUserData();
  //   }, [authCtx.authEmail]);

  // useEffect(() => {
  //   const fetchUserData = async()=> {
  //     userInputCtx.updateInputs("cart", );
  //   }
  //   fetchUserData();
  // }, []);

  // calculate the total:

  let total = 0;
  for (let i = 0; i < cartCtx.cartItems.length; i++) {
    total += cartCtx.cartItems[i].product.price * cartCtx.cartItems[i].quantity;
  }

  const removeProductFromCart = async (itemData: any) => {
    // work here and send both product data, as well as user data.
    const productData = {
      id: itemData.item.product.id,
      title: itemData.item.product.title,
      price: itemData.item.product.price,
      quantity: itemData.item.quantity,
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
      "https://backend-ecommerce-mobile-app.onrender.com/product/delete-from-cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        console.log("Test 31", response);
        return response.json();
      })
      .then((resData) => {
        console.log("Test 32", resData.title);
      });
  };

  const addProductToCart = (itemData: any) => {
    cartCtx.addItem(itemData);
    const productData = {
      id: itemData.product.id,
      title: itemData.product.title,
      price: itemData.product.price,
      quantity: itemData.quantity,
    };
    // const userData = {
    //   email: userInputCtx.input.email,
    //   password: userInputCtx.input.passwordPlaceholder,
    //   firstName: userInputCtx.input.firstName,
    //   lastName: userInputCtx.input.lastName,
    //   phoneNumber: userInputCtx.input.phoneNumber,
    //   address: userInputCtx.input.address,
    //   shopFor: userInputCtx.input.shopFor,
    //   ageRange: userInputCtx.input.ageRange,
    //   cart: userInputCtx.input.cart,
    // };
    // const data = {
    //   productData: productData,
    //   userData: userData,
    // };

    // fetch(
    //   "https://backend-ecommerce-mobile-app.onrender.com/product/add-to-cart",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   }
    // )
    //   .then((response) => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then((resData) => {
    //     console.log(resData.title);
    //   });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {cartCtx.cartItems.length > 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Cart
            </Text>
            <View style={styles.root}>
              <View>
                <View
                  style={{
                    height: 700,
                  }}
                >
                  <FlatList
                    horizontal={false}
                    data={cartCtx.cartItems}
                    renderItem={(itemData) => {
                      return (
                        <View style={styles.cartItem}>
                          <View>
                            <Image
                              style={styles.image}
                              source={{
                                uri: productsCtx.products[
                                  itemData.item.product.id
                                ].image,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              marginLeft: 20,
                              flexDirection: "row",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <View>
                              {/* <View width={190}> */}
                              <View style={{ width: 190 }}>
                                <Text numberOfLines={1}>
                                  {itemData.item.product.title}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                }}
                              >
                                <Text style={{ marginRight: 5 }}>
                                  <Text
                                    style={{
                                      fontWeight: 800,
                                    }}
                                  >
                                    Id:{" "}
                                  </Text>{" "}
                                  {itemData.item.product.id}
                                </Text>
                                <Text style={{ marginHorizontal: 5 }}>
                                  <Text
                                    style={{
                                      fontWeight: 800,
                                    }}
                                  >
                                    Price:{" "}
                                  </Text>{" "}
                                  ${itemData.item.product.price.toFixed(2)}
                                </Text>
                                <Text style={{ marginHorizontal: 5 }}>
                                  <Text
                                    style={{
                                      fontWeight: 800,
                                    }}
                                  >
                                    Qty:{" "}
                                  </Text>{" "}
                                  {itemData.item.quantity}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: "space-around",
                              }}
                            >
                              <View>
                                <Text>
                                  $
                                  {(
                                    itemData.item.product.price *
                                    itemData.item.quantity
                                  ).toFixed(2)}
                                </Text>
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <Ionicons
                                  name="remove-circle"
                                  size={35}
                                  color={"blue"}
                                  onPress={() => {
                                    removeProductFromCart(itemData);
                                    cartCtx.removeItem(itemData.item._id);
                                  }}
                                />
                                <Ionicons
                                  name="add-circle"
                                  size={35}
                                  color={"blue"}
                                  onPress={() => {
                                    addProductToCart(itemData.item);
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <PurpleButton
            onPress={() => {
              // navigation.navigate("Main", { screen: "Orders" });
              navigation.navigate("Checkout");
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                // borderWidth: 3,
                // borderColor: "brown",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    Total:{" "}
                  </Text>
                </View>
                <View style={{ marginRight: 70 }}>
                  <Text style={{ color: "white", fontWeight: 700 }}>
                    ${total.toFixed(2)}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Checkout
                </Text>
              </View>
            </View>
          </PurpleButton>
        </View>
      )}
      {cartCtx.cartItems.length === 0 && (
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require("../../assets/parcel.png")}
          />
          <View>
            <Text style={{ fontSize: 20, marginVertical: 20 }}>
              Your Cart is Empty
            </Text>
          </View>
          <View>
            <PurpleButton
              onPress={() => {
                navigation.navigate("CategoriesList");
              }}
            >
              Explore Categories
            </PurpleButton>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
  },
  header: {
    fontSize: 17,
    textAlign: "center",
  },
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  imageContainer: {
    justifyContent: "center",
    width: 200,
    height: 200,
    borderColor: "yellow",
    borderWidth: 4,
  },
  image: {
    width: 40,
    height: 40,
  },
  cartItem: {
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 100,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});
