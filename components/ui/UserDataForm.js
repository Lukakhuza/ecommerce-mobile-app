import { useState } from "react";
import Input from "./Input";
import { View } from "react-native";

function UserDataForm() {
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setAmountValue((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  return (
    <View>
      <Input
        label="First Name"
        textInputConfig={{
          autoCapitalize: "sentences",
          onChangeText: inputChangedHandler.bind(this, "firstName"),
          value: inputValues.firstName,
        }}
      />
      <Input
        label="Last Name"
        autoCapitalize={{ autoCapitalize: "sentences" }}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "lastName"),
          value: inputValues.lastName,
        }}
      />
      <Input
        label="Phone Number"
        textInputConfig={{
          keyboardType: "numeric",
          onChangeText: inputChangedHandler.bind(this, "phoneNumber"),
          placeholder: "XXX-XXX-XXXX",
          maxLength: 12,
          value: inputValues.phoneNumber,
        }}
      />
    </View>
  );
}

export default UserDataForm;
