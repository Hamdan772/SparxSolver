"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Brain,
  MessageCircle,
  Users,
  Zap,
  Target,
  BarChart3,
  Trophy,
  Home,
  Bot,
  Sparkles,
  TrendingUp,
  Lightbulb,
  Mic,
  LogOut,
  Menu,
  X,
  Settings,
  User,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PageHeader from "../common/page-header";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  isAI?: boolean;
  badge?: string;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "AI Dashboard", icon: Brain, title: "AI-Powered Dashboard", isAI: true },
  { href: "/progress", label: "Progress", icon: TrendingUp, title: "Your Progress" },
  { href: "/achieved-goals", label: "Achievements", icon: Trophy, title: "Achieved Goals" },
];

const aiCoachItems: NavItem[] = [
  { href: "/ai-chat", label: "AI Coach", icon: Bot, title: "Personal AI Coach", isAI: true, badge: "Smart" },
  { href: "/conversation-starters", label: "Icebreakers", icon: Lightbulb, title: "AI Conversation Starters", isAI: true },
  { href: "/role-play", label: "Role-Play", icon: Users, title: "AI-Powered Scenarios", isAI: true },
  { href: "/public-speaking", label: "Speech Coach", icon: Mic, title: "AI Public Speaking Coach", isAI: true },
  { href: "/confidence-building", label: "Confidence", icon: Sparkles, title: "AI Confidence Building", isAI: true },
];

function NavItemComponent({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={`
          group relative h-12 rounded-xl transition-all duration-200 
          ${isActive 
            ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/20' 
            : 'hover:bg-muted/50 hover:text-foreground'
          }
          ${item.isAI ? 'hover:shadow-lg hover:shadow-primary/10' : ''}
        `}
      >
        <Link href={item.href} className="flex items-center gap-3 px-4">
          <div className={`
            p-2 rounded-lg transition-all duration-200
            ${item.isAI 
              ? 'bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20' 
              : 'bg-muted/50'
            }
          `}>
            <item.icon className={`h-4 w-4 ${item.isAI ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-sm font-medium">{item.label}</span>
            {item.isAI && (
              <span className="text-xs text-muted-foreground">AI-Powered</span>
            )}
          </div>
          {item.badge && (
            <div className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
              {item.badge}
            </div>
          )}
          {item.isAI && (
            <div className="w-2 h-2 bg-primary rounded-full animate-ai-pulse"></div>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function ModernAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  // Removed collapsible state for now to fix UI glitches
  
  const currentNavItem = [...navItems, ...aiCoachItems].find((item) => 
    pathname.startsWith(item.href)
  );
  const pageTitle = currentNavItem ? currentNavItem.title : "Social Spark AI";

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background neural-bg">
        {/* Modern Sidebar with Glassmorphism */}
        <Sidebar className="glass-nav border-r-0">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 ai-gradient rounded-xl shadow-lg animate-float">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold ai-gradient-text">Social Spark</h2>
                <p className="text-sm text-muted-foreground">AI-Powered Social Skills</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4 space-y-2">
            {/* Main Navigation */}
            <SidebarMenu>
              {navItems.map((item) => (
                <NavItemComponent
                  key={item.href}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                />
              ))}
            </SidebarMenu>

            <SidebarSeparator className="my-6 bg-border/50" />

            {/* AI Coach Section */}
            <div className="space-y-2">
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  AI Coaching
                </h3>
              </div>
              <SidebarMenu>
                {aiCoachItems.map((item) => (
                  <NavItemComponent
                    key={item.href}
                    item={item}
                    isActive={pathname.startsWith(item.href)}
                  />
                ))}
              </SidebarMenu>
            </div>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src={(user as any).photoURL || undefined} />
                <AvatarFallback className="bg-primary/20 text-primary font-medium">
                  {(user as any).displayName?.[0] || user.email?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {(user as any).displayName || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="flex-1">
          <div className="flex flex-col min-h-screen">
            {/* Modern Header */}
            <header className="glass-card border-b border-border/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 flex items-center justify-center">
                    <Menu className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <PageHeader title={pageTitle} />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Settings className="h-4 w-4" />
                  </Button>
                  {currentNavItem?.isAI && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                      <div className="w-2 h-2 bg-primary rounded-full animate-ai-pulse"></div>
                      <span className="text-xs font-medium text-primary">AI Active</span>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6">
              <div className="mx-auto max-w-7xl">
                {children}
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}