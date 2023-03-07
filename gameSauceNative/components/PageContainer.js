import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import NavTabs from "./NavTabs";
import Homepage from "./pages/Homepage";
// import Games from "./pages/Games";
// import SelectedGame from "./pages/SelectedGame";
// import Login from "./pages/LoginPage";
// import SignUp from "./pages/SignUpPage";

const Stack = createNativeStackNavigator();

export default function PageContainer() {
  return (
    <View style={style.page}>
      <NavTabs />
      <View style={style.currentGame}>
        <Stack.Navigator>
          <Stack.Screen 
          name="Homepage"
          component={Homepage}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  page: {
    fontFamily: "'Rubik', sans-serif",
    paddingTop: "5%",
    backgroundColor: "#282828",
    width: "100%",
    height: "100%",
  },
  currentGame: {
    height: "100%",
    backgroundColor: "#282828",
  },
});