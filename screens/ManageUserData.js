import { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import UserDataForm from "../components/ui/UserDataForm";

function ManageUserData({ route, navigation }) {
  function handleInputUpdate(inputIdentifier, enteredText) {
    userInputCtx.updateInputs(inputIdentifier, enteredText);
  }
  const editedUserDataBasicInfo = route.params?.basicInfo;
  const isEditing = !!editedUserDataBasicInfo;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Basic Info" : "Add Other Info",
    });
  }, [navigation, isEditing]);

  function deleteInfoHandler() {
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <UserDataForm />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Confirm"}
        </Button>
      </View>
      <View style={styles.deleteContainer}>
        {!isEditing && (
          <IconButton
            icon="trash"
            size={32}
            color="black"
            onPress={deleteInfoHandler}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default ManageUserData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    color: "purple",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginTop: 20,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "lightpurple",
    alignItems: "center",
  },
});
