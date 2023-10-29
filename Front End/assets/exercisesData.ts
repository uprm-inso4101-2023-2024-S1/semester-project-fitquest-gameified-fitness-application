export interface Exercise {
  name: string;
  category: string;
  duration: number;
  selected: boolean;
  description: string;
  gif_link: string; // Added gif_link property
  xp: number;
}

export const exercisesData: Exercise[] = [
  {
    name: "Overhead Press",
    category: "arms",
    duration: 60000,
    selected: false,
    description:
      "A compound exercise that targets the shoulders and triceps while also engaging the core.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Bicep Curl",
    category: "arms",
    duration: 60000,
    selected: false,
    description:
      "An isolation exercise for the biceps, usually performed with dumbbells.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Tricep Dip",
    category: "arms",
    duration: 60000,
    selected: false,
    description:
      "Targets the triceps and can be done using parallel bars or a sturdy surface.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Squat",
    category: "legs",
    duration: 60000,
    selected: false,
    description:
      "A compound lower body exercise that targets the quadriceps, hamstrings, and glutes.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Lunges",
    category: "legs",
    duration: 60000,
    selected: false,
    description:
      "A unilateral leg exercise that strengthens the quadriceps and glutes.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Deadlift",
    category: "legs",
    duration: 60000,
    selected: false,
    description:
      "A powerful compound exercise that targets the lower back, hamstrings, and glutes.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Pull-Up",
    category: "back",
    duration: 60000,
    selected: false,
    description:
      "A bodyweight exercise that targets the back, specifically the lats.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Rowing",
    category: "back",
    duration: 60000,
    selected: false,
    description:
      "A machine or barbell exercise that works the upper back and traps.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Lat Pulldown",
    category: "back",
    duration: 60000,
    selected: false,
    description:
      "An exercise that targets the latissimus dorsi muscles using a cable machine.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Crunches",
    category: "abs",
    duration: 60000,
    selected: false,
    description:
      "An abdominal exercise that helps strengthen the rectus abdominis.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Plank",
    category: "abs",
    duration: 60000,
    selected: false,
    description:
      "A core-strengthening exercise that engages the entire abdominal region.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
  {
    name: "Russian Twists",
    category: "abs",
    duration: 60000,
    selected: false,
    description: "An exercise that targets the obliques and core muscles.",
    gif_link: "", // Added gif_link as an empty string
    xp: 10,
  },
];
