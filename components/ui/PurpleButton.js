import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

function PurpleButton({ children, onPress, style }) {
  return (
    <Pressable style={[style, styles.button]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default PurpleButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary100,
    height: 49,
    borderRadius: 100,
    marginTop: 12.15,
    marginBottom: 12.15,
    paddingVertical: 11,
    paddingHorizontal: 48.6,
    justifyContent: "center",
    alignItems: "center",
    // alignContent: "flex-end",
  },
  text: {
    fontSize: 16,
    // fontFamily: "Circular-Std",
    fontWeight: 500,
    // lineHeight: 26.73,
    color: Colors.white100,
    textAlign: "center",
    justifyContent: "center",
  },
});
