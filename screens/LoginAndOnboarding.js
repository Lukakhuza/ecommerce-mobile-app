import { View, Text, StyleSheet, TextInput } from "react-native";

function LoginAndOnboarding() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Sign in</Text>
      </View>
      <View style={styles.signInInputContainer}>
        <View>
          <TextInput></TextInput>
        </View>
      </View>
    </View>
  );
}

export default LoginAndOnboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    fontFamily: "Circular-Std",
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 34.5,
    letterSpacing: -0.41,
  },
  textContainer: {
    top: 153,
    left: 27,
  },
  signInInputContainer: {
    borderColor: "black",
    borderWidth: 5,
    margin: 6,
    width: 344,
    height: 152,
    top: 190,
    left: 23,
  },
});
