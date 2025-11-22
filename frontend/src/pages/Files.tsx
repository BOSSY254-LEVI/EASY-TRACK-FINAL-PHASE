import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Upload, FileText, Image, File, Download, Trash2, Folder, MoreVertical, Share, Eye, Copy, Star, StarOff, Filter, Grid, List, HardDrive, Cloud, Zap, Sparkles, Users, Calendar, Clock, BarChart3, Plus, FolderPlus, RefreshCw, Settings, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Files = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Water Quality Report Q3 2025.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "Sarah Mitchell",
      date: "2025-10-15",
      lastModified: "2 hours ago",
      starred: true,
      folder: "Reports",
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      downloads: 45,
      shared: true
    },
    {
      id: 2,
      name: "Field Survey Data.xlsx",
      type: "excel",
      size: "1.8 MB",
      uploadedBy: "Ahmed Khan",
      date: "2025-10-14",
      lastModified: "1 day ago",
      starred: false,
      folder: "Data",
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      downloads: 28,
      shared: false
    },
    {
      id: 3,
      name: "Site Location Photo.jpg",
      type: "image",
      size: "3.2 MB",
      uploadedBy: "John Doe",
      date: "2025-10-13",
      lastModified: "3 days ago",
      starred: true,
      folder: "Media",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      downloads: 67,
      shared: true
    },
    {
      id: 4,
      name: "Climate Data Analysis.docx",
      type: "document",
      size: "1.1 MB",
      uploadedBy: "Maria Garcia",
      date: "2025-10-12",
      lastModified: "1 week ago",
      starred: false,
      folder: "Analysis",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      downloads: 32,
      shared: false
    },
    {
      id: 5,
      name: "Environmental Impact Assessment.pdf",
      type: "pdf",
      size: "4.7 MB",
      uploadedBy: "David Kim",
      date: "2025-10-11",
      lastModified: "2 weeks ago",
      starred: true,
      folder: "Reports",
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      downloads: 89,
      shared: true
    },
    {
      id: 6,
      name: "Team Meeting Recording.mp4",
      type: "video",
      size: "15.2 MB",
      uploadedBy: "Lisa Brown",
      date: "2025-10-10",
      lastModified: "3 weeks ago",
      starred: false,
      folder: "Media",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      downloads: 23,
      shared: false
    }
  ]);

  const [folders] = useState([
    { name: "Reports", files: 24, size: "45.2 MB", color: "bg-red-500" },
    { name: "Data", files: 18, size: "32.1 MB", color: "bg-green-500" },
    { name: "Media", files: 42, size: "156.7 MB", color: "bg-blue-500" },
    { name: "Analysis", files: 12, size: "18.9 MB", color: "bg-purple-500" },
    { name: "Archives", files: 8, size: "12.3 MB", color: "bg-gray-500" },
    { name: "Team", files: 15, size: "28.6 MB", color: "bg-orange-500" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [uploading, setUploading] = useState(false);

  const storageStats = {
    used: 65.2,
    total: 100,
    files: 1247,
    available: 34.8
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.folder.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "📁 Upload Successful",
        description: "Your files have been uploaded to the cloud storage",
        className: "bg-green-500 text-white",
      });
    }, 2000);
  };

  const toggleStar = (fileId: number) => {
    setFiles(files.map(file => 
      file.id === fileId ? { ...file, starred: !file.starred } : file
    ));
  };

  const handleDownload = (file: any) => {
    toast({
      title: "📥 Download Started",
      description: `Downloading ${file.name}`,
      className: "bg-blue-500 text-white",
    });
  };

  const handleShare = (file: any) => {
    toast({
      title: "🔗 Share Link Created",
      description: `Shareable link for ${file.name} has been copied`,
      className: "bg-purple-500 text-white",
    });
  };

  const getFileIcon = (file: any) => {
    const baseClass = "h-6 w-6";
    switch (file.type) {
      case "pdf":
        return <FileText className={cn(baseClass, file.color)} />;
      case "excel":
        return <FileText className={cn(baseClass, "text-green-500")} />;
      case "image":
        return <Image className={cn(baseClass, "text-blue-500")} />;
      case "video":
        return <FileText className={cn(baseClass, "text-orange-500")} />;
      case "document":
        return <FileText className={cn(baseClass, "text-purple-500")} />;
      default:
        return <File className={cn(baseClass, "text-gray-500")} />;
    }
  };

  const StatCard = ({ title, value, description, icon: Icon, color }: any) => (
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
              <p className="text-xs font-medium text-gray-600">
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

  const FileCard = ({ file }: { file: any }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-300 cursor-pointer">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        
        <CardContent className="p-5 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={cn("p-3 rounded-xl", file.bgColor, file.borderColor, "border")}>
              {getFileIcon(file)}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStar(file.id);
                }}
                className="p-1 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                {file.starred ? (
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ) : (
                  <StarOff className="h-4 w-4 text-gray-400" />
                )}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleDownload(file)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare(file)}>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Make a Copy
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

          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors line-clamp-2 leading-tight">
                {file.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={cn("text-xs capitalize", file.bgColor, file.color, file.borderColor)}>
                  {file.type}
                </Badge>
                {file.shared && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    Shared
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Size</span>
                <span className="font-medium text-gray-900">{file.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Downloads</span>
                <span className="font-medium text-gray-900">{file.downloads}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200/60">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{file.uploadedBy}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{file.lastModified}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Hover effect line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Card>
    </motion.div>
  );

  const FolderCard = ({ folder }: { folder: any }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", folder.color, "bg-opacity-20")}>
              <Folder className={cn("h-6 w-6", folder.color.replace('bg-', 'text-'))} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors truncate">
                {folder.name}
              </h4>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                <span>{folder.files} files</span>
                <span>•</span>
                <span>{folder.size}</span>
              </div>
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
                <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Files & Documents
                </h1>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Cloud Storage
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                Manage all project files, documents, and team resources
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                    <Upload className="h-4 w-4" />
                    Upload Files
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    New Folder
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Cloud className="h-4 w-4 mr-2" />
                    Cloud Sync
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          {/* Storage Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatCard
              title="Storage Used"
              value={`${storageStats.used} GB`}
              description={`${storageStats.available} GB available`}
              icon={HardDrive}
              color="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <StatCard
              title="Total Files"
              value={storageStats.files.toLocaleString()}
              description="Across all projects"
              icon={FileText}
              color="bg-gradient-to-br from-green-500 to-emerald-600"
            />
            <StatCard
              title="Shared Files"
              value="47"
              description="Collaborative documents"
              icon={Share}
              color="bg-gradient-to-br from-purple-500 to-pink-600"
            />
            <StatCard
              title="Storage Health"
              value="98%"
              description="Optimal performance"
              icon={Zap}
              color="bg-gradient-to-br from-orange-500 to-amber-600"
            />
          </motion.div>

          {/* Storage Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Storage Overview</h3>
                    <p className="text-sm text-gray-600">Cloud storage usage and limits</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Cloud className="h-3 w-3 mr-1" />
                    Synced
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Used: {storageStats.used} GB of {storageStats.total} GB</span>
                    <span className="font-semibold text-gray-900">{Math.round((storageStats.used / storageStats.total) * 100)}%</span>
                  </div>
                  <Progress value={(storageStats.used / storageStats.total) * 100} className="h-2 bg-gray-200" />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Personal files</span>
                    <span>Team shared</span>
                    <span>Archives</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Filters and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/60 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search files, folders, content..." 
                  className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="File Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                    <SelectItem value="excel">Spreadsheets</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36 bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="size">File Size</SelectItem>
                    <SelectItem value="downloads">Most Downloaded</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="gap-2"
              >
                <Grid className="h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="gap-2"
              >
                <List className="h-4 w-4" />
                List
              </Button>
            </div>
          </motion.div>

          <Tabs defaultValue="files" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 gap-2 p-1 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl">
              <TabsTrigger value="files" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                All Files
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {files.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="folders" className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                Folders
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="space-y-6">
              {/* Files Grid/List */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={cn(
                  "gap-6",
                  viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "space-y-4"
                )}
              >
                <AnimatePresence>
                  {filteredFiles.map((file, index) => (
                    <FileCard key={file.id} file={file} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty State */}
              {filteredFiles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No files found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setFilterType("all");
                    }}
                    className="gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Clear filters
                  </Button>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="folders">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
              >
                {folders.map((folder, index) => (
                  <FolderCard key={index} folder={folder} />
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Files;