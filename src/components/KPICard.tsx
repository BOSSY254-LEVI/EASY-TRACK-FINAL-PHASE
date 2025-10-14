import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  iconColor: string;
}

const KPICard = ({ title, value, change, trend, icon: Icon, iconColor }: KPICardProps) => {
  return (
    <Card className="shadow-card hover:shadow-soft transition-shadow duration-200 bg-gradient-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <div className="flex items-center gap-1">
              <span className={`text-sm font-medium ${trend === "up" ? "text-success" : "text-destructive"}`}>
                {change}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColor}`}>
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
