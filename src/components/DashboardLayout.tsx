import { Activity, FileText, Map, AlertCircle, Settings, Users, BarChart3, Bell, Search, LogOut, Database, FolderOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import OnlineStatusIndicator from "@/components/OnlineStatusIndicator";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [userName, setUserName] = useState("John Doe");
  
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const navItems = [
    { icon: Activity, label: "Dashboard", path: "/dashboard" },
    { icon: FolderOpen, label: "Projects", path: "/projects" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: FileText, label: "Data Collection", path: "/data-collection" },
    { icon: Database, label: "Files", path: "/files" },
    { icon: Map, label: "Maps", path: "/maps" },
    { icon: Clock, label: "Activities", path: "/activities" },
    { icon: Users, label: "Team", path: "/team" },
    { icon: AlertCircle, label: "Alerts", path: "/alerts" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-sidebar-foreground">EASY TRACK</h1>
              <p className="text-xs text-muted-foreground">Data for Life</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">Field Agent</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, data, locations..."
                className="pl-10 bg-background"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <OnlineStatusIndicator />
            <div className="flex items-center gap-1 px-2">
              <Avatar className="h-8 w-8 ring-2 ring-success status-online">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 ring-2 ring-success status-online -ml-2">
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 ring-2 ring-success status-online -ml-2">
                <AvatarFallback className="bg-accent text-accent-foreground text-xs">AK</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground ml-1">+5</span>
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-alert rounded-full"></span>
            </Button>
            <Link to="/">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
