import React, { useContext } from "react";
import { View, Button, StyleSheet, Text } from "react-native";

export const RoadMapPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
