import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or use react-native-vector-icons
import { useRoute } from "@react-navigation/native";
const Header: React.FC<{ navigation: any }> = ({ navigation }) => {
 const route = useRoute();
  return (
    <View style={styles.headerView}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIcon}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity> 
      <Text style={styles.textHeader}>{route.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: "purple",
    width: "100%", 
    padding: 12,
    paddingTop: 40,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 10,
    marginLeft: 16
  },
  textHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 22
  },
});

export default Header;