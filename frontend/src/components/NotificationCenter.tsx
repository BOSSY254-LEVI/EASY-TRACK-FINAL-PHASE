import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, CheckCircle, InfoIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  maxItems?: number;
}

export const NotificationCenter = ({
  notifications = [],
  maxItems = 5,
}: NotificationCenterProps) => {
  const [allNotifications, setAllNotifications] = useState<Notification[]>(notifications);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setAllNotifications(notifications);
  }, [notifications]);

  const unreadCount = allNotifications.filter(n => !n.read).length;
  const displayedNotifications = showAll
    ? allNotifications
    : allNotifications.slice(0, maxItems);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "info":
        return <InfoIcon className="h-5 w-5 text-blue-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const markAsRead = (id: string) => {
    setAllNotifications(allNotifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const dismissNotification = (id: string) => {
    setAllNotifications(allNotifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setAllNotifications([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  if (allNotifications.length === 0) {
    return (
      <Card className="border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-center text-sm">No notifications yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <CardTitle className="text-lg font-bold text-gray-900">Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
          )}
        </div>
        {allNotifications.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-gray-600 hover:text-gray-900"
          >
            Clear All
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-3 max-h-96 overflow-y-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {displayedNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border-2 transition-all duration-300",
                  getBgColor(notification.type),
                  !notification.read && "border-current ring-1 ring-offset-1"
                )}
              >
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{notification.title}</p>
                  <p className="text-gray-700 text-xs mt-1">{notification.message}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="h-6 w-6 p-0 text-gray-600 hover:text-gray-900"
                      title="Mark as read"
                    >
                      <div className="h-2 w-2 bg-blue-600 rounded-full" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(notification.id)}
                    className="h-6 w-6 p-0 text-gray-600 hover:text-gray-900"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {allNotifications.length > maxItems && (
          <Button
            variant="outline"
            className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : `Show All (${allNotifications.length})`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
