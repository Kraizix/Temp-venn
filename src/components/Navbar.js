import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Avatar from "../components/Avatar";

function Navbar({ color, label, navigation }) {
  const styles = createStyles({ color });
  const SIZE = 60;
  return (
    <View style={styles.container}>
      <Avatar label="" color={color} size={SIZE} />
      <Text style={styles.username}>{label}</Text>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
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
      paddingTop: 14,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: "#E8EAEA",
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
