import { createContext, useContext, useEffect, useState } from "react";

export const UserInputContext = createContext({
  email: "",
  passwordPlaceHolder: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  shopFor: "",
  ageRange: "",
  addressLine1: "",
  city: "",
  state: "",
  zipcode: "",
  updateInputs: (inputIdentifier, enteredText) => {},
  updateAllInputs: () => {},
  resetInputs: () => {},
});

function UserInputContextProvider({ children }) {
  const [userInput, setUserInput] = useState({
    email: "",
    passwordPlaceholder: "",
    firstName: "LK",
    lastName: "Khuza",
    phoneNumber: "",
    shopFor: "",
    ageRange: "",
    addressLine1: "",
    city: "",
    state: "",
    zipcode: "",
  });
  // const result = fetchUserData("Lukakhuz778@test.com");
  // console.log("Result here is: ", result);
  // useEffect(() => {
  //   fetchUserData("Lukakhuz778@test.com")
  //     .then((result) => {
  //       console.log("Result 1: ", result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function updateInputs(inputIdentifier, enteredText) {
    setUserInput((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredText,
      };
    });
  }

  function updateAllInputs() {
    //   const result = fetchUserData();
    //   setUserInput((currInputValues) => {
    //     return {
    //       ...currInputValues,
    //       firstName: "LukaTest1",
    //     };
    //   });
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
      addressLine1: "",
      city: "",
      state: "",
      zipcode: "",
    });
  }

  const value = {
    input: userInput,
    updateInputs: updateInputs,
    updateAllInputs: updateAllInputs,
    resetInputs: resetInputs,
  };

  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
}

export default UserInputContextProvider;
