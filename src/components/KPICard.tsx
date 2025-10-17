import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

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
    <Card className="neumorphic overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
            <div className="space-y-1">
              <h3 className="text-4xl font-heading font-bold text-foreground tracking-tight">{value}</h3>
              <div className={`flex items-center text-sm font-semibold ${
                trend === "up" ? "text-success" : "text-alert"
              }`}>
                {trend === "up" ? (
                  <TrendingUp className="h-4 w-4 mr-1.5" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1.5" />
                )}
                {change} from last month
              </div>
            </div>
          </div>
          <div className={`${iconColor} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
