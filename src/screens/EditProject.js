import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  AlertIOS,
} from "react-native";
import React, { Component } from "react";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { showMessage, MessageBar } from "react-native-messages";
import { getAll, updateProject } from "../firebase";
import Avatar from "../components/Avatar";
import data from "../../assets/data.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tag from "../components/Tag";
import TagButton from "../components/TagButton";

export default class EditProject extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    this.state = {
      title: route.params.project.title,
      participants: route.params.project.participants,
      tags: route.params.project.tags,
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
    this.onPressDelete = this.onPressDelete.bind(this);
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
        if (this.state.participants.includes(newMember.id.toString())) {
          showMessage("Membre déjà présent dans le groupe", { duration: 3000 });
          return;
        }
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
    if (this.state.tags.includes(this.state.tag)) {
      return;
    }
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
  onPressDelete(label) {
    console.log(label);
    console.log(this.state.tags.filter((item) => item !== label));
    this.setState((prevState) => ({
      tags: prevState.tags.filter((item) => item !== label),
    }));
    console.log(this.state.tags);
  }
  onPressDeleteUser(label) {
    console.log(label);
    console.log(this.state.participants.filter((item) => item !== label));
    this.setState((prevState) => ({
      participants: prevState.participants.filter((item) => item !== label),
    }));
    console.log(this.state.participants);
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
    const { route } = this.props;
    const project = route.params.project;
    project.title = this.state.title;
    project.participants = this.state.participants;
    project.tags = this.state.tags;
    updateProject(project);
    this.props.navigation.navigate("Projets");
  }

  render() {
    const avatars = this.state.participants
      .map((id) => {
        const participant = data.members.find((member) => member.id === id);
        if (!participant) {
          return null;
        }
        return {
          id,
          label: participant.firstname[0],
          color: participant.favoriteColor,
        };
      })
      .filter(Boolean);
    const { route } = this.props;
    return (
      <View style={styles.project}>
        <MessageBar />
        <Text style={styles.title}>Nouveau projet</Text>
        <Text style={styles.subtitle}>Titre du projet</Text>
        <TextInput
          value={this.state.title}
          style={styles.itemInput}
          onChange={this.handleChange}
        />
        <Text style={styles.subtitle}>Tags</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChangeTags} />
        <Button title="ajouter un tag" onPress={this.onPressTag} />
        <View style={styles.tags}>
          {this.state.tags.map((label, index) => (
            <View key={index} style={styles.participant}>
              <TouchableOpacity onPress={() => this.onPressDelete(label)}>
                <TagButton label={label} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Text style={styles.subtitle}>Participants</Text>
        <TextInput
          style={styles.itemInput}
          onChange={this.handleChangeParticipants}
        />
        <Button title="ajouter un participant" onPress={this.onPress} />
        <View style={styles.participants}>
          {avatars.map(({ id, label, color }) => (
            <View key={id} style={styles.participant}>
              <TouchableOpacity
                onPress={() => this.onPressDeleteUser(id.toString())}
              >
                <Avatar label={label} color={color} size={75} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Commencer !</Text>
        </TouchableHighlight>
        <Button
          title="annuler"
          style={styles.buttonTextQuit}
          onPress={() => this.props.navigation.navigate("Projets")}
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
  avatar: {
    margin: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
    fontWeight: "700",
    fontStyle: "normal",
  },
  buttonTextQuit: {
    fontSize: 18,
    fontWeight: "700",
    fontStyle: "normal",
    color: "red",
    alignSelf: "center",
    backgroundColor: "white",
  },
  button: {
    height: 45,
    flexDirection: "row",
    backgroundColor: "#32B67A",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  quitButton: {
    size: 12,
    backgroundColor: "red",
    height: 45,
    borderRadius: 8,
  },
  tags: {
    flexDirection: "row",
  },
  participants: {
    flexDirection: "row",
  },
});
