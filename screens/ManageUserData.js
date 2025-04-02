import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../components/ui/Input";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import UserDataForm from "../components/ui/UserDataForm";
import { UserInputContext } from "../store/context/userInputContext";

function ManageUserData({ route, navigation }) {
  const userInputCtx = useContext(UserInputContext);
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

  // const editedUserDataBasicInfo = route.params?.basicInfo;
  // const isEditing = !!editedUserDataBasicInfo;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Basic Info",
    });
  }, [navigation]);

  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    userInputCtx.updateInputs("firstName", inputValues.firstName);
    userInputCtx.updateInputs("lastName", inputValues.lastName);
    userInputCtx.updateInputs("phoneNumber", inputValues.phoneNumber);
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
            value: inputValues.email,
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
