import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Image } from "react-native";

type Props = {
  children: any;
  onPress: any;
  style: object;
  imageSource: object;
};

function Button2({ children, onPress, style, imageSource }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [style, styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSource} />
      </View>
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
      <View></View>
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
    // paddingVertical: 11,
    paddingRight: 48.6,
    paddingLeft: 15,
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
    margin: 0,
  },
  imageContainer: {
    flexDirection: "row",
  },
  pressed: {
    // opacity: 0.5,
    backgroundColor: Colors.primary100,
    color: "white",
  },
});
