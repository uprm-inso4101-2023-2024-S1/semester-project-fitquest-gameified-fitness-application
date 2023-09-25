import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { exercisesData as initialExercises, Exercise } from '../assets/exercisesData';
import { Workouts, Workout } from "../assets/workoutData";

const CustomWorkouts: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const exercisesWithSelection: Exercise[] = initialExercises.map((exercise) => ({
    ...exercise,
    selected: false,
    duration: 0,
  }));
  const [exercises, setExercises] = useState<Exercise[]>([...exercisesWithSelection]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [temporaryDurations, setTemporaryDurations] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState<string>(""); // State for error messages
  const [hasInvalidDurations, setHasInvalidDurations] = useState<boolean>(false);



   // Function to reset the component's state
   const resetState = () => {
    setExercises([...exercisesWithSelection]);
    setSelectedExercises([]);
    setWorkoutName("");
  };

  const categories = Array.from(new Set(exercises.map((exercise) => exercise.category)));

  

  const handleCategoryToggle = (category: string) => {
    if (expandedCategories.includes(category)) {
      // If the category is in the expanded state, collapse it
      setExpandedCategories(expandedCategories.filter((cat) => cat !== category));
    } else {
      // If the category is not in the expanded state, expand it
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const isCategoryExpanded = (category: string) => expandedCategories.includes(category);

  const handleDurationChange = (category: string, index: number, text: string) => {
    const durationInMinutes = parseFloat(text);
    if (!isNaN(durationInMinutes)) {
      const durationInMilliseconds = durationInMinutes * 60000;
      const updatedExercises = [...exercises];
      updatedExercises
        .filter((exercise) => exercise.category === category)
        .forEach((exercise, exerciseIndex) => {
          if (exerciseIndex === index) {
            exercise.duration = durationInMilliseconds; // Update the exercise's duration in milliseconds
          }
        });

        setTemporaryDurations((prevDurations) => ({
          ...prevDurations,
          [`${category}-${index}`]: text,
        }));
  
      setExercises(updatedExercises);
      // Clear the hasInvalidDurations flag when a valid duration is entered
      setHasInvalidDurations(false);
      setErrorMsg(""); //Clear any previous error message
    }else{
       // Handle valid input times
      setErrorMsg("Invalid duration. Please enter a valid time.");
      setHasInvalidDurations(true);

      // If the input is invalid, you can choose to clear the duration for this exercise
      const updatedExercises = [...exercises];
      updatedExercises
      .filter((exercise) => exercise.category === category)
      .forEach((exercise, exerciseIndex) => {
        if (exerciseIndex === index) {
          exercise.duration = 0;
        }
      });
    setExercises(updatedExercises);
    }
  };
  

  const handleExerciseSelection = (category: string, index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises
      .filter((exercise) => exercise.category === category)
      .forEach((exercise, exerciseIndex) => {
        if (exerciseIndex === index) {
          exercise.selected = !exercise.selected;
        }
      });
  
    setExercises(updatedExercises); // Update the state with the modified exercises
  };
  

  const handleConfirmSelection = () => {
    const selected = exercises.filter((exercise) => exercise.selected);
    setSelectedExercises(selected);
  };

  const SelectedExercisesList: React.FC = () => {
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

  const [workoutName, setWorkoutName] = useState<string>("");

  const handleSaveWorkout = (workoutName: string) => {


  if (hasInvalidDurations) {
    // Display an error message for invalid durations
    setErrorMsg("Some exercises have invalid durations. Please correct them.");
    return;
  }
    if (selectedExercises.length === 0) {
      // Handle the case where no exercises are selected and display an error message
      setErrorMsg("Please select at least one exercise for the workout.");
      return;
    }

    if (workoutName.trim() === "") {
      // Handle the case where the workout name is empty and display an error message
      setErrorMsg("Please enter a workout name.");
      return;
    }
    //If everything is met, error message cleared
    setErrorMsg("");

    // Check if there are selected exercises and a non-empty workout name
    if (selectedExercises.length > 0 && workoutName.trim() !== "") {
      console.log(`Saving workout: ${workoutName}`);
      console.log("Selected exercises:", selectedExercises);
    
      // Generate a unique key for the new workout
      const uniqueKey = Workouts.length; // You can use a more sophisticated method for generating keys if needed
    
      const savedWorkout: Workout = {
        key: Workouts.length,
        workout_name: workoutName,
        exercises: selectedExercises,
      };
    
      Workouts.push(savedWorkout);
  
      console.log("Updated Workouts array:", Workouts);
    
      // Clear the selected exercises after saving
      setSelectedExercises([]);
    
      resetState();

      // Clear any previous error message
      setErrorMsg("");
    }
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
                        value={(exercise.duration / 60000).toString()} // Convert milliseconds to minutes for display
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
        <SelectedExercisesList />
        {selectedExercises.length > 0 && (
          <View>
            <TextInput
              style={styles.workoutNameInput}
              placeholder="Enter Workout Name"
              value={workoutName}
              onChangeText={(text) => {
                setWorkoutName(text);
                // Clear the error message when the user starts typing a valid workout name
                if (errorMsg !== "" && text.trim() !== "") {
                  setErrorMsg("");
                }
              }}
              
            />
            {errorMsg !== "" && (
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            )}
            {workoutName !== "" && (
                <TouchableOpacity
                style={styles.saveWorkoutButton}
                onPress={() => handleSaveWorkout(workoutName)}
                disabled={errorMsg !== ""}
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
  checkbox: {
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
    color: "blue",
  },
  saveWorkoutButton: {
    backgroundColor: "green",
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
  scrollContainer: {
    flexGrow: 1,
  },
  errorMsg:{
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default CustomWorkouts;
