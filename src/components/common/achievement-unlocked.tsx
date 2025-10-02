"use client";

import { useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useGoals } from '@/context/goals-context';

export default function AchievementUnlocked() {
  const { celebratingGoal, clearCelebration } = useGoals();

  useEffect(() => {
    if (celebratingGoal) {
      const timer = setTimeout(() => {
        clearCelebration();
      }, 3000); // Animation duration + time to admire

      return () => clearTimeout(timer);
    }
  }, [celebratingGoal, clearCelebration]);

  if (!celebratingGoal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="achievement-card">
        <Card className="w-full max-w-sm text-center p-8">
            <div className="achievement-badge inline-block p-4 rounded-full bg-primary/10 mb-4">
                {celebratingGoal.icon}
            </div>
          <CardHeader className="p-0">
            <p className="text-sm font-semibold text-primary mb-2">ACHIEVEMENT UNLOCKED!</p>
            <CardTitle className="font-headline text-2xl">{celebratingGoal.title}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
