import React from "react";
import ProgressBar from "../components/ProgressBar";
import { View, Text, StyleSheet } from "react-native";
import { useLevelContext } from '../components/LevelContextProvider';

export const ProfilePage = () => {
  const { level, xp, totalXp, gainXp } = useLevelContext();

  return (
    <View style={styles.container}> 
      <ProgressBar currentXp={xp} totalXp={totalXp} />
      <View style={styles.textContainer}>
        <Text>This is the profile page </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  textContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
