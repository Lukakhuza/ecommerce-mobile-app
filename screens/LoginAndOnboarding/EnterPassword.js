import { View, Text, StyleSheet, TextInput } from "react-native";
import { useContext, useState } from "react";
import PurpleButton from "../../components/ui/PurpleButton";
import { UserInputContext } from "../../store/context/userInputContext";
import { Colors } from "../../constants/colors";
import Button3 from "../../components/ui/Button3";
import { loginUser } from "../../util/auth";
import { AuthContext } from "../../store/context/auth-context";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

function EnterPassword({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const userInputCtx = useContext(UserInputContext);
  const authCtx = useContext(AuthContext);

  function handleInputUpdate(inputIdentifier, enteredText) {
    console.log(userInputCtx);
    userInputCtx.updateInputs(inputIdentifier, enteredText);
  }

  async function loginHandler() {
    setIsAuthenticating(true);
    const email = userInputCtx.input.email;
    const password = userInputCtx.input.passwordPlaceholder;
    const token = await loginUser(email, password);
    // console.log("Test 908");
    // console.log(token);
    authCtx.authenticate(token);
    setIsAuthenticating(false);
    // console.log("Token is: ", authCtx);
    // userInputCtx.
    // console.log(response);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging In..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Sign in</Text>
      </View>
      <View style={styles.signInInputContainer}>
        <View>
          <View>
            <TextInput
              autoCorrect={false}
              placeholder="Password Placeholder"
              style={styles.textInput}
              onChangeText={handleInputUpdate.bind(this, "passwordPlaceholder")}
              value={userInputCtx.input.passwordPlaceholder}
            ></TextInput>
          </View>
          <PurpleButton onPress={loginHandler}>Continue</PurpleButton>
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
  redirectText: {
    flexDirection: "row",
    marginLeft: 5,
  },
});
