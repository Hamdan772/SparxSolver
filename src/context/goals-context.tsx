
"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ALL_GOALS, Goal } from '@/lib/goals';

export type Achievement = {
  goalId: string;
  date: string; // ISO date string
};

type GoalsContextType = {
  achievedGoals: Achievement[];
  achieveGoal: (goalId: string) => void;
  celebratingGoal: Goal | null;
  clearCelebration: () => void;
};

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export function GoalsProvider({ children }: { children: ReactNode }) {
  const [achievedGoals, setAchievedGoals] = useState<Achievement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [celebratingGoal, setCelebratingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    // This effect runs only on the client
    try {
      const savedGoals = localStorage.getItem('achievedGoals');
      if (savedGoals) {
        setAchievedGoals(JSON.parse(savedGoals));
      }
    } catch (error) {
      console.error("Failed to load goals from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('achievedGoals', JSON.stringify(achievedGoals));
      } catch (error) {
        console.error("Failed to save goals to localStorage", error);
      }
    }
  }, [achievedGoals, isLoaded]);

  const achieveGoal = useCallback((goalId: string) => {
    const goal = ALL_GOALS.find(g => g.id === goalId);
    
    setAchievedGoals((prevGoals) => {
      const alreadyAchieved = prevGoals.some(g => g.goalId === goalId);
      if (alreadyAchieved) {
        if(goal) setCelebratingGoal(goal); // Still celebrate for testing/demo
        return prevGoals;
      }

      if (goal) {
        setCelebratingGoal(goal);
      }

      const newAchievement: Achievement = {
        goalId,
        date: new Date().toISOString(),
      };
      return [...prevGoals, newAchievement];
    });
  }, []);

  const clearCelebration = () => {
    setCelebratingGoal(null);
  };
  
  return (
    <GoalsContext.Provider value={{ achievedGoals, achieveGoal, celebratingGoal, clearCelebration }}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
}
