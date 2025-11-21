import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCw, Filter, BarChart3, MapPin, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  description: string;
  action: () => void;
  color: string;
}

interface QuickActionsProps {
  onAddNew?: () => void;
  onRefresh?: () => void;
  onFilter?: () => void;
  onAnalyze?: () => void;
}

export const QuickActions = ({
  onAddNew,
  onRefresh,
  onFilter,
  onAnalyze,
}: QuickActionsProps) => {
  const navigate = useNavigate();

  const actions: QuickAction[] = [
    {
      icon: <Plus className="h-5 w-5" />,
      label: "Add New Entry",
      description: "Create new field data",
      action: onAddNew || (() => navigate("/data-collection")),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      label: "Refresh Data",
      description: "Sync latest updates",
      action: onRefresh || (() => window.location.reload()),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Filter className="h-5 w-5" />,
      label: "Filter & Search",
      description: "Find specific entries",
      action: onFilter || (() => {}),
      color: "from-green-500 to-green-600",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "View Analytics",
      description: "See detailed insights",
      action: onAnalyze || (() => navigate("/reports")),
      color: "from-orange-500 to-orange-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  return (
    <Card className="border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {actions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={action.action}
                variant="outline"
                className={`w-full h-24 flex flex-col items-center justify-center gap-2 border-2 border-gray-200 bg-gradient-to-br ${action.color} hover:shadow-lg transition-all duration-300 text-white font-medium group overflow-hidden relative`}
              >
                <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                  <motion.div
                    className="text-white"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {action.icon}
                  </motion.div>
                  <span className="text-xs font-bold">{action.label}</span>
                  <span className="text-xs opacity-90">{action.description}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 group-hover:from-white/20 transition-all duration-300" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
