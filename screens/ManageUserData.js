import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../components/ui/Input";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import { UserInputContext } from "../store/context/userInputContext";
import { AuthContext } from "../store/context/auth-context";

function ManageUserData({ route, navigation }) {
  const userInputCtx = useContext(UserInputContext);
  const authCtx = useContext(AuthContext);
  const [inputValues, setInputValues] = useState({
    firstName: userInputCtx.input
      ? userInputCtx.input.firstName.toString()
      : "",
    lastName: userInputCtx.input ? userInputCtx.input.lastName.toString() : "",
    email: userInputCtx.input ? userInputCtx.input.email.toString() : "",
    phoneNumber: userInputCtx.input
      ? userInputCtx.input.phoneNumber.toString()
      : "",
  });

  function handleTextChange(inputIdentifier, enteredText) {
    setInputValues((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredText,
      };
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Basic Info",
    });
  }, [navigation]);

  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    // Update the values as they are displayed.
    userInputCtx.updateInputs("firstName", inputValues.firstName);
    userInputCtx.updateInputs("lastName", inputValues.lastName);
    userInputCtx.updateInputs("phoneNumber", inputValues.phoneNumber);
    userInputCtx.updateInputs("email", authCtx.authEmail);
    // userInputCtx.updateInputs("address", inputValues.address);

    // Update the user input context with the new values
    userInputCtx.input.firstName = inputValues.firstName;
    userInputCtx.input.lastName = inputValues.lastName;
    userInputCtx.input.phoneNumber = inputValues.phoneNumber;
    userInputCtx.input.email = authCtx.authEmail;
    // save the updated context to the database
    async function updateUserHandler() {
      const user = {
        email: userInputCtx.input.email,
        password: userInputCtx.input.passwordPlaceholder,
        firstName: userInputCtx.input.firstName,
        lastName: userInputCtx.input.lastName,
        phoneNumber: userInputCtx.input.phoneNumber,
        address: userInputCtx.input.address,
        shopFor: userInputCtx.input.shopFor,
        ageRange: userInputCtx.input.ageRange,
      };

      fetch(
        "https://backend-ecommerce-mobile-app.onrender.com/user/update-user/68496fe68999df7164dcfc1f",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    updateUserHandler();
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Input
          label="First Name"
          textInputConfig={{
            autoCapitalize: "sentences",
            autoCorrect: false,
            onChangeText: handleTextChange.bind(this, "firstName"),
            value: inputValues.firstName,
          }}
        />
        <Input
          label="Last Name"
          textInputConfig={{
            autoCapitalize: "sentences",
            autoCorrect: false,
            onChangeText: handleTextChange.bind(this, "lastName"),
            value: inputValues.lastName,
          }}
        />
        <Input
          label="Email Address"
          textInputConfig={{
            editable: false,
            placeholder: "Email Address",
            maxLength: 12,
            value: authCtx.authEmail,
            style: { color: "black", fontSize: 17, backgroundColor: "none" },
          }}
        />
        <Input
          label="Phone Number"
          textInputConfig={{
            keyboardType: "numeric",
            onChangeText: handleTextChange.bind(this, "phoneNumber"),
            placeholder: "###-###-####",
            maxLength: 12,
            value: inputValues.phoneNumber,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          Confirm
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default ManageUserData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    color: "purple",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginTop: 20,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "lightpurple",
    alignItems: "center",
  },
});
