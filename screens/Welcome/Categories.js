import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { ProductsContext } from "../../store/context/productsContext";

function Categories({ list, navigation }) {
  const productsCtx = useContext(ProductsContext);
  console.log(productsCtx.products.length);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Text style={styles.title}>Shop by Categories</Text>
        <ScrollView style={styles.categoriesContainer}>
          <Pressable
            onPress={() => {
              productsCtx.updateSelectedCategory("Jackets");
              navigation.navigate("Welcome");
            }}
            style={styles.category}
          >
            <View style={styles.imageContainer}>
              {productsCtx.products.length > 0 && (
                <Image
                  source={{ uri: productsCtx.products[2].image }}
                  style={styles.image}
                />
              )}
            </View>
            <View>
              <Text style={styles.label}>Jackets</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.category}
            onPress={() => {
              productsCtx.updateSelectedCategory("Tops");
              navigation.navigate("Welcome");
            }}
          >
            <View style={styles.imageContainer}>
              {productsCtx.products.length > 0 && (
                <Image
                  source={{ uri: productsCtx.products[1].image }}
                  style={styles.image}
                />
              )}
            </View>
            <Text style={styles.label}>Tops</Text>
          </Pressable>
          <Pressable
            style={styles.category}
            onPress={() => {
              productsCtx.updateSelectedCategory("Tech");
              navigation.navigate("Welcome");
            }}
          >
            <View style={styles.imageContainer}>
              {productsCtx.products.length > 0 && (
                <Image
                  source={{ uri: productsCtx.products[8].image }}
                  style={styles.image}
                />
              )}
            </View>
            <Text style={styles.label}>Tech</Text>
          </Pressable>
          <Pressable
            style={styles.category}
            onPress={() => {
              productsCtx.updateSelectedCategory("Jewelry");
              navigation.navigate("Welcome");
            }}
          >
            <View style={styles.imageContainer}>
              {productsCtx.products.length > 0 && (
                <Image
                  source={{ uri: productsCtx.products[6].image }}
                  style={styles.image}
                />
              )}
            </View>
            <Text style={styles.label}>Jewelry</Text>
          </Pressable>
          <Pressable
            style={styles.category}
            onPress={() => {
              productsCtx.updateSelectedCategory("Other");
              navigation.navigate("Welcome");
            }}
          >
            <View style={styles.imageContainer}>
              {productsCtx.products.length > 0 && (
                <Image
                  source={{ uri: productsCtx.products[0].image }}
                  style={styles.image}
                />
              )}
            </View>
            <Text style={styles.label}>Other</Text>
          </Pressable>
        </ScrollView>
      </View>
      <View></View>
    </View>
  );
}

export default Categories;

const styles = StyleSheet.create({
  categories: {
    height: 840,
  },
  header: {
    height: 100,
  },
  title: {
    marginLeft: 30,
    // marginBottom: 20,
    marginTop: 20,
    fontSize: 25,
    fontWeight: 500,
  },
  label: {
    fontSize: 17,
    marginLeft: 10,
  },
  categoriesContainer: {
    // flex: 1,
    // height: 00,
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 20,
    paddingVertical: 50,
    // backgroundColor: "yellow",
    // borderColor: "blue",
    // borderWidth: 3,
  },
  category: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // justifyContent: "flex-start",
    // borderColor: "orange",
    // borderWidth: 5,
    // alignItems: "flex-start",
    // alignContent: "flex-start",
    // alignItems: "ce?nter",
    // justifyContent: "center",
    backgroundColor: "white",
    height: 80,
    // width:
    borderRadius: 20,
  },
  image: {
    // width: "100%",
    // height: 50,
    flex: 1,
    // zIndex: 10,
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
