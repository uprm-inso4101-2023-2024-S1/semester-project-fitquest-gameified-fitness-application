import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { exercises as initialExercises } from '../assets/exercisesData';
import { useNavigation } from "@react-navigation/native";

const CustomWorkouts = ({ navigation }) => {
  //const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const exercisesWithSelection = initialExercises.map((exercise) => ({
    ...exercise,
    selected: false, // Add a selected property and initialize it as false
  }));
  const [exercises, setExercises] = useState([...exercisesWithSelection]); // Initialize with the initial data
  const [selectedExercises, setSelectedExercises] = useState([]);

  const categories = Array.from(new Set(exercises.map((exercise) => exercise.category)));

  const handleCategoryToggle = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((cat) => cat !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const isCategoryExpanded = (category) => expandedCategories.includes(category);

  const handleDurationChange = (category, index, text) => {
    const durationInMinutes = parseFloat(text);
    if (!isNaN(durationInMinutes)) {
      const durationInMilliseconds = durationInMinutes * 60000; // 1 minute = 60000 milliseconds
      const updatedExercises = [...exercises];
      updatedExercises
        .filter((exercise) => exercise.category === category)
        .forEach((exercise, exerciseIndex) => {
          if (exerciseIndex === index) {
            exercise.duration = durationInMilliseconds;
          }
        });

      // Update the exercises state with the new exercise durations
      setExercises(updatedExercises);
    }
  };

  const handleExerciseSelection = (category, index) => {
    const updatedExercises = [...exercises];
    updatedExercises
      .filter((exercise) => exercise.category === category)
      .forEach((exercise, exerciseIndex) => {
        if (exerciseIndex === index) {
          exercise.selected = !exercise.selected; // Toggle the selected property
        }
      });
  
    // Update the exercises state with the new exercise selection status
    setExercises(updatedExercises);
  };

  const handleConfirmSelection = () => {
    const selected = exercises.filter((exercise) => exercise.selected);
    setSelectedExercises(selected);
  };
  
  const SelectedExercisesList = () => {
    return (
      <ScrollView>
        <Text style={styles.selectedExercisesTitle}>Selected Exercises:</Text>
        {selectedExercises.map((exercise, index) => (
          <Text key={index} style={styles.selectedExercise}>
            {exercise.name}
          </Text>
        ))}
      </ScrollView>
    );
  };

  const [workoutName, setWorkoutName] = useState("");

  const handleSaveWorkout = (workoutName) => {
    console.log(`Saving workout: ${workoutName}`);
    console.log("Selected exercises:", selectedExercises);
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Custom Workout System</Text>
      <ScrollView style={styles.categoryList}>
        {categories.map((category) => (
          <View key={category} style={styles.categoryCard}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => handleCategoryToggle(category)}
            >
              <Text style={styles.categoryHeaderText}>{category}</Text>
              <Ionicons
                name={isCategoryExpanded(category) ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            {isCategoryExpanded(category) && (
              <View style={styles.exerciseList}>
                {exercises
                  .filter((exercise) => exercise.category === category)
                  .map((exercise, index) => (
                    <View key={index} style={styles.exercise}>
                      <TouchableOpacity
                        onPress={() => handleExerciseSelection(category, index)}
                        style={styles.checkbox}
                      >
                        {exercise.selected ? (
                          <Ionicons name="checkbox-outline" size={24} color="blue" />
                        ) : (
                          <Ionicons name="square-outline" size={24} color="black" />
                        )}
                      </TouchableOpacity>
                      <Text style={styles.exercise}>{exercise.name}</Text>
                      <TextInput
                        style={styles.durationInput}
                        placeholder="Duration (minutes)"
                        keyboardType="numeric"
                        onChangeText={(text) => handleDurationChange(category, index, text)}
                      />
                    </View>
                  ))}
              </View>
            )}
          </View>
        ))}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmSelection}
        >
          <Text style={styles.confirmButtonText}>Confirm Selection</Text>
        </TouchableOpacity>
        {selectedExercises.length > 0 && (
          <View>
            <TextInput
              style={styles.workoutNameInput}
              placeholder="Enter Workout Name"
              value={workoutName}
              onChangeText={(text) => setWorkoutName(text)}
            />
            {workoutName !== "" && (
              <TouchableOpacity
                style={styles.saveWorkoutButton}
                onPress={() => handleSaveWorkout(workoutName)}
              >
                <Text style={styles.saveWorkoutButtonText}>Save Workout</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoryList: {
    flex: 1,
  },
  categoryCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
    overflow: "hidden",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  categoryHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryHeaderExpanded: {
    backgroundColor: "#e0e0e0",
  },
  checkbox:{
    marginRight: 8,
  },
  exerciseList: {
    padding: 16,
  },
  exercise: {
    fontSize: 16,
    marginBottom: 8,
  },
  durationInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedExercisesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  selectedExercise: {
    fontSize: 16,
    marginBottom: 8,
    color: "green",
  },
  workoutNameInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    marginTop: 16,
  },
  savedWorkoutName: {
    fontSize: 16,
    marginTop: 8,
    color: "blue", // You can adjust the color as needed
  },
  saveWorkoutButton: {
    backgroundColor: "green", // Customize the button's background color
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  saveWorkoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomWorkouts;
