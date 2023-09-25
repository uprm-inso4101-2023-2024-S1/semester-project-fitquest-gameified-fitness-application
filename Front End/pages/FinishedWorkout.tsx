import { View, Text, Button, StyleSheet } from "react-native";

import React from "react";

interface Workout {
  workout_name: string;
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  duration: number;
  description: string;
  gif_link: string;
}

interface Props {
  finishedWorkout: Workout;
  finishedSets: number;
  completed: boolean;
  navigation: any;
}

export default function FinishedWorkout({
  finishedWorkout,
  finishedSets,
  completed,
  navigation,
}: Props) {
  console.log(completed);
  const handleExit = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {completed ? "Congrats" : "Better Luck Next Time"}
      </Text>
      <Text style={styles.workoutName}>{finishedWorkout.workout_name}</Text>
      <Text
        style={styles.setsDone}
      >{`${finishedSets} / ${finishedWorkout.exercises.length}  sets.`}</Text>
      <Button color={"red"} title="Go Back Home" onPress={handleExit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  message: {
    fontSize: 30,
    margin: 8,
  },
  workoutName: {
    fontSize: 24,
    marginBottom: 10,
  },
  setsDone: {
    fontSize: 20,
    margin: 6,
  },
  homeBtn: {
    top: 50,
  },
});
