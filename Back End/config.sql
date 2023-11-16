-- Create the 'users' table
CREATE TABLE users (
    user_id serial PRIMARY KEY,
    name varchar(100),
    email varchar(100),
    password varchar(100),
    exercise_count int,
    time_exercised TIME,
    experience_points int
);

-- Create the 'category' table
CREATE TABLE category (
    category_id serial PRIMARY KEY,
    name varchar(100)
);

-- Create the 'exercise' table with a foreign key reference to 'category'
CREATE TABLE exercise (
    exercise_id serial PRIMARY KEY,
    exercise_name varchar(100),
    description varchar(100),
    suggested_time TIME,
    category_id INT REFERENCES category(category_id),
    experience_points INT
);

-- Create the 'user_workouts' table
CREATE TABLE user_workouts (
    workout_id serial PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    name varchar(100)
    -- Additional attributes for user workouts, if needed
);

-- Create the 'predefined_workouts' table
CREATE TABLE predefined_workouts (
    workout_id serial PRIMARY KEY,
    name varchar(100)
    -- Additional attributes for predefined workouts, if needed
);

-- Create a junction table to associate exercises with user-created workouts
CREATE TABLE user_workout_exercises (
    user_workout_id INT REFERENCES user_workouts(workout_id),
    exercise_id INT REFERENCES exercise(exercise_id)
);

-- Create a junction table to associate exercises with predefined workouts
CREATE TABLE predefined_workout_exercises (
    predefined_workout_id INT REFERENCES predefined_workouts(workout_id),
    exercise_id INT REFERENCES exercise(exercise_id)
);

-- Create the 'equipment' table
CREATE TABLE equipment (
    id serial PRIMARY KEY,
    name varchar(100)
);

-- Create a junction table to associate equipment with exercises and specify the quantity
CREATE TABLE exercise_equipment (
    exercise_id INT REFERENCES exercise(exercise_id),
    equipment_id INT REFERENCES equipment(id),
    quantity int
);

-- Create the 'Roadmap' table
CREATE TABLE roadmaps (
    roadmap_id serial PRIMARY KEY,
    name varchar(100),
    description varchar(100),
    levels int --keep track of he maximum workouts on the roadmap
    -- Additional attributes for roadmaps, if needed
);

-- Create a junction table to associate workouts with roadmaps
CREATE TABLE roadmap_workouts (
    roadmap_id INT REFERENCES roadmaps(roadmap_id),
    workout_id INT REFERENCES predefined_workouts(workout_id), -- Reference user-created workouts
    position int --may help with the order of the exercise
);

-- Create the 'user_roadmap_progress' table
CREATE TABLE user_roadmap_progress (
    user_id INT REFERENCES users(user_id),
    roadmap_id INT REFERENCES roadmaps(roadmap_id),
    current_level int, -- Track the user's current level in the roadmap
    completed_workouts int -- Number of completed workouts in the roadmap by the user
    -- Additional attributes to track progress as needed
);


-- Add any other tables or relationships here as needed


-- Create the 'category' table
CREATE TABLE category (
    category_id serial PRIMARY KEY,
    name varchar(100)
);

-- Create the 'exercise' table with a foreign key reference to 'category'
CREATE TABLE exercise (
    exercise_id serial PRIMARY KEY,
    exercise_name varchar(100),
    description varchar(100),
    suggested_time TIME,
    category_id INT REFERENCES category(category_id),
    experience_points INT
);

-- Create the 'user_workouts' table
CREATE TABLE user_workouts (
    workout_id serial PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    name varchar(100)
    -- Additional attributes for user workouts, if needed
);

-- Create the 'predefined_workouts' table
CREATE TABLE predefined_workouts (
    workout_id serial PRIMARY KEY,
    name varchar(100)
    -- Additional attributes for predefined workouts, if needed
);

-- Create a junction table to associate exercises with user-created workouts
CREATE TABLE user_workout_exercises (
    user_workout_id INT REFERENCES user_workouts(workout_id),
    exercise_id INT REFERENCES exercise(exercise_id)
);

-- Create a junction table to associate exercises with predefined workouts
CREATE TABLE predefined_workout_exercises (
    predefined_workout_id INT REFERENCES predefined_workouts(workout_id),
    exercise_id INT REFERENCES exercise(exercise_id)
);

-- Create the 'equipment' table
CREATE TABLE equipment (
    id serial PRIMARY KEY,
    name varchar(100)
);

-- Create a junction table to associate equipment with exercises and specify the quantity
CREATE TABLE exercise_equipment (
    exercise_id INT REFERENCES exercise(exercise_id),
    equipment_id INT REFERENCES equipment(id),
    quantity int
);

-- Create the 'Roadmap' table
CREATE TABLE roadmaps (
    roadmap_id serial PRIMARY KEY,
    name varchar(100),
    description varchar(100),
    levels int --keep track of he maximum workouts on the roadmap
    -- Additional attributes for roadmaps, if needed
);

-- Create a junction table to associate workouts with roadmaps
CREATE TABLE roadmap_workouts (
    roadmap_id INT REFERENCES roadmaps(roadmap_id),
    workout_id INT REFERENCES predefined_workouts(workout_id), -- Reference user-created workouts
    position int --may help with the order of the exercise
);

-- Create the 'user_roadmap_progress' table
CREATE TABLE user_roadmap_progress (
    user_id INT REFERENCES users(user_id),
    roadmap_id INT REFERENCES roadmaps(roadmap_id),
    current_level int, -- Track the user's current level in the roadmap
    completed_workouts int -- Number of completed workouts in the roadmap by the user
    -- Additional attributes to track progress as needed
);


-- Add any other tables or relationships here as needed
