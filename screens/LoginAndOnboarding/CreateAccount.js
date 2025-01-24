import { View, Text, StyleSheet, TextInput } from "react-native";
import { useContext, useState } from "react";
import { UserInputContext } from "../../store/context/userInputContext";
import PurpleButton from "../../components/ui/PurpleButton";
import { AuthContext } from "../../store/context/auth-context";
import { Colors } from "../../constants/colors";
import IconButton from "../../components/ui/IconButton";
import LoginInput from "./LoginInput";
import Button3 from "../../components/ui/Button3";

function CreateAccount({ navigation }) {
  const userInputCtx = useContext(UserInputContext);
  function handleInputUpdate(inputIdentifier, enteredText) {
    userInputCtx.updateInputs(inputIdentifier, enteredText);
  }

  return (
    <View style={styles.container}>
      {/* <View></View> */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Create Account</Text>
      </View>
      <View style={styles.signInInputContainer}>
        <View>
          <View>
            <TextInput
              autoCorrect={false}
              placeholder="First Name"
              style={styles.textInput}
              onChangeText={handleInputUpdate.bind(this, "firstName")}
              value={userInputCtx.input.firstName}
            ></TextInput>
            <TextInput
              placeholder="Last Name"
              style={styles.textInput}
              onChangeText={handleInputUpdate.bind(this, "lastName")}
              value={userInputCtx.input.lastName}
            ></TextInput>
            <TextInput
              autoCorrect={false}
              placeholder="Enter Email"
              style={styles.textInput}
              onChangeText={handleInputUpdate.bind(this, "email")}
              value={userInputCtx.input.email}
            ></TextInput>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              SecureTextEntry={true}
              autoCapitalize={"none"}
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={handleInputUpdate.bind(this, "passwordPlaceholder")}
              value={userInputCtx.input.passwordPlaceholder}
            ></TextInput>
          </View>
          <PurpleButton
            onPress={() => {
              navigation.navigate("TellUsAboutYourself");
            }}
          >
            Continue
          </PurpleButton>
          <View style={styles.redirectText}>
            <Text>Forgot Password?</Text>
            <Text> </Text>
            <Button3
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              Reset
            </Button3>
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
  redirectText: {
    flexDirection: "row",
    marginLeft: 5,
  },
  icon: {
    top: 20,
  },
});
