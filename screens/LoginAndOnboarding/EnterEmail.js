import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Input,
} from "react-native";
import { useState, useContext } from "react";
import PurpleButton from "../../components/ui/PurpleButton";
import Button2 from "../../components/ui/Button2";
import Button3 from "../../components/ui/Button3";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { addData } from "../../util/auth";
import { UserInputContext } from "../../store/context/userInputContext";

// import { sendEmail } from "../../util/email";
// const fetch111 = require("node-fetch");

// function getAccessToken() {
//   return admin.credential
//     .applicationDefault()
//     .getAccessToken()
//     .then((accessToken) => {
//       return accessToken.access_token;
//     })
//     .catch((err) => {
//       console.error("Unable to get access token");
//       console.error(err);
//     });
// }

// async function listProjects() {
//   const accessToken = getAccessToken();
//   console.log(accessToken);
//   const uri = "https://firebase.googleapis.com/v1beta1/availableProjects";
//   console.log(uri);
//   const options = {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + accessToken,
//     },
//   };

//   try {
// const rawResponse = await fetch(uri, options);
// console.log(rawResponse);
// const resp = await rawResponse.json();
// console.log(resp);
// const projects = resp["projectInfo"];
// console.log("Project total: " + projects.length);
// console.log("");
// for (let i in projects) {
//   const project = projects[i];
//   console.log("Project " + i);
//   console.log("ID: " + project["project"]);
//   console.log("Display Name: " + project["displayName"]);
//   console.log("");
//   } catch (err) {
//     console.error(err);
//   }
// }

function EnterEmail({ navigation }) {
  const userInputCtx = useContext(UserInputContext);

  function handleInputUpdate(inputIdentifier, enteredText) {
    console.log(userInputCtx);
    userInputCtx.updateInputs(inputIdentifier, enteredText);
  }

  function handlePress() {
    // listProjects();
    addData();
    // console.log(fetch111.Request);
    // console.log("Hello");
    // console.log("Hi");
    // sendEmail();
  }

  return (
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
                  navigation.navigate("CreateAccount");
                }}
              >
                Create One
              </Button3>
            </View>
          </View>
        </View>
        <View style={styles.buttons2}>
          <Button2
            style={styles.button1}
            onPress={() => {
              console.log("Log in with your Apple account.");
            }}
            imageSource={require("../../assets/apple-logo1.png")}
          >
            Continue with Apple
          </Button2>
          <Button2
            onPress={() => {
              console.log("Log in with your Google account.");
            }}
            imageSource={require("../../assets/google-logo.png")}
          >
            Continue with Google{" "}
          </Button2>
          <Button2
            onPress={() => {
              console.log("Log in with your Facebook account.");
            }}
            imageSource={require("../../assets/facebook-logo.png")}
          >
            Continue with Facebook
          </Button2>
          <Button title="Trigger Email" onPress={handlePress} />
        </View>
      </View>
    </ScrollView>
  );
}

export default EnterEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
