import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import data from "../../assets/data.json";
import Avatar from "../components/Avatar";
import Navbar from "../components/Navbar";

function Members({ navigation, route }) {
  return (
    <View>
      <Navbar
        label={`${route.params.member.firstname} ${route.params.member.lastname}`}
        color={route.params.member.favoriteColor}
        style={styles.navbar}
        navigation={navigation}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Generate", { member: route.params.member })
        }
        style={styles.button}
      >
        <Text style={styles.label}>Générer un QRCode</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.list}>
        {data.members.map((member) => (
          <View
            style={styles.avatar}
            key={`${member.firstname}${member.lastname}`}
          >
            <Avatar
              label={member.firstname[0].toLocaleUpperCase()}
              color={member.favoriteColor}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.label}>Inviter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Members;

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "rgb(245, 245, 245)",
  },
  avatar: {
    margin: 8,
  },
  footer: {
    backgroundColor: "white",
    padding: 16,
  },
  button: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
