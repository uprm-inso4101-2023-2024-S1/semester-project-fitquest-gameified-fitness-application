import React, { useContext } from "react";
import TimerApp from "../components/StopWatch";
import { View, Text, StyleSheet, Image } from "react-native";
import ProgressBar from "../components/ProgressBar";
import { LevelContext } from "../App";

export const userData = {
  name: "Test",
  exerciseCompleted: 0,
  timeSpent: 3000,
  age: 20,
};

export const ProfilePage = () => {
  const { level, xp, totalXp, gainXp } = useContext(LevelContext);

  function formatMilliseconds(num) {
    let seconds = num / 1000;
    let minutes = 0;
    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
    }
    return `0${minutes}`.slice(-2) + ":" + `0${seconds}`.slice(-2);
  }

  return (
    <View style={styles.container}>
      <View style={styles.xpContainer}>
        <ProgressBar totalXp={totalXp} currentXp={xp} />
      </View>

      <View style={styles.textContainer}>
        <Text
          style={{ color: "white", fontSize: 20 }}
        >{`Hello! ${userData.name}`}</Text>
        <Text style={{ color: "white", fontSize: 12, fontStyle: "italic" }}>
          These are your stats
        </Text>
        <Image
          style={{
            height: 150,
            width: 150,
            borderRadius: 50,
            marginVertical: 10,
          }}
          source={require("../assets/avatar.jpg")}
          alt="Avatar"
        />
        <Text style={{ fontSize: 14, color: "white" }}>
          {`${userData.age} YO`}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <View style={styles.exerCount}>
            <Text style={{ fontSize: 20 }}>Exercices</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {userData.exerciseCompleted}
            </Text>
          </View>
          <View style={styles.timeCount}>
            <Text style={{ fontSize: 17 }}>Time Spent</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {formatMilliseconds(userData.timeSpent)}
            </Text>
          </View>
          T Te
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  textContainer: {
    flex: 1,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  statText: {
    color: "white",
    fontSize: 20,
  },
  xpContainer: {
    backgroundColor: "#fff",
  },
  exerCount: {
    backgroundColor: "aliceblue",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 20,
    color: "black",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 90,
    height: 100,
    width: 200,
  },
  timeCount: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 20,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 90,
    height: 100,
    width: 200,
  },
});
