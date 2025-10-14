import { Activity, Droplet, Users, AlertCircle, Map, Settings, FileText, Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KPICard from "@/components/KPICard";
import ActivityFeed from "@/components/ActivityFeed";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navItems = [
    { icon: Activity, label: "Dashboard", active: true },
    { icon: FileText, label: "Data Collection", active: false },
    { icon: Map, label: "Maps", active: false },
    { icon: AlertCircle, label: "Alerts", active: false },
    { icon: Settings, label: "Settings", active: false },
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
              <h1 className="font-bold text-lg text-sidebar-foreground">TerraTrack</h1>
              <p className="text-xs text-muted-foreground">Field Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
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
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
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
          <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground">Real-time insights from your field operations</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Total Reports"
                value="1,284"
                change="+12.5%"
                trend="up"
                icon={FileText}
                iconColor="bg-primary"
              />
              <KPICard
                title="Open Alerts"
                value="23"
                change="-8.2%"
                trend="down"
                icon={AlertCircle}
                iconColor="bg-destructive"
              />
              <KPICard
                title="Active Teams"
                value="47"
                change="+5.1%"
                trend="up"
                icon={Users}
                iconColor="bg-success"
              />
              <KPICard
                title="Water Tests"
                value="589"
                change="+18.3%"
                trend="up"
                icon={Droplet}
                iconColor="bg-secondary"
              />
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-card h-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Data Collection Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-muted">
                      <p className="text-muted-foreground">Chart visualization area</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <ActivityFeed />
            </div>

            {/* Map Preview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Active Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-muted">
                  <p className="text-muted-foreground">Interactive map area</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
