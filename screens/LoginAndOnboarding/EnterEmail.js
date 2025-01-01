import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import PurpleButton from "../../components/ui/PurpleButton";
import Button2 from "../../components/ui/Button2";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function EnterEmail() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign in</Text>
      </View>
      <View style={styles.inputsOuterContainer}>
        <View style={styles.signInInputContainer}>
          <View>
            <View>
              <TextInput
                placeholder="Email Address"
                style={styles.textInput}
              ></TextInput>
            </View>
            <PurpleButton
              onPress={() => {
                navigation.navigate("EnterPassword");
              }}
            >
              Continue
            </PurpleButton>
            <Text>
              Don't have an account?{" "}
              <Text style={styles.boldedText}>Create One</Text>
            </Text>
          </View>
        </View>
        <View style={styles.buttons2}>
          <Button2>Continue with Apple</Button2>
          <Button2>Continue with Google</Button2>
          <Button2>Continue with Facebook</Button2>
        </View>
      </View>
    </ScrollView>
  );
}

export default EnterEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  inputsOuterContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Circular-Std",
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 34.5,
    letterSpacing: -0.41,
  },
  titleContainer: {
    top: 173,
    left: 35,
  },
  signInInputContainer: {
    margin: 6,
    // width: 410,
    height: 152,
    top: 190,
    // left: 23,
    // right: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: 360,
    height: 56,
    borderRadius: 4,
    backgroundColor: "#F4F4F4",
    paddingLeft: 10,
  },
  boldedText: {
    fontWeight: "600",
  },
  buttons2: {
    top: 250,
    flex: 1,
    flexDirection: "column",
    borderColor: "black",
    borderWidth: 2,
    width: "80%",
  },
});
