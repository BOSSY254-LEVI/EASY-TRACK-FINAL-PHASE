import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Info, CheckCircle, Bell } from "lucide-react";

const Alerts = () => {
  const { toast } = useToast();
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [alertsList, setAlertsList] = useState([
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

        {/* Alert Details Dialog */}
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedAlert?.severity === "critical" && <AlertTriangle className="h-5 w-5 text-critical" />}
                {selectedAlert?.severity === "warning" && <AlertCircle className="h-5 w-5 text-alert" />}
                {selectedAlert?.severity === "info" && <CheckCircle2 className="h-5 w-5 text-success" />}
                {selectedAlert?.title}
              </DialogTitle>
              <DialogDescription>{selectedAlert?.time}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground">{selectedAlert?.description}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Severity</h4>
                <Badge variant={
                  selectedAlert?.severity === "critical" ? "destructive" :
                  selectedAlert?.severity === "warning" ? "default" : "outline"
                }>
                  {selectedAlert?.severity}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <Badge variant="outline">{selectedAlert?.status}</Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Recommended Actions</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Review the affected data points</li>
                  <li>Contact the field team for clarification</li>
                  <li>Document any findings in the project log</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
