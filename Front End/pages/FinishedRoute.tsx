import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FinishedWorkout from "./FinishedWorkout";

const FinishedRoute = ({ route }) => {
  const { selectedWorkout, totalSets, completed, navigation } =
    route.params || {};

  return (
    <View>
      <FinishedWorkout
        finishedWorkout={selectedWorkout}
        finishedSets={totalSets}
        completed={completed}
        navigation={navigation}
      />
    </View>
  );
};

export default FinishedRoute;
