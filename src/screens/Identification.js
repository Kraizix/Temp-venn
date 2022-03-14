import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import app from "../../app.json";
import data from "../../assets/data.json";
import Avatar from "../components/Avatar";
import Button from "../components/Button";

function Identification({ navigation }) {
  const [value, setValue] = useState("");
  const [member, setMember] = useState(null);
  const [error, setError] = useState(false);
  const onChange = (text) => {
    setError(false);
    setValue(text);
  };
  const onPress = () => {
    if (value.length > 0) {
      const newMember = data.members.find(({ firstname, lastname }) => {
        const fullName = `(${firstname}|${lastname}) (${lastname}|${firstname})`;
        return value.match(new RegExp(fullName, "i"));
      });
      if (newMember) {
        setMember(newMember);
      } else {
        setError(true);
      }
    }
  };
  const styles = createStyles({
    member: Boolean(member),
    error,
    color: member?.favoriteColor,
  });
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>{app.expo.name}</Text>
        <Image source={require("../../assets/icon.png")} style={styles.logo} />
      </View>
      <View style={styles.content}>
        {member ? (
          <>
            <Avatar color={member.favoriteColor} label={member.firstname[0]} />
            <Text style={styles.greetings}>
              Bienvenu·e {member.firstname} {member.lastname} !
            </Text>
            <Button
              title="Go to Members"
              onPress={() => navigation.navigate("Members", { member: member })}
            />
          </>
        ) : (
          <View>
            <TextInput
              placeholder="Identifiant"
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
            {error && (
              <Text style={styles.error}>
                Désolé, tu n'es pas enregistré·e.
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.footer}>
        {!member &&
          (error ? (
            <Button title="S'enregistrer" />
          ) : (
            <Button title="S'identifier" onPress={onPress} />
          ))}
      </View>
    </View>
  );
}

export default Identification;

const createStyles = ({ member, error, color }) =>
  StyleSheet.create({
    root: {
      height: "100%",
      width: "100%",
      justifyContent: "center",
    },
    header: {
      flexDirection: member ? "row" : "column",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    content: {
      flexGrow: member ? 1 : 0,
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 32,
    },
    title: {
      fontSize: member ? 16 : 32,
      fontWeight: "700",
    },
    logo: {
      height: member ? 64 : 192,
      width: member ? 64 : 192,
    },
    greetings: {
      color,
      fontSize: 32,
      fontWeight: "700",
    },
    input: {
      borderColor: error ? "red" : "black",
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
      width: Dimensions.get("window").width - 64,
      fontSize: 20,
      fontWeight: "700",
      marginVertical: 8,
    },
    error: {
      color: "red",
    },
  });
