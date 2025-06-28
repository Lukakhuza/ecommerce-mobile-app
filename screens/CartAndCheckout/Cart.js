import {
  BackHandler,
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
import { useContext } from "react";

function Cart({ navigation }) {
  const userInputCtx = useContext(UserInputContext);
  // calculate the total:
  let total = 0;
  for (i = 0; i < userInputCtx.input.cart.items.length; i++) {
    total +=
      userInputCtx.input.cart.items[i].product.price *
      userInputCtx.input.cart.items[i].quantity;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      {userInputCtx.input.cart.items.length > 0 && (
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
              Your Cart
            </Text>
            <View contentContainerStyle={styles.root}>
              <View>
                <View
                  style={{
                    height: 700,
                  }}
                >
                  <FlatList
                    horizontal={false}
                    data={userInputCtx.input.cart.items}
                    renderItem={(itemData) => {
                      return (
                        <View
                          style={{
                            marginHorizontal: 20,
                            marginVertical: 10,
                            borderWidth: 3,
                            borderColor: "purple",
                            borderRadius: 20,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                          }}
                        >
                          <Text>
                            <Text style={{ fontWeight: 800 }}>
                              Product Id:{" "}
                            </Text>{" "}
                            {itemData.item.product.id}
                          </Text>
                          <Text>
                            <Text style={{ fontWeight: 800 }}>
                              Product Name:{" "}
                            </Text>{" "}
                            {itemData.item.product.title}
                          </Text>
                          <Text>
                            <Text style={{ fontWeight: 800 }}>Quantity: </Text>{" "}
                            {itemData.item.quantity}
                          </Text>
                          <Text>
                            <Text style={{ fontWeight: 800 }}>Price: </Text> $
                            {itemData.item.product.price}
                          </Text>
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
              navigation.navigate("Main", { screen: "Orders" });
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
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white", fontWeight: 700 }}>Total: </Text>
                <Text style={{ color: "white", fontWeight: 700 }}>
                  ${total.toFixed(2)}
                </Text>
              </View>
              <View>
                <Text style={{ color: "white", fontWeight: 700 }}>
                  Place Order
                </Text>
              </View>
            </View>
          </PurpleButton>
        </View>
      )}
      {userInputCtx.input.cart.items.length === 0 && (
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
}

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
    width: 100,
    height: 100,
  },
});
