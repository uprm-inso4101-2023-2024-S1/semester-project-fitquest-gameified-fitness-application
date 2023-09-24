import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import WorkoutTimer from '../components/WorkoutTimer'; // Import the WorkoutTimer component

export default function SelectedWorkout({ route }) {
    // Extract the selectedWorkout parameter from the route
    const { selectedWorkout } = route.params || {};
  
    return (
      <View>
        {/* Render the WorkoutTimer component with the selected workout and onFinish function */}
        <WorkoutTimer selectedWorkout={selectedWorkout} onFinish={() => {
          // Handle navigation back to the workouts page here
          // For example: navigation.navigate('WorkoutPage');
        }} />
      </View>
    );
  }

