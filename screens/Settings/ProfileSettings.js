import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { ProductsContext } from "../../store/context/productsContext";
import { Ionicons } from "@expo/vector-icons";

function ProfileSettings({ navigation }) {
  const productsCtx = useContext(ProductsContext);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Shop by Categories</Text>
        <ScrollView style={styles.categoriesContainer}>
          <Pressable
            onPress={() => {
              productsCtx.updateSelectedCategory("Jackets");
              navigation.navigate("Welcome");
            }}
            style={styles.category}
          >
            <View>
              <Text style={styles.label}>Address</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" size={35} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              productsCtx.updateSelectedCategory("Jackets");
              navigation.navigate("Welcome");
            }}
            style={styles.category}
          >
            <View>
              <Text style={styles.label}>Wishlist</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" size={35} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              productsCtx.updateSelectedCategory("Jackets");
              navigation.navigate("Welcome");
            }}
            style={styles.category}
          >
            <View>
              <Text style={styles.label}>Payment</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" size={35} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              productsCtx.updateSelectedCategory("Jackets");
              navigation.navigate("Welcome");
            }}
            style={styles.category}
          >
            <View>
              <Text style={styles.label}>Help</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" size={35} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              productsCtx.updateSelectedCategory("Jackets");
              navigation.navigate("Welcome");
            }}
            style={styles.category}
          >
            <View>
              <Text style={styles.label}>Support</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" size={35} />
            </View>
          </Pressable>
        </ScrollView>
      </View>
      <View></View>
    </SafeAreaView>
  );
}

export default ProfileSettings;

const styles = StyleSheet.create({
  categories: {
    height: 840,
  },
  title: {
    marginLeft: 30,
    marginTop: 20,
    fontSize: 25,
    fontWeight: 500,
  },
  label: {
    fontSize: 17,
    marginLeft: 10,
  },
  categoriesContainer: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 20,
    paddingVertical: 50,
  },
  category: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 80,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  image: {
    flex: 1,
    overflow: "hidden",
    resizeMode: "contain",
  },
  imageContainer: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginRight: 10,
    marginVertical: 5,
  },
});
