import { useContext } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Members from "./Members";
import Projects from "./Projects";
import AddUrl from "./AddUrl";

const Tab = createBottomTabNavigator();

function Home({ navigation, route }) {
  const color = "black";
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: color,
        tabBarStyle: styles.tabBar,
        headerTitleStyle: styles.title,
      }}
    >
      <Tab.Screen
        name="Projets"
        component={Projects}
        initialParams={{ member: route.params.member }}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="briefcase-account" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Membres"
        component={Members}
        initialParams={{ member: route.params.member }}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="account-multiple" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 20,
    fontWeight: "700",
    height: 32,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  tabBar: {
    height: 72,
  },
});

export default Home;
