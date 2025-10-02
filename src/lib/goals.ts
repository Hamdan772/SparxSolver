import React from 'react';
import { Award, BookOpen, MessageCircle, Mic, Sparkles, Users } from 'lucide-react';

export type Goal = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const ALL_GOALS: Goal[] = [
  {
    id: 'first-chapter',
    icon: React.createElement(BookOpen, { className: "w-10 h-10 text-primary" }),
    title: 'First Chapter',
    description: 'Completed your first role-play scenario.',
  },
  {
    id: 'ice-breaker',
    icon: React.createElement(MessageCircle, { className: "w-10 h-10 text-primary" }),
    title: 'Ice Breaker',
    description: 'Generated 10 conversation starters.',
  },
  {
    id: 'podium-pro',
    icon: React.createElement(Mic, { className: "w-10 h-10 text-primary" }),
    title: 'Podium Pro',
    description: 'Completed 5 public speaking exercises.',
  },
  {
    id: 'confidence-builder',
    icon: React.createElement(Sparkles, { className: "w-10 h-10 text-primary" }),
    title: 'Confidence Builder',
    description: 'Finished the confidence building module.',
  },
  {
    id: 'social-butterfly',
    icon: React.createElement(Users, { className: "w-10 h-10 text-primary" }),
    title: 'Social Butterfly',
    description: 'Practiced 10 different social scenarios.',
  },
  {
    id: 'goal-getter',
    icon: React.createElement(Award, { className: "w-10 h-10 text-primary" }),
    title: 'Goal Getter',
    description: 'Achieved all available goals.',
  },
];
