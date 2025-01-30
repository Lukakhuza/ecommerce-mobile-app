import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { fetchProfilePicture } from "../../util/auth";
import { ProductsContext } from "../../store/context/productsContext";
import CartButton from "../../components/ui/CartButton";
import DropdownComponent from "../../components/ui/Dropdown";
import { UserInputContext } from "../../store/context/userInputContext";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import FavoriteIcon from "../../components/ui/FavoriteIcon";
import { FavoritesContext } from "../../store/context/favoritesContext";

const data = [
  { label: "Men", value: "Men" },
  { label: "Women", value: "Women" },
];

function HomePage({ navigation }) {
  const productsCtx = useContext(ProductsContext);
  const userInputCtx = useContext(UserInputContext);
  const favoritesCtx = useContext(FavoritesContext);
  const [dummyUserData, setDummyUserData] = useState("");
  const [genderSelection, setGenderSelection] = useState("");

  useEffect(() => {
    async function getProfilePicture() {
      const response = await fetchProfilePicture();
      setDummyUserData(response);
    }
    getProfilePicture();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          {dummyUserData.users && (
            <Image
              source={{ uri: dummyUserData.users[8].image }}
              style={styles.image}
            />
          )}
        </View>
        {/*Add an image here with profilePicture as the link  */}
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            //   search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="M / W"
            //   searchPlaceholder="Search..."
            value={genderSelection}
            onChange={(item) => {
              setGenderSelection(item.value);
              userInputCtx.updateInputs("shopFor", item.value);
            }}
          />
        </View>
        <View style={styles.cartButtonContainer}>
          <CartButton />
        </View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={25} style={styles.searchIcon} />
          <TextInput
            autoCorrect={false}
            placeholder="Search"
            placeholderTextColor="gray"
            style={styles.searchBar}
            // onChangeText={handleInputUpdate.bind(this, "email")}
            // value={userInputCtx.input.email}
          ></TextInput>
        </View>
        {productsCtx.products.length > 0 && (
          <View style={styles.categories}>
            <View style={styles.categoriesHeader}>
              <Text style={{ fontSize: 17, fontWeight: 700 }}>Categories</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("CategoriesList");
                }}
              >
                <Text style={{ fontSize: 17 }}>See All</Text>
              </Pressable>
            </View>
            <View style={styles.categoriesContent}>
              <View style={styles.categoryItem}>
                <View style={styles.imageContainer2}>
                  <Image
                    source={{ uri: productsCtx.products[0].image }}
                    style={styles.image}
                  />
                </View>
                <Text style={{ textAlign: "center" }}>Jackets</Text>
              </View>
              <View style={styles.categoryItem}>
                <View style={styles.imageContainer2}>
                  <Image
                    source={{ uri: productsCtx.products[1].image }}
                    style={styles.image}
                  />
                </View>
                <Text style={{ textAlign: "center" }}>Tops</Text>
              </View>
              <View style={styles.categoryItem}>
                <View style={styles.imageContainer2}>
                  <Image
                    source={{ uri: productsCtx.products[2].image }}
                    style={styles.image}
                  />
                </View>
                <Text style={{ textAlign: "center" }}>Hoodies</Text>
              </View>
              <View style={styles.categoryItem}>
                <View style={styles.imageContainer2}>
                  <Image
                    source={{ uri: productsCtx.products[3].image }}
                    style={styles.image}
                  />
                </View>
                <Text style={{ textAlign: "center" }}>Tech</Text>
              </View>
              <View style={styles.categoryItem}>
                <View style={styles.imageContainer2}>
                  <Image
                    source={{ uri: productsCtx.products[4].image }}
                    style={styles.image}
                  />
                </View>
                <Text style={{ textAlign: "center" }}>Jewelry & Other</Text>
              </View>
            </View>
          </View>
        )}
        <View style={styles.topSelling}>
          <View style={styles.topSellingHeader}>
            <Text style={{ fontSize: 21, fontWeight: 700 }}>Top Selling</Text>
            <Pressable
              onPress={() => {
                productsCtx.updateSelectedCategory("All");
                navigation.navigate("Welcome");
              }}
            >
              <Text style={{ fontSize: 17 }}>See All</Text>
            </Pressable>
          </View>
          <FlatList
            horizontal={true}
            data={productsCtx.products}
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
                        if (
                          !favoritesCtx.favorites.includes(itemData.item.id)
                        ) {
                          favoritesCtx.addFavorite(itemData.item.id);
                        } else {
                          favoritesCtx.removeFavorite(itemData.item.id);
                        }
                      }}
                    />
                  </View>
                  <Image
                    source={{ uri: itemData.item.image }}
                    style={styles.image1}
                  />
                  <Text numberOfLines={1}>{itemData.item.title}</Text>
                  <Text
                    style={{ fontWeight: 700 }}
                  >{`$${itemData.item.price}`}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.topSelling}>
          <View style={styles.topSellingHeader}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 600,
                marginLeft: 10,
                color: "purple",
              }}
            >
              New In
            </Text>
            <Pressable
              onPress={() => {
                productsCtx.updateSelectedCategory("All");
                navigation.navigate("Welcome");
              }}
            >
              <Text style={{ fontSize: 17 }}>See All</Text>
            </Pressable>
          </View>
          <FlatList
            horizontal={true}
            data={productsCtx.products}
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
                        if (
                          !favoritesCtx.favorites.includes(itemData.item.id)
                        ) {
                          favoritesCtx.addFavorite(itemData.item.id);
                        } else {
                          favoritesCtx.removeFavorite(itemData.item.id);
                        }
                      }}
                    />
                  </View>
                  <Image
                    source={{ uri: itemData.item.image }}
                    style={styles.image1}
                  />
                  <Text numberOfLines={1}>{itemData.item.title}</Text>
                  <Text
                    style={{ fontWeight: 700 }}
                  >{`$${itemData.item.price}`}</Text>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: "orange",
  },
  headerContainer: {
    // flex: 1,
    // marginTop: 75,
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 4,
    height: 100,
  },
  searchBarContainer: {
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 4,
    height: 80,
  },
  searchBar: {
    backgroundColor: "white",
    // borderColor: "black",
    flex: 1,
    height: 50,
    paddingLeft: 40,
    // borderWidth: 4,
    borderRadius: 30,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  container: {
    // height: 800,
    // backgroundColor: "yellow",
  },
  imageContainer: {
    height: 50,
    width: 50,
    backgroundColor: "brown",
    borderRadius: 25,
  },
  imageContainer2: {
    height: 78,
    width: 78,
    padding: 2,
    // borderColor: "orange",
    // borderWidth: 3,
  },
  image: {
    flex: 1,
    // borderColor: "black",
    // borderWidth: 2,
    padding: 8,
    margin: 5,
    backgroundColor: "white",
    // height: 30,
    // width: 20,
    // height: 20,
    overflow: "hidden",
    resizeMode: "contain",
    borderRadius: 40,
  },
  cartButtonContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  dropdownContainer: {
    width: 150,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    alignItems: "center",
    // textAlign: "center",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    marginTop: 0,
    // borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 15,
    // margin: 16,
    height: 60,
    backgroundColor: "#F4F4F4",
    borderRadius: 30,
  },
  categories: {
    flex: 1,
    height: 160,
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 5,
    marginHorizontal: 30,
    // borderColor: "brown",
    // borderWidth: 5,
  },
  categoriesHeader: {
    // flex: 1,
    flexDirection: "row",
    // borderColor: "blue",
    height: 40,
    // borderWidth: 5,
    // paddingHorizontal: 10,
    // marginBottom: 10,
    justifyContent: "space-between",
  },
  categoriesContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    // borderColor: "green",
    // borderWidth: 5,
  },
  categoryItem: {
    flex: 1,
    // marginHorizontal: 10,
    // height: 1,
    // borderColor: "purple",
    // borderWidth: 3,
    // height: 300,
    // width: 300,
    // backgroundColor: "yellow",
  },
  topSelling: {
    flex: 5,
    marginHorizontal: 30,
    paddingHorizontal: 10,
  },
  topSellingHeader: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  productContainer: {
    flex: 1,
    backgroundColor: "white",
    height: "auto",
    width: 150,
    margin: 10,
    padding: 20,
    borderRadius: 20,
  },
  favIcon: { position: "absolute", right: 15, top: 15, zIndex: 1 },
  image1: {
    width: "100%",
    height: 200,
    zIndex: 0,
    overflow: "hidden",
    resizeMode: "contain",
  },
});
