import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnterEmail from "./screens/LoginAndOnboarding/EnterEmail";
import EnterPassword from "./screens/LoginAndOnboarding/EnterPassword";
import CreateAccount from "./screens/LoginAndOnboarding/CreateAccount";
import IconButton from "./components/ui/IconButton";
import ForgotPassword from "./screens/LoginAndOnboarding/ForgotPassword";
import PasswordReset from "./screens/LoginAndOnboarding/PasswordReset";
import TellUsAboutYourself from "./screens/LoginAndOnboarding/TellUsAboutYourself";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const Stack = createNativeStackNavigator();

  const [loaded, error] = useFonts({
    "Circular-Std": require("./assets/fonts/circular-std-medium-500.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [!loaded && !error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="EnterEmail">
          <Stack.Screen
            name="EnterEmail"
            component={EnterEmail}
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
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
