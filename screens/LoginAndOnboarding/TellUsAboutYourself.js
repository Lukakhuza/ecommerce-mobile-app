import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useState, useContext } from "react";
import PurpleButton from "../../components/ui/PurpleButton";
import { UserInputContext } from "../../store/context/userInputContext";
import { Colors } from "../../constants/colors";
import { Dropdown } from "react-native-element-dropdown";
import DropdownComponent from "../../components/ui/Dropdown";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
];

function TellUsAboutYourself({ navigation }) {
  const userInputCtx = useContext(UserInputContext);
  const [selection, setSelection] = useState("");
  const [ageRange, setAgeRange] = useState("");
  function handleInputUpdate(inputIdentifier, enteredText) {
    userInputCtx.updateInputs(inputIdentifier, enteredText);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.innerContainer}>
        <View>
          <Text style={styles.text1}>Tell us about yourself</Text>
        </View>
        <View>
          <Text style={styles.text2}>Who do you shop for?</Text>
          <View style={styles.genders}>
            <PurpleButton
              style={styles.male}
              mode={selection === "men" ? "selected" : ""}
              onPress={() => {
                if (selection === "men") {
                  setSelection("");
                  userInputCtx.updateInputs("shopFor", "");
                } else {
                  setSelection("men");
                  userInputCtx.updateInputs("shopFor", "men");
                }
              }}
            >
              Men
            </PurpleButton>
            <PurpleButton
              style={styles.female}
              mode={selection === "women" ? "selected" : ""}
              onPress={() => {
                if (selection === "women") {
                  setSelection("");
                  userInputCtx.updateInputs("shopFor", "");
                } else {
                  setSelection("women");
                  userInputCtx.updateInputs("shopFor", "women");
                }
              }}
            >
              Women
            </PurpleButton>
          </View>
        </View>
        <View>
          <Text style={styles.text2}>How old are you?</Text>
        </View>
        <View>
          <DropdownComponent
            style={styles.dropdown}
            value={ageRange}
            // onChangeText={handleInputUpdate.bind(this, "ageRange")}
            onChange={(item) => {
              setAgeRange(item.value);
              userInputCtx.updateInputs("ageRange", item.value);
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <PurpleButton style={styles.button}>Finish</PurpleButton>
      </View>
    </View>
  );
}

export default TellUsAboutYourself;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  innerContainer: {
    // top: 3,
    // marginTop: 150,
    // marginBottom: 200,
    // left: 30,
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
  },
  selected: {
    backgroundColor: "yellow",
  },
  //   subcontainer: {
  //     // marginBottom: 100,
  //     // height: 100,
  //   },
  text1: {
    fontFamily: "Circular-Std",
    fontWeight: 700,
    marginBottom: 50,
    marginLeft: 20,
    marginTop: 200,
    textAlign: "left",
    fontSize: 28,
  },
  text2: {
    fontFamily: "Circular-Std",
    fontWeight: 400,
    fontSize: 17,
    marginLeft: 30,
    marginVertical: 10,
  },
  //   text3: {
  //     fontFamily: "Circular-Std",
  //     fontWeight: 400,
  //     fontSize: 17,
  //     marginLeft: 30,
  //     marginVertical: 10,
  //   },
  genders: {
    // flex: 1,
    // marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    // margin: 10,
    // borderColor: "black",
    // borderWidth: 3,
    marginBottom: 30,
  },
  male: {
    width: "40%",
    // marginRight: 10,
    marginLeft: 15,
  },
  female: {
    width: "40%",
    // marginLeft: 10,
    marginRight: 15,
  },
  dropdown: {
    margin: 100,
    // borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 15,
    margin: 16,
    height: 60,
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    // borderBottomColor: "gray",
    // borderBottomWidth: 0.5,
  },
  //   //   textContainer: {
  //   //     top: 180,
  //   //     left: 27,
  //   //   },
  footer: {
    backgroundColor: Colors.bgLight2,
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    width: "70%",
  },
});
