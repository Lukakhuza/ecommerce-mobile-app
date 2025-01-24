import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function FavoriteIcon({ name, color, onPress, size, style }) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={name} color={color} size={size} style={style} />
    </Pressable>
  );
}

export default FavoriteIcon;

const styles = StyleSheet.create({});
