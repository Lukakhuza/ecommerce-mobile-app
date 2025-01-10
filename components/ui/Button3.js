import { Pressable, StyleSheet, Text, View } from "react-native";

function Button3({ children, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button3;

const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
});
