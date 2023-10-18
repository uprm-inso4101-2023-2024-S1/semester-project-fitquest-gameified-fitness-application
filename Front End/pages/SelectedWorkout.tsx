import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import WorkoutTimer from "../components/WorkoutTimer"; // Import the WorkoutTimer component
import { exercisesData } from "../assets/exercisesData";

export default function SelectedWorkout({ route, navigation }) {
  // Extract the selectedWorkout parameter from the route
  const { selectedWorkout, stationId } = route.params || {};
  
  // Obtain the excersises for the station
  const startingIndex = (stationId - 1) * 3; 
  const selectedExercises = exercisesData.slice(startingIndex, startingIndex + 3)

  // State to the completed excersitve
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const markAsCompleted = (exerciseIndex: number) => {
    setCompletedExercises(prev => {
      if (!prev.includes(exerciseIndex)) {
        return [...prev, exerciseIndex];
      }
      return prev;
    });
  }

  return (
    <View style={{ padding: 20 }}>
      {/* Render the selected exercises */}
      {selectedExercises.map((exercise, index) => (
        <View key={index} style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{exercise.name}</Text>
          <Text>{exercise.description}</Text>
          {!completedExercises.includes(index) && 
            <Button title="Mark as Completed" onPress={() => markAsCompleted(index)} />
          }
        </View>
      ))}

      {/* Render the WorkoutTimer component with the selected workout and onFinish function */}
      <WorkoutTimer navigation={navigation} selectedWorkout={selectedWorkout} />
    </View>
  );
}
