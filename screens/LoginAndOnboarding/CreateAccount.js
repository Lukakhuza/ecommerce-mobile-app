import { View, Text, StyleSheet, TextInput } from "react-native";
import PurpleButton from "../../components/ui/PurpleButton";
import { Colors } from "../../constants/colors";
import IconButton from "../../components/ui/IconButton";
import LoginInput from "./LoginInput";

function CreateAccount({ navigation }) {
  return (
    <View style={styles.container}>
      <View></View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Create Account</Text>
      </View>
      <View style={styles.signInInputContainer}>
        <View>
          <View>
            <TextInput
              placeholder="First Name"
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Last Name"
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Email Address"
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
            ></TextInput>
          </View>
          <PurpleButton
            onPress={() => {
              navigation.navigate("ForgotPassword");
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

export default CreateAccount;

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
    marginVertical: 10,
  },
  boldedText: {
    fontWeight: "600",
  },
  icon: {
    top: 20,
  },
});