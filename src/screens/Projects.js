import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import { getAll } from "../firebase";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import data from "../../assets/data.json";
import Tag from "../components/Tag";

function Projects({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const getProjects = async () => {
    try {
      setProjects(await getAll("projects"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  if (loading) {
    return (
      <View style={styles.root}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (projects.length === 0) {
    return (
      <View style={styles.root}>
        <Text>Pas de projet.</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <Project
      title={item.title}
      participants={item.participants}
      navigation={navigation}
      route={route}
      tags={item.tags}
    />
  );
  return (
    <View style={styles.root}>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(project) => project.id}
      />
    </View>
  );
}

function Project({ title, participants, tags, navigation, route }) {
  const NavigateToProjectDetails = () => {
    navigation.navigate("ProjectDetails", {
      project: { title, participants, tags },
      member: route.params.member,
    });
  };
  const avatars = participants
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
    <View style={styles.project}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.tags}>
          {tags.map((label, index) => (
            <View key={index} style={styles.participant}>
              <Tag label={label} />
            </View>
          ))}
        </View>
      </View>
      {avatars?.length > 0 && (
        <View style={styles.participants}>
          {avatars.slice(0, 3).map(({ id, label, color }) => (
            <View key={id} style={styles.participant}>
              <Avatar label={label} color={color} size={70} />
            </View>
          ))}
          {avatars?.length > 3 && (
            <View style={styles.count}>
              <Text>+ {avatars.length - 3} autres</Text>
            </View>
          )}
        </View>
      )}
      <Button title="Voir Projet" onPress={NavigateToProjectDetails} />
    </View>
  );
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
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  participants: {
    marginBottom: 5,
    flexDirection: "row",
  },
  participant: {
    marginRight: 8,
  },
  container: {
    flexDirection: "row",
  },
  tags: {
    flexDirection: "row",
  },
  count: {
    justifyContent: "center",
  },
});

export default Projects;
