import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";

import { getAll } from "../firebase";
import Avatar from "../components/Avatar";
import data from "../../assets/data.json";

function Projects() {
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
  const renderItem = ({ item }) => <Project {...item} />;
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

function Project({ title, participants }) {
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
      <Text style={styles.title}>{title}</Text>
      {avatars?.length > 0 && (
        <View style={styles.participants}>
          {avatars.map(({ id, label, color }) => (
            <View key={id} style={styles.participant}>
              <Avatar label={label} color={color} />
            </View>
          ))}
        </View>
      )}
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
    flexDirection: "row",
  },
  participant: {
    marginRight: 8,
  },
});

export default Projects;
