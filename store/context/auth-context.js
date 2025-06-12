import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  email: "",
  isAuthenticated: false,
  authenticate: (token, email) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [authEmail, setAuthEmail] = useState(null);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setAuthToken(storedToken);
      }
    }

    async function fetchEmail() {
      const storedEmail = await AsyncStorage.getItem("authEmail");
      if (storedEmail) {
        setAuthEmail(storedEmail);
      }
    }

    fetchToken();
    fetchEmail();
  }, []);

  function authenticate(token, email) {
    setAuthToken(token);
    setAuthEmail(email);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("authEmail", email);
  }

  function logout() {
    setAuthToken(null);
    // setAuthEmail(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("authEmail");
  }

  const value = {
    token: authToken,
    authEmail: authEmail,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
