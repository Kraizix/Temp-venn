import QRCode from "react-native-qrcode-svg";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Navbar from "../components/Navbar";

function Camera({ navigation, route }) {
  let data = `[{"HEADER": "EXPO1337"},{"firstname": "${route.params.member.firstname}", "lastname": "${route.params.member.lastname}"}]`;

  return (
    <View>
      <Navbar
        label={`${route.params.member.firstname} ${route.params.member.lastname}`}
        color={route.params.member.favoriteColor}
        style={styles.navbar}
        navigation={navigation}
      />
      <View style={styles.container}>
        <Text>Ton QR Code :</Text>
        <QRCode value={data} />
      </View>
    </View>
  );
}

export default Camera;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
