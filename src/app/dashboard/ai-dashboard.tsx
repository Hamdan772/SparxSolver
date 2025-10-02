"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  MessageCircle,
  Users,
  Sparkles,
  BarChart3,
  Clock,
  Award,
  Lightbulb,
  Mic,
  Calendar,
  Star,
  Activity
} from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { useProgress } from '@/context/progress-context';
import { useGoals } from '@/context/goals-context';

interface AIInsight {
  id: string;
  type: 'suggestion' | 'achievement' | 'tip';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: string;
  href?: string;
}

interface ActivityStat {
  name: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function AIDashboard() {
  const { user } = useAuth();
  const { activities } = useProgress();
  const { achievedGoals } = useGoals();
  const [greeting, setGreeting] = useState('');
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Compute stats from activities
  const totalActivities = activities.length;
  const weeklyStats = {
    conversations: activities.filter(a => a.type === 'conversation-starter').length,
    rolePlay: activities.filter(a => a.type === 'role-play').length,
    aiCoach: activities.filter(a => a.type === 'public speaking' || a.type === 'confidence building' || a.type === 'friendship advice').length,
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Generate AI insights based on user progress
    const insights: AIInsight[] = [
      {
        id: '1',
        type: 'suggestion',
        title: 'Ready for a challenge?',
        description: 'Try a public speaking scenario to boost your confidence.',
        icon: Mic,
        action: 'Start Session',
        href: '/public-speaking'
      },
      {
        id: '2',
        type: 'tip',
        title: 'AI Tip of the Day',
        description: 'Practice active listening by summarizing what others say before responding.',
        icon: Brain,
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Streak Building!',
        description: `You've been active for ${Math.floor(Math.random() * 7) + 1} days straight. Keep it up!`,
        icon: Target,
      }
    ];
    setAiInsights(insights);
  }, []);

  const activityStats: ActivityStat[] = [
    { name: 'Conversations', count: weeklyStats.conversations || 0, icon: MessageCircle, color: 'text-blue-400' },
    { name: 'Role-Plays', count: weeklyStats.rolePlay || 0, icon: Users, color: 'text-green-400' },
    { name: 'AI Sessions', count: weeklyStats.aiCoach || 0, icon: Brain, color: 'text-purple-400' },
    { name: 'Achievements', count: achievedGoals.length, icon: Award, color: 'text-yellow-400' },
  ];

  const quickActions = [
    {
      title: 'AI Coach Chat',
      description: 'Get personalized advice',
      icon: Brain,
      href: '/ai-chat',
      gradient: 'from-purple-500 to-pink-500',
      isAI: true
    },
    {
      title: 'Smart Icebreakers',
      description: 'AI-generated conversation starters',
      icon: Lightbulb,
      href: '/conversation-starters',
      gradient: 'from-blue-500 to-cyan-500',
      isAI: true
    },
    {
      title: 'Role-Play AI',
      description: 'Practice with AI scenarios',
      icon: Users,
      href: '/role-play',
      gradient: 'from-green-500 to-emerald-500',
      isAI: true
    },
    {
      title: 'Speech Coach',
      description: 'AI public speaking trainer',
      icon: Mic,
      href: '/public-speaking',
      gradient: 'from-orange-500 to-red-500',
      isAI: true
    }
  ];

  const progressData = {
    weeklyGoal: 10,
    completed: totalActivities % 10 || 3,
    streak: Math.floor(Math.random() * 12) + 1,
    nextMilestone: 25 - (totalActivities % 25)
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl ai-gradient p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {greeting}, {user?.email?.split('@')[0] || 'Friend'}!
              </h1>
              <p className="text-white/90 text-lg">
                Your AI-powered social skills journey continues
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{currentTime.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{progressData.streak}</div>
              <div className="text-sm text-white/80">Day Streak</div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 neural-bg opacity-20"></div>
      </div>

      {/* AI Insights */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights & Suggestions
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {aiInsights.map((insight) => (
            <Card key={insight.id} className="glass-card hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className={`
                    p-2 rounded-lg 
                    ${insight.type === 'suggestion' ? 'bg-blue-500/20 text-blue-400' : 
                      insight.type === 'achievement' ? 'bg-green-500/20 text-green-400' : 
                      'bg-purple-500/20 text-purple-400'}
                  `}>
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                    {insight.action && insight.href && (
                      <Button asChild size="sm" className="h-8">
                        <Link href={insight.href}>
                          {insight.action} <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          AI-Powered Tools
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="group hover:scale-105 transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <Link href={action.href} className="block">
                  <div className={`p-6 bg-gradient-to-br ${action.gradient} text-white relative overflow-hidden`}>
                    <div className="relative z-10">
                      <action.icon className="h-8 w-8 mb-3" />
                      <h3 className="font-semibold mb-2">{action.title}</h3>
                      <p className="text-sm text-white/90">{action.description}</p>
                      {action.isAI && (
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-ai-pulse"></div>
                          <span className="text-xs">AI-Powered</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 neural-bg opacity-20"></div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Progress & Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Progress */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Weekly Progress
            </CardTitle>
            <CardDescription>
              {progressData.completed} of {progressData.weeklyGoal} activities completed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{Math.round((progressData.completed / progressData.weeklyGoal) * 100)}%</span>
              </div>
              <Progress 
                value={(progressData.completed / progressData.weeklyGoal) * 100} 
                className="h-3"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {progressData.nextMilestone} activities to next milestone
              </span>
              <Badge variant="secondary">
                <Star className="h-3 w-3 mr-1" />
                Level {Math.floor(totalActivities / 10) + 1}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Activity Stats */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Activity Stats
            </CardTitle>
            <CardDescription>
              Your engagement this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {activityStats.map((stat) => (
                <div key={stat.name} className="text-center p-3 rounded-lg bg-muted/50">
                  <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <div className="text-xs text-muted-foreground">{stat.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      {achievedGoals.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {achievedGoals.slice(-6).map((goal, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/20 text-primary">
                  <Award className="h-3 w-3 mr-1" />
                  Goal Achieved
                </Badge>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/achieved-goals">
                View All Achievements <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}