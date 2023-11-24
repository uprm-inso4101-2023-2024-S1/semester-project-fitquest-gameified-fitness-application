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
import LoginScreen from "./pages/LoginScreen";
import SignUpScreen from "./pages/SignUpScreen";
import React, { createContext, useContext, useEffect, useState } from 'react';

export const LevelContext = createContext({
  level: 0,
  xp: 0,
  totalXp: 0,
  gainXp: (amount) => { },
});

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  Roadmap: undefined;
  Home: undefined;
  Profile: undefined;
  Workouts: undefined;
  CustomWorkout: undefined;
  SelectedWorkout: undefined;
  FinishedRoute: undefined;
  RoadMapWorkout: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  // Player level and xp logic 
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const difficulty = 100;

  const gainXp = (amount: number) => {
    setXp((prevxp) => prevxp + amount);
    levelUp();
  };


  ///////////this code was made to extract data from the data base///////////
  const [data,setData] = useState([{}])
  useEffect(() => {
    fetch("/user/login").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
    }, [])
  ///////////////////////////////////////////////////////////////////////////

  ////////////this code was made to insert data into the database////////////
  const username = "John Doe";
  const email = "john@example.com";
  const password = "1234"

  const encodedUsername = encodeURIComponent(username);
  const encodedEmail = encodeURIComponent(email);
  const encodedPassword = encodeURIComponent(password);
  // i think that you can use the encodeURIComponent directly on the string
  //but i left it like this so that it is easier to understand

  //the information is encoded so that it can form part of the url that is 
  //going to be sent to the back end.
  const url = `/user/login?username=${encodedUsername}&email=${encodedEmail}&password=${encodedPassword}`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((r) => r.json())
    .then((data) => console.log(data));
  ///////////////////////////////////////////////////////////////////////////

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
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="SignUp" component={SignUpScreen}/>
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
