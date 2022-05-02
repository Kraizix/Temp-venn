import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableHighlight,
  AlertIOS,
} from "react-native";
import React, { Component } from "react";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { showMessage, MessageBar } from "react-native-messages";
import { getAll } from "../firebase";
import Avatar from "../components/Avatar";
import data from "../../assets/data.json";

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      participants: [],
      tags: [],
      value: "",
      tag: "",
      error: false,
    };
    this.handleChange = this.handleChangeTitle.bind(this);
    this.handleChangeParticipants = this.handleChangeParticipants.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPressTag = this.onPressTag.bind(this);
  }
  onPress() {
    console.log(this.state.value);
    if (this.state.value.length > 0) {
      console.log("salut");
      const newMember = data.members.find(({ firstname, lastname }) => {
        const fullName = `(${firstname}|${lastname}) (${lastname}|${firstname})`;
        return this.state.value.match(new RegExp(fullName, "i"));
      });
      if (newMember) {
        this.setState((prevState) => ({
          participants: [...prevState.participants, newMember.id.toString()],
        }));
        this.setState({ value: "" });
        console.log(this.state.participants);
        showMessage("Participant ajouté !", {
          duration: 3000,
        });
      } else {
        this.setState({ error: true });
        showMessage("Participant non trouvé ...", { duration: 3000 });
      }
    }
  }
  onPressTag() {
    console.log(this.state.tags);
    if (this.state.tag.length > 0) {
      this.setState((prevState) => ({
        tags: [...prevState.tags, this.state.tag],
      }));
      this.setState({ tag: "" });
      console.log(this.state.tags);
      showMessage("Tag bien ajouté !", { duration: 3000 });
    }
  }
  handleChangeTitle(e) {
    this.setState({
      title: e.nativeEvent.text,
    });
  }
  handleChangeParticipants(e) {
    this.setState({ value: e.nativeEvent.text });
  }
  handleChangeTags(e) {
    this.setState({
      tag: e.nativeEvent.text,
    });
  }
  handleSubmit() {
    const docRef = addDoc(collection(db, "projects"), {
      title: this.state.title,
      participants: this.state.participants,
      tags: this.state.tags,
    });
  }

  render() {
    return (
      <View style={styles.project}>
        <MessageBar />
        <Text style={styles.title}>Nouveau projet</Text>
        <Text style={styles.subtitle}>Titre du projet</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChange} />
        <Text style={styles.subtitle}>Tags</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChangeTags} />
        <Button title="ajouter un tag" onPress={this.onPressTag} />
        <Text style={styles.subtitle}>Participants</Text>
        <TextInput
          style={styles.itemInput}
          onChange={this.handleChangeParticipants}
        />
        <Button title="ajouter un participant" onPress={this.onPress} />

        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Commencer !</Text>
        </TouchableHighlight>
        <Button
          title="annuler"
          onPress={() => this.props.navigation.navigate("Accueil")}
          style={styles.buttonTextQuit}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
  project: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "white",
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    color: "black",
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  subtitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center",
  },
  buttonTextQuit: {
    fontSize: 18,
    color: "red",
    alignSelf: "center",
  },
  button: {
    height: 45,
    flexDirection: "row",
    backgroundColor: "#18F1F7",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
});
