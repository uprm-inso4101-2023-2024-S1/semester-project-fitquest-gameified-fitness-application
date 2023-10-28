import { Exercise, exercisesData } from "./exercisesData";

export interface Workout {
  key: number;
  workout_name: string;
  exercises: Exercise[];
}

const getRandomExercisesFromCategory = (category: string): Exercise | undefined => {
  const exercisesFromCategory = exercisesData.filter(e => e.category === category);
  if(exercisesFromCategory.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * exercisesFromCategory.length);
  return exercisesFromCategory[randomIndex];
}

export let Workouts: Workout[] = [
  {
    key: 0,
    workout_name: "Full Body from home",
    get exercises() {
      return [
        getRandomExercisesFromCategory("arms"),
        getRandomExercisesFromCategory("legs"),
        getRandomExercisesFromCategory("abs"),
        getRandomExercisesFromCategory("back")
      ].filter(Boolean) as Exercise[]; // filter out undefined values so we dont get 'undefined' on the exercises list
    }
  },
  {
    key: 1,
    workout_name: "leg hell",
    get exercises() {
      let arr = Array(10);

      for(let i = 0; i < arr.length; i++) {
        arr[i] = getRandomExercisesFromCategory("legs");
      };
      return arr;
    }
  }
];
