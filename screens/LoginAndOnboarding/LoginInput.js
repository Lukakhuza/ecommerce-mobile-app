import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import PurpleButton from "../../components/ui/PurpleButton";
import { Colors } from "../../constants/colors";

import { useNavigation } from "@react-navigation/native";

function LoginInput({ title, input, subText, boldedText, onPress }) {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.inputsOuterContainer}>
        <View style={styles.signInInputContainer}>
          <View>
            <View>
              <TextInput
                placeholder={input}
                style={styles.textInput}
              ></TextInput>
            </View>
            <PurpleButton onPress={onPress}>Continue</PurpleButton>
            <Text>
              {subText} <Text style={styles.boldedText}>{boldedText} </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default LoginInput;

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
});
