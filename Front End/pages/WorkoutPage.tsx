import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Workouts } from "../assets/workoutData";

export default function WorkoutPage({ navigation }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const selectWorkout = (workout) => {
    setSelectedWorkout(workout === selectedWorkout ? null : workout);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Workout Page</Text>

      {/* Display the list of workouts using map */}
      {Workouts.map((item) => {
        const isSelected = item === selectedWorkout;
        return (
          <TouchableOpacity key={item.key} onPress={() => selectWorkout(item)}>
            <View style={{ padding: 16, backgroundColor: isSelected ? 'lightblue' : 'white', marginBottom: 8 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.workout_name}</Text>
              {isSelected && (
                <View>
                  <Text style={{ fontSize: 18, marginTop: 8 }}>Exercises:</Text>
                  {item.exercises.map((exercise, index) => (
                    <View key={index} style={{ marginLeft: 16 }}>
                      <Text>Exercise {index + 1}: {exercise.name}</Text>
                      <Text>Duration: {exercise.duration} ms</Text>
                      <Text>Description: {exercise.description}</Text>
                      <Text>GIF Link: {exercise.gif_link}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
