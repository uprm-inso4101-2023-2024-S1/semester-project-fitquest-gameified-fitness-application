import { Exercise } from "./exercisesData";

export interface Workout {
  key: number;
  workout_name: string;
  exercises: Exercise[];
}

export let Workouts: Workout[] = [
  {
    key: 0,
    workout_name: "Full Body from Home",
    exercises: [

      { name: "Squats",  category: "", duration: 10000, selected: false, description: "", gif_link: "" },
      { name: "Push Ups", category: "", duration: 10000, selected: false, description: "", gif_link: "" },
      { name: "Pull Ups",category: "", duration: 10000, selected: false, description: "", gif_link: "" },
    ], //More field may need to be added as needed.

  },
  {
    key: 1,
    workout_name: "Arms",
    exercises: [
      {

        name: "Single Arm Row",
        category: "", // Add category
        duration: 10000,
        selected: false, // Add selected
        description: "",
        gif_link: "",
      },
      {
        name: "Overhead Shoulder Press",
        category: "", // Add category
        duration: 10000,
        selected: false, // Add selected
        description: "",
        gif_link: "",
      },
      { name: "Reverse Fly",category: "", duration: 10000, selected: false, description: "", gif_link: "" },
    ], //More field may need to be added as needed.

  },
  {
    key: 2,
    workout_name: "Legs",
    exercises: [

      { name: "Squats", category: "", duration: 10000,selected: false, description: "", gif_link: "" },
      {
        name: "Walking Lunges",
        category: "", // Add category
        duration: 10000,
        selected: false, // Add selected
        description: "",
        gif_link: "",
      },
      { name: "Step Ups", category: "", duration: 10000,selected: false, description: "", gif_link: "" },
    ], //More field may need to be added as needed.

  },
];
