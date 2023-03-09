import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Homepage from "./pages/Homepage";
import Games from "./pages/Games";

const Stack = createNativeStackNavigator();

export default function PageContainer() {
  const navigation = useNavigation();
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
        <View style={style.navContainer}>
          <View style={style.navbar}>
            <Icon.Button
              style={style.icon}
              name="games"
              size={60}
              onPress={() => navigation.navigate("Games")}
            >
              <Text style={style.iconText}>Games</Text>
            </Icon.Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  page: {
    paddingTop: "5%",
    backgroundColor: "#43014f",
    width: "100%",
    height: "100%",
  },
  currentGame: {
    height: "100%",
    backgroundColor: "#fff",
  },
  navContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    width: "100%",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    backgroundColor: "#00d4ff",
  },
  icon: {
    backgroundColor: "#00d4ff",
  },
  iconText: {
    color: "#fff",
    fontSize: 30,
  },
});