import { Sparkles, TrendingDown, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AIInsight {
  icon: React.ReactNode;
  message: string;
  type: "info" | "warning" | "critical";
  action?: string;
}

const AIInsightBanner = () => {
  const insights: AIInsight[] = [
    {
      icon: <TrendingDown className="h-4 w-4" />,
      message: "Water quality dropped 12% in Region X.",
      type: "warning",
      action: "Review Data"
    },
    {
      icon: <Sparkles className="h-4 w-4" />,
      message: "3 teams ahead of schedule this week. Great momentum!",
      type: "info"
    },
    {
      icon: <AlertTriangle className="h-4 w-4" />,
      message: "5 critical alerts require immediate attention.",
      type: "critical",
      action: "View Alerts"
    }
  ];

  const currentInsight = insights[0]; // In production, cycle through or show most relevant

  const getColorClasses = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-warning/10 border-warning/30 text-warning-foreground";
      case "critical":
        return "bg-alert/10 border-alert/30 text-alert-foreground";
      default:
        return "bg-accent/10 border-accent/30 text-accent-foreground";
    }
  };

  return (
    <Card className={`p-4 border-2 ${getColorClasses(currentInsight.type)} animate-fade-in`}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {currentInsight.icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">
            {currentInsight.message}
          </p>
        </div>
        {currentInsight.action && (
          <button className="text-sm font-semibold hover:underline">
            {currentInsight.action} →
          </button>
        )}
      </div>
    </Card>
  );
};

export default AIInsightBanner;
