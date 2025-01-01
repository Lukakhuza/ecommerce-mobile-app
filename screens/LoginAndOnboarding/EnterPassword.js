import { View, Text, StyleSheet, TextInput } from "react-native";
import PurpleButton from "../../components/ui/PurpleButton";
import { Colors } from "../../constants/colors";

function EnterPassword({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Sign in</Text>
      </View>
      <View style={styles.signInInputContainer}>
        <View>
          <View>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
            ></TextInput>
          </View>
          <PurpleButton
            onPress={() => {
              navigation.navigate("CreateAccount");
            }}
          >
            Continue
          </PurpleButton>
          <View>
            <Text>
              Forgot Password? <Text style={styles.boldedText}>Reset</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default EnterPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  text: {
    fontFamily: "Circular-Std",
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 34.5,
    letterSpacing: -0.41,
  },
  textContainer: {
    top: 173,
    left: 27,
  },
  signInInputContainer: {
    margin: 6,
    width: 344,
    height: 152,
    top: 190,
    left: 23,
  },
  textInput: {
    width: 342,
    height: 56,
    borderRadius: 4,
    backgroundColor: "#F4F4F4",
    paddingLeft: 10,
  },
  boldedText: {
    fontWeight: "600",
  },
});
