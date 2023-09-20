import React from "react";
import StopWatchApp from "../components/StopWatch";
import TimerApp from "../components/Timer";

import { View, Text, StyleSheet } from "react-native";

export const TimerPage = () => {
  return (
    <View style={styles.container}>
      <StopWatchApp />
      <TimerApp />
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
