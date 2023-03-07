import { registerRootComponent } from "expo";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import PageContainer from "./components/PageContainer";

export default function App() {
  return (
    <NavigationContainer>
      <PageContainer />
    </NavigationContainer>
  );
}

registerRootComponent(App);