// WorkoutPage.tsx
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { LevelContext } from '../App';
import Exercise from './Exercise';

export default function WorkoutPage({ navigation }) {
    const { gainXp } = useContext(LevelContext);


    // exercises go here
    const exercises = [
        { id: '1', name: 'Push-ups', description: 'Push-ups description', xp: 1, images: ['image1.jpg', 'image2.jpg', 'image3.jpg'] },
        // add other exercises ...
    ];

    const handleWorkoutCompletion = () => {
        let totalXP = exercises.reduce((acc, exercise) => acc + exercise.xp, 0);
        gainXp(totalXP + 1); // additional XP for completing the workout
        navigation.navigate('FinishedRoute');
    };

    return (
        <View>
            <FlatList
                data={exercises}
                renderItem={({ item }) => <Exercise data={item} />}
                keyExtractor={(item) => item.id}
            />
            <Button title="Start Workout" onPress={handleWorkoutCompletion} />
        </View>
    );
}
