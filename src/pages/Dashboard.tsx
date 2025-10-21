import { Activity, Droplet, Users, AlertCircle, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KPICard from "@/components/KPICard";
import ActivityFeed from "@/components/ActivityFeed";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AIInsightBanner from "@/components/AIInsightBanner";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const [userName, setUserName] = useState("Field Agent");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.name) {
        setUserName(user.user_metadata.name);
      }
    };
    getUser();
  }, []);

  const chartData = [
    { month: "Jan", reports: 65, tests: 45, alerts: 12, completed: 58 },
    { month: "Feb", reports: 78, tests: 52, alerts: 8, completed: 70 },
    { month: "Mar", reports: 90, tests: 61, alerts: 15, completed: 82 },
    { month: "Apr", reports: 81, tests: 58, alerts: 10, completed: 75 },
    { month: "May", reports: 95, tests: 70, alerts: 6, completed: 88 },
    { month: "Jun", reports: 105, tests: 82, alerts: 9, completed: 98 },
  ];

  const teamPerformanceData = [
    { team: "Team A", completed: 145, pending: 23 },
    { team: "Team B", completed: 132, pending: 18 },
    { team: "Team C", completed: 128, pending: 15 },
    { team: "Team D", completed: 118, pending: 22 },
    { team: "Team E", completed: 105, pending: 12 },
  ];

  const areaChartData = [
    { month: "Jan", water: 120, health: 85, climate: 65 },
    { month: "Feb", water: 145, health: 98, climate: 78 },
    { month: "Mar", water: 168, health: 112, climate: 89 },
    { month: "Apr", water: 152, health: 125, climate: 95 },
    { month: "May", water: 185, health: 142, climate: 108 },
    { month: "Jun", water: 210, health: 165, climate: 125 },
  ];

  const mapLocations = [
    { id: 1, name: "Nairobi Site A", lat: 20, lng: 25, type: "water", status: "active" },
    { id: 2, name: "Kampala Site B", lat: 45, lng: 60, type: "health", status: "active" },
    { id: 3, name: "Dar es Salaam", lat: 70, lng: 40, type: "climate", status: "alert" },
    { id: 4, name: "Kigali Zone C", lat: 35, lng: 75, type: "water", status: "active" },
    { id: 5, name: "Lagos District", lat: 55, lng: 20, type: "health", status: "active" },
  ];

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
            {/* Welcome Header */}
            <div className="space-y-2">
              <h2 className="text-4xl font-heading font-bold text-foreground tracking-tight">
                {greeting}, {userName} 👋
              </h2>
              <p className="text-lg text-muted-foreground">Here's your mission control for today</p>
            </div>

            {/* AI Insights Banner */}
            <AIInsightBanner />

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="neumorphic">
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-lg font-heading font-semibold">Data Collection Trends</CardTitle>
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

              <Card className="neumorphic">
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-lg font-heading font-semibold">Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={teamPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="team" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="completed" fill="hsl(var(--success))" name="Completed" />
                      <Bar dataKey="pending" fill="hsl(var(--primary))" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="neumorphic">
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-lg font-heading font-semibold">Project Categories Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={areaChartData}>
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
                      <Area type="monotone" dataKey="water" stackId="1" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.6} name="Water" />
                      <Area type="monotone" dataKey="health" stackId="1" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.6} name="Health" />
                      <Area type="monotone" dataKey="climate" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.6} name="Climate" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <ActivityFeed />
            </div>

            {/* Map Preview */}
            <Card className="neumorphic">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-lg font-heading font-semibold">Active Locations - Live Map</CardTitle>
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
    </DashboardLayout>
  );
};

export default Dashboard;
