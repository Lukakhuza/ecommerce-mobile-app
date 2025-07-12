import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AuthContext } from "./auth-context";

const userEmptyData = {};

export const UserInputContext: any = createContext({
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
  updateInputs: (inputIdentifier: any, enteredText: string) => {},
  resetInputs: () => {},
});

type Props = {
  children: ReactNode;
};

function UserInputContextProvider({ children }: Props) {
  const authCtx: any = useContext(AuthContext);
  const [userInput, setUserInput] = useState({
    email: authCtx.authEmail ?? "",
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
    cart: { items: [] },
  });

  useEffect(() => {
    async function fetchUserData() {
      const userData = {
        email: authCtx.authEmail,
      };
      if (authCtx.authEmail) {
        fetch(
          "https://backend-ecommerce-mobile-app.onrender.com/user/get-user-by-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((resData) => {
            console.log("Test 11", resData);
          });
      }
    }
    fetchUserData();
  }, [authCtx.authEmail]);

  function updateInputs(inputIdentifier: any, enteredText: string) {
    console.log("Test 50");
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
      cart: { items: [] },
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
