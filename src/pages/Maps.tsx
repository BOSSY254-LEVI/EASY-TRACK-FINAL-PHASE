import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";

const Maps = () => {
  const locations = [
    { id: 1, name: "Site A - Water Station", lat: "6.5244° N", lng: "3.3792° E", status: "active", type: "water" },
    { id: 2, name: "Health Clinic - North", lat: "9.0820° N", lng: "8.6753° E", status: "active", type: "health" },
    { id: 3, name: "Climate Station - Coastal", lat: "4.8156° N", lng: "7.0498° E", status: "inactive", type: "climate" },
    { id: 4, name: "Site B - Environmental", lat: "7.3775° N", lng: "3.9470° E", status: "active", type: "environment" },
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
              <CardContent className="p-6 h-full">
                <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `linear-gradient(rgba(var(--primary), 0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(var(--primary), 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }} />
                  {locations.map((loc, idx) => (
                    <div
                      key={loc.id}
                      className="absolute animate-pulse"
                      style={{
                        left: `${20 + idx * 20}%`,
                        top: `${30 + idx * 15}%`,
                      }}
                    >
                      <div className="relative group cursor-pointer">
                        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all" />
                        <MapPin className="h-8 w-8 text-primary relative z-10 drop-shadow-glow" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-elevated whitespace-nowrap">
                            <p className="text-sm font-medium">{loc.name}</p>
                            <p className="text-xs text-muted-foreground">{loc.lat}, {loc.lng}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center space-y-2 z-10">
                    <Navigation className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Interactive Map View</p>
                    <p className="text-sm text-muted-foreground">Hover over markers to see location details</p>
                  </div>
                </div>
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
                          <p className="text-xs text-muted-foreground">{loc.lat}</p>
                          <p className="text-xs text-muted-foreground">{loc.lng}</p>
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
