import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, MapPin, Calendar, Save, Navigation } from "lucide-react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "@/lib/supabase";

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationMarker({ position, setPosition }: any) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  ) : null;
}

const DataCollection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });
  const [mapPosition, setMapPosition] = useState<[number, number]>([6.5244, 3.3792]);
  const [geolocating, setGeolocating] = useState(false);
  const [collectedData, setCollectedData] = useState<any[]>([]);

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
            title: "Location Captured",
            description: locationString,
          });
        },
        () => {
          setGeolocating(false);
          toast({
            title: "Location Error",
            description: "Unable to capture location. Please enter manually.",
            variant: "destructive",
          });
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

    try {
      const response = await fetch('http://localhost:3001/api/field-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          location: formData.location,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      const savedData = await response.json();

      toast({
        title: "Data Entry Saved",
        description: "Your field data has been recorded successfully.",
      });

      // Add to local state for immediate display
      setCollectedData(prev => [...prev, {
        id: savedData._id,
        title: formData.title,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        created_at: savedData.created_at,
      }]);

      setFormData({ title: "", category: "", location: "", description: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Data Collection</h1>
          <p className="text-muted-foreground mt-1">Record field observations and measurements</p>
        </div>

        <Card className="card-neumorphic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              New Field Entry
            </CardTitle>
            <CardDescription>Capture data from your field activities</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Entry Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Water Quality Sample - Site A"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water">Water Quality</SelectItem>
                      <SelectItem value="health">Health Survey</SelectItem>
                      <SelectItem value="climate">Climate Data</SelectItem>
                      <SelectItem value="environment">Environmental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="GPS coordinates or place name"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={captureLocation}
                      disabled={geolocating}
                      className="gap-2"
                    >
                      <Navigation className="h-4 w-4" />
                      {geolocating ? "Locating..." : "Auto-Locate"}
                    </Button>
                  </div>
                  <div className="mt-4 h-[300px] rounded-lg overflow-hidden border">
                    <MapContainer center={mapPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker position={mapPosition} setPosition={setMapPosition} />
                    </MapContainer>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Observations & Notes</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed observations, measurements, and notes..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Entry
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DataCollection;
