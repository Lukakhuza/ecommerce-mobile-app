import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Image } from "react-native";

function Button2({ children, onPress, style }) {
  return (
    <Pressable style={[style, styles.button]} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/google-logo.png")}
        />
      </View>
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button2;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.bgLight2,
    height: 49,
    borderRadius: 100,
    marginTop: 12.15,
    marginBottom: 12.15,
    paddingVertical: 11,
    paddingHorizontal: 48.6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // alignContent: "flex-end",
  },
  text: {
    fontSize: 16,
    // fontFamily: "Circular-Std",
    fontWeight: 500,
    // lineHeight: 26.73,
    color: Colors.black100,
    textAlign: "center",
    justifyContent: "center",
  },
  image: {
    height: 20,
    width: 20,
  },
  imageContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
});
