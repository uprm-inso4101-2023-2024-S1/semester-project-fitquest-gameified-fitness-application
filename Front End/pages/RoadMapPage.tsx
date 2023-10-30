import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import ProgressBar from "../components/ProgressBar";
import { useLevelContext } from '../components/LevelContextProvider';

export const RoadMapPage = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.roadMapContainer}>
        <Button
          title="Workouts"
          onPress={() => navigation.navigate("Workouts")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roadMapContainer: {
    flex: 1,
    alignItems: "center",
  },
});
