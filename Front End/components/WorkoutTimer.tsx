import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';

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
      <View>
        <Text>Workout Timer</Text>
        <Text>Selected Workout Name: {selectedWorkout.workout_name}</Text>
        <Text>Current Exercise: {selectedWorkout.exercises[exerciseIndex].name}</Text>
        <Text>Time Remaining: {timeRemaining} seconds</Text>
        {isRunning ? (
          <Button title="Pause" onPress={toggleTimer} />
        ) : (
          <Button title="Start" onPress={toggleTimer} />
        )}
        <Button title="Skip" onPress={skipExercise} />
        <Button title="Finish Workout" onPress={handleFinish} />
      </View>
    );
  }
