import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Workouts } from "../assets/workoutData";

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

  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Workout Page

      </Text>

      {/* Display the list of workouts using map */}
      {Workouts.map((item) => {
        const isSelected = item === selectedWorkout;
        return (
          <TouchableOpacity key={item.key} onPress={() => selectWorkout(item)}>
            <View
              style={{
                padding: 16,
                backgroundColor: "white",
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.workout_name}
              </Text>
              {isSelected && (
                <View style={styles.container}>
                  {item.exercises.map((exercise, index) => (
                    <View key={index} style={{ margin: 8 }}>
                      <Text style={{ backgroundColor: 'white', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" }}>
                        {exercise.name} for <Text style={{ fontWeight: "bold" }}>{formatMilliseconds(exercise.duration)}</Text>
                      </Text>
                    </View>
                  ))}
                  {/* Start Button for the workout */}
                  <TouchableOpacity>

                  </TouchableOpacity>
                  <Button
                    title="Start"
                    onPress={() => startWorkout(item, navigation)}
                    color="green" // You can customize the button color
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
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    alignItems: "center", // Center horizontally
  },
});
