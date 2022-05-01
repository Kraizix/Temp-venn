import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Button from "../components/Button";

import { LinkPreview } from "@flyerhq/react-native-link-preview";

function AddUrl({ navigation, route }) {
  // form to add an url to a project
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const onChange = (text) => {
    setError("");
    setUrl(text);
  };
  const onChangeTitle = (text) => {
    setError("");
    setTitle(text);
  };
  const onPress = () => {
    if (url.length > 0) {
      setUrls([...urls, url]);
      setUrl("");
    } else {
      setError("Url is empty");
    }
  };
  const renderItem = ({ item }) => <Text>{item}</Text>;
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Nouveau Lien</Text>
        <Button title="Cancel" onPress={() => navigation.navigate("Projets")} />
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          value={url}
          onChangeText={onChange}
          placeholder="Url"
        />
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={onChangeTitle}
          placeholder="Titre"
        />
        <Text style={styles.error}>{error}</Text>
        <LinkPreview text={url} />
        <Button title="Ajouter" onPress={onPress} />
      </View>
    </View>
  );
}

export default AddUrl;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 32,
  },
  content: {
    flexGrow: 1,
    marginVertical: 32,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 48,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "white",
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 8,
  },
});
