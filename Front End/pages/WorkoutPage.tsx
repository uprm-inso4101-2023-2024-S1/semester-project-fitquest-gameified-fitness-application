
import React, { useState, useContext } from "react";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";

import { Workouts } from "../assets/workoutData";
// import { level } from "../assets/levelData";
import { LevelContext } from "../App";
import ProgressBar from "../components/ProgressBar";

const isIOS = Platform.OS === "ios";

interface Exercise {
  name: string;
  duration: number;
  description: string;
  gif_link: string;
}

interface Workout {
  key: number;
  workout_name: string;
  exercises: Exercise[];
}

interface Props {
  navigation: any; // Adjust the type based on your navigation setup
  route: any; // Adjust the type based on your navigation setup
}

export default function WorkoutPage({ navigation, route }: Props) {
  const passedWorkoutKey = route.params?.selectedWorkoutKey;
  const defaultWorkout = passedWorkoutKey ? Workouts.find(w => w.key === passedWorkoutKey) : null;
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(defaultWorkout);

  const selectWorkout = (workout: Workout) => {
    setSelectedWorkout(workout === selectedWorkout ? null : workout);
  };

  const startWorkout = (workout: Workout, navigation) => {
    // Navigate to the SelectedWorkout page and pass the selected workout data
    navigation.navigate("SelectedWorkout", {
      selectedWorkout: workout,
      navigation,
    });
  };

  function formatMilliseconds(num) {
    let seconds = num / 1000
    let minutes = 0
    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60)
      seconds = seconds % 60
    }
    return `0${minutes}`.slice(-2) + ':' + `0${seconds}`.slice(-2)
  }

  const {level, xp, totalXp, gainXp} = useContext(LevelContext)

  return (

    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        Workout Page
      </Text>

      <Button title="XP" onPress={() => {gainXp(10)}}></Button>
      <ProgressBar currentXp={xp} totalXp={totalXp}/>

      {/* Display the list of workouts using map */}
      {Workouts.map((item) => {
        const isSelected = item === selectedWorkout;
        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => selectWorkout(item)}
          >
            <View style={styles.workoutContainer}>
              <Text style={styles.workoutName}>
                {item.workout_name}
              </Text>
              {isSelected && (
                <View style={styles.exerciseContainer}>
                  {item.exercises.map((exercise, index) => (
                    <View key={index} style={styles.exerciseItem}>
                      <Text style={styles.exerciseName}>
                        {exercise.name} for{" "}
                        <Text style={styles.exerciseDuration}>
                          {formatMilliseconds(exercise.duration)}
                        </Text>
                      </Text>
                    </View>
                  ))}
                  {/* Start Button for the workout */}

                  <Button
                    title="Start"
                    onPress={() => startWorkout(item, navigation)}
                    color={isIOS ? "green" : "#007BFF"} // Adjust button color for iOS and web
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
      <View style={styles.buttonContainer}>
        <Button
          title="Create Your Own"
          onPress={() => navigation.navigate("CustomWorkout")}
          color={isIOS ? "green" : "#007BFF"} // Adjust button color for iOS and web
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2", // Background color for the entire screen
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  workoutContainer: {
    padding: 16,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  exerciseContainer: {
    marginTop: 8,
  },
  exerciseItem: {
    margin: 8,
  },
  exerciseName: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  exerciseDuration: {
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center", // Center horizontally
  },
});
