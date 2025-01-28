import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

function CartButton({ children, onPress, style }) {
  return (
    <Pressable
      style={({ pressed }) => [style, styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      {/* <Text>Hello</Text> */}
      <Ionicons name="cart-outline" size={30} />
      {/* <Text style={styles.text}>{children}</Text> */}
    </Pressable>
  );
}

export default CartButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: Colors.primary100,
    // height: 49,
    // borderRadius: 100,/
    // marginTop: 12.15,
    // marginBottom: 12.15,
    // paddingVertical: 11,
    // paddingHorizontal: 48.6,
    justifyContent: "center",
    alignItems: "center",
    // alignContent: "flex-end",
    borderRadius: 25,
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
  pressed: {
    opacity: 0.5,
  },
  white: {
    backgroundColor: Colors.bgLight2,
  },
  selected: {
    color: "black",
  },
});
