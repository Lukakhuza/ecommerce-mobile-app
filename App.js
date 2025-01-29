import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnterEmail from "./screens/LoginAndOnboarding/EnterEmail";
import EnterPassword from "./screens/LoginAndOnboarding/EnterPassword";
import Welcome from "./screens/Welcome/welcome";
import HomePage from "./screens/Welcome/HomePage";
import CreateAccount from "./screens/LoginAndOnboarding/CreateAccount";
import IconButton from "./components/ui/IconButton";
import ForgotPassword from "./screens/LoginAndOnboarding/ForgotPassword";
import PasswordReset from "./screens/LoginAndOnboarding/PasswordReset";
import TellUsAboutYourself from "./screens/LoginAndOnboarding/TellUsAboutYourself";
import UserInputContextProvider from "./store/context/userInputContext";
import AuthContextProvider, { AuthContext } from "./store/context/auth-context";
import FavoritesContextProvider from "./store/context/favoritesContext";
import ProductsContextProvider from "./store/context/productsContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Categories from "./screens/Welcome/Categories";
// import AppLoading from "expo-app-loading";
// import Test2 from "./screens/LoginAndOnboarding/Test2";
// import HomePage

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const BottomTabs = createBottomTabNavigator();

function TabsOverview() {
  return (
    <BottomTabs.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabs.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Notifications"
        component={EnterPassword}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Orders"
        component={EnterPassword}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={EnterPassword}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthStack() {
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
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={TabsOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name="CategoriesList"
        component={Categories}
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
  return (
    <NavigationContainer style={styles.container}>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingToLogin, setIsTryingToLogin] = useState(true);

  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingToLogin(false);
    }

    SplashScreen.hide();
    fetchToken();
  }, []);

  if (isTryingToLogin) {
    return null;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <UserInputContextProvider>
          <FavoritesContextProvider>
            <ProductsContextProvider>
              <Root />
            </ProductsContextProvider>
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
