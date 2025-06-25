import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PurpleButton from "../../components/ui/PurpleButton";

function Orders({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>Orders</Text>
      <ScrollView contentContainerStyle={styles.root}>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require("../../assets/check-out.png")}
          />
          <View>
            <Text style={{ fontSize: 20, marginVertical: 10 }}>
              No Orders yet
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

export default Orders;

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
