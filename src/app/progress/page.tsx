"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { useProgress, ActivityType } from '@/context/progress-context';
import { subDays, format } from 'date-fns';
import { Button } from '@/components/ui/button';

const ACTIVITY_CONFIG = {
  'public speaking': { label: 'Public Speaking', color: 'hsl(var(--chart-1))' },
  'confidence building': { label: 'Confidence', color: 'hsl(var(--chart-2))' },
  'friendship advice': { label: 'Friendship', color: 'hsl(var(--chart-3))' },
  'role-play': { label: 'Role-Play', color: 'hsl(var(--chart-4))' },
  'conversation-starter': { label: 'Icebreakers', color: 'hsl(var(--chart-5))' },
};

export default function ProgressPage() {
  const { activities, resetProgress } = useProgress();

  const weeklyActivity = useMemo(() => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => subDays(today, 6 - i));
    
    return last7Days.map(day => {
      const formattedDate = format(day, 'EEE');
      const dayActivities = activities.filter(act => format(new Date(act.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
      
      const activityCounts = dayActivities.reduce((acc, act) => {
        acc[act.type] = (acc[act.type] || 0) + 1;
        return acc;
      }, {} as Record<ActivityType, number>);

      return { date: formattedDate, ...activityCounts };
    });
  }, [activities]);

  const totalActivityByType = useMemo(() => {
    const counts = activities.reduce((acc, act) => {
      acc[act.type] = (acc[act.type] || 0) + 1;
      return acc;
    }, {} as Record<ActivityType, number>);
    
    return Object.entries(counts).map(([type, count]) => ({
      type: ACTIVITY_CONFIG[type as ActivityType].label,
      count,
      fill: ACTIVITY_CONFIG[type as ActivityType].color,
    }));
  }, [activities]);
  
  const totalInteractions = activities.length;

  return (
    <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalInteractions}</div>
                <p className="text-xs text-muted-foreground">
                  Total activities logged since you started.
                </p>
              </CardContent>
            </Card>
          </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 animate-stagger-in mt-8" style={{animationDelay: '200ms'}}>
          <Card style={{ animationDelay: '0ms' }}>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Your practice sessions over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={ACTIVITY_CONFIG} className="min-h-[200px] w-full">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid vertical={false} stroke="hsl(var(--border) / 0.5)" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    {Object.entries(ACTIVITY_CONFIG).map(([key, config]) => (
                      <Bar
                        key={key}
                        dataKey={key}
                        stackId="a"
                        fill={config.color}
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle>Activity Breakdown</CardTitle>
              <CardDescription>How your practice is distributed.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
               <ChartContainer config={ACTIVITY_CONFIG} className="min-h-[200px] w-full max-w-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="type" />} />
                    <Pie
                      data={totalActivityByType}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      labelLine={false}
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                      }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                            className="text-xs font-bold"
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                      {totalActivityByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                      ))}
                    </Pie>
                     <ChartLegend
                      content={<ChartLegendContent nameKey="type" />}
                      />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

         <div className="flex justify-end mt-4">
            <Button variant="destructive" onClick={resetProgress}>
              Reset Progress Data
            </Button>
          </div>
      </div>
    </main>
  );
}
