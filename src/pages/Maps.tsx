import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Maps = () => {
  const locations = [
    { id: 1, name: "Site A - Water Station", lat: 6.5244, lng: 3.3792, status: "active", type: "water" },
    { id: 2, name: "Health Clinic - North", lat: 9.0820, lng: 8.6753, status: "active", type: "health" },
    { id: 3, name: "Climate Station - Coastal", lat: 4.8156, lng: 7.0498, status: "inactive", type: "climate" },
    { id: 4, name: "Site B - Environmental", lat: 7.3775, lng: 3.9470, status: "active", type: "environment" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Field Maps</h1>
          <p className="text-muted-foreground mt-1">Visualize data collection points and locations</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="card-neumorphic h-[600px]">
              <CardContent className="p-0 h-full">
                <MapContainer 
                  center={[6.5244, 3.3792]} 
                  zoom={6} 
                  style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {locations.map((loc) => (
                    <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{loc.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {loc.lat.toFixed(4)}°, {loc.lng.toFixed(4)}°
                          </p>
                          <Badge 
                            variant={loc.status === "active" ? "default" : "outline"}
                            className="mt-2"
                          >
                            {loc.status}
                          </Badge>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="card-neumorphic">
              <CardHeader>
                <CardTitle className="text-lg">Active Locations</CardTitle>
                <CardDescription>Field sites and stations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {locations.map((loc) => (
                  <div key={loc.id} className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-primary mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{loc.name}</p>
                            <p className="text-xs text-muted-foreground">{loc.lat.toFixed(4)}°</p>
                            <p className="text-xs text-muted-foreground">{loc.lng.toFixed(4)}°</p>
                          </div>
                        </div>
                      <Badge
                        variant={loc.status === "active" ? "default" : "outline"}
                        className="text-xs"
                      >
                        {loc.status}
                      </Badge>
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

export default Maps;
