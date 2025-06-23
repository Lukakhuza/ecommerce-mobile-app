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
import ProductDetails from "./screens/ProductPage/ProductDetails";
import PasswordReset from "./screens/LoginAndOnboarding/PasswordReset";
import TellUsAboutYourself from "./screens/LoginAndOnboarding/TellUsAboutYourself";
import UserInputContextProvider, {
  UserInputContext,
} from "./store/context/userInputContext";
import AuthContextProvider, { AuthContext } from "./store/context/auth-context";
import FavoritesContextProvider, {
  FavoritesContext,
} from "./store/context/favoritesContext";
import ProductsContextProvider from "./store/context/productsContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Categories from "./screens/Welcome/Categories";
import Cart from "./screens/CartAndCheckout/Cart";
import ProfileSettings from "./screens/Settings/ProfileSettings";
import CategoriesSearchAndFilter from "./screens/SearchAndFilter/CategoriesSearchAndFilter";
import Notifications from "./screens/Notifications/Notifications";
import Orders from "./screens/Orders/Orders";
import ManageUserData from "./screens/ManageUserData";
import ManageUserAddress from "./screens/ManageUserAddress";
import Favorites from "./screens/ProductPage/Favorites";
import Payment from "./screens/Settings/Payment";
import { StripeProvider } from "@stripe/stripe-react-native";

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
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileSettings}
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
  const userInputCtx = useContext(UserInputContext);
  const authCtx = useContext(AuthContext);
  const favoritesCtx = useContext(FavoritesContext);
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
          userInputCtx.input.firstName = resData.user.firstName;
          userInputCtx.input.lastName = resData.user.lastName;
          userInputCtx.input.email = resData.user.email;
          userInputCtx.input.passwordPlaceholder = resData.user.password;
          userInputCtx.input.phoneNumber = resData.user.phoneNumber;
          userInputCtx.input.address = resData.user.address;
          userInputCtx.input.shopFor = resData.user.shopFor;
          userInputCtx.input.cart = resData.user.cart;
          // resData.user.cart.items[i]
          return resData.user;
        });
    }
  }
  fetchUserData();
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
        name="ProductDetails"
        component={ProductDetails}
        options={({ navigation, route }) => ({
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
          headerRight: ({ tintColor }) => (
            <IconButton
              icon={
                favoritesCtx.favorites.includes(route.params.product.id)
                  ? "heart"
                  : "heart-outline"
              }
              size={32}
              color={tintColor}
              onPress={() => {
                if (!favoritesCtx.favorites.includes(route.params.product.id)) {
                  favoritesCtx.addFavorite(route.params.product.id);
                } else {
                  favoritesCtx.removeFavorite(route.params.product.id);
                }
              }}
            />
          ),
        })}
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
      <Stack.Screen
        name="CategoriesSearchAndFilter"
        component={CategoriesSearchAndFilter}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
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
        name="ManageUserData"
        component={ManageUserData}
        options={{ presentation: "modal" }}
        // {({ navigation }) => ({
        //   title: "",
        //   headerTransparent: true,
        //   headerLeft: ({ tintColor }) => (
        //     <IconButton
        //       icon="chevron-back-circle-outline"
        //       size={32}
        //       color={tintColor}
        //       onPress={() => navigation.goBack()}
        //     />
        //   ),
        // })}
      />
      <Stack.Screen
        name="ManageUserAddress"
        component={ManageUserAddress}
        options={{ presentation: "modal" }}
        // {({ navigation }) => ({
        //   title: "",
        //   headerTransparent: true,
        //   headerLeft: ({ tintColor }) => (
        //     <IconButton
        //       icon="chevron-back-circle-outline"
        //       size={32}
        //       color={tintColor}
        //       onPress={() => navigation.goBack()}
        //     />
        //   ),
        // })}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          // headerShown: false,
          title: "Favorites",
          headerTitleStyle: { fontSize: 21 },
          presentation: "card",
          headerTransparent: true,
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="chevron-back-circle-outline"
              size={35}
              color="black"
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: "none" }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        // options={({ navigation }) => ({
        //   // headerShown: false,
        //   title: "Favorites",
        //   headerTitleStyle: { fontSize: 21 },
        //   presentation: "card",
        //   headerTransparent: true,
        //   headerLeft: ({ tintColor }) => (
        //     <IconButton
        //       icon="chevron-back-circle-outline"
        //       size={35}
        //       color="black"
        //       onPress={() => navigation.goBack()}
        //       style={{ backgroundColor: "none" }}
        //     />
        //   ),
        // })}
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
  const userInputCtx = useContext(UserInputContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedEmail = await AsyncStorage.getItem("authEmail");
      if (storedToken && storedEmail) {
        authCtx.authenticate(storedToken, storedEmail);
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
  const [publishableKey, setPublishableKey] = useState("");

  const fetchPublishableKey = async () => {
    fetch(
      "https://backend-ecommerce-mobile-app.onrender.com/auth/fetch-publishable-key"
    )
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setPublishableKey(resData.publishableKey);
        // console.log("Test 100", resData.publishableKey);
      });
    // const key = await fetch();
    // setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <StripeProvider
        publishableKey={publishableKey}
        merchantIdentifier="merchant.identifier"
        urlScheme="test-url-scheme"
      >
        <AuthContextProvider>
          <UserInputContextProvider>
            <FavoritesContextProvider>
              <ProductsContextProvider>
                <Root />
              </ProductsContextProvider>
            </FavoritesContextProvider>
          </UserInputContextProvider>
        </AuthContextProvider>
      </StripeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});
