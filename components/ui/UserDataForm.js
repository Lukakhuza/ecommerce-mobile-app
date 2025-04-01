import { useState, useContext, useEffect } from "react";
import Input from "./Input";
import { View, Text } from "react-native";
import { UserInputContext } from "../../store/context/userInputContext";

function UserDataForm() {
  const userInputCtx = useContext(UserInputContext);

  // I need to raise the state management to the ManageUserData component.
  // const [inputValues, setInputValues] = useState({
  //   firstName: defaultValues
  //     ? defaultValues.defaultValues.firstName.toString()
  //     : "",
  //   lastName: defaultValues
  //     ? defaultValues.defaultValues.lastName.toString()
  //     : "",
  //   email: defaultValues ? defaultValues.defaultValues.email.toString() : "",
  //   phoneNumber: defaultValues
  //     ? defaultValues.defaultValues.phoneNumber.toString()
  //     : "",
  // });

  // console.log("Test 3", inputValues);
  // console.log("Test 4", userInputCtx.input.firstName);
  return (
    <View>
      <Input
        label="First Name"
        textInputConfig={{
          autoCapitalize: "sentences",
          autoCorrect: false,
          onChangeText: handleInputUpdate.bind(this, "firstName"),
          value: inputValues.firstName,
        }}
      />
      <Input
        label="Last Name"
        textInputConfig={{
          autoCapitalize: "sentences",
          autoCorrect: false,
          onChangeText: handleInputUpdate.bind(this, "lastName"),
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
          onChangeText: handleInputUpdate.bind(this, "phoneNumber"),
          placeholder: "###-###-####",
          maxLength: 12,
          value: inputValues.phoneNumber,
        }}
      />
    </View>
  );
}

export default UserDataForm;
