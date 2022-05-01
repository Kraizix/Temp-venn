// import { registerRootComponent } from "expo";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View } from "react-native";

// import Members from "./screens/Members";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Members />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// registerRootComponent(App);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Members from "./screens/Members";
import Identification from "./screens/Identification";
import Camera from "./screens/Camera";
import Generate from "./screens/Generate";
import Home from "./screens/Home";
import AddUrl from "./screens/AddUrl";

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
        <Stack.Screen name="Url" component={AddUrl} />
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
