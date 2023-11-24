import React, { useContext, Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LevelContext } from "../App";
import ProgressBar from "./ProgressBar";

// Propierty types
interface RoadMapProps {
  navigation: any; // Adjust the type based on your navigation setup
}

interface Station {
  id: number;
  completed: boolean;
  locked: boolean;
  workoutKey?: number;
}

export const RoadMap = ({ navigation }) => {
  const { level, xp, totalXp, gainXp } = useContext(LevelContext);
  const [XP, setXP] = useState(xp);
  const [lvl, setLvl] = useState(level);
  const [stations, setStations] = useState([
    // Initialize the stations | Needs to fix "locked" so it changes once it finish the workout
    { id: 1, completed: false, locked: false, workoutKey: 1 },
    { id: 2, completed: false, locked: true, workoutKey: 2 },
    { id: 3, completed: false, locked: true, workoutKey: 3 },
    { id: 4, completed: false, locked: true, workoutKey: 4 },
    { id: 5, completed: false, locked: true, workoutKey: 5 },
    { id: 6, completed: false, locked: true, workoutKey: 6 },
    { id: 7, completed: false, locked: true, workoutKey: 7 },
    { id: 8, completed: false, locked: true, workoutKey: 8 },
    { id: 9, completed: false, locked: true, workoutKey: 9 },
    { id: 10, completed: false, locked: true, workoutKey: 10 },
  ]);
  const maxXpLvl = 500; // Maximum value of xp per level
  const xpBarWidth = (XP / maxXpLvl) * 85;

  //This function handles leveling up when the xp reaches a certain amount
  function lvlUp() {
    this.setState((prevState) => ({
      xp: 0, // Reset XP to 0
      lvl: prevState.lvl + 1, // Increase the level by 1
    }));
  }

  // Function to unlock a station when its level is reached
  function unlock(stationId) {
    const updatedStations = stations.map((station) => {
      if (station.id == stationId && station.locked) {
        station.locked = false;
      }
      return station;
    });
    setStations(updatedStations);
  }

  function complete(stationId) {
    const updatedStations = stations.map((s) => {
      if (s.id == stationId) {
        s.completed = true;
      }
      return s;
    });
    setStations(updatedStations);
  }
  const stationRefresh = () => {
    const updatedStations = stations.map((s) => {
      if (s.id < level) {
        s.completed = true;
        s.locked = false;
      }
      if (s.id == level) {
        s.locked = false;
      }
      return s;
    });
    setStations(updatedStations);
  };
  //Function that can be modified to change the funcionality of each of the stations
  const stationSelect = (stationId) => {
    const station = stations.find((s) => s.id == stationId);
    // Verifies if the station that was pressed is locked, if locked it tells the user what to do to unlock it
    if (station.locked) {
      // If the station's level is less than or equal to the current level, unlock it
      if (station.id < lvl) {
        unlock(stationId);
        complete(station.id);
      }
      if (station.id == lvl) {
        unlock(stationId);
      } else {
        Alert.alert(
          "This station is locked. Reach level " + station.id + " to unlock."
        );
        return; // Exit the function if the station is locked
      }
    }
    // If the station is not locked, it will navigate to the workouts page
    if (!station.locked) {
      navigation.navigate("RoadMapWorkout", {
        stationId: station.id,
      });
    }
  };

  //Function that can be modified to change the funcionality of the button on the bottom left of the screen
  const handleLeftButtonPress = () => {
    // // This block of code is here for testing purposes
    // // Check if the XP is less than 500 before adding 10 XP
    // if (this.state.xp < 500) {
    //   this.setState((prevState) => ({
    //     xp: Math.min(prevState.xp + 10, 500), // Limit XP per level to a maximum of 500
    //   }));
    // } else {
    //   this.lvlUp()
    // }
    console.log("Left button pressed");
  };

  //Function that can be modified to change the funcionality of the button on the bottom right of the screen
  const handleRightButtonPress = () => {
    console.log("Right button pressed");
  };

  //   function renderStationButton(station) {
  //     let buttonContent;

  //     if (station.locked) {
  //       buttonContent = <Icon name="lock" size={32} color="white" />;
  //     } else if (station.completed) {
  //       buttonContent = <Text style={styles.buttonText}>✓ {station.id}</Text>; // Marca de verificación para estaciones completadas
  //     } else {
  //       buttonContent = <Text style={styles.buttonText}>{station.id}</Text>;
  //     }

  //     return (
  //       <TouchableOpacity
  //         key={station.id}
  //         style={
  //           station.locked
  //             ? styles.lockedButton
  //             : station.completed
  //             ? styles.completedButton
  //             : styles.incompleteButton
  //         }
  //         onPress={() => stationSelect(station.id)}
  //       >
  //         {buttonContent}
  //       </TouchableOpacity>
  //     );
  //   }

  useEffect(stationRefresh, [...stations]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Road Map</Text>
      <ScrollView style={styles.scrollContainer}>
        {stations.map((station) => {
          let buttonContent;

          if (station.locked) {
            buttonContent = <Icon name="lock" size={32} color="white" />;
          } else if (station.completed) {
            buttonContent = (
              <Text style={styles.buttonText}>✓ {station.id}</Text>
            ); // Marca de verificación para estaciones completadas
          } else {
            buttonContent = <Text style={styles.buttonText}>{station.id}</Text>;
          }

          const {level, xp, totalXp, gainXp} = useContext(LevelContext);

          return (
            <TouchableOpacity
              key={station.id}
              style={
                station.locked
                  ? styles.lockedButton
                  : station.completed
                  ? styles.completedButton
                  : styles.incompleteButton
              }
              onPress={() => stationSelect(station.id)}
            >
              {buttonContent}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={[styles.xpContainer, {width: '100%'}]}>
        {/* <View style={[styles.xpBar, { width: xpBarWidth }]}></View>
        <Text style={styles.xpText}> {XP} XP</Text> */}
        <ProgressBar currentXp={xp} totalXp={totalXp}/>
      </View>
      {/* <Text style={styles.level}>Level {lvl}</Text> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={handleLeftButtonPress}
        >
          <Icon name="home" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightButton}
          onPress={() => navigation.navigate("Workouts")}
        >
          <Icon name="dumbbell" size={50} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "red", //dark orange
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 0,
    backgroundColor: "red"
  },
  leftButton: {
    // Borrar?
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  rightButton: {
    // Borrar?
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  xpContainer: {
    // flexDirection: "column",
    alignItems: "center",
    marginVertical: 20,
  },
  xpBar: {
    width: "100%",
    height: 10,
    backgroundColor: "green",
  },
  xpText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  level: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 0,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 150,
    backgroundColor: "black"  // Navy blue background color
},
  leftSide: {
    alignSelf: "flex-start",
  },
  rightSide: {
    alignSelf: "flex-end",
  },
  completedButton: {
    width: 150, // Ancho del rectángulo
    height: 50, // Alto del rectángulo
    backgroundColor: "grey", // Color de fondo cuando esté completado
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Bordes redondeados, puedes ajustar según prefieras
    borderWidth: 2,
  },
  incompleteButton: {
    width: 150,
    height: 50,
    backgroundColor: "#fffdd0", // Color de fondo cuando esté pendiente
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  lockedButton: {
    width: 150,
    height: 50,
    backgroundColor: "black", // Color de fondo cuando esté bloqueado
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white"
  },
  buttonText: {
    fontSize: 20,
    color: "black",
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 30,
    left: 30,
    right: 30,
  },
});

export default RoadMap;
