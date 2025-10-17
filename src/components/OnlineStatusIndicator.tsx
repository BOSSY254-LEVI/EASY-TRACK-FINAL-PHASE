import { Wifi, WifiOff, Cloud } from "lucide-react";
import { useState, useEffect } from "react";

const OnlineStatusIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !isSyncing) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm">
        <Wifi className="h-3.5 w-3.5" />
        <span className="font-medium">Online</span>
      </div>
    );
  }

  if (isSyncing) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm">
        <Cloud className="h-3.5 w-3.5 animate-pulse" />
        <span className="font-medium">Syncing...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 text-warning text-sm">
      <WifiOff className="h-3.5 w-3.5" />
      <span className="font-medium">Offline - Syncing Pending</span>
    </div>
  );
};

export default OnlineStatusIndicator;
