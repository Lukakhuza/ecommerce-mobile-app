import { createContext, useState } from "react";

export const UserInputContext = createContext({
  email: "",
  passwordPlaceHolder: "",
  updateInputs: () => {},
  resetInputs: () => {},
});

function UserInputContextProvider({ children }) {
  const [userInput, setUserInput] = useState({
    email: "",
    passwordPlaceholder: "",
    firstName: "",
    lastName: "",
  });

  function updateInputs(property, enteredText) {
    setUserInput((currInputValues) => {
      return {
        ...currInputValues,
        email: enteredText.email,
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
    updateInput: updateInputs,
    resetInput: resetInputs,
  };

  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
}

export default UserInputContextProvider;
