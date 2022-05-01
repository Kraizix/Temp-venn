import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";

import { getAll } from "../firebase";
import Avatar from "../components/Avatar";
import data from "../../assets/data.json";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Tag from "../components/Tag";

function ProjectDetails({ navigation, route }) {
  const avatars = route.params.project.participants
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
  return (
    <View style={styles.root}>
      <Navbar
        label={`${route.params.member.firstname} ${route.params.member.lastname}`}
        color={route.params.member.favoriteColor}
        style={styles.navbar}
        navigation={navigation}
      />
      <View>
        <View style={styles.title}>
          <Text style={styles.label}>{route.params.project.title}</Text>
          <View style={styles.tags}>
            {route.params.project.tags.map((label, index) => (
              <View key={index} style={styles.participant}>
                <Tag label={label} />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.participants}>
          {avatars.map(({ id, label, color }) => (
            <View key={id} style={styles.participant}>
              <Avatar label={label} color={color} size={75} />
            </View>
          ))}
        </View>
        <View style={styles.button}>
          <Button title="Modifier" />
        </View>
      </View>
      <View style={styles.footer}>
        <Button title="Ajouter un lien" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  participants: {
    margin: 5,
    flexDirection: "row",
  },
  participant: {
    margin: 5,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 26,
    fontWeight: "500",
    margin: 5,
    textAlign: "center",
  },
  footer: {
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    flexGrow: 1,
  },
  button: {
    width: 150,
    margin: 5,
  },
  tags: {
    flexDirection: "row",
  },
});

export default ProjectDetails;
