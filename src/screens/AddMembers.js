import { useContext, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  Text,
} from "react-native";
import { showMessage, MessageBar } from "react-native-messages";

import data from "../../assets/data.json";
import Avatar from "../components/Avatar";
import Button from "../components/Button";

function AddMembers({ navigation }) {
  const [valueP, setValueP] = useState("");
  const [valueN, setValueN] = useState("");
  const [valueC, setValueC] = useState("");

  const onChangeP = (text) => {
    setValueP(text);
  };
  const onChangeN = (text) => {
    setValueN(text);
  };
  const onChangeC = (text) => {
    setValueC(text);
  };
  const onNavigateToMembers = (member) => {
    navigation.navigate("Membres", { paramPropKey: member });
  };
  const onPress = () => {
    if (valueP.length > 0 && valueN.length > 0 && valueC.length > 0) {
      const value = `${valueP} ${valueN}`;
      const newMember = data.members.find(({ firstname, lastname }) => {
        const fullName = `(${firstname}|${lastname}) (${lastname}|${firstname})`;
        return value.match(new RegExp(fullName, "i"));
      });

      if (newMember) {
        showMessage("Membre déjà présent", { duration: 3000 });
      } else {
        data.members.push({
          firstname: valueP,
          lastname: valueN,
          favoriteColor: valueC,
        });
        showMessage({
          message: "Le membre a été ajouté avec succès",
          type: "success",
          duration: 2000,
        });
        onNavigateToMembers(data.members.length);
      }
    }
  };
  return (
    <View style={styles.root}>
      <MessageBar />
      <View style={styles.content}>
        <MessageBar />
        <Text style={styles.title}>Ajouter un membre</Text>
        <TextInput
          placeholder="Prénom"
          style={styles.input}
          value={valueP}
          onChangeText={onChangeP}
        />
        <TextInput
          placeholder="Nom"
          style={styles.input}
          value={valueN}
          onChangeText={onChangeN}
        />
        <TextInput
          placeholder="Couleur"
          style={styles.input}
          value={valueC}
          onChangeText={onChangeC}
        />
        <Button title="Ajouter" onPress={onPress} />
        <Button title="Accueil" onPress={onNavigateToMembers} />
      </View>
    </View>
  );
}

export default AddMembers;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  content: {
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  input: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    width: Dimensions.get("window").width - 1200,
    fontSize: 20,
    fontWeight: "700",
    fontColor: "black",
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
});
