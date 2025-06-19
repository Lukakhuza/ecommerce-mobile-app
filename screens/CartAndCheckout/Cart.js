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
  console.log(userInputCtx);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.root}>
        <View>{/* <FlatList horizontal={true} data={UserInp} /> */}</View>
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
      </ScrollView>
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
    alignItems: "center",
    justifyContent: "flex-start",
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
