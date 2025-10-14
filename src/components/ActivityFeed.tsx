import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Droplet, Heart, Cloud } from "lucide-react";

const activities = [
  {
    id: 1,
    user: "Sarah K.",
    action: "added new water test results",
    location: "Nairobi, Kenya",
    time: "5 min ago",
    icon: Droplet,
    color: "bg-secondary",
  },
  {
    id: 2,
    user: "James M.",
    action: "reported malaria cases",
    location: "Lagos, Nigeria",
    time: "12 min ago",
    icon: Heart,
    color: "bg-destructive",
  },
  {
    id: 3,
    user: "Amina T.",
    action: "submitted weather data",
    location: "Dar es Salaam, Tanzania",
    time: "1 hour ago",
    icon: Cloud,
    color: "bg-muted-foreground",
  },
  {
    id: 4,
    user: "David N.",
    action: "updated water quality metrics",
    location: "Kampala, Uganda",
    time: "2 hours ago",
    icon: Droplet,
    color: "bg-secondary",
  },
];

const ActivityFeed = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 animate-fade-in">
            <Avatar className="w-10 h-10">
              <AvatarFallback className={`${activity.color} text-primary-foreground`}>
                <activity.icon className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm">
                <span className="font-medium text-foreground">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.location}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
