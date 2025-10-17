import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Info, CheckCircle, Bell } from "lucide-react";

const Alerts = () => {
  const alerts = [
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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-critical" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-alert" />;
      case "info":
        return <Info className="h-5 w-5 text-secondary" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Alerts & Notifications</h1>
            <p className="text-muted-foreground mt-1">Monitor system alerts and important notifications</p>
          </div>
          <Button variant="outline">Mark All as Read</Button>
        </div>

        <div className="grid gap-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`card-neumorphic transition-all hover:shadow-elevated ${
                alert.status === "open" ? "border-l-4 border-l-critical" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <CardDescription className="mt-1">{alert.message}</CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
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
                    <Button size="sm" variant="default">Acknowledge</Button>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
