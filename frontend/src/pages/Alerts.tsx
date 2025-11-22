"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  CheckCircle2,
  Bell,
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Clock,
  Users,
  MapPin,
  Shield,
  Zap,
  Sparkles,
  TrendingUp,
  RefreshCw,
  Settings,
  MessageCircle,
  Share,
  Archive,
  Trash2,
  Volume2,
  VolumeX,
  ArrowUpRight,
  BarChart3,
  Target,
  Calendar,
  User,
  Mail,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Alerts = () => {
  const { toast } = useToast();
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertsList, setAlertsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setRefreshing(true);
      // Enhanced mock data with more realistic alerts
      const mockAlerts = [
        {
          id: 1,
          type: "critical",
          title: "Water Quality Alert - Site A",
          message: "Contamination levels exceeded safe threshold by 15%. Immediate action required to prevent health risks.",
          time: "2 hours ago",
          status: "open",
          priority: "high",
          location: "Site A - River Station",
          assignedTo: "Sarah Mitchell",
          team: "Water Quality Team",
          impact: "High",
          resolutionTime: "4 hours",
          updates: [
            { time: "1 hour ago", message: "Team dispatched for water sampling", user: "Ahmed Khan" },
            { time: "30 minutes ago", message: "Initial containment measures implemented", user: "Sarah Mitchell" }
          ]
        },
        {
          id: 2,
          type: "warning",
          title: "Low Survey Response Rate",
          message: "Health survey completion rate below 60% in North Region. May affect data accuracy for quarterly report.",
          time: "5 hours ago",
          status: "open",
          priority: "medium",
          location: "North Region",
          assignedTo: "John Doe",
          team: "Health Research",
          impact: "Medium",
          resolutionTime: "2 days",
          updates: [
            { time: "2 hours ago", message: "Follow-up reminders sent to participants", user: "Maria Garcia" }
          ]
        },
        {
          id: 3,
          type: "info",
          title: "System Maintenance Scheduled",
          message: "Routine database backup and system optimization scheduled. Expected downtime: 15 minutes.",
          time: "1 day ago",
          status: "acknowledged",
          priority: "low",
          location: "All Systems",
          assignedTo: "IT Team",
          team: "Technical Operations",
          impact: "Low",
          resolutionTime: "Completed",
          updates: []
        },
        {
          id: 4,
          type: "success",
          title: "Data Sync Completed",
          message: "All offline field entries successfully synchronized to the central database. Data integrity verified.",
          time: "2 days ago",
          status: "resolved",
          priority: "low",
          location: "Cloud Storage",
          assignedTo: "System Auto",
          team: "Data Management",
          impact: "Low",
          resolutionTime: "Completed",
          updates: []
        },
        {
          id: 5,
          type: "critical",
          title: "Equipment Malfunction - Climate Station",
          message: "Temperature sensor failure detected at Coastal Climate Station. Data accuracy compromised.",
          time: "3 hours ago",
          status: "open",
          priority: "high",
          location: "Coastal Station B",
          assignedTo: "David Chen",
          team: "Climate Research",
          impact: "High",
          resolutionTime: "6 hours",
          updates: [
            { time: "1 hour ago", message: "Technical team en route to station", user: "David Chen" }
          ]
        },
        {
          id: 6,
          type: "warning",
          title: "Budget Threshold Approaching",
          message: "Project expenses reaching 85% of allocated budget. Review required for additional funding.",
          time: "1 day ago",
          status: "acknowledged",
          priority: "medium",
          location: "Finance Department",
          assignedTo: "Lisa Brown",
          team: "Project Management",
          impact: "Medium",
          resolutionTime: "1 week",
          updates: []
        }
      ];
      setAlertsList(mockAlerts);
      toast({
        title: "🔄 Alerts Updated",
        description: "Latest alerts have been refreshed",
        className: "bg-blue-500 text-white",
      });
    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast({
        title: "Error",
        description: "Failed to load alerts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAcknowledge = (alertId: number) => {
    setAlertsList(alertsList.map(alert => 
      alert.id === alertId ? { ...alert, status: "acknowledged" } : alert
    ));
    toast({
      title: "✅ Alert Acknowledged",
      description: "The alert has been marked as acknowledged",
      className: "bg-green-500 text-white",
    });
  };

  const handleResolve = (alertId: number) => {
    setAlertsList(alertsList.map(alert => 
      alert.id === alertId ? { ...alert, status: "resolved" } : alert
    ));
    toast({
      title: "✅ Alert Resolved",
      description: "The alert has been marked as resolved",
      className: "bg-green-500 text-white",
    });
  };

  const markAllAsRead = () => {
    setAlertsList(alertsList.map(alert => ({ ...alert, status: "acknowledged" })));
    toast({
      title: "📋 All Alerts Acknowledged",
      description: "All open alerts have been marked as read",
      className: "bg-green-500 text-white",
    });
  };

  // Filter alerts based on search term and filters
  const filteredAlerts = alertsList.filter(alert =>
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.location.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(alert => {
    const matchesType = filterType === "all" || alert.type === filterType;
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "open" && alert.status === "open") ||
                      (activeTab === "critical" && alert.type === "critical") ||
                      (activeTab === "resolved" && alert.status === "resolved");
    
    return matchesType && matchesStatus && matchesTab;
  });

  const stats = {
    total: alertsList.length,
    open: alertsList.filter(a => a.status === 'open').length,
    critical: alertsList.filter(a => a.type === 'critical').length,
    resolved: alertsList.filter(a => a.status === 'resolved').length
  };

  // ✅ Helper function correctly placed OUTSIDE the array
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-50 text-red-700 border-red-200';
      case 'acknowledged': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const StatCard = ({ title, value, description, icon: Icon, color, trend }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
              <p className={cn(
                "text-xs font-medium flex items-center gap-1",
                trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"
              )}>
                {trend === "up" && <TrendingUp className="h-3 w-3" />}
                {trend === "down" && <TrendingUp className="h-3 w-3 rotate-180" />}
                {description}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Card>
    </motion.div>
  );

  const AlertCard = ({ alert }: { alert: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={cn(
        "group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer",
        alert.status === "open" && "border-l-4 border-l-red-500"
      )}>
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className={cn(
                "p-3 rounded-xl",
                alert.type === "critical" ? "bg-red-50 border border-red-200" :
                alert.type === "warning" ? "bg-yellow-50 border border-yellow-200" :
                alert.type === "info" ? "bg-blue-50 border border-blue-200" :
                "bg-green-50 border border-green-200"
              )}>
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-800 text-lg">
                      {alert.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge className={cn("capitalize", getPriorityColor(alert.priority))}>
                        {alert.priority}
                      </Badge>
                      <Badge variant="outline" className={cn("capitalize", getStatusColor(alert.status))}>
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {alert.message}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{alert.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>

                {alert.status === "open" && (
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-200/60">
                    <Button 
                      size="sm" 
                      className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                      onClick={() => handleAcknowledge(alert.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Acknowledge
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedAlert(alert)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolve(alert.id)}
                      className="gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Resolve
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedAlert(alert)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="h-4 w-4 mr-2" />
                  Share Alert
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Add Comment
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>

        {/* Hover effect line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Card>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 p-6">
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
                <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Alerts & Notifications
                </h1>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Real-time
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Monitor system alerts, critical notifications, and team activities
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMuted(!muted)}
                      className={muted ? "text-gray-500" : "text-blue-600"}
                    >
                      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{muted ? "Enable notifications" : "Disable notifications"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchAlerts}
                disabled={refreshing}
                className="p-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: refreshing ? 360 : 0 }}
                  transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
                >
                  <RefreshCw className="h-4 w-4" />
                </motion.div>
              </motion.button>

              <Button 
                onClick={markAllAsRead}
                variant="outline" 
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Mark All Read
              </Button>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatCard
              title="Total Alerts"
              value={stats.total}
              description="This week"
              icon={Bell}
              trend="up"
              color="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <StatCard
              title="Open Alerts"
              value={stats.open}
              description="Requires attention"
              icon={AlertTriangle}
              trend="down"
              color="bg-gradient-to-br from-orange-500 to-red-500"
            />
            <StatCard
              title="Critical"
              value={stats.critical}
              description="High priority"
              icon={AlertCircle}
              trend="stable"
              color="bg-gradient-to-br from-purple-500 to-pink-600"
            />
            <StatCard
              title="Resolved"
              value={stats.resolved}
              description="Completed this week"
              icon={CheckCircle2}
              trend="up"
              color="bg-gradient-to-br from-green-500 to-emerald-600"
            />
          </motion.div>

          {/* Enhanced Filters and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/60 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search alerts by title, message, location..." 
                  className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-36 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-white/80 backdrop-blur-sm border-gray-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 gap-2 p-1 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                All Alerts
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {alertsList.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="open" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Open
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {stats.open}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="critical" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Critical
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {stats.critical}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="resolved" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Resolved
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {stats.resolved}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <AnimatePresence>
                  {filteredAlerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </AnimatePresence>

                {/* Empty State */}
                {filteredAlerts.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                      <Bell className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts found</h3>
                    <p className="text-gray-600 mb-6">All systems are operating normally. No alerts match your current filters.</p>
                    <Button 
                      onClick={() => {
                        setSearchTerm("");
                        setFilterType("all");
                        setFilterStatus("all");
                        setActiveTab("all");
                      }}
                      className="gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      Clear filters
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Alert Details Dialog */}
          <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    selectedAlert?.type === "critical" ? "bg-red-50" :
                    selectedAlert?.type === "warning" ? "bg-yellow-50" :
                    selectedAlert?.type === "info" ? "bg-blue-50" :
                    "bg-green-50"
                  )}>
                    {getAlertIcon(selectedAlert?.type)}
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{selectedAlert?.title}</div>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      {selectedAlert?.time}
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Alert Details</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedAlert?.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-900">Status</h4>
                    <Badge variant="outline" className={cn(getStatusColor(selectedAlert?.status))}>
                      {selectedAlert?.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-900">Priority</h4>
                    <Badge variant="outline" className={cn(getPriorityColor(selectedAlert?.priority))}>
                      {selectedAlert?.priority}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-900">Location</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{selectedAlert?.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-900">Assigned To</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <User className="h-3 w-3" />
                      <span>{selectedAlert?.assignedTo}</span>
                    </div>
                  </div>
                </div>

                {selectedAlert?.updates && selectedAlert.updates.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Recent Updates</h4>
                    <div className="space-y-3">
                      {selectedAlert.updates.map((update: any, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-500 text-white text-xs">
                              {update.user.split(' ').map((n: string) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-900">{update.user}</span>
                              <span className="text-xs text-gray-500">{update.time}</span>
                            </div>
                            <p className="text-sm text-gray-600">{update.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex gap-2 sm:justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Alert ID: #{selectedAlert?.id}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedAlert(null)}>
                    Close
                  </Button>
                  {selectedAlert?.status === "open" && (
                    <Button 
                      onClick={() => {
                        handleAcknowledge(selectedAlert.id);
                        setSelectedAlert(null);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                    >
                      Acknowledge Alert
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;