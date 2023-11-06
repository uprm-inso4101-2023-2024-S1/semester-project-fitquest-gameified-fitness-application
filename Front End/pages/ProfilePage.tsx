import React, { useContext } from "react";
import TimerApp from "../components/StopWatch";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "../components/ProgressBar";
import { LevelContext } from "../App";

export const ProfilePage = () => {
  const {level, xp, totalXp, gainXp} = useContext(LevelContext);

  return (
    <View style={styles.container}> 
    <ProgressBar totalXp={totalXp} currentXp={xp}/>
    <View style={styles.textContainer}>
      <Text>This is the profile page </Text>
    </View>
    </View>
  );
    
};

const styles = StyleSheet.create({
  container:{
    flex: 1
  },

  textContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
