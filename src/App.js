import { registerRootComponent } from "expo";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Members from "./screens/Members";
import Identification from "./screens/Identification";
import Camera from "./screens/Camera";
import Generate from "./screens/Generate";
import Home from "./screens/Home";
import ProjectDetails from "./screens/ProjectDetails";
import Projects from "./screens/Projects";
import AddUrl from "./screens/AddUrl";
import CreateProject from "./screens/CreateProject";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <View style={styles.container}>
    //   <Identification />
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Identification" component={Identification} />
        <Stack.Screen name="Members" component={Members} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Generate" component={Generate} />
        <Stack.Screen name="Accueil" component={Home} />
        <Stack.Screen name="Projects" component={Projects} />
        <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
        <Stack.Screen name="Url" component={AddUrl} />
        <Stack.Screen name="CreateProject" component={CreateProject} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
