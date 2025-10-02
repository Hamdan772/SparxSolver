"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ALL_GOALS } from '@/lib/goals';
import { useGoals } from '@/context/goals-context';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function AchievedGoalsPage() {
  const { achievedGoals } = useGoals();

  return (
    <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Your Achievements
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Celebrate your progress! Here are the goals you&apos;ve achieved so far.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {ALL_GOALS.map((goal) => {
            const achievement = achievedGoals.find(a => a.goalId === goal.id);
            const isAchieved = !!achievement;

            return (
              <Card 
                key={goal.id} 
                className={cn(
                  "flex flex-col items-center justify-center text-center p-6 transition-all", 
                  isAchieved 
                    ? 'border-primary/50 shadow-primary/20 animate-in fade-in zoom-in-95 duration-500' 
                    : 'opacity-60'
                )}
              >
                <div className={cn("mb-4", !isAchieved && "grayscale")}>
                  {goal.icon}
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="font-headline text-xl">{goal.title}</CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {isAchieved ? (
                     <p className="text-xs text-primary font-semibold">
                       Achieved on {format(new Date(achievement.date), 'MMM d, yyyy')}
                     </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Not yet achieved</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
