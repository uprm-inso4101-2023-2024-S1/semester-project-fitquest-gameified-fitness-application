
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import  { Workouts } from '../assets/workoutData';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface RoadMapWorkoutPageProps {
    navigation: any; // Maybe is better to make it more specific?
    onWorkoutComplete: () => void; // Callback cfor when the workout is completed
}

const RoadMapWorkoutPage = ({ navigation }) => {
    const [currentWorkout, setCurrentWorkout] = useState(Workouts[0]); //First workout
    const [progress, setProgress] = useState({}); //Progress of the workout
    
    useEffect(() => {
        loadProgress(); //Load the initial progress
    }, []);

    const loadProgress = async () => {
        try {
            const progressJson = await AsyncStorage.getItem('workoutProgess');

            if(progressJson !== null) {
                setProgress(JSON.parse(progressJson));
            }
        } catch(e) {
            console.error(JSON.parse("Error loading progress", e));
        }
    };
    
    const saveProgress = async (updatedProgress) => {
        try {
            const jsonValue = JSON.stringify(updatedProgress);
            await AsyncStorage.setItem('workoutProgress', jsonValue);
        } catch(e) {
            console.error("Error saving progress", e);
        }
    };
    const handleStart = async (workout, navigation) => {
        navigation.navigate("SelectedWorkout", {
            selectedWorkout: workout,
            navigation,
        });
        
        // Update the progress when the workout is started
        let newProgress = {...progress};
        newProgress[workout.key] = true;
        setProgress(newProgress);
        await saveProgress(newProgress);
    }
return (
        <View style={styles.container}>
            <Text style={styles.header}>{currentWorkout.workout_name}</Text>
            
            <FlatList
                data={currentWorkout.exercises}
                renderItem={({ item: exercise }) => (
                    <View style={styles.exerciseContainer}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Text>Duration: {exercise.duration}</Text>  
                        <Text>{exercise.description}</Text>
                        { /* Para poner el GIF :) */}
                    </View>
                )}
                keyExtractor={(exercise) => exercise.name}
            />

            <Button title='start' onPress={() => handleStart(currentWorkout, navigation)} />

            <Button
                title="Back to Road Map"
               //  onWorkoutComplete(); // Creo que se supone que esto vaya aqui pero me sale error. Lo comente para que no rompa el codigo
                onPress={() => navigation.navigate('Roadmap')}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    exerciseContainer: {
        marginBottom: 10,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    exerciseName: {
        fontSize: 18,
        marginBottom: 6,
    },
});


export default RoadMapWorkoutPage;
