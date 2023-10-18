import React from "react";
import { View, Button, StyleSheet } from "react-native";
import RoadMap from '../components/RoadMap';

export const RoadMapPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <RoadMap navigation={navigation} />
      <Button
        title="Workouts"
        onPress={() => navigation.navigate("Workouts")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
