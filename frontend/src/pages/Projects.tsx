import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, FolderOpen, Users, Calendar, Clock, Target, MoreVertical, Edit, Trash2, Share, Download, Filter, BarChart3, Sparkles, Zap, Eye, Settings, ArrowUpRight, ChevronRight, TrendingUp, AlertCircle, CheckCircle2, PlayCircle, PauseCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Water Quality Monitoring - North Region",
      description: "Comprehensive water quality assessment across northern districts",
      status: "active",
      team: 5,
      deadline: "2025-11-15",
      progress: 75,
      priority: "high",
      budget: "$45,000",
      duration: "6 months",
      startDate: "2025-05-15",
      teamMembers: [
        { name: "Alex Johnson", role: "Lead", avatar: "/avatars/01.png" },
        { name: "Sarah Chen", role: "Researcher", avatar: "/avatars/02.png" },
        { name: "Mike Rodriguez", role: "Field Agent", avatar: "/avatars/03.png" },
      ],
      tasks: { completed: 45, total: 60 },
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      name: "Climate Data Collection - Coastal Areas",
      description: "Environmental monitoring and climate impact study",
      status: "active",
      team: 8,
      deadline: "2025-12-01",
      progress: 45,
      priority: "medium",
      budget: "$68,000",
      duration: "8 months",
      startDate: "2025-04-01",
      teamMembers: [
        { name: "Emma Davis", role: "Lead", avatar: "/avatars/04.png" },
        { name: "James Wilson", role: "Analyst", avatar: "/avatars/05.png" },
      ],
      tasks: { completed: 27, total: 60 },
      lastUpdated: "1 day ago"
    },
    {
      id: 3,
      name: "Health Survey - Rural Communities",
      description: "Public health assessment and community outreach",
      status: "pending",
      team: 3,
      deadline: "2025-11-30",
      progress: 20,
      priority: "high",
      budget: "$32,000",
      duration: "4 months",
      startDate: "2025-07-30",
      teamMembers: [
        { name: "Lisa Brown", role: "Coordinator", avatar: "/avatars/01.png" },
      ],
      tasks: { completed: 12, total: 60 },
      lastUpdated: "3 days ago"
    },
    {
      id: 4,
      name: "Environmental Impact Assessment",
      description: "Infrastructure development environmental review",
      status: "completed",
      team: 6,
      deadline: "2025-10-01",
      progress: 100,
      priority: "medium",
      budget: "$52,000",
      duration: "5 months",
      startDate: "2025-05-01",
      teamMembers: [
        { name: "Tom Smith", role: "Lead", avatar: "/avatars/02.png" },
        { name: "Anna Taylor", role: "Specialist", avatar: "/avatars/03.png" },
      ],
      tasks: { completed: 60, total: 60 },
      lastUpdated: "1 week ago"
    },
    {
      id: 5,
      name: "Urban Air Quality Study",
      description: "Metropolitan area pollution monitoring initiative",
      status: "active",
      team: 7,
      deadline: "2025-12-15",
      progress: 60,
      priority: "high",
      budget: "$75,000",
      duration: "7 months",
      startDate: "2025-05-15",
      teamMembers: [
        { name: "David Kim", role: "Lead", avatar: "/avatars/04.png" },
        { name: "Maria Garcia", role: "Technician", avatar: "/avatars/05.png" },
      ],
      tasks: { completed: 36, total: 60 },
      lastUpdated: "5 hours ago"
    },
    {
      id: 6,
      name: "Agricultural Sustainability Research",
      description: "Farming practices and environmental impact analysis",
      status: "planning",
      team: 4,
      deadline: "2025-12-30",
      progress: 10,
      priority: "low",
      budget: "$28,000",
      duration: "3 months",
      startDate: "2025-09-30",
      teamMembers: [
        { name: "Robert Lee", role: "Researcher", avatar: "/avatars/01.png" },
      ],
      tasks: { completed: 6, total: 60 },
      lastUpdated: "2 weeks ago"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    pending: projects.filter(p => p.status === 'pending').length,
    totalBudget: projects.reduce((sum, p) => sum + parseInt(p.budget.replace('$', '').replace(',', '')), 0)
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <PlayCircle className="h-4 w-4 text-green-500" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-orange-500" />;
      default: return <PauseCircle className="h-4 w-4 text-gray-500" />;
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

  const ProjectCard = ({ project }: { project: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-300">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                <FolderOpen className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                  {project.name}
                </CardTitle>
                <CardDescription className="line-clamp-1 text-sm">
                  {project.description}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={cn("capitalize border", getPriorityColor(project.priority))}>
                {project.priority}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Project
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Progress</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{project.progress}%</span>
                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                  {getStatusIcon(project.status)}
                  {project.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <Progress value={project.progress} className="h-2 bg-gray-200" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                <span>Updated {project.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {project.teamMembers.slice(0, 3).map((member: any, index: number) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{member.name} - {member.role}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
                {project.teamMembers.length > 3 && (
                  <div className="w-8 h-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                    +{project.teamMembers.length - 3}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-600">{project.team} members</span>
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">{project.budget}</div>
              <div className="text-xs text-gray-500">Budget</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Due {project.deadline}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3" />
              <span>{project.duration}</span>
            </div>
          </div>
        </CardContent>

        {/* Hover effect line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Card>
    </motion.div>
  );

  const StatsCard = ({ title, value, description, icon: Icon, trend, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300 group">
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
                <h1 className="font-heading text-4xl font-bold text-foreground bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Projects
                </h1>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {stats.total} Total
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" />
                Manage and track all your field projects with real-time insights
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                <Plus className="h-4 w-4" />
                New Project
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatsCard
              title="Total Projects"
              value={stats.total}
              description="All active projects"
              icon={FolderOpen}
              trend="up"
              color="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <StatsCard
              title="Active Projects"
              value={stats.active}
              description="In progress"
              icon={PlayCircle}
              trend="up"
              color="bg-gradient-to-br from-green-500 to-emerald-600"
            />
            <StatsCard
              title="Completed"
              value={stats.completed}
              description="Successfully delivered"
              icon={CheckCircle2}
              trend="up"
              color="bg-gradient-to-br from-purple-500 to-pink-600"
            />
            <StatsCard
              title="Total Budget"
              value={`$${stats.totalBudget.toLocaleString()}`}
              description="Allocated funding"
              icon={BarChart3}
              trend="up"
              color="bg-gradient-to-br from-orange-500 to-red-500"
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
                  placeholder="Search projects, descriptions, teams..." 
                  className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="gap-2"
              >
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                </div>
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="gap-2"
              >
                <div className="flex flex-col gap-0.5 w-4 h-4">
                  <div className="bg-current rounded-sm h-1 w-full" />
                  <div className="bg-current rounded-sm h-1 w-full" />
                  <div className="bg-current rounded-sm h-1 w-full" />
                </div>
                List
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn(
              "gap-6",
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "space-y-4"
            )}
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <FolderOpen className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setPriorityFilter("all");
                }}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Clear filters
              </Button>
            </motion.div>
          )}

          {/* Quick Actions Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200/60"
          >
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProjects.length}</span> of <span className="font-semibold text-gray-900">{projects.length}</span> projects
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Project Settings
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;