import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Users, MapPin, AlertCircle, Clock, Search, Filter, Download, MoreVertical, Eye, Share, RefreshCw, Sparkles, Zap, TrendingUp, MessageCircle, ThumbsUp, Bookmark, ExternalLink, BarChart3, Target, Calendar, UserPlus, Settings, Bell, DownloadCloud } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Activities = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      user: "Sarah Mitchell",
      initials: "SM",
      avatar: "/avatars/01.png",
      action: "submitted a new data entry",
      target: "Water Quality - Site A",
      type: "data",
      time: "5 minutes ago",
      priority: "high",
      read: false,
      likes: 3,
      comments: 2,
      team: "Team Alpha",
      project: "Water Monitoring",
      details: "Collected water samples from Site A with pH levels at 7.2 and temperature at 25°C"
    },
    {
      id: 2,
      user: "Ahmed Khan",
      initials: "AK",
      avatar: "/avatars/02.png",
      action: "updated location coordinates",
      target: "Climate Station - Coastal",
      type: "location",
      time: "1 hour ago",
      priority: "medium",
      read: true,
      likes: 5,
      comments: 1,
      team: "Team Beta",
      project: "Climate Research",
      details: "Adjusted GPS coordinates for improved accuracy in coastal monitoring"
    },
    {
      id: 3,
      user: "John Doe",
      initials: "JD",
      avatar: "/avatars/03.png",
      action: "added a team member to",
      target: "Health Survey Project",
      type: "team",
      time: "3 hours ago",
      priority: "low",
      read: true,
      likes: 8,
      comments: 4,
      team: "Team Gamma",
      project: "Health Outreach",
      details: "Welcomed Dr. Emily Chen to the health survey team as lead researcher"
    },
    {
      id: 4,
      user: "Maria Garcia",
      initials: "MG",
      avatar: "/avatars/04.png",
      action: "resolved an alert",
      target: "Low Response Rate Warning",
      type: "alert",
      time: "5 hours ago",
      priority: "high",
      read: false,
      likes: 12,
      comments: 3,
      team: "Team Delta",
      project: "Community Health",
      details: "Implemented new outreach strategy resulting in 45% response rate improvement"
    },
    {
      id: 5,
      user: "David Chen",
      initials: "DC",
      avatar: "/avatars/05.png",
      action: "created a new project",
      target: "Environmental Impact Study",
      type: "project",
      time: "1 day ago",
      priority: "medium",
      read: true,
      likes: 15,
      comments: 7,
      team: "Team Epsilon",
      project: "Environmental Research",
      details: "Launched comprehensive environmental impact study for urban development zone"
    },
    {
      id: 6,
      user: "Lisa Brown",
      initials: "LB",
      avatar: "/avatars/01.png",
      action: "completed field survey",
      target: "Rural Community Assessment",
      type: "data",
      time: "2 days ago",
      priority: "high",
      read: false,
      likes: 20,
      comments: 9,
      team: "Team Alpha",
      project: "Community Development",
      details: "Successfully completed survey covering 500 households across 3 villages"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const stats = {
    total: activities.length,
    unread: activities.filter(a => !a.read).length,
    highPriority: activities.filter(a => a.priority === "high").length,
    today: activities.filter(a => a.time.includes('minutes') || a.time.includes('hour')).length
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || activity.type === filterType;
    const matchesPriority = filterPriority === "all" || activity.priority === filterPriority;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "unread" && !activity.read) ||
                      (activeTab === "high" && activity.priority === "high");
    
    return matchesSearch && matchesType && matchesPriority && matchesTab;
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // In a real app, this would fetch new data
    }, 1500);
  };

  const markAsRead = (activityId: number) => {
    setActivities(activities.map(activity => 
      activity.id === activityId ? { ...activity, read: true } : activity
    ));
  };

  const markAllAsRead = () => {
    setActivities(activities.map(activity => ({ ...activity, read: true })));
  };

  const getActivityIcon = (type: string) => {
    const baseClass = "h-5 w-5";
    switch (type) {
      case "data":
        return <FileText className={cn(baseClass, "text-blue-500")} />;
      case "location":
        return <MapPin className={cn(baseClass, "text-green-500")} />;
      case "team":
        return <Users className={cn(baseClass, "text-purple-500")} />;
      case "alert":
        return <AlertCircle className={cn(baseClass, "text-red-500")} />;
      case "project":
        return <BarChart3 className={cn(baseClass, "text-orange-500")} />;
      default:
        return <Clock className={cn(baseClass, "text-gray-500")} />;
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

  const ActivityCard = ({ activity }: { activity: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer",
        activity.read 
          ? "bg-white/50 border-gray-200/60 hover:bg-white/80 hover:shadow-md" 
          : "bg-blue-50/50 border-blue-200/60 hover:bg-blue-50/80 hover:shadow-lg"
      )}
    >
      {/* Unread indicator */}
      {!activity.read && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
      )}

      <div className="flex items-start gap-4">
        <div className="relative">
          <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
            <AvatarImage src={activity.avatar} alt={activity.user} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {activity.initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-sm border">
            {getActivityIcon(activity.type)}
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-gray-900 group-hover:text-gray-800">
                  {activity.user}
                </p>
                <span className="text-gray-600 text-sm">{activity.action}</span>
                <p className="font-semibold text-gray-900 group-hover:text-gray-800 truncate">
                  {activity.target}
                </p>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2">
                {activity.details}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className={cn("text-xs capitalize", getPriorityColor(activity.priority))}>
                  {activity.priority} priority
                </Badge>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{activity.team}</span>
                  </div>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => markAsRead(activity.id)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Mark as {activity.read ? 'Unread' : 'Read'}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="h-4 w-4 mr-2" />
                  Share Activity
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmark
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Engagement Metrics */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>{activity.likes}</span>
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>{activity.comments}</span>
              </button>
            </div>
            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
              {activity.project}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );

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
                trend === "up" ? "text-green-600" : "text-gray-600"
              )}>
                {trend === "up" && <TrendingUp className="h-3 w-3" />}
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

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 p-6">
        <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
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
                  Activity Feed
                </h1>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Live Updates
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" />
                Track all team activities, updates, and collaborations in real-time
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                    <DownloadCloud className="h-4 w-4" />
                    Export Feed
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={markAllAsRead}>
                    <Eye className="h-4 w-4 mr-2" />
                    Mark All as Read
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              title="Total Activities"
              value={stats.total}
              description="This month"
              icon={BarChart3}
              trend="up"
              color="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <StatCard
              title="Unread"
              value={stats.unread}
              description="Requires attention"
              icon={Bell}
              trend="down"
              color="bg-gradient-to-br from-orange-500 to-red-500"
            />
            <StatCard
              title="High Priority"
              value={stats.highPriority}
              description="Critical updates"
              icon={AlertCircle}
              trend="stable"
              color="bg-gradient-to-br from-purple-500 to-pink-600"
            />
            <StatCard
              title="Today"
              value={stats.today}
              description="Recent activities"
              icon={Clock}
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
                  placeholder="Search activities, users, projects..." 
                  className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-36 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
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
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 gap-2 p-1 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                All Activities
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {activities.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Unread
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {stats.unread}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="high" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                High Priority
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {stats.highPriority}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team Updates
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
                  {filteredActivities.map((activity, index) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </AnimatePresence>

                {/* Empty State */}
                {filteredActivities.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                      <Bell className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                    <Button 
                      onClick={() => {
                        setSearchQuery("");
                        setFilterType("all");
                        setFilterPriority("all");
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

          {/* Load More Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-between pt-6 border-t border-gray-200/60"
          >
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredActivities.length}</span> of <span className="font-semibold text-gray-900">{activities.length}</span> activities
            </div>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Load More Activities
            </Button>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Activities;