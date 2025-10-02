"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MessageCircle, 
  Lightbulb,
  Brain,
  Mic,
  Target,
  Zap
} from 'lucide-react';
import { aiCoach } from '@/ai/flows/ai-coach';
import { useGoals } from '@/context/goals-context';
import { useProgress } from '@/context/progress-context';
import { useAuth } from '@/components/auth/auth-provider';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  prompt: string;
  gradient: string;
}

const quickActions: QuickAction[] = [
  {
    icon: MessageCircle,
    label: 'Conversation Tips',
    prompt: 'Give me 3 practical tips for starting conversations with new people.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Lightbulb,
    label: 'Confidence Boost',
    prompt: 'I\'m feeling nervous about an upcoming social event. Can you help me build confidence?',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Mic,
    label: 'Public Speaking',
    prompt: 'How can I overcome my fear of public speaking and present more confidently?',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Target,
    label: 'Social Goals',
    prompt: 'Help me set achievable social skills goals for this month.',
    gradient: 'from-purple-500 to-pink-500'
  }
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: 'Hello! I\'m your AI Social Skills Coach. I\'m here to help you build confidence, improve your communication, and develop stronger social connections. What would you like to work on today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { achieveGoal } = useGoals();
  const { logActivity } = useProgress();
  const { user } = useAuth();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    try {
      const response = await aiCoach({
        topic: 'general social skills',
        history: messages.map(m => ({ role: m.role, content: m.content }))
      });

      setIsTyping(false);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Log activity and check for achievements
      logActivity('public speaking'); // Generic AI coaching activity
      
      // Check for coaching achievements
      const coachingCount = messages.filter(m => m.role === 'user').length + 1;
      if (coachingCount >= 5) {
        achieveGoal('ai-conversation-master');
      }
      
    } catch (error) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 ai-gradient rounded-xl animate-float">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl ai-gradient-text">AI Social Coach</CardTitle>
              <p className="text-muted-foreground">
                Your personal AI assistant for social skills development
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-ai-pulse"></div>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                AI Active
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Chat Area */}
      <div className="flex-1 flex gap-6">
        {/* Main Chat */}
        <Card className="flex-1 glass-card flex flex-col">
          <CardContent className="flex-1 flex flex-col p-6">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-fade-in-up ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'model' && (
                      <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                        <div className="w-full h-full ai-gradient rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-12'
                          : 'bg-muted mr-12'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>

                    {message.role === 'user' && (
                      <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                        <AvatarFallback className="bg-primary/20 text-primary">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 animate-fade-in-up">
                    <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                      <div className="w-full h-full ai-gradient rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </Avatar>
                    <div className="bg-muted rounded-2xl px-4 py-3 max-w-[80%]">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ai-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-ai-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-ai-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="pt-4 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about social skills..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(inputValue);
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => sendMessage(inputValue)}
                  disabled={isLoading || !inputValue.trim()}
                  className="ai-gradient hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Sidebar */}
        <div className="w-80 space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 group hover:scale-105 transition-all duration-200"
                  onClick={() => handleQuickAction(action.prompt)}
                  disabled={isLoading}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient} mr-3`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{action.label}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Session Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Messages</span>
                <Badge variant="secondary">{messages.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Topic</span>
                <Badge variant="outline">General Skills</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className="bg-green-500/20 text-green-400">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}