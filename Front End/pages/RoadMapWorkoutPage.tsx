
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const RoadMapWorkoutPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Road Map Workout Page</Text>
            {/* Aquí se mostrarán los detalles del entrenamiento específico. 
             Por ejemplo, los ejercicios, duración, etc. */}
            <Button
                title="Back to Road Map"
                onPress={() => navigation.navigate('Roadmap')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RoadMapWorkoutPage;
