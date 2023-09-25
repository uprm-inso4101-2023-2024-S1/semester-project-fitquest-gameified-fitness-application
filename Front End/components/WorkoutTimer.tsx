import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

//variable for screen dimensions
const screen = Dimensions.get("window");

//Style sheet with various style settings for the StopWatch UI 
const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: "100%",
      backgroundColor: "#000000",
      alignItems: "center",
    },

    timerContainer: {
      borderWidth: 2.5,
      borderColor: "#ffbb00",
      width: screen.width / 2,
      height: screen.width / 2,
      borderRadius: screen.width / 2,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25
    },

    timerText: {
      fontSize: 40,
      color: "#ffffff"
    },

    buttonContainer: {
      flexDirection: "row",
      marginTop: 30,
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 25
    },

    buttonText: {
      fontSize: 20,
      color: "#000000", //black text
    },

    workoutInfoText: {
      fontSize: 20,
      color: "#ffffff"
    },

    startContainer: {
      backgroundColor: "#0dff00",
      width: screen.width / 4,
      height: screen.width / 4,
      borderRadius: screen.width / 2,
      justifyContent: "center",
      alignItems: "center",
    },

    stopContainer: {
      backgroundColor: "#ff0000",
      width: screen.width / 4,
      height: screen.width / 4,
      borderRadius: screen.width / 2,
      justifyContent: "center",
      alignItems: "center",
    },

    pauseContainer: {
      backgroundColor: "#ffbf00",
      width: screen.width / 4,
      height: screen.width / 4,
      borderRadius: screen.width / 2,
      justifyContent: "center",
      alignItems: "center",
    },

    finishWorkoutContainer: {
      backgroundColor: "#f6ff00",
      width: screen.width / 4,
      height: screen.width / 4,
      borderRadius: screen.width / 2,
      justifyContent: "center",
      alignItems: "center",
    },    

    repsetText: {
      fontSize: 25,
      color: "#b0b0b0"
    },

    gifContainer: {
      backgroundColor: "#ffffff",
      width: screen.width / 1.2,
      height: screen.width / 1.55,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20
        
    },

    gifText: {
      fontSize: 25,
      color: "#000000",
    }
});
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
  selectedWorkout: Workout;
  onFinish: () => void;
}

export default function WorkoutTimer({ selectedWorkout, onFinish }: Props) {
    const [timeRemaining, setTimeRemaining] = useState<number>(
      selectedWorkout.exercises[0].duration / 1000
    );
    const [exerciseIndex, setExerciseIndex] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
  
    const timerRef = useRef<NodeJS.Timeout | null>(null);
  
    const startTimer = () => {
      if (!isRunning) {
        setIsRunning(true);
      }
    };
  
    useEffect(() => {
      if (isRunning) {
        timerRef.current = setInterval(() => {
          setTimeRemaining((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              // Move to the next exercise when the current one finishes
              clearInterval(timerRef.current as NodeJS.Timeout);
  
              if (exerciseIndex + 1 < selectedWorkout.exercises.length) {
                // If there are more exercises, move to the next exercise
                setExerciseIndex((prevIndex) => prevIndex + 1);
                return selectedWorkout.exercises[exerciseIndex + 1].duration / 1000;
              } else {
                // If all exercises are done, finish the workout
                onFinish();
                return 0;
              }
            }
          });
        }, 1000);
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
  
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }, [isRunning, exerciseIndex, selectedWorkout, onFinish]);
  
    const toggleTimer = () => {
      setIsRunning((prevIsRunning) => !prevIsRunning);
    };
  
    const skipExercise = () => {
      if (exerciseIndex + 1 < selectedWorkout.exercises.length) {
        setExerciseIndex((prevIndex) => prevIndex + 1);
        setTimeRemaining(selectedWorkout.exercises[exerciseIndex + 1].duration / 1000);
      }
    };
  
    const handleFinish = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      onFinish();
    };
  
    return (
      <View style={styles.container}>

        {/*Displays corresponding workout information*/}
        <Text style={styles.workoutInfoText}> {"Workout Timer"} </Text>
        <Text style={styles.workoutInfoText}> {"Selected Workout Name:"} {selectedWorkout.workout_name} </Text>
        <Text style={styles.workoutInfoText}> {"Current Exercise:"} {selectedWorkout.exercises[exerciseIndex].name} </Text>

        {/*Displays timer with respective designs */}
        <View style={styles.timerContainer}> 
          <Text style={styles.timerText}> {timeRemaining} </Text>
        </View>
        
        {/*Displays the buttons with their respective designs*/}
        <View style={styles.buttonContainer}>
          {isRunning ? (
            <TouchableOpacity onPress={toggleTimer} style={styles.pauseContainer}>
              <Text style={styles.buttonText}> {"Pause"} </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startTimer} style={styles.startContainer}>
              <Text style={styles.buttonText}> {"Start"} </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={skipExercise} style={styles.finishWorkoutContainer}> 
            <Text style={styles.buttonText}> {"Skip"} </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFinish} style={styles.stopContainer}> 
            <Text style={styles.buttonText}>   {"Finish Workout"}</Text>
          </TouchableOpacity>

        </View>

        {/*Displays number of reps and sets to be perfomred for each workout*/}
        <Text style={styles.repsetText}> {"Rep: __ / __       Set: __ / __"} </Text>

        {/*Dsiplays a GIF of the current workout for the user*/}
        <View style={styles.gifContainer}> 
            <Text style={styles.gifText}> {"[Insert workout GIF Here]"} </Text>
        </View>      

      </View>
    );
  }
