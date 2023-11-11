import React, { createContext, useState } from 'react';

// Create the context with a default value
export const LevelContext = createContext({
    level: 0,
    xp: 0,
    totalXp: 0,
    gainXp: (amount: number) => {},
});

export const LevelProvider: React.FC = ({ children }) => {
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const difficulty = 100;

    const gainXp = (amount: number) => {
        const newXp = xp + amount;
        setXp(newXp);

        // Check if the user should level up
        if (newXp >= difficulty * level) {
            setLevel(prevLevel => prevLevel + 1);
            setXp(0);  // Reset XP after leveling up
        }
    };

    return (
        <LevelContext.Provider value={{
            level,
            xp,
            totalXp: difficulty * level,
            gainXp
        }}>
            {children}
        </LevelContext.Provider>
    );
};

