import QRCode from "react-native-qrcode-svg";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

function Camera({ navigation, route }) {
  let data = `[{"HEADER": "EXPO1337"},{"firstname": "${route.params.member.firstname}", "lastname": "${route.params.member.lastname}"}]`;

  return (
    <View style={styles.container}>
      <Text>Ton QR Code :</Text>
      <QRCode value={data} />
    </View>
  );
}

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
