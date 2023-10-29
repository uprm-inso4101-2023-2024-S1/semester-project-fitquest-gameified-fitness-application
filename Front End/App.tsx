import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RoadMapPage } from "./pages/RoadMapPage";
import { ProfilePage } from "./pages/ProfilePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutPage from "./pages/WorkoutPage";
import CustomWorkouts from "./pages/CustomWorkouts";
import RoadMap from './components/RoadMap';
import RoadMapWorkoutPage from "./pages/RoadMapWorkoutPage";
import SelectedWorkout from "./pages/SelectedWorkout";
import FinishedRoute from "./pages/FinishedRoute";
import React, { createContext, useContext, useState } from 'react';

export const LevelContext = createContext({
  level: 0,
  xp: 0,
  totalXp: 0,
  gainXp: (amount) => { },
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  // Player level and xp logic 
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const difficulty = 100;

  const gainXp = (amount) => {
    setXp(xp + amount);
    levelUp();
  };

  const levelUp = () => {
    if (xp >= difficulty * level) {
      setLevel(level + 1);
      setXp(0);
    }
  };

  function Home() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Roadmap" component={RoadMapPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    );

  }

  return (
    <LevelContext.Provider value={{
      level: level,
      xp: xp,
      totalXp: difficulty * level,
      gainXp: gainXp,
    }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen name="Workouts" component={WorkoutPage} />
          <Stack.Screen
            options={{ title: "Create your Own Workouts" }}
            name="CustomWorkout"
            component={CustomWorkouts}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SelectedWorkout"
            component={SelectedWorkout}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="FinishedRoute"
            component={FinishedRoute}
          />
          <Stack.Screen
            name="RoadMapWorkout"
            options={{ headerShown: false }}
            component={RoadMapWorkoutPage}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </LevelContext.Provider>
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
