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
import { useIsMobile } from "@/hooks/use-mobile";

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
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();

  const isActive = (path: string) => currentPath === path;

  const handleLinkClick = () => {
    // Auto-collapse sidebar on mobile after navigation
    if (isMobile && open) {
      setOpen(false);
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out"
    >
      <SidebarContent className="pt-3 sm:pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs sm:text-sm font-semibold text-sidebar-foreground px-4 py-3 mb-1">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {menuItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground min-h-[44px] touch-manipulation rounded-md"
                    >
                      <Link 
                        to={item.url} 
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 px-3 py-2 w-full"
                      >
                        <item.icon 
                          className={`h-5 w-5 sm:h-5 sm:w-5 flex-shrink-0 transition-colors ${
                            active ? 'text-sidebar-primary' : 'text-sidebar-foreground/70'
                          }`} 
                        />
                        <span 
                          className={`text-sm sm:text-base truncate transition-colors ${
                            active 
                              ? 'font-semibold text-sidebar-primary' 
                              : 'font-medium text-sidebar-foreground'
                          }`}
                        >
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
