import React, { useContext } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import ProgressBar from "../components/ProgressBar";
import { LevelContext } from "../App";
import RoadMap from '../components/RoadMap';

export const RoadMapPage = ({ navigation }) => {
  const {level, xp, totalXp, gainXp} = useContext(LevelContext);
  
  return (
    <View style={styles.container}>
      {/* <View style={{padding:10}}>
        <ProgressBar totalXp={totalXp} currentXp={xp} />
      </View> */}
      <View style={styles.roadMapContainer}>
        {/* <View style={styles.progressBar}> */}

        {/* </View> */}
        <RoadMap navigation={navigation} />
        <Button
          title="Workouts"
          onPress={() => navigation.navigate("Workouts")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  roadMapContainer: {
    flex: 1,
    alignItems: "center",
  },
});
