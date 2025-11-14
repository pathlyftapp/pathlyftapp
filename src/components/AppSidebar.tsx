import {
  Home,
  Sparkles,
  Bell,
  FileText,
  Mail,
  Lightbulb,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Activity & Job Feed",
    url: "/activity",
    icon: Home,
  },
  {
    title: "AI Job Match",
    url: "/ai-match",
    icon: Sparkles,
  },
  {
    title: "Job Alerts",
    url: "/alerts",
    icon: Bell,
  },
  {
    title: "Resume Centre (AI)",
    url: "/resume",
    icon: FileText,
  },
  {
    title: "Cover Letter (AI)",
    url: "/cover-letter",
    icon: Mail,
  },
  {
    title: "Inspiration Corner",
    url: "/inspiration",
    icon: Lightbulb,
  },
  {
    title: "Profile & Settings",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-card"
    >
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs sm:text-sm font-semibold text-foreground px-3 sm:px-4 py-2 sm:py-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="hover:bg-accent/50 transition-colors min-h-[44px] touch-manipulation"
                    >
                      <Link to={item.url} className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3">
                        <item.icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm sm:text-base truncate ${active ? 'font-medium text-primary' : 'text-foreground'}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
