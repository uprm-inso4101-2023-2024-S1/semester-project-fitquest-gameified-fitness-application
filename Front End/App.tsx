import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LevelContextProvider } from './components/LevelContextProvider';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoadMapPage } from "./pages/RoadMapPage";
import { ProfilePage } from "./pages/ProfilePage";
import WorkoutPage from "./pages/WorkoutPage";
import CustomWorkouts from "./pages/CustomWorkouts";
import SelectedWorkout from "./pages/SelectedWorkout";
import FinishedRoute from "./pages/FinishedRoute";
import { SocialPage } from "./pages/SocialPage";



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LevelContextProvider>
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
        </Stack.Navigator>
      </NavigationContainer>
    </LevelContextProvider>
  );
}

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Roadmap" component={RoadMapPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
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
