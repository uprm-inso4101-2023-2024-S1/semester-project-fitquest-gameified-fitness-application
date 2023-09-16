import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './components/StopWatch';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { workoutPage } from './pages/WorkoutPage';
import { socialPage } from './pages/SocialPage';
import { profilePage } from './pages/ProfilePage';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Workout" component={workoutPage} />
        <Tab.Screen name="Social" component={socialPage} />
        <Tab.Screen name="Profile" component={profilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
