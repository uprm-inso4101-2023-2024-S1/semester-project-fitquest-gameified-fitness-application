import React from "react";
import TimerApp from "../components/StopWatch";
import { View, Text, StyleSheet } from "react-native";

export const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Text>This is the profile page </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
