import { View, Text, Button } from "react-native";

export default function WorkoutPage({ navigation }) {
  return (
    <View>
      <Text>Menu of Workouts and Button to custom Workout screen</Text>
      <Button
        title="Create Your Own"
        onPress={() => navigation.navigate("CustomWorkout")}
      />
      <Text>
        Premade Workouts, When one of them is selected the Timer has to queue
        and start all the intervals of the exercices
      </Text>
    </View>
  );
}
