import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Filter, Search, ZoomIn, ZoomOut, Layers, Compass, Download, Share, Eye, Target, Clock, Users, AlertCircle, CheckCircle2, Wifi, Battery, Satellite, Sparkles, Zap, BarChart3, RefreshCw, MoreVertical, Settings, Plus } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const icons = {
  water: createCustomIcon('blue'),
  health: createCustomIcon('red'),
  climate: createCustomIcon('green'),
  environment: createCustomIcon('violet'),
  alert: createCustomIcon('orange')
};

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

function LocationMarker({ location, onMarkerClick }: any) {
  const map = useMap();
  
  const handleClick = () => {
    onMarkerClick?.(location);
    map.flyTo([location.lat, location.lng], 15);
  };

  return (
    <Marker 
      position={[location.lat, location.lng]} 
      icon={icons[location.type as keyof typeof icons]}
      eventHandlers={{ click: handleClick }}
    >
      <Popup className="custom-popup min-w-64">
        <div className="space-y-3 p-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-sm">{location.name}</h3>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {location.lat.toFixed(6)}°, {location.lng.toFixed(6)}°
              </p>
            </div>
            <Badge 
              variant={location.status === "active" ? "default" : "outline"}
              className={cn(
                "text-xs",
                location.status === "active" ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-700 border-gray-200"
              )}
            >
              {location.status}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <span className="text-gray-500">Type</span>
              <Badge variant="outline" className="w-full justify-center text-xs capitalize">
                {location.type}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-gray-500">Last Update</span>
              <div className="font-medium text-gray-900">{location.lastUpdate}</div>
            </div>
          </div>

          {location.team && (
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Assigned Team</span>
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-900">{location.team}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1 text-xs h-8">
              <Navigation className="h-3 w-3 mr-1" />
              Navigate
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-8">
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

const Maps = () => {
  const [locations, setLocations] = useState([
    { 
      id: 1, 
      name: "Site A - Water Station", 
      lat: 6.5244, 
      lng: 3.3792, 
      status: "active", 
      type: "water",
      lastUpdate: "2 hours ago",
      team: "Team Alpha",
      efficiency: 95,
      alerts: 2
    },
    { 
      id: 2, 
      name: "Health Clinic - North", 
      lat: 9.0820, 
      lng: 8.6753, 
      status: "active", 
      type: "health",
      lastUpdate: "1 hour ago",
      team: "Team Beta",
      efficiency: 88,
      alerts: 0
    },
    { 
      id: 3, 
      name: "Climate Station - Coastal", 
      lat: 4.8156, 
      lng: 7.0498, 
      status: "inactive", 
      type: "climate",
      lastUpdate: "3 days ago",
      team: "Team Gamma",
      efficiency: 76,
      alerts: 1
    },
    { 
      id: 4, 
      name: "Site B - Environmental", 
      lat: 7.3775, 
      lng: 3.9470, 
      status: "active", 
      type: "environment",
      lastUpdate: "5 hours ago",
      team: "Team Delta",
      efficiency: 92,
      alerts: 0
    },
    { 
      id: 5, 
      name: "Emergency Response Unit", 
      lat: 5.5557, 
      lng: 5.0000, 
      status: "alert", 
      type: "health",
      lastUpdate: "30 minutes ago",
      team: "Team Emergency",
      efficiency: 65,
      alerts: 5
    }
  ]);

  const [mapCenter, setMapCenter] = useState<[number, number]>([6.5244, 3.3792]);
  const [mapZoom, setMapZoom] = useState(6);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [mapStyle, setMapStyle] = useState("standard");
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline" | "slow">("online");

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.team.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || location.type === filterType;
    const matchesStatus = filterStatus === "all" || location.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: locations.length,
    active: locations.filter(loc => loc.status === 'active').length,
    alerts: locations.reduce((sum, loc) => sum + loc.alerts, 0),
    avgEfficiency: Math.round(locations.reduce((sum, loc) => sum + loc.efficiency, 0) / locations.length)
  };

  const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
  };

  const flyToLocation = (location: any) => {
    setMapCenter([location.lat, location.lng]);
    setMapZoom(15);
    setSelectedLocation(location);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'alert': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'water': return 'bg-blue-500';
      case 'health': return 'bg-red-500';
      case 'climate': return 'bg-green-500';
      case 'environment': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const LocationCard = ({ location }: { location: any }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className={cn(
        "p-4 rounded-xl border cursor-pointer transition-all duration-300 group",
        selectedLocation?.id === location.id 
          ? "bg-blue-50 border-blue-200 shadow-md" 
          : "bg-white/50 border-gray-200/60 hover:bg-white/80 hover:shadow-sm"
      )}
      onClick={() => flyToLocation(location)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={cn(
            "w-3 h-3 rounded-full mt-2 flex-shrink-0",
            getStatusColor(location.status)
          )} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900 text-sm group-hover:text-gray-800 truncate">
                {location.name}
              </h4>
              {location.alerts > 0 && (
                <Badge variant="destructive" className="h-4 px-1 text-xs">
                  {location.alerts}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <MapPin className="h-3 w-3" />
              <span>{location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Badge variant="outline" className="text-xs capitalize">
                {location.type}
              </Badge>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-gray-400" />
                <span>{location.team}</span>
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
            <DropdownMenuItem>
              <Navigation className="h-4 w-4 mr-2" />
              Navigate To
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share className="h-4 w-4 mr-2" />
              Share Location
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <AlertCircle className="h-4 w-4 mr-2" />
              Report Issue
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200/60">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{location.lastUpdate}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3" />
            <span>{location.efficiency}% eff.</span>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs",
            location.status === 'active' ? "bg-green-50 text-green-700 border-green-200" :
            location.status === 'alert' ? "bg-red-50 text-red-700 border-red-200" :
            "bg-gray-50 text-gray-700 border-gray-200"
          )}
        >
          {location.status}
        </Badge>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/80 to-green-50/40 p-6">
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
                  Field Maps
                </h1>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Live Tracking
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <Compass className="h-4 w-4" />
                Real-time visualization of data collection points and field operations
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
                  <Satellite className="h-3 w-3" />
                  <span className="font-medium">GPS Active</span>
                </div>
              </div>
              
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                <Plus className="h-4 w-4" />
                Add Location
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
            <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Locations</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
                    <p className="text-xs text-gray-600">{stats.active} active</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500 text-white shadow-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Sites</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
                    <p className="text-xs text-green-600 font-medium">All systems operational</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500 text-white shadow-lg">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.alerts}</h3>
                    <p className="text-xs text-red-600 font-medium">Requires attention</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500 text-white shadow-lg">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Efficiency</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.avgEfficiency}%</h3>
                    <p className="text-xs text-green-600 font-medium">+5.2% from last week</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500 text-white shadow-lg">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Enhanced Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="border-0 bg-gradient-to-br from-white to-blue-50/30 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300 h-[600px]">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                      <Compass className="h-5 w-5 text-blue-500" />
                      Interactive Field Map
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Zap className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={mapStyle} onValueChange={setMapStyle}>
                        <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm border-gray-200">
                          <SelectValue placeholder="Map Style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="satellite">Satellite</SelectItem>
                          <SelectItem value="terrain">Terrain</SelectItem>
                          <SelectItem value="dark">Dark Mode</SelectItem>
                        </SelectContent>
                      </Select>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowHeatmap(!showHeatmap)}
                              className={showHeatmap ? "bg-orange-50 text-orange-700 border-orange-200" : ""}
                            >
                              <Layers className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Toggle Heatmap</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <CardDescription>Click on markers to view location details and navigate</CardDescription>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-80px)] relative">
                  <MapContainer 
                    center={mapCenter} 
                    zoom={mapZoom} 
                    style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
                    className="z-0"
                  >
                    <MapController center={mapCenter} zoom={mapZoom} />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url={mapStyle === "satellite" 
                        ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                        : mapStyle === "dark"
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      }
                    />
                    {filteredLocations.map((location) => (
                      <LocationMarker 
                        key={location.id} 
                        location={location} 
                        onMarkerClick={handleMarkerClick}
                      />
                    ))}
                  </MapContainer>

                  {/* Map Controls Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm shadow-sm">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm shadow-sm">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/90 backdrop-blur-sm shadow-sm"
                      onClick={() => {
                        setMapCenter([6.5244, 3.3792]);
                        setMapZoom(6);
                        setSelectedLocation(null);
                      }}
                    >
                      <Target className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Search Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search locations..." 
                        className="pl-10 w-64 bg-white/90 backdrop-blur-sm border-gray-200 shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Legend Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 z-10">
                    <h4 className="font-semibold text-sm text-gray-900 mb-3">Location Types</h4>
                    <div className="space-y-2">
                      {[
                        { color: "bg-blue-500", label: "Water Stations" },
                        { color: "bg-red-500", label: "Health Clinics" },
                        { color: "bg-green-500", label: "Climate Stations" },
                        { color: "bg-purple-500", label: "Environmental" },
                        { color: "bg-orange-500", label: "Alerts" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-xs text-gray-700">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Locations Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-heading font-semibold">Field Locations</CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-28 bg-white/80 backdrop-blur-sm border-gray-200 text-xs h-8">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="water">Water</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="climate">Climate</SelectItem>
                          <SelectItem value="environment">Environmental</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-28 bg-white/80 backdrop-blur-sm border-gray-200 text-xs h-8">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="alert">Alert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <CardDescription>Click on locations to view details and navigate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                  <AnimatePresence>
                    {filteredLocations.map((location) => (
                      <LocationCard key={location.id} location={location} />
                    ))}
                  </AnimatePresence>
                  
                  {filteredLocations.length === 0 && (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No locations found</h3>
                      <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                      <Button 
                        onClick={() => {
                          setSearchQuery("");
                          setFilterType("all");
                          setFilterStatus("all");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-gray-200/60 pt-4">
                  <div className="flex items-center justify-between w-full text-sm text-gray-500">
                    <span>Showing {filteredLocations.length} of {locations.length}</span>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {/* Selected Location Details */}
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="border-0 bg-gradient-to-br from-white to-blue-50/30 shadow-lg shadow-gray-200/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                        <Target className="h-5 w-5 text-blue-500" />
                        Selected Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{selectedLocation.name}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {selectedLocation.lat.toFixed(6)}°, {selectedLocation.lng.toFixed(6)}°
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Type</span>
                            <Badge variant="outline" className="w-full mt-1 justify-center capitalize">
                              {selectedLocation.type}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-gray-500">Status</span>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "w-full mt-1 justify-center",
                                selectedLocation.status === 'active' ? "bg-green-50 text-green-700 border-green-200" :
                                selectedLocation.status === 'alert' ? "bg-red-50 text-red-700 border-red-200" :
                                "bg-gray-50 text-gray-700 border-gray-200"
                              )}
                            >
                              {selectedLocation.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Efficiency</span>
                            <span className="font-semibold text-gray-900">{selectedLocation.efficiency}%</span>
                          </div>
                          <Progress value={selectedLocation.efficiency} className="h-2 bg-gray-200" />
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Navigation className="h-4 w-4 mr-1" />
                            Navigate
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Maps;