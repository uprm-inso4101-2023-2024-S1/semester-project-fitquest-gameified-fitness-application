import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LevelContext } from "../App";
import { userData } from "../pages/ProfilePage";
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
    marginTop: 25,
  },

  timerText: {
    fontSize: 40,
    color: "#ffffff",
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },

  buttonText: {
    fontSize: 20,
    color: "#000000", //black text
  },

  ExerciseName: {
    fontSize: 20,

    marginTop: 4,
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
    color: "#b0b0b0",
  },

  gifContainer: {
    backgroundColor: "#ffffff",
    width: screen.width / 1.2,
    height: screen.width / 1.55,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },

  gifText: {
    fontSize: 15,
    color: "#000000",
  },

  workoutTitle: {
    fontWeight: "900",
    fontSize: 20,
    color: "#ffffff",
    marginTop: 10,
  },
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
  navigation: any;
}

export default function WorkoutTimer({ selectedWorkout, navigation }: Props) {
  const [timeRemaining, setTimeRemaining] = useState<number>(
    selectedWorkout.exercises[0].duration / 1000
  );
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const { level, xp, totalXp, gainXp } = useContext(LevelContext);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onFinish = (
    selectedWorkout: Workout,
    totalSets,
    completed,
    navigation
  ) => {
    gainXp(12);
    navigation.navigate("FinishedRoute", {
      selectedWorkout,
      totalSets,
      completed,
      navigation,
    });
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  useEffect(() => {
    if (isRunning) {
      gainXp(10);
      userData.exerciseCompleted += 1;
      userData.timeSpent += 1000;
    }
  }, [exerciseIndex]);

  console.log(xp);

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

              return (
                selectedWorkout.exercises[exerciseIndex + 1].duration / 1000
              );
            } else {
              // If all exercises are done, finish the workout
              userData.exerciseCompleted += 1;
              userData.timeSpent +=
                selectedWorkout.exercises[exerciseIndex].duration;
              gainXp(10);
              onFinish(selectedWorkout, exerciseIndex + 1, true, navigation);
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
  }, [isRunning, exerciseIndex, selectedWorkout]);

  const toggleTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const skipExercise = () => {
    if (exerciseIndex + 1 < selectedWorkout.exercises.length) {
      setExerciseIndex((prevIndex) => prevIndex + 1);
      setTimeRemaining(
        selectedWorkout.exercises[exerciseIndex + 1].duration / 1000
      );
    }
  };

  const handleFinish = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onFinish(selectedWorkout, exerciseIndex + 1, completed, navigation);
  };

  function formatSeconds(num) {
    let minutes = 0;
    if (num >= 60) {
      minutes = Math.floor(num / 60);
      num -= minutes * num;
    }
    return `0${minutes}`.slice(-2) + ":" + `0${num}`.slice(-2);
  }

  const [workoutName, setWorkoutName] = useState(
    selectedWorkout.exercises[exerciseIndex].name
  );

  const [workoutDesc, setWorkoutDesc] = useState(
    selectedWorkout.exercises[exerciseIndex].description
  );
  useEffect(() => {
    setWorkoutName(selectedWorkout.exercises[exerciseIndex].name);
    setWorkoutDesc(selectedWorkout.exercises[exerciseIndex].description);
  }, [exerciseIndex]);

  return (
    <View style={styles.container}>
      {/*Displays corresponding workout information*/}
      <Text style={styles.workoutTitle}> {selectedWorkout.workout_name} </Text>

      {/*Displays timer with respective designs */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {" "}
          {`0${Math.floor(timeRemaining / 60)}`.slice(-2) +
            ":" +
            `0${timeRemaining % 60}`.slice(-2)}{" "}
        </Text>
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
        <TouchableOpacity
          onPress={skipExercise}
          style={styles.finishWorkoutContainer}
        >
          <Text style={styles.buttonText}> {"Skip"} </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFinish} style={styles.stopContainer}>
          <Text style={styles.buttonText}> {"Finish Workout"}</Text>
        </TouchableOpacity>
      </View>

      {/*Displays number of reps and sets to be perfomred for each workout*/}
      <Text style={styles.repsetText}>
        {" "}
        {` Set: ${exerciseIndex + 1} / ${selectedWorkout.exercises.length}`}
      </Text>

      {/*Dsiplays a GIF of the current workout for the user*/}
      <View style={styles.gifContainer}>
        <Text style={styles.ExerciseName}>
          {" "}
          {"Current Exercise:"} {workoutName}{" "}
        </Text>
        <Text style={styles.gifText}> {workoutDesc} </Text>
      </View>
    </View>
  );
}
