// import React, { createContext, useContext, useState } from 'react';

// export const [level, setLevel] = useState(1);
// export const [xp, setXp] = useState(0);
// const difficulty = 100;

// export const gainXp = (amount) => {
//     setXp(xp + amount);
//     levelUp();
// };

// const levelUp = () => {
//     if (xp >= difficulty*level) {
//         setLevel(level + 1);
//         setXp(0);
//     }
// };

// export const LevelContext = createContext({
//     level: level,
//     xp: xp,
//     totalXp: level*difficulty,
//     gainXp: gainXp,
// });

// export const LevelContext = createContext(null);

// export const LevelProvider = ({ children }) => {
//     const [level, setLevel] = useState(1);
//     const [xp, setXp] = useState(0);
//     const difficulty = 100;

//     const gainXp = (amount) => {
//         setXp(xp + amount);
//         levelUp();
//     };

//     const levelUp = () => {
//         if (xp >= difficulty*level) {
//             setLevel(level + 1);
//             setXp(0);
//         }
//     };


//     const values = {
//         level,
//         xp,
//         gainXp,
//     }

//     return (
//         <LevelProvider>
//             { children }
//         </LevelProvider>
//     )
// };