import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../components/ui/Input";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import { UserInputContext } from "../store/context/userInputContext";
import { AuthContext } from "../store/context/auth-context";

function ManageUserAddress({ route, navigation }) {
  const userInputCtx = useContext(UserInputContext);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    userInputCtx.updateInputs("email", authCtx.authEmail);
  }, []);
  const [inputValues, setInputValues] = useState({
    addressLine1: userInputCtx.input
      ? userInputCtx.input.address.addressLine1.toString()
      : "",
    city: userInputCtx.input ? userInputCtx.input.address.city.toString() : "",
    state: userInputCtx.input
      ? userInputCtx.input.address.state.toString()
      : "",
    zipcode: userInputCtx.input
      ? userInputCtx.input.address.zipcode.toString()
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
      title: "Edit Address",
    });
  }, [navigation]);

  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    // Update the values as they are displayed:
    userInputCtx.updateInputs("address", inputValues);
    // Update the user input context with new address:
    userInputCtx.input.address = inputValues;

    console.log("Test 10", userInputCtx.input);
    console.log("Test 11", inputValues);
    // Save updated context to the database:
    async function updateUserAddressHandler() {
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

      console.log("Test 6", user);

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
    updateUserAddressHandler();
    console.log("Test 8", userInputCtx.input);
    console.log("Test 9", inputValues);
    navigation.goBack();
  }
  return (
    <SafeAreaView>
      <View>
        <Input
          label="Address Line 1"
          textInputConfig={{
            autoCapitalize: "sentences",
            autoCorrect: false,
            onChangeText: handleTextChange.bind(this, "addressLine1"),
            value: inputValues.addressLine1,
          }}
        />
        <Input
          label="City"
          textInputConfig={{
            autoCapitalize: "words",
            autoCorrect: false,
            onChangeText: handleTextChange.bind(this, "city"),
            value: inputValues.city,
          }}
        />
        <Input
          label="State"
          textInputConfig={{
            autoCapitalize: "characters",
            autoCorrect: false,
            maxLength: "2",
            onChangeText: handleTextChange.bind(this, "state"),
            value: inputValues.state,
          }}
        />
        <Input
          label="Zip Code"
          textInputConfig={{
            autoCapitalize: "sentences",
            keyboardType: "numeric",
            maxLength: "5",
            autoCorrect: false,
            onChangeText: handleTextChange.bind(this, "zipcode"),
            value: inputValues.zipcode,
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
    //   <SafeAreaView style={styles.container}>
    //       <View>
    //         <Input
    //           label="First Name"
    //           textInputConfig={{
    //             autoCapitalize: "sentences",
    //             autoCorrect: false,
    //             onChangeText: handleTextChange.bind(this, "firstName"),
    //             value: inputValues.firstName,
    //           }}
    //         />
    //         <Input
    //           label="Last Name"
    //           textInputConfig={{
    //             autoCapitalize: "sentences",
    //             autoCorrect: false,
    //             onChangeText: handleTextChange.bind(this, "lastName"),
    //             value: inputValues.lastName,
    //           }}
    //         />
    //         <Input
    //           label="Email Address"
    //           textInputConfig={{
    //             editable: false,
    //             placeholder: "Email Address",
    //             maxLength: 12,
    //             value: inputValues.email,
    //             style: { color: "black", fontSize: 17, backgroundColor: "none" },
    //           }}
    //         />
    //         <Input
    //           label="Phone Number"
    //           textInputConfig={{
    //             keyboardType: "numeric",
    //             onChangeText: handleTextChange.bind(this, "phoneNumber"),
    //             placeholder: "###-###-####",
    //             maxLength: 12,
    //             value: inputValues.phoneNumber,
    //           }}
    //         />
    //       </View>
    //       <View style={styles.buttons}>
    //         <Button mode="flat" onPress={cancelHandler} style={styles.button}>
    //           Cancel
    //         </Button>
    //         <Button onPress={confirmHandler} style={styles.button}>
    //           Confirm
    //         </Button>
    //       </View>
    //   </SafeAreaView>
  );
}

export default ManageUserAddress;

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
