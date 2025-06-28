import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  styles,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { useStripe } from "@stripe/stripe-react-native";

function Checkout({ navigation }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  console.log("Test 1");

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      "https://backend-ecommerce-mobile-app.onrender.com/product/payment-sheet",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "My Company",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Luka Khuza",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);
  return (
    <SafeAreaView>
      <Button
        variant="primary"
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </SafeAreaView>
  );
}

export default Checkout;
