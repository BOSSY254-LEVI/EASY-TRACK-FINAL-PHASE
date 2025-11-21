import { Activity, Droplet, Users, AlertCircle, FileText, TrendingUp, TrendingDown, MapPin, Clock, Calendar, Filter, Download, Eye, MoreHorizontal, Bell, Search, RefreshCw, Zap, Sparkles, Target, BarChart3, PieChart, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import KPICard from "@/components/KPICard";
import ActivityFeed from "@/components/ActivityFeed";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart as RechartsPieChart, Pie, Cell } from "recharts";
import AIInsightBanner from "@/components/AIInsightBanner";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { fieldDataAPI } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [userName, setUserName] = useState("Field Agent");
  const [activeTimeRange, setActiveTimeRange] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.name) {
        setUserName(user.user_metadata.name.split(' ')[0]);
      }
    };
    getUser();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const chartData = {
    month: [
      { month: "Jan", reports: 65, tests: 45, alerts: 12, completed: 58, target: 70 },
      { month: "Feb", reports: 78, tests: 52, alerts: 8, completed: 70, target: 75 },
      { month: "Mar", reports: 90, tests: 61, alerts: 15, completed: 82, target: 80 },
      { month: "Apr", reports: 81, tests: 58, alerts: 10, completed: 75, target: 85 },
      { month: "May", reports: 95, tests: 70, alerts: 6, completed: 88, target: 90 },
      { month: "Jun", reports: 105, tests: 82, alerts: 9, completed: 98, target: 95 },
    ],
    week: [
      { day: "Mon", reports: 15, tests: 12, alerts: 3, completed: 14, target: 18 },
      { day: "Tue", reports: 18, tests: 14, alerts: 2, completed: 16, target: 18 },
      { day: "Wed", reports: 22, tests: 16, alerts: 4, completed: 20, target: 18 },
      { day: "Thu", reports: 20, tests: 15, alerts: 1, completed: 18, target: 18 },
      { day: "Fri", reports: 25, tests: 19, alerts: 2, completed: 23, target: 18 },
      { day: "Sat", reports: 12, tests: 8, alerts: 1, completed: 11, target: 10 },
      { day: "Sun", reports: 8, tests: 6, alerts: 0, completed: 7, target: 8 },
    ]
  };

  const teamPerformanceData = [
    { team: "Team A", completed: 145, pending: 23, efficiency: 86, trend: "up" },
    { team: "Team B", completed: 132, pending: 18, efficiency: 88, trend: "up" },
    { team: "Team C", completed: 128, pending: 15, efficiency: 90, trend: "up" },
    { team: "Team D", completed: 118, pending: 22, efficiency: 84, trend: "down" },
    { team: "Team E", completed: 105, pending: 12, efficiency: 90, trend: "up" },
  ];

  const areaChartData = [
    { month: "Jan", water: 120, health: 85, climate: 65, total: 270 },
    { month: "Feb", water: 145, health: 98, climate: 78, total: 321 },
    { month: "Mar", water: 168, health: 112, climate: 89, total: 369 },
    { month: "Apr", water: 152, health: 125, climate: 95, total: 372 },
    { month: "May", water: 185, health: 142, climate: 108, total: 435 },
    { month: "Jun", water: 210, health: 165, climate: 125, total: 500 },
  ];

  const pieData = [
    { name: "Water Quality", value: 35, color: "hsl(var(--secondary))" },
    { name: "Health Reports", value: 30, color: "hsl(var(--destructive))" },
    { name: "Climate Data", value: 20, color: "hsl(var(--success))" },
    { name: "Infrastructure", value: 15, color: "hsl(var(--primary))" },
  ];

  const quickActions = [
    { icon: FileText, label: "New Report", color: "bg-blue-500", href: "/reports/new" },
    { icon: Droplet, label: "Water Test", color: "bg-cyan-500", href: "/tests/new" },
    { icon: AlertCircle, label: "Create Alert", color: "bg-orange-500", href: "/alerts/new" },
    { icon: Users, label: "Team Chat", color: "bg-green-500", href: "/chat" },
  ];

  const [mapLocations, setMapLocations] = useState<any[]>([]);

  useEffect(() => {
    const fetchMapLocations = async () => {
      try {
        const data = await fieldDataAPI.getAll();

        const locations = data
          .filter((item: any) => item.latitude && item.longitude)
          .map((item: any) => ({
            id: item._id,
            name: item.title,
            lat: item.latitude,
            lng: item.longitude,
            type: item.category,
            status: Math.random() > 0.7 ? "alert" : "active",
            lastUpdate: new Date(Date.now() - Math.random() * 86400000).toISOString()
          }));
        setMapLocations(locations);
      } catch (error) {
        console.error('Error fetching map locations:', error);
        // Fallback data
        setMapLocations([
          { id: 1, name: "Nairobi Water Plant", lat: 40, lng: 30, type: "water", status: "active", lastUpdate: new Date().toISOString() },
          { id: 2, name: "Kibera Health Center", lat: 60, lng: 45, type: "health", status: "alert", lastUpdate: new Date().toISOString() },
          { id: 3, name: "Mt. Kenya Climate Station", lat: 70, lng: 20, type: "climate", status: "active", lastUpdate: new Date().toISOString() },
        ]);
      }
    };

    fetchMapLocations();
  }, []);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-xl">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Enhanced Header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-heading font-bold text-foreground tracking-tight">
                {greeting}, {userName} 👋
              </h2>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                <Sparkles className="h-3 w-3 mr-1" />
                Pro Plan
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Here's your mission control for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports, teams, locations..."
                className="pl-10 w-64 bg-white/50 backdrop-blur-sm border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.div>
            </Button>

            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </Button>
          </div>
        </motion.div>

        {/* AI Insights Banner */}
        <AIInsightBanner />

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="bg-gradient-to-br from-white to-gray-50/50 border-gray-200/60 hover:border-gray-300 cursor-pointer transition-all duration-300 group">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-gray-700">{action.label}</p>
                    <p className="text-xs text-gray-500">Quick action</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <KPICard
            title="Total Reports"
            value="1,284"
            change="+12.5%"
            trend="up"
            icon={FileText}
            iconColor="bg-blue-500"
          />
          <KPICard
            title="Open Alerts"
            value="23"
            change="-8.2%"
            trend="down"
            icon={AlertCircle}
            iconColor="bg-orange-500"
          />
          <KPICard
            title="Active Teams"
            value="47"
            change="+5.1%"
            trend="up"
            icon={Users}
            iconColor="bg-green-500"
          />
          <KPICard
            title="Water Tests"
            value="589"
            change="+18.3%"
            trend="up"
            icon={Droplet}
            iconColor="bg-cyan-500"
          />
        </motion.div>

        {/* Charts and Analytics Section */}
        <div className="space-y-6">
          {/* Time Range Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <h3 className="text-2xl font-heading font-bold text-foreground">Analytics Overview</h3>
            <div className="flex items-center gap-2">
              <Tabs value={activeTimeRange} onValueChange={setActiveTimeRange} className="w-auto">
                <TabsList className="bg-white/50 backdrop-blur-sm border border-gray-200">
                  <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
                  <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                  <TabsTrigger value="quarter" className="text-xs">Quarter</TabsTrigger>
                </TabsList>
              </Tabs>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Data</DropdownMenuItem>
                  <DropdownMenuItem>Water Only</DropdownMenuItem>
                  <DropdownMenuItem>Health Only</DropdownMenuItem>
                  <DropdownMenuItem>Climate Only</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="xl:col-span-2"
            >
              <Card className="border-gray-200/60 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="border-b border-gray-200/40 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Data Collection Trends
                    </CardTitle>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Zap className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                  <CardDescription>Real-time tracking of field data collection activities</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData[activeTimeRange as keyof typeof chartData]}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                      <XAxis 
                        dataKey={activeTimeRange === "month" ? "month" : "day"} 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="reports" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                        name="Reports" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="tests" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: 'hsl(var(--secondary))', strokeWidth: 2 }}
                        name="Water Tests" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="completed" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: 'hsl(var(--success))', r: 3 }}
                        name="Completed Target" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Performance & Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              {/* Team Performance */}
              <Card className="border-gray-200/60 bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                    <Users className="h-5 w-5 text-green-500" />
                    Team Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamPerformanceData.map((team, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200/40 bg-white/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                          {team.team.slice(-1)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{team.team}</p>
                          <p className="text-xs text-gray-500">{team.completed} completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            team.trend === "up" ? "bg-green-500" : "bg-red-500"
                          )} />
                          <span className="text-xs font-semibold">{team.efficiency}%</span>
                        </div>
                        <Progress value={team.efficiency} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Data Distribution */}
              <Card className="border-gray-200/60 bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                    <PieChart className="h-5 w-5 text-purple-500" />
                    Data Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Row - Activity Feed and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <ActivityFeed />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="border-gray-200/60 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="border-b border-gray-200/40 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                      <Globe className="h-5 w-5 text-blue-500" />
                      Active Locations - Live Map
                    </CardTitle>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {mapLocations.length} Active
                    </Badge>
                  </div>
                  <CardDescription>Real-time field team locations and status</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-80 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 rounded-xl border-2 border-dashed border-gray-300/60 relative overflow-hidden group">
                    {/* Enhanced Map Background */}
                    <div className="absolute inset-0 opacity-20">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="enhancedGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                          </pattern>
                          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#enhancedGrid)" />
                        <rect width="100%" height="100%" fill="url(#mapGlow)" />
                      </svg>
                    </div>
                    
                    {/* Enhanced Location Markers */}
                    <AnimatePresence>
                      {mapLocations.map((location) => (
                        <motion.div
                          key={location.id}
                          className="absolute group cursor-pointer"
                          style={{ left: `${location.lng}%`, top: `${location.lat}%` }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: Math.random() * 0.5 }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <div className={cn(
                            "w-4 h-4 rounded-full border-2 border-white shadow-lg relative",
                            location.type === 'water' ? "bg-cyan-500" :
                            location.type === 'health' ? "bg-orange-500" :
                            "bg-green-500",
                            location.status === 'alert' && "animate-pulse ring-2 ring-red-500"
                          )}>
                            {location.status === 'alert' && (
                              <div className="absolute inset-0 rounded-full bg-current animate-ping opacity-75"></div>
                            )}
                          </div>
                          
                          {/* Enhanced Tooltip */}
                          <div className="absolute left-6 top-0 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-10 min-w-48">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <p className="font-semibold text-gray-900 text-sm">{location.name}</p>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <Badge 
                                variant="secondary" 
                                className={cn(
                                  "capitalize",
                                  location.type === 'water' ? "bg-cyan-100 text-cyan-700" :
                                  location.type === 'health' ? "bg-orange-100 text-orange-700" :
                                  "bg-green-100 text-green-700"
                                )}
                              >
                                {location.type}
                              </Badge>
                              <Badge 
                                variant={location.status === 'alert' ? "destructive" : "outline"}
                                className="text-xs"
                              >
                                {location.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Updated {new Date(location.lastUpdate).toLocaleTimeString()}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Enhanced Legend */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 space-y-2 shadow-lg">
                      <p className="text-xs font-semibold text-gray-900 mb-2">Location Types</p>
                      {[
                        { color: "bg-cyan-500", label: "Water Sites" },
                        { color: "bg-orange-500", label: "Health Centers" },
                        { color: "bg-green-500", label: "Climate Stations" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-xs text-gray-700">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;