import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RoadMapPage } from "./pages/RoadMapPage";
import { ProfilePage } from "./pages/ProfilePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutPage from "./pages/WorkoutPage";
import CustomWorkouts from "./pages/CustomWorkouts";
import React from 'react';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Roadmap" component={RoadMapPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ title: "FitQuest" }}
          component={Home}
        />
        <Stack.Screen name="Workouts" component={WorkoutPage} />
        <Stack.Screen name="CustomWorkout" component={CustomWorkouts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
