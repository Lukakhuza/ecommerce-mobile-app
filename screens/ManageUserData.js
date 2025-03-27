import { useLayoutEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";

function ManageUserData({ route, navigation }) {
  const editedUserDataBasicInfo = route.params?.basicInfo;
  const isEditing = !!editedUserDataBasicInfo;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Basic Info" : "Add Other Info",
    });
  }, [navigation, isEditing]);

  return (
    <SafeAreaView>
      <View>
        <Text>Manage User Data Screen</Text>
      </View>
    </SafeAreaView>
  );
}

export default ManageUserData;
