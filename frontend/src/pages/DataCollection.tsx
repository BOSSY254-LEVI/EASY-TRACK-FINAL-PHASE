import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, MapPin, Calendar, Save, Navigation, Camera, Upload, Compass, Target, Zap, Sparkles, Clock, Users, BarChart3, Plus, MoreVertical, Eye, Edit, Trash2, Share, Download, Filter, Search, RefreshCw, AlertCircle, CheckCircle2, PlayCircle, Battery, Wifi, Satellite, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "@/lib/supabase";
import { fieldDataAPI } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function LocationMarker({ position, setPosition, isSelecting }: any) {
  const map = useMap();
  
  useMapEvents({
    click(e) {
      if (isSelecting) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      }
    },
  });

  return position ? (
    <Marker position={position} icon={customIcon}>
      <Popup className="custom-popup">
        <div className="text-center p-2">
          <Target className="h-4 w-4 text-blue-500 mx-auto mb-1" />
          <p className="font-semibold text-sm">Selected Location</p>
          <p className="text-xs text-gray-600">{position[0].toFixed(6)}, {position[1].toFixed(6)}</p>
        </div>
      </Popup>
    </Marker>
  ) : null;
}

function MapController({ position }: { position: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15);
    }
  }, [position, map]);

  return null;
}

