import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle2, AlertCircle, Upload, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "report",
      user: "Sarah Johnson",
      avatar: "SJ",
      action: "submitted a water quality report",
      location: "Nairobi Site A",
      time: "2 min ago",
      icon: Upload,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: 2,
      type: "complete",
      user: "Michael Chen",
      avatar: "MC",
      action: "completed data collection",
      location: "Kampala Site B",
      time: "15 min ago",
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: 3,
      type: "alert",
      user: "System Alert",
      avatar: "⚠️",
      action: "detected unusual reading",
      location: "Lagos District",
      time: "1 hr ago",
      icon: AlertCircle,
      color: "text-alert",
      bgColor: "bg-alert/10",
    },
    {
      id: 4,
      type: "report",
      user: "Emma Wilson",
      avatar: "EW",
      action: "submitted health survey",
      location: "Dar es Salaam",
      time: "2 hrs ago",
      icon: Upload,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      id: 5,
      type: "comment",
      user: "David Kim",
      avatar: "DK",
      action: "commented on report #284",
      location: "Kigali Zone C",
      time: "3 hrs ago",
      icon: MessageCircle,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <Card className="neumorphic">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-lg font-heading font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Live Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className="flex gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className={`${activity.bgColor} ${activity.color} text-xs font-semibold`}>
                  {activity.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-start justify-between">
                  <p className="text-sm leading-tight">
                    <span className="font-semibold text-foreground">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <span className={`${activity.color} ml-2`}>
                    <activity.icon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activity.location}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
