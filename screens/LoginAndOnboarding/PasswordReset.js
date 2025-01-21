import { View, Text, Image, StyleSheet } from "react-native";
import PurpleButton from "../../components/ui/PurpleButton";

function PasswordReset({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/password-reset.png")}
        />
      </View>
      <View>
        <Text style={styles.text}>
          We sent you an email to reset your password.
        </Text>
      </View>
      <View>
        <PurpleButton
          onPress={() => {
            navigation.replace("EnterEmail");
          }}
        >
          Return to Login
        </PurpleButton>
      </View>
    </View>
  );
}

export default PasswordReset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    marginHorizontal: 10,
    marginVertical: 30,
    textAlign: "center",
  },
});
