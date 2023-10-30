import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import WorkoutTimer from "../components/WorkoutTimer"; // Import the WorkoutTimer component
import ProgressBar from "../components/ProgressBar";
import { useLevelContext } from '../components/LevelContextProvider';

export default function SelectedWorkout({ route }) {
  // Extract the selectedWorkout parameter from the route
  const { selectedWorkout, navigation } = route.params || {};
  const { level, xp, totalXp, gainXp } = useLevelContext();

  return (
    <View>
      <ProgressBar currentXp={xp} totalXp={totalXp} />
      {/* Render the WorkoutTimer component with the selected workout and onFinish function */}
      <WorkoutTimer navigation={navigation} selectedWorkout={selectedWorkout} />
    </View>
  );
}
