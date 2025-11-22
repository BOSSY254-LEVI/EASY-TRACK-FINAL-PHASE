import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Phone, MapPin, AlertTriangle, Navigation, Search, Ambulance, Heart, Shield, Siren, Clock, Users, Zap, Sparkles, Target, Compass, Wifi, Battery, Satellite, RefreshCw, Volume2, VolumeX, Download, Share, Eye, MoreVertical, MessageCircle, Video, Mail, Star, TrendingUp, BarChart3, Filter, Settings, ZoomIn, ZoomOut } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Tooltip as MapTooltip } from "react-leaflet";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom emergency icons
const emergencyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const clinicIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const emergencyContacts = [
  { 
    type: "Ambulance", 
    number: "999", 
    description: "National Emergency Service", 
    icon: Ambulance,
    color: "bg-red-500",
    responseTime: "5-10 mins",
    priority: "critical"
  },
  { 
    type: "Red Cross", 
    number: "+234 803 402 0000", 
    description: "Emergency Medical Response", 
    icon: Heart,
    color: "bg-red-600",
    responseTime: "10-15 mins",
    priority: "high"
  },
  { 
    type: "NEMA", 
    number: "112", 
    description: "National Emergency Management", 
    icon: Shield,
    color: "bg-orange-500",
    responseTime: "15-20 mins",
    priority: "medium"
  },
  { 
    type: "Fire Service", 
    number: "199", 
    description: "Fire & Rescue Services", 
    icon: Siren,
    color: "bg-yellow-500",
    responseTime: "8-12 mins",
    priority: "high"
  },
];

const nearbyFacilities = [
  { 
    id: 1, 
    name: "Central Hospital", 
    type: "Hospital", 
    distance: 2.3, 
    lat: 6.5244, 
    lng: 3.3792, 
    available: true,
    waitTime: "15 mins",
    services: ["Emergency", "Surgery", "ICU"],
    capacity: 85,
    contact: "+234 901 234 5678",
    rating: 4.5
  },
  { 
    id: 2, 
    name: "City Clinic", 
    type: "Clinic", 
    distance: 1.8, 
    lat: 6.5344, 
    lng: 3.3892, 
    available: true,
    waitTime: "25 mins",
    services: ["Primary Care", "Lab Tests"],
    capacity: 65,
    contact: "+234 902 345 6789",
    rating: 4.2
  },
  { 
    id: 3, 
    name: "Emergency Care Center", 
    type: "Emergency", 
    distance: 3.1, 
    lat: 6.5144, 
    lng: 3.3692, 
    available: false,
    waitTime: "45 mins",
    services: ["Trauma", "Emergency"],
    capacity: 95,
    contact: "+234 903 456 7890",
    rating: 4.7
  },
  { 
    id: 4, 
    name: "Community Health Post", 
    type: "Health Post", 
    distance: 0.9, 
    lat: 6.5294, 
    lng: 3.3842, 
    available: true,
    waitTime: "10 mins",
    services: ["First Aid", "Basic Care"],
    capacity: 40,
    contact: "+234 904 567 8901",
    rating: 3.9
  },
];

