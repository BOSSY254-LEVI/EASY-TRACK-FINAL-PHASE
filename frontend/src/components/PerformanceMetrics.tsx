import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricItem {
  label: string;
  value: number;
  unit?: string;
  target: number;
  trend: "up" | "down" | "stable";
  color: string;
}

interface PerformanceMetricsProps {
  metrics?: MetricItem[];
}

export const PerformanceMetrics = ({
  metrics = [
    {
      label: "Data Completion",
      value: 85,
      unit: "%",
      target: 100,
      trend: "up",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "System Uptime",
      value: 99.8,
      unit: "%",
      target: 99.9,
      trend: "stable",
      color: "from-green-500 to-green-600",
    },
    {
      label: "API Response Time",
      value: 145,
      unit: "ms",
      target: 200,
      trend: "down",
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "User Activity",
      value: 92,
      unit: "%",
      target: 100,
      trend: "up",
      color: "from-purple-500 to-purple-600",
    },
  ],
}: PerformanceMetricsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "stable":
        return <Activity className="h-4 w-4 text-blue-600" />;
      default:
        return <Zap className="h-4 w-4 text-gray-600" />;
    }
  };

  const getProgressColor = (metric: MetricItem) => {
    const percentage = (metric.value / metric.target) * 100;
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">{metric.label}</h3>
                {getTrendIcon(metric.trend)}
              </div>

              <div className="flex items-baseline gap-1">
                <span className={cn(
                  "text-2xl font-bold bg-gradient-to-r",
                  metric.color,
                  "bg-clip-text text-transparent"
                )}>
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-sm text-gray-600">{metric.unit}</span>
                )}
              </div>

              <Progress
                value={(metric.value / metric.target) * 100}
                className="h-2 bg-gray-200"
              />

              <div className="flex justify-between text-xs text-gray-600">
                <span>Progress</span>
                <span className={cn(
                  "font-bold",
                  (metric.value / metric.target) * 100 >= 90 ? "text-green-600" : "text-gray-600"
                )}>
                  {Math.round((metric.value / metric.target) * 100)}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium">Avg Performance</p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {Math.round(metrics.reduce((acc, m) => acc + (m.value / m.target) * 100, 0) / metrics.length)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium">Healthy Metrics</p>
            <p className="text-lg font-bold text-green-600 mt-1">
              {metrics.filter(m => (m.value / m.target) * 100 >= 90).length}/{metrics.length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium">Last Updated</p>
            <p className="text-sm text-gray-600 mt-1">Just now</p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
