import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import member_data from "../../assets/data.json";

function Camera({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data) {
      let obj;
      try {
        obj = JSON.parse(data);
      } catch (e) {
        alert(`Unrecognized QR Code :(`);
        return;
      }
      if (obj[0].HEADER === "EXPO1337") {
        let value = `${obj[1].firstname} ${obj[1].lastname}`;
        const newMember = member_data.members.find(
          ({ firstname, lastname }) => {
            const fullName = `(${firstname}|${lastname}) (${lastname}|${firstname})`;
            return value.match(new RegExp(fullName, "i"));
          }
        );
        if (newMember) {
          navigation.navigate("Accueil", { member: newMember });
        }
      } else {
        alert(`Unrecognized QR code :(`);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
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
