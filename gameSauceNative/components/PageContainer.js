import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Pressable } from "react-native";
import Homepage from "./pages/Homepage";
import Games from "./pages/Games";
// import SelectedGame from "./pages/SelectedGame";
// import Login from "./pages/LoginPage";
// import SignUp from "./pages/SignUpPage";

const Stack = createNativeStackNavigator();

export default function PageContainer() {
  return (
    <View style={style.page}>
      <View style={style.currentGame}>
        <Stack.Navigator
          screenOptions={{
            headerMode: "screen",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#43014f" },
          }}
        >
          <Stack.Screen name="Homepage" component={Homepage} />
          <Stack.Screen name="Games" component={Games} />
        </Stack.Navigator>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  page: {
    paddingTop: "5%",
    backgroundColor: "#3a0145",
    width: "100%",
    height: "100%",
  },
  currentGame: {
    height: "100%",
    backgroundColor: "#fff",
  },
});