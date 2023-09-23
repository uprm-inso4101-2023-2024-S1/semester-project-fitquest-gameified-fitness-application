import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { exercises } from '../assets/exercisesData';

const CustomWorkouts = ({ navigation }) => {

  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const categories = Array.from(new Set(exercises.map((exercise) => exercise.category)));

  const handleCategoryToggle = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((cat) => cat !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const isCategoryExpanded = (category) => expandedCategories.includes(category);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Workout System</Text>
      <View style={styles.categoryList}>
        {categories.map((category) => (
          <View key={category} style={styles.categoryCard}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => handleCategoryToggle(category)}
            >
              <Text style={styles.categoryHeaderText}>{category}</Text>
              <Ionicons
                name={isCategoryExpanded(category) ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            {isCategoryExpanded(category) && (
              <View style={styles.exerciseList}>
                {exercises
                  .filter((exercise) => exercise.category === category)
                  .map((exercise, index) => (
                    <Text key={index} style={styles.exercise}>{exercise.name}</Text>
                  ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoryList: {
    flex: 1,
  },
  categoryCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
    overflow: "hidden",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  categoryHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  exerciseList: {
    padding: 16,
  },
  exercise: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default CustomWorkouts;
