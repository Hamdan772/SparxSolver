"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type ActivityType = 
  | 'public speaking'
  | 'confidence building'
  | 'friendship advice'
  | 'role-play'
  | 'conversation-starter';

export type ActivityLog = {
  type: ActivityType;
  date: string; // ISO date string
};

type ProgressContextType = {
  activities: ActivityLog[];
  logActivity: (type: ActivityType) => void;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This effect runs only on the client
    try {
      const savedActivities = localStorage.getItem('activities');
      if (savedActivities) {
        setActivities(JSON.parse(savedActivities));
      }
    } catch (error) {
      console.error("Failed to load activities from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('activities', JSON.stringify(activities));
      } catch (error) {
        console.error("Failed to save activities to localStorage", error);
      }
    }
  }, [activities, isLoaded]);

  const logActivity = useCallback((type: ActivityType) => {
    setActivities((prevActivities) => {
      const newActivity: ActivityLog = {
        type,
        date: new Date().toISOString(),
      };
      return [...prevActivities, newActivity];
    });
  }, []);

  const resetProgress = () => {
    setActivities([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('activities');
    }
  }
  
  return (
    <ProgressContext.Provider value={{ activities, logActivity, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
