import { Users, UserPlus, Mail, Phone, MapPin, MoreVertical, Search, Filter, Download, Eye, Edit, Trash2, Share, MessageCircle, Calendar, Clock, BarChart3, Sparkles, Zap, Target, TrendingUp, RefreshCw, Settings, ArrowUpRight, Shield, Crown, Star, StarOff, Wifi, Battery, Video, MailPlus, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

const Team = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { 
      id: 1, 
      name: "Sarah Johnson", 
      email: "sarah.j@terratrack.org", 
      role: "Field Coordinator", 
      location: "Nairobi, Kenya", 
      phone: "+254 712 345 678", 
      avatar: "/avatars/01.png",
      status: "active",
      performance: 95,
      tasks: { completed: 45, total: 47 },
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      skills: ["Leadership", "Data Analysis", "Field Operations"],
      projects: ["Water Quality", "Health Survey"],
      starred: true
    },
    { 
      id: 2, 
      name: "Michael Okonkwo", 
      email: "michael.o@terratrack.org", 
      role: "Data Analyst", 
      location: "Lagos, Nigeria", 
      phone: "+234 802 345 6789", 
      avatar: "/avatars/02.png",
      status: "active",
      performance: 88,
      tasks: { completed: 32, total: 35 },
      joinDate: "2024-02-20",
      lastActive: "30 minutes ago",
      skills: ["Python", "SQL", "Data Visualization"],
      projects: ["Climate Research", "Data Analytics"],
      starred: false
    },
    { 
      id: 3, 
      name: "Amina Hassan", 
      email: "amina.h@terratrack.org", 
      role: "Health Officer", 
      location: "Kampala, Uganda", 
      phone: "+256 772 345 678", 
      avatar: "/avatars/03.png",
      status: "active",
      performance: 92,
      tasks: { completed: 28, total: 30 },
      joinDate: "2024-01-10",
      lastActive: "1 hour ago",
      skills: ["Public Health", "Community Outreach", "Medical"],
      projects: ["Health Survey", "Vaccination Drive"],
      starred: true
    },
    { 
      id: 4, 
      name: "David Mutua", 
      email: "david.m@terratrack.org", 
      role: "Field Agent", 
      location: "Kigali, Rwanda", 
      phone: "+250 788 345 678", 
      avatar: "/avatars/04.png",
      status: "active",
      performance: 85,
      tasks: { completed: 38, total: 42 },
      joinDate: "2024-03-05",
      lastActive: "5 minutes ago",
      skills: ["Field Research", "GPS Navigation", "Sample Collection"],
      projects: ["Environmental Study", "Water Testing"],
      starred: false
    },
    { 
      id: 5, 
      name: "Fatima Ndlovu", 
      email: "fatima.n@terratrack.org", 
      role: "Climate Specialist", 
      location: "Dar es Salaam, Tanzania", 
      phone: "+255 765 345 678", 
      avatar: "/avatars/05.png",
      status: "away",
      performance: 90,
      tasks: { completed: 25, total: 28 },
      joinDate: "2024-02-28",
      lastActive: "2 days ago",
      skills: ["Climate Science", "Data Modeling", "Research"],
      projects: ["Climate Research", "Environmental Impact"],
      starred: false
    },
    { 
      id: 6, 
      name: "James Chen", 
      email: "james.c@terratrack.org", 
      role: "Technical Lead", 
      location: "Nairobi, Kenya", 
      phone: "+254 734 567 890", 
      avatar: "/avatars/01.png",
      status: "active",
      performance: 96,
      tasks: { completed: 50, total: 50 },
      joinDate: "2023-11-15",
      lastActive: "15 minutes ago",
      skills: ["System Architecture", "DevOps", "Security"],
      projects: ["Platform Development", "Infrastructure"],
      starred: true
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    department: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === "active").length,
    locations: new Set(teamMembers.map(m => m.location)).size,
    roles: new Set(teamMembers.map(m => m.role)).size,
    avgPerformance: Math.round(teamMembers.reduce((acc, m) => acc + m.performance, 0) / teamMembers.length),
    starred: teamMembers.filter(m => m.starred).length
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.location.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(member => {
    const matchesRole = filterRole === "all" || member.role === filterRole;
    const matchesStatus = filterStatus === "all" || member.status === filterStatus;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "active" && member.status === "active") ||
                      (activeTab === "starred" && member.starred) ||
                      (activeTab === "leadership" && member.role.includes("Coordinator") || member.role.includes("Lead"));
    
    return matchesRole && matchesStatus && matchesTab;
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember = {
      id: teamMembers.length + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      location: formData.location,
      phone: formData.phone,
      avatar: "/avatars/0" + ((teamMembers.length % 5) + 1) + ".png",
      status: "active",
      performance: Math.floor(Math.random() * 20) + 80, // Random performance between 80-100
      tasks: { completed: 0, total: 0 },
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: "Just now",
      skills: [],
      projects: [],
      starred: false
    };

    setTeamMembers([...teamMembers, newMember]);
    setOpen(false);
    setFormData({ name: "", email: "", phone: "", role: "", location: "", department: "" });
    
    toast({
      title: "🎉 Team Member Added",
      description: `${formData.name} has been successfully added to your team.`,
      className: "bg-green-500 text-white",
    });
  };

  const toggleStar = (memberId: number) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId ? { ...member, starred: !member.starred } : member
    ));
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

  const TeamMemberCard = ({ member }: { member: any }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-300 cursor-pointer">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-14 h-14 border-2 border-white shadow-lg">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                  member.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                )} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-800 text-lg">
                    {member.name}
                  </h3>
                  {member.starred && (
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{member.role}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {member.performance}% Perf.
                  </Badge>
                  <Badge variant="outline" className={cn(
                    "text-xs capitalize",
                    member.status === 'active' ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  )}>
                    {member.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStar(member.id);
                }}
                className="p-1 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                {member.starred ? (
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ) : (
                  <StarOff className="h-4 w-4 text-gray-400" />
                )}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedMember(member)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Member
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="h-4 w-4 mr-2" />
                    Share Contact
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <UserX className="h-4 w-4 mr-2" />
                    Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-4">
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{member.location}</span>
              </div>
            </div>

            {/* Performance & Tasks */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Task Completion</span>
                <span className="font-semibold text-gray-900">
                  {member.tasks.completed}/{member.tasks.total}
                </span>
              </div>
              <Progress value={(member.tasks.completed / member.tasks.total) * 100} className="h-2 bg-gray-200" />
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 3).map((skill: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 3 && (
                <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                  +{member.skills.length - 3}
                </Badge>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>Active {member.lastActive}</span>
              </div>
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Mail className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send Email</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send Message</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
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
                  Team Management
                </h1>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {stats.total} Members
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" />
                Manage your field team members, roles, and performance metrics
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4" />
              </motion.button>

              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                    <UserPlus className="h-4 w-4" />
                    Add Member
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5 text-blue-500" />
                      Add New Team Member
                    </DialogTitle>
                    <DialogDescription>
                      Add a new member to your field team. All fields are required.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddMember} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-white/80 backdrop-blur-sm border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@terratrack.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-white/80 backdrop-blur-sm border-gray-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+254 712 345 678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="bg-white/80 backdrop-blur-sm border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-semibold">Location</Label>
                        <Input
                          id="location"
                          placeholder="Nairobi, Kenya"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          required
                          className="bg-white/80 backdrop-blur-sm border-gray-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-sm font-semibold">Role</Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })} required>
                        <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Field Agent">Field Agent</SelectItem>
                          <SelectItem value="Field Coordinator">Field Coordinator</SelectItem>
                          <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                          <SelectItem value="Health Officer">Health Officer</SelectItem>
                          <SelectItem value="Climate Specialist">Climate Specialist</SelectItem>
                          <SelectItem value="Technical Lead">Technical Lead</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter className="flex gap-3 pt-6">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                        Add Team Member
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
              title="Total Members"
              value={stats.total}
              description="Across all locations"
              icon={Users}
              trend="up"
              color="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <StatCard
              title="Active Now"
              value={stats.active}
              description="Currently working"
              icon={UserCheck}
              trend="up"
              color="bg-gradient-to-br from-green-500 to-emerald-600"
            />
            <StatCard
              title="Avg. Performance"
              value={`${stats.avgPerformance}%`}
              description="Team efficiency"
              icon={TrendingUp}
              trend="up"
              color="bg-gradient-to-br from-purple-500 to-pink-600"
            />
            <StatCard
              title="Starred Members"
              value={stats.starred}
              description="Key contributors"
              icon={Star}
              trend="up"
              color="bg-gradient-to-br from-orange-500 to-amber-600"
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
                  placeholder="Search team members by name, role, location..." 
                  className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Field Agent">Field Agent</SelectItem>
                    <SelectItem value="Field Coordinator">Field Coordinator</SelectItem>
                    <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                    <SelectItem value="Health Officer">Health Officer</SelectItem>
                    <SelectItem value="Climate Specialist">Climate Specialist</SelectItem>
                    <SelectItem value="Technical Lead">Technical Lead</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-36 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="away">Away</SelectItem>
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
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="role">Role</SelectItem>
                <SelectItem value="joinDate">Join Date</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 gap-2 p-1 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                All Members
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {teamMembers.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Active
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {stats.active}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="starred" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Starred
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {stats.starred}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="leadership" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Leadership
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredMembers.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty State */}
              {filteredMembers.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No team members found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setFilterRole("all");
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
            </TabsContent>
          </Tabs>

          {/* Team Member Details Dialog */}
          <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
            <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                    <AvatarImage src={selectedMember?.avatar} alt={selectedMember?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {selectedMember?.name?.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xl font-semibold">{selectedMember?.name}</div>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <span>{selectedMember?.role}</span>
                      <span>•</span>
                      <span className={cn(
                        "flex items-center gap-1",
                        selectedMember?.status === 'active' ? "text-green-600" : "text-yellow-600"
                      )}>
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          selectedMember?.status === 'active' ? "bg-green-500" : "bg-yellow-500"
                        )} />
                        {selectedMember?.status === 'active' ? 'Active' : 'Away'}
                      </span>
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <Label className="text-gray-500">Email</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{selectedMember?.email}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-500">Phone</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{selectedMember?.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-500">Location</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{selectedMember?.location}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-500">Join Date</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{selectedMember?.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Overall Performance</span>
                        <span className="font-semibold text-gray-900">{selectedMember?.performance}%</span>
                      </div>
                      <Progress value={selectedMember?.performance} className="h-2 bg-gray-200" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{selectedMember?.tasks.completed}</div>
                        <div className="text-gray-600">Tasks Completed</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{selectedMember?.tasks.total}</div>
                        <div className="text-gray-600">Total Tasks</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills & Projects */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMember?.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">Projects</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMember?.projects.map((project: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex gap-2 sm:justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Last active: {selectedMember?.lastActive}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedMember(null)}>
                    Close
                  </Button>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                    <MessageCircle className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Team;
