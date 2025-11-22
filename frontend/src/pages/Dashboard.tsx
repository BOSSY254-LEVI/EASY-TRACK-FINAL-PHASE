import { Activity, Droplet, Users, AlertCircle, FileText, TrendingUp, TrendingDown, MapPin, Clock, Calendar, Filter, Download, Eye, MoreHorizontal, Bell, Search, RefreshCw, Zap, Sparkles, Target, BarChart3, PieChart, Globe, Shield, User, Settings, LogOut, Home, MessageCircle, Database, Cloud, Wifi, WifiOff, Battery, BatteryCharging } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import KPICard from "@/components/KPICard";
import ActivityFeed from "@/components/ActivityFeed";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart as RechartsPieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import AIInsightBanner from "@/components/AIInsightBanner";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { fieldDataAPI } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Dashboard = () => {
  const [userName, setUserName] = useState("Field Agent");
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [activeTimeRange, setActiveTimeRange] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline" | "slow">("online");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.name?.split(' ')[0] || "Field Agent");
        setUserFullName(user.user_metadata?.name || "Field Agent");
        setUserEmail(user.email || "");
        setUserAvatar(user.user_metadata?.avatar_url || "");
      }
    };
    getUser();

    // Simulate connection status changes
    const connectionInterval = setInterval(() => {
      const statuses: Array<"online" | "offline" | "slow"> = ["online", "online", "online", "slow", "offline"];
      setConnectionStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 10000);

    return () => clearInterval(connectionInterval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call with enhanced animation
    setTimeout(() => {
      setIsRefreshing(false);
      // Show success toast
    }, 1500);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Redirect handled by auth flow
  };

  // Enhanced chart data with more realistic metrics
  const chartData = {
    month: [
      { month: "Jan", reports: 65, tests: 45, alerts: 12, completed: 58, target: 70, efficiency: 82 },
      { month: "Feb", reports: 78, tests: 52, alerts: 8, completed: 70, target: 75, efficiency: 85 },
      { month: "Mar", reports: 90, tests: 61, alerts: 15, completed: 82, target: 80, efficiency: 88 },
      { month: "Apr", reports: 81, tests: 58, alerts: 10, completed: 75, target: 85, efficiency: 84 },
      { month: "May", reports: 95, tests: 70, alerts: 6, completed: 88, target: 90, efficiency: 92 },
      { month: "Jun", reports: 105, tests: 82, alerts: 9, completed: 98, target: 95, efficiency: 95 },
    ],
    week: [
      { day: "Mon", reports: 15, tests: 12, alerts: 3, completed: 14, target: 18, efficiency: 78 },
      { day: "Tue", reports: 18, tests: 14, alerts: 2, completed: 16, target: 18, efficiency: 89 },
      { day: "Wed", reports: 22, tests: 16, alerts: 4, completed: 20, target: 18, efficiency: 92 },
      { day: "Thu", reports: 20, tests: 15, alerts: 1, completed: 18, target: 18, efficiency: 85 },
      { day: "Fri", reports: 25, tests: 19, alerts: 2, completed: 23, target: 18, efficiency: 96 },
      { day: "Sat", reports: 12, tests: 8, alerts: 1, completed: 11, target: 10, efficiency: 88 },
      { day: "Sun", reports: 8, tests: 6, alerts: 0, completed: 7, target: 8, efficiency: 75 },
    ]
  };

  const teamPerformanceData = [
    { team: "Team A", completed: 145, pending: 23, efficiency: 86, trend: "up", members: 8, avatar: "/avatars/team-a.png" },
    { team: "Team B", completed: 132, pending: 18, efficiency: 88, trend: "up", members: 6, avatar: "/avatars/team-b.png" },
    { team: "Team C", completed: 128, pending: 15, efficiency: 90, trend: "up", members: 7, avatar: "/avatars/team-c.png" },
    { team: "Team D", completed: 118, pending: 22, efficiency: 84, trend: "down", members: 5, avatar: "/avatars/team-d.png" },
    { team: "Team E", completed: 105, pending: 12, efficiency: 90, trend: "up", members: 9, avatar: "/avatars/team-e.png" },
  ];

  const areaChartData = [
    { month: "Jan", water: 120, health: 85, climate: 65, infrastructure: 45, total: 315 },
    { month: "Feb", water: 145, health: 98, climate: 78, infrastructure: 52, total: 373 },
    { month: "Mar", water: 168, health: 112, climate: 89, infrastructure: 61, total: 430 },
    { month: "Apr", water: 152, health: 125, climate: 95, infrastructure: 58, total: 430 },
    { month: "May", water: 185, health: 142, climate: 108, infrastructure: 72, total: 507 },
    { month: "Jun", water: 210, health: 165, climate: 125, infrastructure: 85, total: 585 },
  ];

  const pieData = [
    { name: "Water Quality", value: 35, color: "#0ea5e9", icon: Droplet },
    { name: "Health Reports", value: 30, color: "#f97316", icon: Activity },
    { name: "Climate Data", value: 20, color: "#10b981", icon: Cloud },
    { name: "Infrastructure", value: 15, color: "#8b5cf6", icon: Database },
  ];

  const radarData = [
    { subject: 'Efficiency', A: 85, B: 75, fullMark: 100 },
    { subject: 'Quality', A: 92, B: 80, fullMark: 100 },
    { subject: 'Speed', A: 78, B: 85, fullMark: 100 },
    { subject: 'Collaboration', A: 88, B: 70, fullMark: 100 },
    { subject: 'Innovation', A: 82, B: 78, fullMark: 100 },
    { subject: 'Reliability', A: 95, B: 82, fullMark: 100 },
  ];

  const quickActions = [
    { icon: FileText, label: "New Report", color: "bg-gradient-to-br from-blue-500 to-cyan-500", href: "/reports/new", description: "Create field report" },
    { icon: Droplet, label: "Water Test", color: "bg-gradient-to-br from-cyan-500 to-blue-600", href: "/tests/new", description: "Start water analysis" },
    { icon: AlertCircle, label: "Create Alert", color: "bg-gradient-to-br from-orange-500 to-red-500", href: "/alerts/new", description: "Report urgent issue" },
    { icon: Users, label: "Team Chat", color: "bg-gradient-to-br from-green-500 to-emerald-600", href: "/chat", description: "Message your team" },
    { icon: MapPin, label: "Add Location", color: "bg-gradient-to-br from-purple-500 to-pink-500", href: "/locations/new", description: "Register new site" },
    { icon: Database, label: "Data Export", color: "bg-gradient-to-br from-gray-600 to-gray-800", href: "/export", description: "Download datasets" },
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
            lastUpdate: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            team: `Team ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
            priority: Math.random() > 0.8 ? "high" : "normal"
          }));
        setMapLocations(locations);
      } catch (error) {
        console.error('Error fetching map locations:', error);
        // Enhanced fallback data
        setMapLocations([
          { id: 1, name: "Nairobi Water Plant", lat: 40, lng: 30, type: "water", status: "active", lastUpdate: new Date().toISOString(), team: "Team A", priority: "high" },
          { id: 2, name: "Kibera Health Center", lat: 60, lng: 45, type: "health", status: "alert", lastUpdate: new Date().toISOString(), team: "Team B", priority: "high" },
          { id: 3, name: "Mt. Kenya Climate Station", lat: 70, lng: 20, type: "climate", status: "active", lastUpdate: new Date().toISOString(), team: "Team C", priority: "normal" },
          { id: 4, name: "Mombasa Port Infrastructure", lat: 35, lng: 65, type: "infrastructure", status: "active", lastUpdate: new Date().toISOString(), team: "Team D", priority: "normal" },
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-2xl min-w-48"
        >
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-sm text-gray-600">{entry.name}:</span>
                </div>
                <span className="font-semibold text-gray-900">{entry.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const ConnectionStatus = () => (
    <div className="flex items-center gap-2">
      {connectionStatus === "online" && (
        <div className="flex items-center gap-1 text-green-600">
          <Wifi className="h-4 w-4" />
          <span className="text-xs font-medium">Online</span>
        </div>
      )}
      {connectionStatus === "slow" && (
        <div className="flex items-center gap-1 text-yellow-600">
          <Wifi className="h-4 w-4" />
          <span className="text-xs font-medium">Slow</span>
        </div>
      )}
      {connectionStatus === "offline" && (
        <div className="flex items-center gap-1 text-red-600">
          <WifiOff className="h-4 w-4" />
          <span className="text-xs font-medium">Offline</span>
        </div>
      )}
      <BatteryCharging className="h-4 w-4 text-green-600" />
    </div>
  );

  return (
    <DashboardLayout>
      <div className={cn("min-h-screen transition-all duration-300", darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20")}>
        {/* Enhanced Header */}
        <motion.header 
          className={cn("sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300", darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-200/50")}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={cn("p-2 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300", darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200")}
              >
                <BarChart3 className="h-5 w-5" />
              </motion.button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports, teams, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn("pl-10 w-64 backdrop-blur-sm transition-all duration-300", darkMode ? "bg-gray-700/50 border-gray-600" : "bg-white/50 border-gray-200")}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ConnectionStatus />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={cn("p-2 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 relative", darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200")}
              >
                <motion.div
                  animate={{ rotate: isRefreshing ? 360 : 0 }}
                  transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
                >
                  <RefreshCw className="h-4 w-4" />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn("p-2 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 relative", darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200")}
              >
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse"
                  >
                    {notifications}
                  </motion.span>
                )}
              </motion.button>

              {/* Enhanced User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={cn("flex items-center gap-3 p-2 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300", darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200")}
                >
                  <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                    <AvatarImage src={userAvatar} alt={userFullName} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                      {userFullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold">{userFullName}</p>
                    <p className="text-xs text-muted-foreground">Field Operations</p>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={cn("absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl border backdrop-blur-md p-2 z-50", darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200")}
                    >
                      <div className="p-3 border-b border-gray-200/40">
                        <p className="font-semibold">{userFullName}</p>
                        <p className="text-sm text-muted-foreground">{userEmail}</p>
                      </div>
                      
                      {[
                        { icon: User, label: "Profile", href: "#" },
                        { icon: Settings, label: "Settings", href: "#" },
                        { icon: Bell, label: "Notifications", href: "#" },
                        { icon: Shield, label: "Privacy", href: "#" }
                      ].map((item, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 w-full p-3 text-sm hover:bg-gray-100 rounded-lg transition-all duration-200"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </motion.button>
                      ))}
                      
                      <DropdownMenuSeparator />
                      
                      <div className="p-3 flex items-center justify-between">
                        <Label htmlFor="dark-mode" className="text-sm">Dark Mode</Label>
                        <Switch
                          id="dark-mode"
                          checked={darkMode}
                          onCheckedChange={setDarkMode}
                        />
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      <motion.button
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 w-full p-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="flex">
          {/* Enhanced Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={cn("w-64 backdrop-blur-md border-r min-h-[calc(100vh-4rem)] p-6 transition-all duration-300", darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-200/50")}
              >
                <nav className="space-y-2">
                  {[
                    { icon: BarChart3, label: "Overview", value: "overview", badge: null },
                    { icon: TrendingUp, label: "Analytics", value: "analytics", badge: "New" },
                    { icon: Users, label: "Teams", value: "teams", badge: null },
                    { icon: FileText, label: "Reports", value: "reports", badge: "12" },
                    { icon: MapPin, label: "Locations", value: "locations", badge: null },
                    { icon: Database, label: "Data", value: "data", badge: null },
                    { icon: Settings, label: "Settings", value: "settings", badge: null }
                  ].map((item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ x: 4 }}
                      className={cn(
                        "flex items-center justify-between w-full p-3 rounded-xl text-left transition-all duration-300 group",
                        darkMode 
                          ? "text-gray-300 hover:text-white hover:bg-gray-700/50" 
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50/80"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-xs",
                            darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </motion.button>
                  ))}
                </nav>

                {/* Enhanced Team Section */}
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <h3 className={cn("text-sm font-semibold mb-3", darkMode ? "text-gray-300" : "text-gray-900")}>Your Teams</h3>
                  <div className="space-y-2">
                    {teamPerformanceData.slice(0, 3).map((team, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ x: 4 }}
                        className={cn(
                          "flex items-center gap-3 w-full p-2 text-sm rounded-lg transition-all duration-200 group",
                          darkMode ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600" />
                        <span>{team.team}</span>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "ml-auto text-xs",
                            darkMode ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-600"
                          )}
                        >
                          {team.efficiency}%
                        </Badge>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="space-y-6 animate-fade-in">
              {/* Enhanced Header Section */}
              <motion.div 
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className={cn("text-4xl font-heading font-bold tracking-tight", darkMode ? "text-white" : "text-foreground")}>
                      {greeting}, {userName} 👋
                    </h2>
                    <Badge variant="secondary" className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Pro Plan
                    </Badge>
                  </div>
                  <p className={cn("text-lg flex items-center gap-2", darkMode ? "text-gray-400" : "text-muted-foreground")}>
                    <Clock className="h-4 w-4" />
                    Here's your mission control for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </motion.div>

              {/* AI Insights Banner */}
              <AIInsightBanner />

              {/* Enhanced Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className={cn(
                      "border hover:shadow-xl cursor-pointer transition-all duration-300 group h-full",
                      darkMode 
                        ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 hover:border-gray-500" 
                        : "bg-gradient-to-br from-white to-gray-50/50 border-gray-200/60 hover:border-gray-300"
                    )}>
                      <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                        <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className={cn("font-semibold group-hover:text-gray-700", darkMode ? "text-white group-hover:text-gray-300" : "text-gray-900")}>
                            {action.label}
                          </p>
                          <p className={cn("text-xs", darkMode ? "text-gray-400" : "text-gray-500")}>
                            {action.description}
                          </p>
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
                  iconColor="bg-gradient-to-br from-blue-500 to-cyan-500"
                  darkMode={darkMode}
                />
                <KPICard
                  title="Open Alerts"
                  value="23"
                  change="-8.2%"
                  trend="down"
                  icon={AlertCircle}
                  iconColor="bg-gradient-to-br from-orange-500 to-red-500"
                  darkMode={darkMode}
                />
                <KPICard
                  title="Active Teams"
                  value="47"
                  change="+5.1%"
                  trend="up"
                  icon={Users}
                  iconColor="bg-gradient-to-br from-green-500 to-emerald-600"
                  darkMode={darkMode}
                />
                <KPICard
                  title="Water Tests"
                  value="589"
                  change="+18.3%"
                  trend="up"
                  icon={Droplet}
                  iconColor="bg-gradient-to-br from-cyan-500 to-blue-600"
                  darkMode={darkMode}
                />
              </motion.div>

              {/* Enhanced Charts and Analytics Section */}
              <div className="space-y-6">
                {/* Time Range Filter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-center justify-between"
                >
                  <h3 className={cn("text-2xl font-heading font-bold", darkMode ? "text-white" : "text-foreground")}>
                    Analytics Overview
                  </h3>
                  <div className="flex items-center gap-2">
                    <Tabs value={activeTimeRange} onValueChange={setActiveTimeRange} className="w-auto">
                      <TabsList className={cn("backdrop-blur-sm border", darkMode ? "bg-gray-800 border-gray-600" : "bg-white/50 border-gray-200")}>
                        <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
                        <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                        <TabsTrigger value="quarter" className="text-xs">Quarter</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className={darkMode ? "border-gray-600" : ""}>
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className={darkMode ? "bg-gray-800 border-gray-600" : ""}>
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
                    <Card className={cn(
                      "hover:shadow-xl transition-all duration-300",
                      darkMode 
                        ? "bg-gray-800/50 border-gray-700" 
                        : "border-gray-200/60 bg-white/50 backdrop-blur-sm"
                    )}>
                      <CardHeader className="border-b border-gray-200/40 pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className={cn("flex items-center gap-2 text-lg font-heading font-semibold", darkMode ? "text-white" : "text-foreground")}>
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                            Data Collection Trends
                          </CardTitle>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                            <Zap className="h-3 w-3 mr-1" />
                            Live
                          </Badge>
                        </div>
                        <CardDescription className={darkMode ? "text-gray-400" : ""}>
                          Real-time tracking of field data collection activities
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={chartData[activeTimeRange as keyof typeof chartData]}>
                            <CartesianGrid strokeDasharray="3 3" className={darkMode ? "stroke-gray-700" : "stroke-gray-200"} />
                            <XAxis 
                              dataKey={activeTimeRange === "month" ? "month" : "day"} 
                              className="text-xs"
                              tick={{ fill: darkMode ? '#9CA3AF' : 'hsl(var(--muted-foreground))' }}
                            />
                            <YAxis 
                              className="text-xs"
                              tick={{ fill: darkMode ? '#9CA3AF' : 'hsl(var(--muted-foreground))' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="reports" 
                              stroke="#3b82f6" 
                              strokeWidth={3}
                              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                              name="Reports" 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="tests" 
                              stroke="#06b6d4" 
                              strokeWidth={3}
                              dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2 }}
                              name="Water Tests" 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="completed" 
                              stroke="#10b981" 
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={{ fill: '#10b981', r: 3 }}
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
                    <Card className={cn(
                      "hover:shadow-lg transition-all duration-300",
                      darkMode 
                        ? "bg-gray-800/50 border-gray-700" 
                        : "border-gray-200/60 bg-white/50 backdrop-blur-sm"
                    )}>
                      <CardHeader className="pb-4">
                        <CardTitle className={cn("flex items-center gap-2 text-lg font-heading font-semibold", darkMode ? "text-white" : "text-foreground")}>
                          <Users className="h-5 w-5 text-green-500" />
                          Team Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {teamPerformanceData.map((team, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className={cn(
                              "flex items-center justify-between p-3 rounded-lg border transition-all duration-300",
                              darkMode
                                ? "border-gray-600 bg-gray-700/50 hover:bg-gray-700"
                                : "border-gray-200/40 bg-white/50 hover:bg-white"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                                <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold text-sm">
                                  {team.team.slice(-1)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className={cn("font-semibold text-sm", darkMode ? "text-white" : "text-gray-900")}>
                                  {team.team}
                                </p>
                                <p className={cn("text-xs", darkMode ? "text-gray-400" : "text-gray-500")}>
                                  {team.completed} completed
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 justify-end">
                                <div className={cn(
                                  "w-2 h-2 rounded-full",
                                  team.trend === "up" ? "bg-green-500" : "bg-red-500"
                                )} />
                                <span className={cn("text-xs font-semibold", darkMode ? "text-white" : "text-gray-900")}>
                                  {team.efficiency}%
                                </span>
                              </div>
                              <Progress 
                                value={team.efficiency} 
                                className={cn("w-20 h-2 mt-1", darkMode ? "bg-gray-600" : "")}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Enhanced Data Distribution */}
                    <Card className={cn(
                      "hover:shadow-lg transition-all duration-300",
                      darkMode 
                        ? "bg-gray-800/50 border-gray-700" 
                        : "border-gray-200/60 bg-white/50 backdrop-blur-sm"
                    )}>
                      <CardHeader className="pb-4">
                        <CardTitle className={cn("flex items-center gap-2 text-lg font-heading font-semibold", darkMode ? "text-white" : "text-foreground")}>
                          <PieChart className="h-5 w-5 text-purple-500" />
                          Data Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center gap-4">
                          <ResponsiveContainer width="100%" height={150}>
                            <RechartsPieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                          <div className="grid grid-cols-2 gap-2 w-full">
                            {pieData.map((item, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: item.color }}
                                />
                                <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                                  {item.name}
                                </span>
                                <span className={cn("font-semibold ml-auto", darkMode ? "text-white" : "text-gray-900")}>
                                  {item.value}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Enhanced Bottom Row - Activity Feed and Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <ActivityFeed darkMode={darkMode} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Card className={cn(
                      "hover:shadow-xl transition-all duration-300 h-full",
                      darkMode 
                        ? "bg-gray-800/50 border-gray-700" 
                        : "border-gray-200/60 bg-white/50 backdrop-blur-sm"
                    )}>
                      <CardHeader className="border-b border-gray-200/40 pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className={cn("flex items-center gap-2 text-lg font-heading font-semibold", darkMode ? "text-white" : "text-foreground")}>
                            <Globe className="h-5 w-5 text-blue-500" />
                            Active Locations - Live Map
                          </CardTitle>
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                            {mapLocations.length} Active
                          </Badge>
                        </div>
                        <CardDescription className={darkMode ? "text-gray-400" : ""}>
                          Real-time field team locations and status
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className={cn(
                          "h-80 rounded-xl border-2 border-dashed relative overflow-hidden group",
                          darkMode 
                            ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600" 
                            : "bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border-gray-300/60"
                        )}>
                          {/* Enhanced Map Background */}
                          <div className="absolute inset-0 opacity-20">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <pattern id="enhancedGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                                </pattern>
                                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                                  <stop offset="0%" stopColor={darkMode ? "#3b82f6" : "hsl(var(--primary))"} stopOpacity="0.1" />
                                  <stop offset="100%" stopColor={darkMode ? "#3b82f6" : "hsl(var(--primary))"} stopOpacity="0" />
                                </radialGradient>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#enhancedGrid)" className={darkMode ? "text-gray-700" : "text-gray-300"} />
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
                                whileHover={{ scale: 1.3 }}
                              >
                                <div className={cn(
                                  "w-4 h-4 rounded-full border-2 border-white shadow-lg relative",
                                  location.type === 'water' ? "bg-cyan-500" :
                                  location.type === 'health' ? "bg-orange-500" :
                                  location.type === 'climate' ? "bg-green-500" :
                                  "bg-purple-500",
                                  location.status === 'alert' && "animate-pulse ring-2 ring-red-500",
                                  location.priority === 'high' && "ring-2 ring-yellow-400"
                                )}>
                                  {location.status === 'alert' && (
                                    <div className="absolute inset-0 rounded-full bg-current animate-ping opacity-75"></div>
                                  )}
                                </div>
                                
                                {/* Enhanced Tooltip */}
                                <div className={cn(
                                  "absolute left-6 top-0 border rounded-xl p-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-10 min-w-48 backdrop-blur-sm",
                                  darkMode 
                                    ? "bg-gray-800/95 border-gray-600" 
                                    : "bg-white/95 border-gray-200"
                                )}>
                                  <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <p className={cn("font-semibold text-sm", darkMode ? "text-white" : "text-gray-900")}>
                                      {location.name}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between text-xs mb-2">
                                    <Badge 
                                      variant="secondary" 
                                      className={cn(
                                        "capitalize text-xs",
                                        location.type === 'water' ? "bg-cyan-100 text-cyan-700" :
                                        location.type === 'health' ? "bg-orange-100 text-orange-700" :
                                        location.type === 'climate' ? "bg-green-100 text-green-700" :
                                        "bg-purple-100 text-purple-700",
                                        darkMode && "bg-opacity-20"
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
                                  <div className="flex items-center justify-between text-xs">
                                    <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                      {location.team}
                                    </span>
                                    <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                      {new Date(location.lastUpdate).toLocaleTimeString()}
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          
                          {/* Enhanced Legend */}
                          <div className={cn(
                            "absolute bottom-4 left-4 border rounded-xl px-4 py-3 space-y-2 shadow-lg backdrop-blur-sm",
                            darkMode 
                              ? "bg-gray-800/95 border-gray-600" 
                              : "bg-white/95 border-gray-200"
                          )}>
                            <p className={cn("text-xs font-semibold mb-2", darkMode ? "text-white" : "text-gray-900")}>
                              Location Types
                            </p>
                            {[
                              { color: "bg-cyan-500", label: "Water Sites" },
                              { color: "bg-orange-500", label: "Health Centers" },
                              { color: "bg-green-500", label: "Climate Stations" },
                              { color: "bg-purple-500", label: "Infrastructure" },
                            ].map((item, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                <span className={cn("text-xs", darkMode ? "text-gray-300" : "text-gray-700")}>
                                  {item.label}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Map Controls */}
                          <div className="absolute top-4 right-4 flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={cn("backdrop-blur-sm", darkMode ? "bg-gray-700/80 border-gray-600" : "bg-white/80")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={cn("backdrop-blur-sm", darkMode ? "bg-gray-700/80 border-gray-600" : "bg-white/80")}
                            >
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
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;