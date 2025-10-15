import { Activity, Droplet, Users, AlertCircle, Map, Settings, FileText, Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KPICard from "@/components/KPICard";
import ActivityFeed from "@/components/ActivityFeed";
import { Link } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [userName, setUserName] = useState("John Doe");
  
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const navItems = [
    { icon: Activity, label: "Dashboard", active: true, path: "/dashboard" },
    { icon: FileText, label: "Data Collection", active: false, path: "/dashboard" },
    { icon: Map, label: "Maps", active: false, path: "/dashboard" },
    { icon: AlertCircle, label: "Alerts", active: false, path: "/dashboard" },
    { icon: Settings, label: "Settings", active: false, path: "/dashboard" },
  ];

  const chartData = [
    { month: "Jan", reports: 65, tests: 45, alerts: 12 },
    { month: "Feb", reports: 78, tests: 52, alerts: 8 },
    { month: "Mar", reports: 90, tests: 61, alerts: 15 },
    { month: "Apr", reports: 81, tests: 58, alerts: 10 },
    { month: "May", reports: 95, tests: 70, alerts: 6 },
    { month: "Jun", reports: 105, tests: 82, alerts: 9 },
  ];

  const mapLocations = [
    { id: 1, name: "Nairobi Site A", lat: 20, lng: 25, type: "water", status: "active" },
    { id: 2, name: "Kampala Site B", lat: 45, lng: 60, type: "health", status: "active" },
    { id: 3, name: "Dar es Salaam", lat: 70, lng: 40, type: "climate", status: "alert" },
    { id: 4, name: "Kigali Zone C", lat: 35, lng: 75, type: "water", status: "active" },
    { id: 5, name: "Lagos District", lat: 55, lng: 20, type: "health", status: "active" },
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
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">JD</span>
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
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Legend />
                        <Line type="monotone" dataKey="reports" stroke="hsl(var(--primary))" strokeWidth={2} name="Reports" />
                        <Line type="monotone" dataKey="tests" stroke="hsl(var(--secondary))" strokeWidth={2} name="Water Tests" />
                        <Line type="monotone" dataKey="alerts" stroke="hsl(var(--destructive))" strokeWidth={2} name="Alerts" />
                      </LineChart>
                    </ResponsiveContainer>
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
                <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-border relative overflow-hidden">
                  {/* Simple map visualization */}
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  
                  {/* Location markers */}
                  {mapLocations.map((location) => (
                    <div
                      key={location.id}
                      className="absolute group cursor-pointer"
                      style={{ left: `${location.lng}%`, top: `${location.lat}%` }}
                    >
                      <div className={`w-4 h-4 rounded-full animate-pulse ${
                        location.type === 'water' ? 'bg-secondary' :
                        location.type === 'health' ? 'bg-destructive' :
                        'bg-success'
                      } ${location.status === 'alert' ? 'ring-2 ring-destructive' : ''}`}>
                        <div className="absolute inset-0 rounded-full animate-ping opacity-75"></div>
                      </div>
                      <div className="absolute left-6 top-0 bg-card border border-border rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <p className="text-xs font-semibold">{location.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{location.type} • {location.status}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      <span className="text-xs">Water Sites</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      <span className="text-xs">Health Centers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success"></div>
                      <span className="text-xs">Climate Stations</span>
                    </div>
                  </div>
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
