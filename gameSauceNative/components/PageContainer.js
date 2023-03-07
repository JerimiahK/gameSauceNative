import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavTabs from "./NavTabs";
import Homepage from "./pages/Homepage";
// import Games from "./pages/Games";
// import SelectedGame from "./pages/SelectedGame";
// import Login from "./pages/LoginPage";
// import SignUp from "./pages/SignUpPage";

const Stack = createNativeStackNavigator();

export default function PageContainer() {
  return (
    <div className="page">
      <NavTabs />
      <div id="currentGame" className="currentGame">
        <Stack.Navigator>
          <Stack.Screen 
          name="Homepage"
          component={Homepage}
          />
        </Stack.Navigator>
      </div>
    </div>
  );
}
