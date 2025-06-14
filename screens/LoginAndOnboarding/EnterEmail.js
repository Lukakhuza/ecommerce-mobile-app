import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Input,
  SafeAreaView,
} from "react-native";
import { useState, useContext } from "react";
import PurpleButton from "../../components/ui/PurpleButton";
import Button2 from "../../components/ui/Button2";
import Button3 from "../../components/ui/Button3";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { addData, fetchProductsData, fetchUserData } from "../../util/auth";
import { UserInputContext } from "../../store/context/userInputContext";

function EnterEmail({ navigation }) {
  const userInputCtx = useContext(UserInputContext);
  const userData = {
    email: userInputCtx.email,
    passwordPlaceholder: userInputCtx.passwordPlaceHolder,
    firstName: userInputCtx.firstName,
    lastName: userInputCtx.lastName,
    phoneNumber: userInputCtx.phoneNumber,
    shopFor: userInputCtx.shopFor,
    ageRange: userInputCtx.ageRange,
  };

  function handleInputUpdate(inputIdentifier, enteredText) {
    userInputCtx.updateInputs(inputIdentifier, enteredText);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign in</Text>
        </View>
        <View style={styles.inputsOuterContainer}>
          <View style={styles.signInInputContainer}>
            <View>
              <View>
                <TextInput
                  autoCorrect={false}
                  placeholder="Enter Email"
                  style={styles.textInput}
                  onChangeText={handleInputUpdate.bind(this, "email")}
                  value={userInputCtx.input.email}
                ></TextInput>
              </View>
              <PurpleButton
                onPress={() => {
                  navigation.navigate("EnterPassword");
                }}
              >
                Continue
              </PurpleButton>
              <View style={styles.redirectText}>
                <Text>Don't have an account?</Text>
                <Text> </Text>
                <Button3
                  onPress={() => {
                    userInputCtx.resetInputs();
                    navigation.navigate("CreateAccount");
                  }}
                >
                  Create One
                </Button3>
              </View>
            </View>
          </View>
          <View style={styles.buttons2}>
            {/* <Button
              title="Hello World"
              onPress={() => {
                addData(userData);
              }}
            ></Button> */}
            <Button2
              style={styles.button1}
              // onPress={() => {
              //   // console.log("Log in with your Apple account.");
              //   // fetchProductsData();
              //   // fetchUserData();
              //   createAccountHandler()
              // }}
              imageSource={require("../../assets/apple-logo1.png")}
            >
              Continue with Apple
            </Button2>
            <Button2
              onPress={() => {
                // console.log("Log in with your Google account.");
              }}
              imageSource={require("../../assets/google-logo.png")}
            >
              Continue with Google{" "}
            </Button2>
            <Button2
              onPress={() => {
                // console.log("Log in with your Facebook account.");
              }}
              imageSource={require("../../assets/facebook-logo.png")}
            >
              Continue with Facebook
            </Button2>
            {/* <Button2 onPress={fetchProductsData}>Hello</Button2> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EnterEmail;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
  },
  container: {
    // flex: 1,
    height: "100%",
    flexDirection: "column",
    backgroundColor: "white",
  },
  inputsOuterContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Circular-Std",
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 34.5,
    letterSpacing: -0.41,
  },
  titleContainer: {
    top: 173,
    left: 35,
  },
  signInInputContainer: {
    marginTop: 6,
    marginHorizontal: 6,
    marginBottom: 250,
    height: 152,
    top: 190,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: 360,
    height: 56,
    borderRadius: 4,
    backgroundColor: "#F4F4F4",
    paddingLeft: 10,
  },
  redirectText: {
    flexDirection: "row",
    marginLeft: 5,
  },
  buttons2: {
    flex: 1,
    flexDirection: "column",
    width: "80%",
  },
  button1: {
    // backgroundColor: "blue",
  },
});
