"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HeartHandshake,
  LayoutDashboard,
  MessageSquareQuote,
  Mic,
  Sparkles,
  Users,
  LogOut,
  Award,
  TrendingUp,
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
import PageHeader from "../common/page-header";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, title: "Dashboard" },
  { href: "/progress", label: "Progress", icon: TrendingUp, title: "Your Progress" },
  { href: "/achieved-goals", label: "Achievements", icon: Award, title: "Your Achievements" },
];

const practiceNavItems = [
  { href: "/role-play", label: "Role-Play", icon: Users, title: "Role-Play Scenarios" },
  { href: "/conversation-starters", label: "Icebreakers", icon: MessageSquareQuote, title: "Conversation Starters" },
  { href: "/friendship-advice", label: "Friendship", icon: HeartHandshake, title: "Friendship Coach" },
  { href: "/public-speaking", label: "Public Speaking", icon: Mic, title: "Public Speaking Coach" },
  { href: "/confidence-building", label: "Confidence", icon: Sparkles, title: "Confidence Building Coach" },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const currentNavItem = [...navItems, ...practiceNavItems].find((item) => pathname.startsWith(item.href));
  const pageTitle = currentNavItem ? currentNavItem.title : "Social Spark";

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold font-headline group-data-[collapsible=icon]:hidden">Social Spark</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarSeparator />
           <SidebarMenu>
             <div className="px-4 py-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">Practice Tools</div>
            {practiceNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
           <div className="p-2 flex flex-col gap-2">
             <div className="text-sm text-muted-foreground group-data-[collapsible=icon]:hidden truncate">
                {user.displayName || user.email}
             </div>
            <Button variant="outline" size="sm" onClick={signOut} className="justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
           </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col w-full h-full">
            <PageHeader title={pageTitle} />
            {children}
        </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
