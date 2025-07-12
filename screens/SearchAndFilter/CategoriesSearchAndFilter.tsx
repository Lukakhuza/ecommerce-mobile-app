import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import IconButton from "../../components/ui/IconButton";
import SearchComponent from "../../components/ui/SearchComponent";
import CategoryButton from "../../components/ui/CategoryButton";

const categories = [
  { label: "Jackets", imageId: 2 },
  { label: "Tops", imageId: 1 },
  { label: "Tech", imageId: 8 },
  { label: "Jewelry", imageId: 6 },
  { label: "Other", imageId: 0 },
];

type Props = {
  navigation: any;
};

function CategoriesSearchAndFilter({ navigation }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const filteredCategories = categories.filter((category) => {
    if (category.label.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });

  function updateSearchValue(enteredText: string) {
    setSearchValue(enteredText);
  }

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <IconButton
          style={{}}
          icon="chevron-back-circle-outline"
          size={32}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <SearchComponent
          style={{
            marginLeft: 10,
            width: "82%",
          }}
          onChangeText={
            // updateSearchValue.bind(this)
            () => {}
          }
          value={searchValue}
        />
      </View>
      <View
      // style={styles.container}
      >
        <Text style={styles.title}>Shop by Categories</Text>
        <ScrollView style={styles.categoriesContainer}>
          {filteredCategories.map((category: any) => {
            return (
              <CategoryButton
                key={category.label}
                category={category.label}
                imageId={category.imageId}
              />
            );
          })}
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
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 90,
  },
  category: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    height: 80,
    // width:
    borderRadius: 20,
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