const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const Emergency = () => {
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<[number, number]>([6.5244, 3.3792]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [facilities, setFacilities] = useState(nearbyFacilities);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [activeTab, setActiveTab] = useState("emergency");
  const [muted, setMuted] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      setRefreshing(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFacilities(nearbyFacilities);
      toast({
        title: "🔄 Facilities Updated",
        description: "Latest facility information loaded",
        className: "bg-blue-500 text-white",
      });
    } catch (error) {
      console.error('Error fetching facilities:', error);
      toast({
        title: "Error",
        description: "Failed to load facilities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const detectLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setLocationLoading(false);
          toast({
            title: "📍 Location Detected",
            description: `Your location has been updated for emergency services`,
            className: "bg-green-500 text-white",
          });
        },
        () => {
          setLocationLoading(false);
          toast({
            title: "Location Error",
            description: "Unable to detect location. Using default location.",
            variant: "destructive",
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(facility => {
    const matchesType = filterType === "all" || facility.type === filterType;
    const matchesAvailability = filterAvailability === "all" || 
                               (filterAvailability === "available" && facility.available) ||
                               (filterAvailability === "unavailable" && !facility.available);
    
    return matchesType && matchesAvailability;
  });

  const callEmergency = (number: string, type: string) => {
    window.open(`tel:${number}`, '_self');
    toast({
      title: `🚨 Calling ${type}`,
      description: `Emergency call initiated to ${number}`,
      className: "bg-red-500 text-white",
    });
  };

  const getFacilityIcon = (type: string) => {
    switch (type) {
      case "Hospital": return hospitalIcon;
      case "Emergency": return emergencyIcon;
      case "Clinic": return clinicIcon;
      default: return clinicIcon;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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

  const EmergencyContactCard = ({ contact }: { contact: any }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-red-50/30 shadow-lg shadow-red-200/50 hover:shadow-xl hover:shadow-red-300/50 transition-all duration-300 cursor-pointer"
        onClick={() => callEmergency(contact.number, contact.type)}
      >
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className={`w-16 h-16 rounded-full ${contact.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <contact.icon className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-gray-900 group-hover:text-gray-800">{contact.type}</h3>
              <p className="text-3xl font-black text-red-600 mt-1">{contact.number}</p>
              <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge className={cn("capitalize", getPriorityColor(contact.priority))}>
                  {contact.priority}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{contact.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Hover effect line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Card>
    </motion.div>
  );

  const FacilityCard = ({ facility }: { facility: any }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group cursor-pointer"
      onClick={() => setSelectedFacility(facility)}
    >
      <Card className={cn(
        "border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300",
        !facility.available && "opacity-70"
      )}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                facility.type === "Hospital" ? "bg-blue-100 border border-blue-200" :
                facility.type === "Emergency" ? "bg-red-100 border border-red-200" :
                "bg-green-100 border border-green-200"
              )}>
                {facility.type === "Hospital" ? (
                  <Heart className="h-6 w-6 text-blue-600" />
                ) : facility.type === "Emergency" ? (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                ) : (
                  <MapPin className="h-6 w-6 text-green-600" />
                )}
              </div>
              
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 group-hover:text-gray-800 truncate">
                    {facility.name}
                  </h4>
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    facility.available ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                  )}>
                    {facility.available ? "Open" : "Busy"}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{facility.distance} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{facility.waitTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span>{facility.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {facility.services.slice(0, 2).map((service: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                      {service}
                    </Badge>
                  ))}
                  {facility.services.length > 2 && (
                    <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                      +{facility.services.length - 2}
                    </Badge>
                  )}
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
                <DropdownMenuItem onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`, '_blank')}>
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open(`tel:${facility.contact}`, '_self')}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Facility
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="h-4 w-4 mr-2" />
                  Share Location
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200/60">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Users className="h-3 w-3" />
              <span>Capacity: {facility.capacity}%</span>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`, '_blank');
              }}
              className="gap-1 text-xs"
            >
              <Navigation className="h-3 w-3" />
              Navigate
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/10 to-orange-50/10 p-6">
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
                <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Emergency Response
                </h1>
                <Badge variant="secondary" className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Live System
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Quick access to emergency services, nearby health facilities, and real-time assistance
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
                      className={muted ? "text-gray-500" : "text-red-600"}
                    >
                      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{muted ? "Enable alerts" : "Disable alerts"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchFacilities}
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
                onClick={detectLocation} 
                disabled={locationLoading}
                className="gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300"
              >
                <Navigation className="h-4 w-4" />
                {locationLoading ? "Detecting..." : "My Location"}
              </Button>
            </div>
          </motion.div>

          {/* Emergency Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatCard
              title="Response Time"
              value="8.2 mins"
              description="Average emergency response"
              icon={Zap}
              trend="down"
              color="bg-gradient-to-br from-green-500 to-emerald-600"
            />
            <StatCard
              title="Nearby Facilities"
              value={facilities.length}
              description="Within 5km radius"
              icon={MapPin}
              trend="up"
              color="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <StatCard
              title="Available Now"
              value={facilities.filter(f => f.available).length}
              description="Ready to assist"
              icon={Heart}
              trend="stable"
              color="bg-gradient-to-br from-purple-500 to-pink-600"
            />
            <StatCard
              title="System Status"
              value="100%"
              description="All systems operational"
              icon={Shield}
              trend="up"
              color="bg-gradient-to-br from-orange-500 to-amber-600"
            />
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 gap-2 p-1 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-xl">
              <TabsTrigger value="emergency" className="flex items-center gap-2">
                <Siren className="h-4 w-4" />
                Emergency Contacts
              </TabsTrigger>
              <TabsTrigger value="facilities" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Health Facilities
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                Live Map
              </TabsTrigger>
            </TabsList>

            <TabsContent value="emergency" className="space-y-6">
              {/* Emergency Contacts Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              >
                {emergencyContacts.map((contact) => (
                  <EmergencyContactCard key={contact.type} contact={contact} />
                ))}
              </motion.div>

              {/* Emergency Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 bg-gradient-to-br from-white to-red-50/30 shadow-lg shadow-red-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Emergency Instructions
                    </CardTitle>
                    <CardDescription>Important guidelines for emergency situations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="space-y-2 p-3 rounded-lg bg-red-50 border border-red-200">
                        <div className="font-semibold text-red-900">Stay Calm</div>
                        <p className="text-red-700">Keep calm and assess the situation carefully before taking action.</p>
                      </div>
                      <div className="space-y-2 p-3 rounded-lg bg-orange-50 border border-orange-200">
                        <div className="font-semibold text-orange-900">Call First</div>
                        <p className="text-orange-700">Immediately call emergency services before providing first aid.</p>
                      </div>
                      <div className="space-y-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                        <div className="font-semibold text-yellow-900">Your Location</div>
                        <p className="text-yellow-700">Provide clear location details to emergency responders.</p>
                      </div>
                      <div className="space-y-2 p-3 rounded-lg bg-green-50 border border-green-200">
                        <div className="font-semibold text-green-900">Follow Instructions</div>
                        <p className="text-green-700">Listen carefully and follow directions from emergency operators.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="facilities" className="space-y-6">
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
                      placeholder="Search facilities by name, type, or services..." 
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
                        <SelectItem value="Hospital">Hospital</SelectItem>
                        <SelectItem value="Clinic">Clinic</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Health Post">Health Post</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                      <SelectTrigger className="w-36 bg-white/80 backdrop-blur-sm border-gray-200">
                        <SelectValue placeholder="Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="unavailable">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      More Filters
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span>Live data</span>
                  <Battery className="h-4 w-4 text-green-500" />
                  <span>GPS Active</span>
                </div>
              </motion.div>

              {/* Facilities List */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <AnimatePresence>
                  {filteredFacilities
                    .sort((a, b) => a.distance - b.distance)
                    .map((facility) => (
                      <FacilityCard key={facility.id} facility={facility} />
                    ))}
                </AnimatePresence>

                {filteredFacilities.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No facilities found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters to find nearby health facilities.</p>
                    <Button 
                      onClick={() => {
                        setSearchTerm("");
                        setFilterType("all");
                        setFilterAvailability("all");
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

            <TabsContent value="map" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-0 bg-gradient-to-br from-white to-blue-50/30 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300 h-[600px]">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-heading font-semibold">
                      <Compass className="h-5 w-5 text-blue-500" />
                      Emergency Response Map
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <Zap className="h-3 w-3 mr-1" />
                        Live Tracking
                      </Badge>
                    </CardTitle>
                    <CardDescription>Real-time locations of emergency services and health facilities</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 h-[calc(100%-80px)] relative">
                    <MapContainer center={userLocation} zoom={13} style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }} className="z-0">
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <RecenterMap center={userLocation} />
                      
                      {/* User Location */}
                      <Circle center={userLocation} radius={200} pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.3 }} />
                      <Marker position={userLocation}>
                        <Popup>
                          <div className="p-2">
                            <strong>Your Location</strong>
                            <p className="text-sm text-gray-600">Emergency services will be directed here</p>
                          </div>
                        </Popup>
                      </Marker>

                      {/* Health Facilities */}
                      {facilities.map((facility) => (
                        <Marker key={facility.id} position={[facility.lat, facility.lng]} icon={getFacilityIcon(facility.type)}>
                          <Popup>
                            <div className="p-3 min-w-64">
                              <div className="flex items-center gap-3 mb-2">
                                <div className={cn(
                                  "w-3 h-3 rounded-full",
                                  facility.available ? "bg-green-500" : "bg-red-500"
                                )} />
                                <h3 className="font-semibold text-lg">{facility.name}</h3>
                              </div>
                              <div className="space-y-2 text-sm">
                                <p className="text-gray-600">{facility.type}</p>
                                <p className="text-gray-700">{facility.distance} km away • {facility.waitTime} wait</p>
                                <div className="flex flex-wrap gap-1">
                                  {facility.services.slice(0, 3).map((service: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <Button size="sm" className="flex-1 text-xs" onClick={() => window.open(`tel:${facility.contact}`, '_self')}>
                                    <Phone className="h-3 w-3 mr-1" />
                                    Call
                                  </Button>
                                  <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`, '_blank')}>
                                    <Navigation className="h-3 w-3 mr-1" />
                                    Navigate
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
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
                        onClick={detectLocation}
                      >
                        <Target className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Legend Overlay */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 z-10">
                      <h4 className="font-semibold text-sm text-gray-900 mb-3">Map Legend</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Your Location</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Emergency Centers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Hospitals</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Clinics</span>
                        </div>
                      </div>
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

export default Emergency;