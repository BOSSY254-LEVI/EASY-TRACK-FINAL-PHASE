import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, MapPin, AlertCircle, Clock } from "lucide-react";

const Activities = () => {
  const activities = [
    {
      id: 1,
      user: "Sarah Mitchell",
      initials: "SM",
      action: "submitted a new data entry",
      target: "Water Quality - Site A",
      type: "data",
      time: "5 minutes ago",
    },
    {
      id: 2,
      user: "Ahmed Khan",
      initials: "AK",
      action: "updated location coordinates",
      target: "Climate Station - Coastal",
      type: "location",
      time: "1 hour ago",
    },
    {
      id: 3,
      user: "John Doe",
      initials: "JD",
      action: "added a team member to",
      target: "Health Survey Project",
      type: "team",
      time: "3 hours ago",
    },
    {
      id: 4,
      user: "Maria Garcia",
      initials: "MG",
      action: "resolved an alert",
      target: "Low Response Rate Warning",
      type: "alert",
      time: "5 hours ago",
    },
    {
      id: 5,
      user: "David Chen",
      initials: "DC",
      action: "created a new project",
      target: "Environmental Impact Study",
      type: "project",
      time: "1 day ago",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "data":
        return <FileText className="h-4 w-4 text-primary" />;
      case "location":
        return <MapPin className="h-4 w-4 text-secondary" />;
      case "team":
        return <Users className="h-4 w-4 text-success" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-alert" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Activity Feed</h1>
          <p className="text-muted-foreground mt-1">Track all team activities and updates in real-time</p>
        </div>

        <Card className="card-neumorphic">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all"
              >
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {activity.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-foreground">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium text-foreground">{activity.target}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <div className="flex items-center gap-1">
                            {getActivityIcon(activity.type)}
                            <span className="capitalize">{activity.type}</span>
                          </div>
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Activities;
