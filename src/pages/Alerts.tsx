"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  CheckCircle2,
  Bell,
  Search,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const Alerts = () => {
  const { toast } = useToast();
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertsList, setAlertsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      // For now, using mock data since we don't have an alerts table in Supabase
      // In a real implementation, this would fetch from Supabase
      const mockAlerts = [
        {
          id: 1,
          type: "critical",
          title: "Water Quality Alert - Site A",
          message: "Contamination levels exceeded safe threshold by 15%",
          time: "2 hours ago",
          status: "open",
        },
        {
          id: 2,
          type: "warning",
          title: "Low Survey Response Rate",
          message: "Health survey completion rate below 60% in North Region",
          time: "5 hours ago",
          status: "open",
        },
        {
          id: 3,
          type: "info",
          title: "System Maintenance Scheduled",
          message: "Routine database backup scheduled for tonight at 2:00 AM",
          time: "1 day ago",
          status: "acknowledged",
        },
        {
          id: 4,
          type: "success",
          title: "Data Sync Completed",
          message: "All offline entries successfully synchronized to the database",
          time: "2 days ago",
          status: "resolved",
        },
      ];
      setAlertsList(mockAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast({
        title: "Error",
        description: "Failed to load alerts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter alerts based on search term
  const filteredAlerts = alertsList.filter(alert =>
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Helper function correctly placed OUTSIDE the array
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Alerts & Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor system alerts and important notifications
            </p>
          </div>
          <Button variant="outline">Mark All as Read</Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search alerts by title, message, type, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`card-neumorphic transition-all hover:shadow-elevated ${
                alert.status === "open" ? "border-l-4 border-l-red-500" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {alert.message}
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      alert.status === "open"
                        ? "destructive"
                        : alert.status === "acknowledged"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {alert.status}
                  </Badge>
                </div>
              </CardHeader>
              {alert.status === "open" && (
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      Acknowledge
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Alert Details Dialog */}
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedAlert?.type === "critical" && (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                {selectedAlert?.type === "warning" && (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
                {selectedAlert?.type === "info" && (
                  <Info className="h-5 w-5 text-blue-500" />
                )}
                {selectedAlert?.type === "success" && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {selectedAlert?.title}
              </DialogTitle>
              <DialogDescription>{selectedAlert?.time}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground">
                  {selectedAlert?.message}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <Badge variant="outline">{selectedAlert?.status}</Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
