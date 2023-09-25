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
}

export default function WorkoutPage({ navigation }: Props) {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

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
                backgroundColor: isSelected ? "lightblue" : "white",
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.workout_name}
              </Text>
              {isSelected && (
                <View>
                  <Text style={{ fontSize: 18, marginTop: 8 }}>Exercises:</Text>
                  {item.exercises.map((exercise, index) => (
                    <View key={index} style={{ marginLeft: 16 }}>
                      <Text>
                        Exercise {index + 1}: {exercise.name}
                      </Text>
                      <Text>Duration: {exercise.duration} ms</Text>
                      <Text>Description: {exercise.description}</Text>
                      <Text>GIF Link: {exercise.gif_link}</Text>
                    </View>
                  ))}
                  {/* Start Button for the workout */}
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
