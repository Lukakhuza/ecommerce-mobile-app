import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";

export const UserInputContext = createContext({
  email: "",
  passwordPlaceHolder: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  shopFor: "",
  ageRange: "",
  address: {
    addressLine1: "",
    city: "",
    state: "",
    zipcode: "",
  },
  cart: { items: [] },
  updateInputs: (inputIdentifier, enteredText) => {},
  resetInputs: () => {},
});

function UserInputContextProvider({ children }) {
  const authCtx = useContext(AuthContext);
  const [userInput, setUserInput] = useState({
    email: authCtx.authEmail ? authCtx.authEmail : "",
    passwordPlaceholder: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    shopFor: "",
    ageRange: "",
    address: {
      addressLine1: "",
      city: "",
      state: "",
      zipcode: "",
    },
    cart: {
      items: [],
    },
  });

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
      phoneNumber: "",
      shopFor: "",
      ageRange: "",
      address: {
        addressLine1: "",
        city: "",
        state: "",
        zipcode: "",
      },
      cart: {
        items: [],
      },
    });
  }

  const value = {
    input: userInput,
    updateInputs: updateInputs,
    resetInputs: resetInputs,
  };

  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
}

export default UserInputContextProvider;
