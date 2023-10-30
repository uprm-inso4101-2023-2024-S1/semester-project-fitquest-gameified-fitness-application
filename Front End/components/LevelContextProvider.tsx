import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';

interface LevelContextType {
  level: number;
  xp: number;
  totalXp: number;
  difficulty: number;
  gainXp: (amount: number) => void;
  levelUp: () => void;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

interface LevelContextProviderProps {
  children: ReactNode;
}

export const LevelContextProvider: React.FC<LevelContextProviderProps> = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [difficulty, setDifficulty] = useState(100);
  const [totalXp, setTotalXp] = useState(difficulty * level);
  
  const levelUp = () => {
    if (xp >= difficulty * level) {
      setLevel(level + 1);
      setXp(0);
      setTotalXp(difficulty * (level + 1)); 
    }
  };
  
  const gainXp = (amount: number) => {
    setXp(xp + amount);
    levelUp();
  };
  
  
    return (
      <LevelContext.Provider value={{ level, xp, totalXp, difficulty, gainXp, levelUp }}>
        {children}
      </LevelContext.Provider>
    );
};

const useLevelContext = () => {
  const context = useContext(LevelContext);
  if (context === undefined) {
    throw new Error('useLevelContext must be used within a LevelContextProvider');
  }
  return context;
};

export { useLevelContext };
