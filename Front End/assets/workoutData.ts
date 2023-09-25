//This would be the data loaded from our database.

export let Workouts = [
  {
    key: 0,
    workout_name: "Full Body from Home",
    exercises: [
      { name: "Squats", duration: 10000, description: "", gif_link: "" },
      { name: "Push Ups", duration: 10000, description: "", gif_link: "" },
      { name: "Pull Ups", duration: 10000, description: "", gif_link: "" },
    ], //More field may need to be added as needed.
  },
  ,
  {
    key: 1,
    workout_name: "Arms",
    exercises: [
      {
        name: "Single Arm Row",
        duration: 10000,
        description: "",
        gif_link: "",
      },
      {
        name: "Overhead Shoulder Press",
        duration: 10000,
        description: "",
        gif_link: "",
      },
      { name: "Reverse Fly", duration: 10000, description: "", gif_link: "" },
    ], //More field may need to be added as needed.
  },
  {
    key: 2,
    workout_name: "Legs",
    exercises: [
      { name: "Squats", duration: 10000, description: "", gif_link: "" },
      {
        name: "Walking Lunges",
        duration: 10000,
        description: "",
        gif_link: "",
      },
      { name: "Step Ups", duration: 10000, description: "", gif_link: "" },
    ], //More field may need to be added as needed.
  },
]; //Todo Add workout dummy data
