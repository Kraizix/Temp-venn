import { StyleSheet, Text, View } from "react-native";
import α from "color-alpha";

function Avatar({ color, label, size }) {
  const SIZE = size || 96;
  const styles = createStyles({ color, SIZE });
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default Avatar;

const createStyles = ({ color, SIZE }) =>
  StyleSheet.create({
    root: {
      height: SIZE,
      width: SIZE,
      backgroundColor: α(color, 0.1),
      borderColor: color,
      borderWidth: 4,
      borderStyle: "solid",
      borderRadius: SIZE / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontSize: 32,
      fontWeight: "700",
      color,
    },
  });
