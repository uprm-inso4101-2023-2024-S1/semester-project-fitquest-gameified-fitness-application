import { Exercise } from "./exercisesData";

export interface Workout {
  key: number;
  workout_name: string;
  exercises: Exercise[];
}

export let Workouts: Workout[] = [
  {
    key: 0,
    workout_name: "",
    exercises: [
      {
        name: "",
        category: "", // Add category
        duration: 10000,
        selected: false, // Add selected
        description: "", // Add description
        gif_link: "", // Add gif_link
      },
      {
        name: "",
        category: "", // Add category
        duration: 10000,
        selected: false, // Add selected
        description: "", // Add description
        gif_link: "", // Add gif_link
      },
    ],
  },
  {
    key: 1,
    workout_name: "",
    exercises: [
      {
        name: "",
        category: "", // Add category
        duration: 10000,
        selected: false, // Add selected
        description: "", // Add description
        gif_link: "", // Add gif_link
      },
      {
        name: "",
        category: "", // Add category
        duration: 10000,
        selected: false, // Add selected
        description: "", // Add description
        gif_link: "", // Add gif_link
      },
    ],
  },
  {
    key: 2,
    workout_name: "",
    exercises: [
      {
        name: "",
        category: "", // Add category
        duration: 10000,
        selected: false, // Add selected
        description: "", // Add description
        gif_link: "", // Add gif_link
      },
      {
        name: "",
        category: "", // Add category
        duration: 10000,
        selected: false, // Add selected
        description: "", // Add description
        gif_link: "", // Add gif_link
      },
    ],
  },
];
