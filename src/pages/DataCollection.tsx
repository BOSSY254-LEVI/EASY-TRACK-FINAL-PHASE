import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, MapPin, Calendar, Save } from "lucide-react";
import { useState } from "react";

const DataCollection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Data Entry Saved",
      description: "Your field data has been recorded successfully.",
    });
    setFormData({ title: "", category: "", location: "", description: "" });
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
                  <Input
                    id="location"
                    placeholder="GPS coordinates or place name"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
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
