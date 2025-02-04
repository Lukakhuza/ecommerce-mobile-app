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
import IconButton from "../../components/ui/IconButton";
import SearchComponent from "../../components/ui/SearchComponent";
import CategoryButton from "../../components/ui/CategoryButton";

const data = [
  { label: "Jackets", imageId: 2 },
  { label: "Tops", imageId: 1 },
  { label: "Tech", imageId: 8 },
  { label: "Jewelry", imageId: 6 },
  { label: "Other", imageId: 0 },
];

function CategoriesSearchAndFilter({ navigation }) {
  const productsCtx = useContext(ProductsContext);
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <IconButton
          icon="chevron-back-circle-outline"
          size={32}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <SearchComponent
          style={{
            marginLeft: 10,
            width: "82%",
            // borderColor: "blue",
            // borderWidth: 3,
            // paddingVertical: 0,
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Shop by Categories</Text>
        <ScrollView style={styles.categoriesContainer}>
          <CategoryButton category="Jackets" imageId={2} />
          <CategoryButton category="Tops" imageId={1} />
          <CategoryButton category="Tech" imageId={8} />
          <CategoryButton category="Jewelry" imageId={6} />
          <CategoryButton category="Other" imageId={0} />
        </ScrollView>
      </View>
      <View></View>
    </SafeAreaView>
  );
}

export default CategoriesSearchAndFilter;

const styles = StyleSheet.create({
  categories: {
    height: 840,
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
    paddingTop: 20,
    paddingBottom: 90,
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
  searchContainer: {
    // flex: 1,
    // width: "90%",
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    // alignItems: "flex-end",
    // borderColor: "brown",
    // borderWidth: 3,
  },
});
