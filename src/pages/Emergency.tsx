import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Phone, MapPin, AlertTriangle, Navigation, Search } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const emergencyContacts = [
  { type: "Ambulance", number: "999", description: "National Emergency" },
  { type: "Red Cross", number: "+234 803 402 0000", description: "Emergency Medical" },
  { type: "NEMA", number: "112", description: "Emergency Management" },
  { type: "Fire Service", number: "199", description: "Fire & Rescue" },
];

const nearbyFacilities = [
  { id: 1, name: "Central Hospital", type: "Hospital", distance: 2.3, lat: 6.5244, lng: 3.3792, available: true },
  { id: 2, name: "City Clinic", type: "Clinic", distance: 1.8, lat: 6.5344, lng: 3.3892, available: true },
  { id: 3, name: "Emergency Care Center", type: "Emergency", distance: 3.1, lat: 6.5144, lng: 3.3692, available: false },
  { id: 4, name: "Community Health Post", type: "Health Post", distance: 0.9, lat: 6.5294, lng: 3.3842, available: true },
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
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      // For now, using mock data since we don't have a facilities table in Supabase
      // In a real implementation, this would fetch from Supabase
      const mockFacilities = [
        { id: 1, name: "Central Hospital", type: "Hospital", distance: 2.3, lat: 6.5244, lng: 3.3792, available: true },
        { id: 2, name: "City Clinic", type: "Clinic", distance: 1.8, lat: 6.5344, lng: 3.3892, available: true },
        { id: 3, name: "Emergency Care Center", type: "Emergency", distance: 3.1, lat: 6.5144, lng: 3.3692, available: false },
        { id: 4, name: "Community Health Post", type: "Health Post", distance: 0.9, lat: 6.5294, lng: 3.3842, available: true },
      ];
      setFacilities(mockFacilities);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      toast({
        title: "Error",
        description: "Failed to load facilities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
            title: "Location Detected",
            description: `Your location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        },
        () => {
          setLocationLoading(false);
          toast({
            title: "Location Error",
            description: "Unable to detect location. Using default location.",
            variant: "destructive",
          });
        }
      );
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  // Filter facilities based on search term
  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const callEmergency = (number: string, type: string) => {
    window.open(`tel:${number}`, '_self');
    toast({
      title: `Calling ${type}`,
      description: `Dialing ${number}...`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-alert" />
              Emergency Response
            </h1>
            <p className="text-muted-foreground mt-1">Quick access to emergency services and nearby health facilities</p>
          </div>
          <Button onClick={detectLocation} disabled={locationLoading} className="gap-2">
            <Navigation className="h-4 w-4" />
            {locationLoading ? "Detecting..." : "Detect My Location"}
          </Button>
        </div>

        {/* Emergency Contacts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {emergencyContacts.map((contact) => (
            <Card key={contact.type} className="card-neumorphic hover:shadow-elevated transition-all cursor-pointer" onClick={() => callEmergency(contact.number, contact.type)}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-critical/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-critical" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{contact.type}</h3>
                    <p className="text-2xl font-bold text-critical mt-1">{contact.number}</p>
                    <p className="text-xs text-muted-foreground mt-1">{contact.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="card-neumorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Nearby Health Facilities
                </CardTitle>
                <CardDescription>Real-time locations and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] rounded-lg overflow-hidden">
                  <MapContainer center={userLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RecenterMap center={userLocation} />
                    
                    {/* User Location */}
                    <Circle center={userLocation} radius={200} pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.3 }} />
                    <Marker position={userLocation}>
                      <Popup>
                        <strong>Your Location</strong>
                      </Popup>
                    </Marker>

                    {/* Health Facilities */}
                    {facilities.map((facility) => (
                      <Marker key={facility.id} position={[facility.lat, facility.lng]}>
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-semibold">{facility.name}</h3>
                            <p className="text-sm text-muted-foreground">{facility.type}</p>
                            <p className="text-sm mt-1">{facility.distance} km away</p>
                            <Badge variant={facility.available ? "default" : "outline"} className="mt-2">
                              {facility.available ? "Available" : "Busy"}
                            </Badge>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Facility List */}
          <div>
            <Card className="card-neumorphic">
              <CardHeader>
                <CardTitle className="text-lg">Facilities Near You</CardTitle>
                <CardDescription>Sorted by distance</CardDescription>
                {/* Search Bar */}
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search facilities by name or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredFacilities
                  .sort((a, b) => a.distance - b.distance)
                  .map((facility) => (
                    <div key={facility.id} className="p-4 bg-muted/50 rounded-lg space-y-2 hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{facility.name}</p>
                          <p className="text-xs text-muted-foreground">{facility.type}</p>
                        </div>
                        <Badge variant={facility.available ? "default" : "outline"} className="text-xs">
                          {facility.available ? "Open" : "Busy"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {facility.distance} km
                        </span>
                        <Button size="sm" variant="ghost" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`, '_blank')}>
                          Navigate
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Emergency;
