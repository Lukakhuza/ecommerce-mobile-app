import { StyleSheet } from "react-native";

function ProductsList({ items }) {
  <FlatList
    data={items}
    numColumns={1}
    renderItem={Item}
    keyExtractor={(item) => item.id}
  />;
}

export default ProductsList;

const styles = StyleSheet.create({});
