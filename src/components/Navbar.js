import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Avatar from "../components/Avatar";

function Navbar({ color, label, navigation }) {
  const styles = createStyles({ color });
  const SIZE = 60;
  return (
    <View style={styles.container}>
      <Avatar label="" color={color} size={SIZE} />
      <Text style={styles.username}>{label}</Text>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => navigation.navigate("Camera")}
      >
        <Image source={require("../../assets/icon.png")} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
}
export default Navbar;

const createStyles = ({ color }) =>
  StyleSheet.create({
    logo: {
      height: 60,
      width: 60,
      marginLeft: "auto",
    },
    container: {
      alignItems: "center",
      flexDirection: "row",
      marginTop: 14,
      marginLeft: 10,
      marginRight: 10,
    },
    username: {
      fontSize: 25,
      color,
      padding: 15,
    },
    touch: {
      marginLeft: "auto",
    },
  });
