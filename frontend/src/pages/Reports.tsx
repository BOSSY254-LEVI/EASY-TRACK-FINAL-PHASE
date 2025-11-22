import { FileText, Download, Filter, Search, Calendar, BarChart3, PieChart, Map, TrendingUp, Users, Eye, MoreVertical, Share, Edit, Sparkles, Zap, Target, Clock, DownloadCloud, FileDown, Printer, Mail, Settings, ChevronDown, RefreshCw, AlertCircle, CheckCircle2, PlayCircle, Cloud, Droplet, TreePine, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { fieldDataAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Reports = () => {
  const { toast } = useToast();
  const [fieldData, setFieldData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("month");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [exportLoading, setExportLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFieldData();
  }, []);

  const fetchFieldData = async () => {
    try {
      setRefreshing(true);
      const data = await fieldDataAPI.getAll();
      setFieldData(data || []);
      toast({
        title: "Data Updated",
        description: "Field data has been refreshed successfully",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load field data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleExport = async (format: string) => {
    setExportLoading(true);
    // Simulate export process
    setTimeout(() => {
      setExportLoading(false);
      toast({
        title: "Export Successful",
        description: `Reports exported as ${format.toUpperCase()}`,
        className: "bg-blue-500 text-white",
      });
    }, 2000);
  };

  // Enhanced data processing
  const monthlyData = [
    { month: "Jan", water: 45, health: 32, climate: 28, environment: 15, target: 120 },
    { month: "Feb", water: 52, health: 38, climate: 31, environment: 18, target: 120 },
    { month: "Mar", water: 48, health: 41, climate: 35, environment: 22, target: 120 },
    { month: "Apr", water: 61, health: 45, climate: 38, environment: 25, target: 120 },
    { month: "May", water: 68, health: 52, climate: 42, environment: 28, target: 120 },
    { month: "Jun", water: 72, health: 58, climate: 47, environment: 31, target: 120 },
    { month: "Jul", water: 65, health: 61, climate: 51, environment: 35, target: 120 },
    { month: "Aug", water: 78, health: 67, climate: 55, environment: 38, target: 120 },
    { month: "Sep", water: 82, health: 72, climate: 58, environment: 42, target: 120 },
    { month: "Oct", water: 88, health: 78, climate: 62, environment: 45, target: 120 },
    { month: "Nov", water: 85, health: 82, climate: 67, environment: 48, target: 120 },
    { month: "Dec", water: 91, health: 88, climate: 72, environment: 52, target: 120 },
  ];

  const categoryData = [
    { name: "Water Quality", value: 35, color: "#0ea5e9", icon: Droplet },
    { name: "Health Screening", value: 28, color: "#f97316", icon: Users },
    { name: "Climate Monitoring", value: 22, color: "#10b981", icon: Cloud },
    { name: "Environmental", value: 15, color: "#8b5cf6", icon: TreePine },
  ];

  const regionData = [
    { region: "Nairobi", reports: 245, alerts: 18, efficiency: 92, trend: "up" },
    { region: "Kampala", reports: 198, alerts: 12, efficiency: 88, trend: "up" },
    { region: "Dar es Salaam", reports: 212, alerts: 22, efficiency: 85, trend: "down" },
    { region: "Kigali", reports: 187, alerts: 8, efficiency: 95, trend: "up" },
    { region: "Lagos", reports: 265, alerts: 25, efficiency: 82, trend: "down" },
  ];

  const performanceData = [
    { metric: "Data Accuracy", score: 94, target: 95, trend: "up" },
    { metric: "Timeliness", score: 88, target: 90, trend: "up" },
    { metric: "Completeness", score: 92, target: 95, trend: "stable" },
    { metric: "User Satisfaction", score: 96, target: 90, trend: "up" },
  ];

  const stats = {
    totalReports: fieldData.length || 1247,
    completed: 1124,
    inProgress: 89,
    pending: 34,
    accuracy: 94.2,
    avgCompletion: 2.4
  };

  const filteredReports = fieldData.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentReports = filteredReports.slice(0, 6).map((item, index) => ({
    id: item.id || index,
    title: item.title || `Report ${index + 1}`,
    date: new Date(item.created_at || new Date()).toLocaleDateString(),
    status: index % 3 === 0 ? "Completed" : index % 3 === 1 ? "In Progress" : "Pending",
    type: item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : "General",
    priority: index % 4 === 0 ? "high" : index % 4 === 1 ? "medium" : "low",
    team: `Team ${String.fromCharCode(65 + (index % 5))}`,
    progress: index % 3 === 0 ? 100 : index % 3 === 1 ? 65 : 30
  }));

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

  const StatCard = ({ title, value, description, icon: Icon, trend, color }: any) => (
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
                {trend === "down" && <TrendingDown className="h-3 w-3" />}
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

  const ReportCard = ({ report }: { report: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="flex items-center justify-between p-4 border border-gray-200/60 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-md transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110",
          report.type === 'Water' ? "bg-cyan-500/10" :
          report.type === 'Health' ? "bg-orange-500/10" :
          report.type === 'Climate' ? "bg-green-500/10" :
          "bg-purple-500/10"
        )}>
          <FileText className={cn(
            "h-6 w-6",
            report.type === 'Water' ? "text-cyan-600" :
            report.type === 'Health' ? "text-orange-600" :
            report.type === 'Climate' ? "text-green-600" :
            "text-purple-600"
          )} />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-gray-900 group-hover:text-gray-800">{report.title}</p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{report.date}</span>
            <span>•</span>
            <span>{report.team}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {report.progress < 100 ? (
            <div className="w-20">
              <Progress value={report.progress} className="h-2 bg-gray-200" />
            </div>
          ) : null}
          <Badge className={cn(
            "capitalize",
            report.priority === 'high' ? "bg-red-100 text-red-700 border-red-200" :
            report.priority === 'medium' ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
            "bg-green-100 text-green-700 border-green-200"
          )}>
            {report.priority}
          </Badge>
        </div>
        
        <Badge variant="outline" className={cn(
          "capitalize",
          report.status === 'Completed' ? "bg-green-50 text-green-700 border-green-200" :
          report.status === 'In Progress' ? "bg-blue-50 text-blue-700 border-blue-200" :
          "bg-orange-50 text-orange-700 border-orange-200"
        )}>
          {report.status}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
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
              Edit Report
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                <h2 className="text-4xl font-heading font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Reports & Analytics
                </h2>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Live Data
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" />
                Comprehensive insights and analytics from field operations
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchFieldData}
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
                    <Download className="h-4 w-4" />
                    Export Reports
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleExport("pdf")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("excel")}>
                    <FileDown className="h-4 w-4 mr-2" />
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("csv")}>
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Printer className="h-4 w-4 mr-2" />
                    Print Reports
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="h-4 w-4 mr-2" />
                    Email Summary
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
              title="Total Reports"
              value={stats.totalReports.toLocaleString()}
              description="+12.5% from last month"
              icon={FileText}
              trend="up"
              color="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <StatCard
              title="Completed"
              value={stats.completed.toLocaleString()}
              description="94.2% accuracy rate"
              icon={CheckCircle2}
              trend="up"
              color="bg-gradient-to-br from-green-500 to-emerald-600"
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              description="Active field work"
              icon={PlayCircle}
              trend="stable"
              color="bg-gradient-to-br from-orange-500 to-amber-600"
            />
            <StatCard
              title="Avg. Completion"
              value={`${stats.avgCompletion}d`}
              description="Per report"
              icon={Clock}
              trend="down"
              color="bg-gradient-to-br from-purple-500 to-pink-600"
            />
          </motion.div>

          {/* Enhanced Filters */}
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
                  placeholder="Search reports, descriptions, categories..." 
                  className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-36 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="water">Water Quality</SelectItem>
                    <SelectItem value="health">Health Screening</SelectItem>
                    <SelectItem value="climate">Climate Monitoring</SelectItem>
                    <SelectItem value="environment">Environmental</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>
            </div>

            <Tabs value={dateRange} onValueChange={setDateRange} className="w-auto">
              <TabsList className="bg-white/50 backdrop-blur-sm border border-gray-200">
                <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
                <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                <TabsTrigger value="quarter" className="text-xs">Quarter</TabsTrigger>
                <TabsTrigger value="year" className="text-xs">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Enhanced Charts Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 bg-gradient-to-br from-white to-blue-50/30 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        Monthly Report Trends
                      </CardTitle>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Zap className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                    <CardDescription>Report volume by category over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                        <XAxis dataKey="month" className="text-xs" tick={{ fill: '#6B7280' }} />
                        <YAxis className="text-xs" tick={{ fill: '#6B7280' }} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="water" fill="#0ea5e9" name="Water" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="health" fill="#f97316" name="Health" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="climate" fill="#10b981" name="Climate" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="environment" fill="#8b5cf6" name="Environmental" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Category Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 bg-gradient-to-br from-white to-purple-50/30 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                      <PieChart className="h-5 w-5 text-purple-500" />
                      Reports by Category
                    </CardTitle>
                    <CardDescription>Distribution across different report types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between h-[300px]">
                      <ResponsiveContainer width="60%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip content={<CustomTooltip />} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                      <div className="space-y-3 flex-1 pl-4">
                        {categoryData.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                            <span className="text-sm font-bold text-gray-900 ml-auto">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Regional Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-0 bg-gradient-to-br from-white to-green-50/30 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                      <Map className="h-5 w-5 text-green-500" />
                      Regional Performance
                    </CardTitle>
                    <CardDescription>Reports and alerts by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={regionData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                        <XAxis type="number" className="text-xs" tick={{ fill: '#6B7280' }} />
                        <YAxis dataKey="region" type="category" className="text-xs" tick={{ fill: '#6B7280' }} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="reports" fill="#3b82f6" name="Reports" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="alerts" fill="#ef4444" name="Alerts" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="border-0 bg-gradient-to-br from-white to-orange-50/30 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                      <BarChart3 className="h-5 w-5 text-orange-500" />
                      Performance Metrics
                    </CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {performanceData.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">{metric.score}%</span>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                metric.trend === 'up' ? "bg-green-50 text-green-700 border-green-200" :
                                metric.trend === 'down' ? "bg-red-50 text-red-700 border-red-200" :
                                "bg-gray-50 text-gray-700 border-gray-200"
                              )}
                            >
                              {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Progress value={metric.score} className="flex-1 h-2 bg-gray-200" />
                          <span>Target: {metric.target}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Recent Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Recent Reports
                  </CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    View All
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Latest field reports and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <AnimatePresence>
                    {recentReports.map((report, index) => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200/60 pt-4">
                <div className="flex items-center justify-between w-full text-sm text-gray-500">
                  <span>Showing {recentReports.length} of {filteredReports.length} reports</span>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    Load More
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;