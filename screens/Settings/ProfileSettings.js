import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { fetchProfilePicture } from "../../util/auth";
import { ProductsContext } from "../../store/context/productsContext";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../store/context/auth-context";
import { UserInputContext } from "../../store/context/userInputContext";
import { useNavigation } from "@react-navigation/native";

function ProfileSettings({ navigation }) {
  // const navi
  const [dummyUserData, setDummyUserData] = useState("");
  const authCtx = useContext(AuthContext);
  const userInputCtx = useContext(UserInputContext);
  const productsCtx = useContext(ProductsContext);

  function editPressHandler(basicInfo) {
    navigation.navigate("ManageUserData"),
      {
        userDataType: basicInfo,
      };
  }

  useEffect(() => {
    async function getProfilePicture() {
      const response = await fetchProfilePicture();
      setDummyUserData(response);
    }
    getProfilePicture();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.containerProfilePic}>
          <View style={styles.imageContainerProfilePic}>
            {dummyUserData.users && (
              <Image
                source={{ uri: dummyUserData.users[8].image }}
                style={styles.image}
              />
            )}
          </View>
        </View>
        <ScrollView style={styles.categoriesContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.basicInfo,
              pressed && styles.pressed,
            ]}
          >
            <View>
              <Text style={styles.label1}>
                {userInputCtx.input.firstName} {userInputCtx.input.lastName}
              </Text>
              <Text style={styles.label2}>{userInputCtx.input.email}</Text>
              <Text style={styles.label2}>
                {userInputCtx.input.phoneNumber}
              </Text>
            </View>
            <Pressable
              onPress={editPressHandler}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={{ color: "purple", fontSize: 17 }}>Edit</Text>
            </Pressable>
          </Pressable>
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
          <Pressable
            style={styles.signOutContainer}
            onPress={() => {
              userInputCtx.resetInputs();
              authCtx.logout();
            }}
          >
            <Text style={styles.signOut}>Sign Out</Text>
          </Pressable>
        </ScrollView>
      </View>
      <View></View>
    </SafeAreaView>
  );
}

export default ProfileSettings;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    // backgroundColor: "gray",
  },
  containerProfilePic: {
    marginTop: 38,
    marginHorizontal: 30,
    alignItems: "center",
  },
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
  label1: {
    fontSize: 20,
    fontWeight: 15,
    marginLeft: 10,
    marginVertical: 4,
    fontWeight: 700,
  },
  label2: {
    color: "gray",
    fontSize: 17,
    marginLeft: 10,
    marginVertical: 4,
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
  basicInfo: {
    marginBottom: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 110,
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
  imageContainerProfilePic: {
    height: 50,
    width: 50,
    marginHorizontal: 30,
    backgroundColor: "brown",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "black",
  },
  signOut: {
    color: "red",
    fontSize: 15,
  },
  signOutContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});
