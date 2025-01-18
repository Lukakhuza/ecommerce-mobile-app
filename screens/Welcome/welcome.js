import { View, Text, StyleSheet } from "react-native";
import PurpleButton from "../../components/ui/PurpleButton";
import { AuthContext } from "../../store/context/auth-context";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../util/auth";

function Welcome() {
  const authCtx = useContext(AuthContext);
  const [fetchedUserData, setFetchedUserData] = useState([]);

  useEffect(() => {
    async function getUserData() {
      const userData = await fetchData();
      setFetchedUserData(userData);
    }

    getUserData();
  }, []);

  console.log(fetchedUserData);
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Text>You have been successfully Authenticated</Text>
      {/* <Text>{fetchedUserData}</Text> */}

      <PurpleButton onPress={authCtx.logout}>Log Out</PurpleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "yellow", flex: 1 },
});

export default Welcome;
