import { useState, useContext } from "react";
import Input from "./Input";
import { View, Text } from "react-native";
import { UserInputContext } from "../../store/context/userInputContext";

function UserDataForm() {
  const userInputCtx = useContext(UserInputContext);

  function handleInputUpdate(inputIdentifier, enteredText) {
    userInputCtx.updateInputs(inputIdentifier, enteredText);
  }

  return (
    <View>
      <Input
        label="First Name"
        textInputConfig={{
          autoCapitalize: "sentences",
          onChangeText: handleInputUpdate.bind(this, "firstName"),
          value: userInputCtx.input.firstName,
        }}
      />
      <Input
        label="Last Name"
        autoCapitalize={{ autoCapitalize: "sentences" }}
        textInputConfig={{
          onChangeText: handleInputUpdate.bind(this, "lastName"),
          value: userInputCtx.input.lastName,
        }}
      />
      <Input
        label="Email Address"
        textInputConfig={{
          editable: false,
          placeholder: "XXX-XXX-XXXX",
          maxLength: 12,
          value: userInputCtx.input.email,
          style: { color: "black", fontSize: 17, backgroundColor: "none" },
        }}
      />
      <Input
        label="Phone Number"
        textInputConfig={{
          keyboardType: "numeric",
          onChangeText: handleInputUpdate.bind(this, "phoneNumber"),
          placeholder: "XXX-XXX-XXXX",
          maxLength: 12,
          value: userInputCtx.input.phoneNumber,
        }}
      />
    </View>
  );
}

export default UserDataForm;
