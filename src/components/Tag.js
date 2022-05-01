import { StyleSheet, Text, View } from "react-native";
import α from "color-alpha";

function Tag({ label }) {
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };
  const color = generateColor();
  const SIZE = 65;
  const styles = createStyles({ color, SIZE });
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default Tag;

const createStyles = ({ color, SIZE }) =>
  StyleSheet.create({
    root: {
      height: SIZE / 2,
      width: SIZE,
      backgroundColor: α(color, 0.1),
      borderColor: color,
      borderWidth: 2,
      borderStyle: "solid",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 3,
    },
    label: {
      fontSize: 14,
      fontWeight: "700",
      color,
    },
  });
