import { createContext, useState } from "react";

export const UserInputContext = createContext({
  email: "",
  passwordPlaceHolder: "",
  updateInputs: (inputIdentifier, enteredText) => {},
  resetInputs: () => {},
});

function UserInputContextProvider({ children }) {
  const [userInput, setUserInput] = useState({
    email: "",
    passwordPlaceholder: "",
    firstName: "",
    lastName: "",
    shopFor: "",
    ageRange: "",
  });

  // function updateCurrentUser(uid) {
  //   setCurrentUser(uid);
  // }

  function updateInputs(inputIdentifier, enteredText) {
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
    });
  }

  const value = {
    input: userInput,
    updateInputs: updateInputs,
    resetInput: resetInputs,
    // updateCurrentUser: updateCurrentUser,
  };

  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
}

export default UserInputContextProvider;