const DataCollection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    priority: "medium",
    tags: ""
  });
  const [mapPosition, setMapPosition] = useState<[number, number]>([6.5244, 3.3792]);
  const [geolocating, setGeolocating] = useState(false);
  const [collectedData, setCollectedData] = useState<any[]>([]);
  const [isSelectingLocation, setIsSelectingLocation] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline" | "slow">("online");
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [activeTab, setActiveTab] = useState("new");
  const [uploading, setUploading] = useState(false);

  // Mock collected data
  useEffect(() => {
    setCollectedData([
      {
        id: 1,
        title: "Water Quality Sample - River Site A",
        category: "water",
        location: "6.5244, 3.3792",
        description: "Initial water quality assessment showing normal pH levels",
        created_at: new Date().toISOString(),
        status: "completed",
        priority: "high"
      },
      {
        id: 2,
        title: "Health Survey - Community Center",
        category: "health",
        location: "6.5250, 3.3800",
        description: "Community health screening and vaccination records",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        status: "in-progress",
        priority: "medium"
      }
    ]);
  }, []);

  const captureLocation = () => {
    setGeolocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setFormData({ ...formData, location: locationString });
          setMapPosition([latitude, longitude]);
          setGeolocating(false);
          toast({
            title: "📍 Location Captured",
            description: `Coordinates: ${locationString}`,
            className: "bg-green-500 text-white",
          });
        },
        (error) => {
          setGeolocating(false);
          toast({
            title: "Location Error",
            description: "Unable to capture location. Please select manually on the map.",
            variant: "destructive",
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setGeolocating(false);
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const savedData = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        location: formData.location,
        latitude: mapPosition[0],
        longitude: mapPosition[1],
        description: formData.description,
        priority: formData.priority,
        tags: formData.tags,
        created_at: new Date().toISOString(),
        status: "completed"
      };

      toast({
        title: "✅ Data Entry Saved",
        description: "Your field data has been recorded successfully.",
        className: "bg-green-500 text-white",
      });

      // Add to local state for immediate display
      setCollectedData(prev => [savedData, ...prev]);
      setFormData({ 
        title: "", 
        category: "", 
        location: "", 
        description: "",
        priority: "medium",
        tags: ""
      });
      setActiveTab("history");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'water': return 'bg-cyan-500';
      case 'health': return 'bg-orange-500';
      case 'climate': return 'bg-green-500';
      case 'environment': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water': return '💧';
      case 'health': return '🏥';
      case 'climate': return '🌤️';
      case 'environment': return '🌿';
      default: return '📝';
    }
  };

  const DataCard = ({ data }: { data: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="p-4 border border-gray-200/60 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold",
            getCategoryColor(data.category)
          )}>
            {getCategoryIcon(data.category)}
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-gray-900">{data.title}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-3 w-3" />
              <span>{data.location}</span>
              <Badge variant="outline" className={cn(
                "text-xs capitalize",
                data.priority === 'high' ? "bg-red-50 text-red-700 border-red-200" :
                data.priority === 'medium' ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                "bg-green-50 text-green-700 border-green-200"
              )}>
                {data.priority}
              </Badge>
            </div>
          </div>
        </div>
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
              Edit Entry
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
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{data.description}</p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200/60">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(data.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{new Date(data.created_at).toLocaleTimeString()}</span>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {data.status === 'completed' ? 'Completed' : 'In Progress'}
        </Badge>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
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
                  Data Collection
                </h1>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Live Mode
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <Compass className="h-4 w-4" />
                Record field observations and measurements with precision
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Status Indicators */}
              <div className="flex items-center gap-4 text-sm">
                <div className={cn(
                  "flex items-center gap-1 px-3 py-1 rounded-full",
                  connectionStatus === "online" ? "bg-green-100 text-green-700" :
                  connectionStatus === "slow" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                )}>
                  <Wifi className="h-3 w-3" />
                  <span className="font-medium capitalize">{connectionStatus}</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  <Battery className="h-3 w-3" />
                  <span className="font-medium">{batteryLevel}%</span>
                </div>
              </div>
              
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 p-1 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl">
              <TabsTrigger value="new" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Entry
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Collection History
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {collectedData.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="drafts" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Drafts
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Enhanced Form Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="xl:col-span-2"
                >
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                        <FileText className="h-5 w-5 text-blue-500" />
                        New Field Entry
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Zap className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </CardTitle>
                      <CardDescription>Capture data from your field activities with precision</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Entry Title
                          </Label>
                          <Input
                            id="title"
                            placeholder="e.g., Water Quality Sample - Site A"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            className="bg-white/80 backdrop-blur-sm border-gray-200"
                          />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-semibold">Category</Label>
                            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                              <SelectTrigger id="category" className="bg-white/80 backdrop-blur-sm border-gray-200">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="water">💧 Water Quality</SelectItem>
                                <SelectItem value="health">🏥 Health Survey</SelectItem>
                                <SelectItem value="climate">🌤️ Climate Data</SelectItem>
                                <SelectItem value="environment">🌿 Environmental</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="priority" className="text-sm font-semibold">Priority</Label>
                            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                              <SelectTrigger id="priority" className="bg-white/80 backdrop-blur-sm border-gray-200">
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low Priority</SelectItem>
                                <SelectItem value="medium">Medium Priority</SelectItem>
                                <SelectItem value="high">High Priority</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tags" className="text-sm font-semibold">Tags</Label>
                          <Input
                            id="tags"
                            placeholder="e.g., urgent, follow-up, sample"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="bg-white/80 backdrop-blur-sm border-gray-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-sm font-semibold flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Observations & Notes
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Detailed observations, measurements, environmental conditions, and any relevant notes..."
                            rows={6}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            className="bg-white/80 backdrop-blur-sm border-gray-200 resize-none"
                          />
                        </div>

                        <CardFooter className="flex items-center justify-between px-0 pb-0 pt-6 border-t border-gray-200/60">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span className="font-medium">{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button type="button" variant="outline" className="gap-2">
                              <Save className="h-4 w-4" />
                              Save Draft
                            </Button>
                            <Button type="submit" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300" disabled={uploading}>
                              {uploading ? (
                                <>
                                  <motion.div
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  />
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <Upload className="h-4 w-4" />
                                  Submit Entry
                                </>
                              )}
                            </Button>
                          </div>
                        </CardFooter>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Enhanced Map Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="border-0 bg-gradient-to-br from-white to-blue-50/30 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        Location Selection
                        <div className="flex items-center gap-2 ml-auto">
                          <Switch
                            checked={isSelectingLocation}
                            onCheckedChange={setIsSelectingLocation}
                          />
                          <span className="text-xs text-gray-600">Click to Set</span>
                        </div>
                      </CardTitle>
                      <CardDescription>Select location on map or use auto-locate</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="GPS coordinates"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          required
                          className="flex-1 bg-white/80 backdrop-blur-sm border-gray-200"
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={captureLocation}
                                disabled={geolocating}
                                className="gap-2"
                              >
                                {geolocating ? (
                                  <motion.div
                                    className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  />
                                ) : (
                                  <Navigation className="h-4 w-4" />
                                )}
                                {geolocating ? "Locating..." : "Auto"}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Get current location using GPS</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="h-[400px] rounded-xl overflow-hidden border-2 border-gray-200/60 relative">
                        <MapContainer 
                          center={mapPosition} 
                          zoom={15} 
                          style={{ height: "100%", width: "100%" }}
                          className="rounded-lg"
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <MapController position={mapPosition} />
                          <LocationMarker 
                            position={mapPosition} 
                            setPosition={setMapPosition}
                            isSelecting={isSelectingLocation}
                          />
                        </MapContainer>
                        
                        {/* Map Controls Overlay */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                            <ZoomIn className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                            <ZoomOut className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* GPS Accuracy Indicator */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2 text-xs">
                            <Satellite className="h-3 w-3 text-green-500" />
                            <span className="font-medium">GPS Active</span>
                            <span className="text-gray-600">±5m accuracy</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 rounded-lg bg-gray-50/80 border border-gray-200/60">
                          <div className="font-semibold text-gray-900">Latitude</div>
                          <div className="text-blue-600 font-mono">{mapPosition[0].toFixed(6)}</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-gray-50/80 border border-gray-200/60">
                          <div className="font-semibold text-gray-900">Longitude</div>
                          <div className="text-blue-600 font-mono">{mapPosition[1].toFixed(6)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                        <FileText className="h-5 w-5 text-blue-500" />
                        Collection History
                      </CardTitle>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search entries..." className="pl-10 w-64 bg-white/80 backdrop-blur-sm border-gray-200" />
                        </div>
                        <Button variant="outline" className="gap-2">
                          <Filter className="h-4 w-4" />
                          Filter
                        </Button>
                      </div>
                    </div>
                    <CardDescription>Recently collected field data entries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {collectedData.map((data, index) => (
                          <DataCard key={data.id} data={data} />
                        ))}
                      </AnimatePresence>
                      
                      {collectedData.length === 0 && (
                        <div className="text-center py-12">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No data collected yet</h3>
                          <p className="text-gray-600 mb-6">Start by creating your first field entry.</p>
                          <Button onClick={() => setActiveTab("new")} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create First Entry
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DataCollection;