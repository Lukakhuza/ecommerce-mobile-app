import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnterEmail from "./screens/LoginAndOnboarding/EnterEmail";
import EnterPassword from "./screens/LoginAndOnboarding/EnterPassword";
import Welcome from "./screens/Welcome/welcome";
import CreateAccount from "./screens/LoginAndOnboarding/CreateAccount";
import IconButton from "./components/ui/IconButton";
import ForgotPassword from "./screens/LoginAndOnboarding/ForgotPassword";
import PasswordReset from "./screens/LoginAndOnboarding/PasswordReset";
import TellUsAboutYourself from "./screens/LoginAndOnboarding/TellUsAboutYourself";
import UserInputContextProvider from "./store/context/userInputContext";
import AuthContextProvider, { AuthContext } from "./store/context/auth-context";
import FavoritesContextProvider from "./store/context/favoritesContext";
// import Test2 from "./screens/LoginAndOnboarding/Test2";

// SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function AuthStack() {
  // const [loaded, error] = useFonts({
  //   "Circular-Std": require("./assets/fonts/circular-std-medium-500.ttf"),
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [!loaded && !error]);

  // if (!loaded && !error) {
  //   return null;
  // }

  return (
    <Stack.Navigator initialRouteName="EnterEmail">
      <Stack.Screen
        name="EnterEmail"
        component={EnterEmail}
        // initialParams={{
        // value: userInput.email,
        //   textInputConfig={{
        //     onChangeText: ()=>{}
        //   }}
        // }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EnterPassword"
        component={EnterPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={({ navigation }) => ({
          title: "",
          headerTransparent: true,
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="chevron-back-circle-outline"
              size={32}
              color={tintColor}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={({ navigation }) => ({
          title: "",
          headerTransparent: true,
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="chevron-back-circle-outline"
              size={32}
              color={tintColor}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordReset}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TellUsAboutYourself"
        component={TellUsAboutYourself}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={({ navigation }) => ({
          title: "",
          headerTransparent: true,
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="chevron-back-circle-outline"
              size={32}
              color={tintColor}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  // console.log(authCtx.isAuthenticated);
  // console.log(authCtx.token);
  // console.log(authCtx);
  return (
    <NavigationContainer style={styles.container}>
      {/* {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />} */}
      <AuthenticatedStack />
    </NavigationContainer>
  );
}

export default function App() {
  // const [userInput, setUserInput] = useState({
  //   email: "",
  //   passwordPlaceholder: "",
  //   firstName: "",
  //   lastName: "",
  // });

  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <UserInputContextProvider>
          <FavoritesContextProvider>
            <Navigation />
          </FavoritesContextProvider>
        </UserInputContextProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "orange",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
