import { View, Text, StyleSheet, Button } from "react-native";

export default function NavTabs() {
  
return (
  <View style={style.navContainer}>
    <View>
      <Text style={style.navbarText}>GameSauce</Text>
    </View>
    <View style={style.headerButtons}>
      <Button title="Home" color="#0033a0"/>
      <Button title="Games" color="#0033a0"/>
      <Button title="Login" color="#0033a0"/>
    </View>
  </View>
);
}

const style = StyleSheet.create({
  navContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00d4ff",
  },
  navbarText: {
    paddingLeft: "5%",
    color: "#c8102e",
    fontSize: "40%",
    fontWeight: "700",
  },
  headerButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "5%",
  },
});