import { createContext, useContext, useState } from "react";

export const UserInputContext = createContext({
  email: "",
  passwordPlaceHolder: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  shopFor: "",
  ageRange: "",
  updateInputs: (inputIdentifier, enteredText) => {},
  resetInputs: () => {},
});

function UserInputContextProvider({ children }) {
  const [userInput, setUserInput] = useState({
    email: "",
    passwordPlaceholder: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    shopFor: "",
    ageRange: "",
  });

  function updateInputs(inputIdentifier, enteredText) {
    console.log("Test 1:", inputIdentifier);
    console.log("Test 2:", enteredText);
    setUserInput((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredText,
      };
    });
  }

  function resetInputs() {
    setUserInput({
      email: "",
      passwordPlaceholder: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      shopFor: "",
      ageRange: "",
    });
  }

  const value = {
    input: userInput,
    updateInputs: updateInputs,
    resetInputs: resetInputs,
  };

  const userInputCtx = useContext(UserInputContext);
  console.log(userInputCtx);
  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
}

export default UserInputContextProvider;
