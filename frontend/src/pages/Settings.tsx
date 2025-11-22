import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Lock, Globe, Database, Shield, Eye, EyeOff, Download, Upload, Trash2, Zap, Sparkles, Settings as SettingsIcon, Save, RefreshCw, Palette, Moon, Sun, Smartphone, Laptop, Wifi, WifiOff, HardDrive, Cloud, CloudOff, Key, UserCheck, Languages, Clock, Volume2, VolumeX, SmartphoneNfc, Cpu, Battery, ShieldCheck, BadgeCheck, QrCode, Fingerprint, Mail, Tablet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const storageStats = {
    used: 4.5,
    total: 10,
    percentage: 45,
    files: 1247,
    lastBackup: "2 hours ago"
  };

  const securityScore = 85;

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    toast({
      title: "✅ Settings Saved",
      description: "Your preferences have been updated successfully.",
      className: "bg-green-500 text-white",
    });
  };

  const handleExportData = () => {
    toast({
      title: "📤 Export Initiated",
      description: "Your data export will be ready shortly.",
      className: "bg-blue-500 text-white",
    });
  };

  const handleClearData = () => {
    toast({
      title: "🗑️ Clear Data",
      description: "Are you sure? This action cannot be undone.",
      variant: "destructive",
    });
  };

  const SettingSection = ({ title, description, icon: Icon, children, color = "blue" }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-heading font-semibold">
            <div className={cn(
              "p-2 rounded-xl",
              color === "blue" ? "bg-blue-500/10 text-blue-600" :
              color === "green" ? "bg-green-500/10 text-green-600" :
              color === "purple" ? "bg-purple-500/10 text-purple-600" :
              color === "orange" ? "bg-orange-500/10 text-orange-600" :
              "bg-red-500/10 text-red-600"
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              {title}
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );

  const SettingItem = ({ label, description, children, className }: any) => (
    <div className={cn("flex items-center justify-between py-3", className)}>
      <div className="space-y-1 flex-1">
        <Label className="text-sm font-semibold text-gray-900">{label}</Label>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 p-6">
        <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
          {/* Enhanced Header */}
          <motion.div 
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Settings
                </h1>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Personalize
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                Manage your account preferences, security, and application settings
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4" />
              </motion.button>

              <Button 
                onClick={handleSave}
                disabled={saving}
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                {saving ? (
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg shadow-gray-200/50 sticky top-6">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    {[
                      { id: "profile", label: "Profile", icon: User, color: "blue" },
                      { id: "notifications", label: "Notifications", icon: Bell, color: "green" },
                      { id: "security", label: "Security", icon: Shield, color: "red" },
                      { id: "appearance", label: "Appearance", icon: Palette, color: "purple" },
                      { id: "regional", label: "Regional", icon: Globe, color: "orange" },
                      { id: "data", label: "Data & Storage", icon: Database, color: "cyan" },
                      { id: "devices", label: "Connected Devices", icon: Smartphone, color: "gray" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                          "flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all duration-300 group",
                          activeTab === item.id
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50/80"
                        )}
                      >
                        <item.icon className={cn(
                          "h-5 w-5 transition-colors duration-300",
                          activeTab === item.id ? "text-white" : `text-${item.color}-500`
                        )} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </nav>

                  {/* Security Score */}
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200/60">
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-semibold text-green-900">Security Score</div>
                        <div className="text-2xl font-bold text-green-700">{securityScore}%</div>
                      </div>
                    </div>
                    <Progress value={securityScore} className="h-2 bg-green-200" />
                    <div className="flex items-center justify-between mt-2 text-xs text-green-700">
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Settings Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 space-y-6"
            >
              <AnimatePresence mode="wait">
                {/* Profile Settings */}
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SettingSection
                      title="Profile Settings"
                      description="Update your personal information and account details"
                      icon={User}
                      color="blue"
                    >
                      <div className="flex items-center gap-6 mb-6">
                        <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                          <AvatarImage src="/avatars/01.png" alt="Profile" />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <Button variant="outline" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Change Avatar
                          </Button>
                          <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 5MB.</p>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                          <Input 
                            id="name" 
                            defaultValue="John Doe" 
                            className="bg-white/80 backdrop-blur-sm border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            defaultValue="john.doe@terratrack.org"
                            className="bg-white/80 backdrop-blur-sm border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            defaultValue="+254 712 345 678"
                            className="bg-white/80 backdrop-blur-sm border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role" className="text-sm font-semibold">Role</Label>
                          <Input 
                            id="role" 
                            defaultValue="Field Agent" 
                            disabled
                            className="bg-gray-50 border-gray-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-sm font-semibold">Bio</Label>
                        <textarea
                          id="bio"
                          rows={3}
                          placeholder="Tell us about yourself..."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          defaultValue="Field agent specializing in water quality monitoring and environmental data collection."
                        />
                      </div>
                    </SettingSection>
                  </motion.div>
                )}

                {/* Notifications */}
                {activeTab === "notifications" && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SettingSection
                      title="Notification Preferences"
                      description="Configure how you receive alerts and updates"
                      icon={Bell}
                      color="green"
                    >
                      <div className="space-y-1">
                        <SettingItem
                          label="Email Notifications"
                          description="Receive updates and reports via email"
                        >
                          <Switch defaultChecked />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="Push Notifications"
                          description="Get instant alerts on your devices"
                        >
                          <Switch defaultChecked />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="Critical Alerts"
                          description="Urgent notifications for emergency situations"
                        >
                          <Switch defaultChecked />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="Team Activity"
                          description="Updates when team members take actions"
                        >
                          <Switch />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="Data Sync Notifications"
                          description="Alerts when data synchronization completes"
                        >
                          <Switch defaultChecked />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="Sound Effects"
                          description="Play sounds for important notifications"
                        >
                          <Switch />
                        </SettingItem>
                      </div>
                    </SettingSection>

                    <SettingSection
                      title="Notification Channels"
                      description="Manage how different types of notifications are delivered"
                      icon={Smartphone}
                      color="blue"
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 rounded-xl border border-gray-200/60 bg-white/50">
                          <div className="flex items-center gap-3 mb-3">
                            <SmartphoneNfc className="h-5 w-5 text-blue-500" />
                            <Label className="font-semibold">Mobile Push</Label>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Instant notifications on your mobile device</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        </div>

                        <div className="p-4 rounded-xl border border-gray-200/60 bg-white/50">
                          <div className="flex items-center gap-3 mb-3">
                            <Mail className="h-5 w-5 text-orange-500" />
                            <Label className="font-semibold">Email Digest</Label>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Daily summary of important activities</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </SettingSection>
                  </motion.div>
                )}

                {/* Security */}
                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SettingSection
                      title="Security Settings"
                      description="Manage your account security and access controls"
                      icon={Shield}
                      color="red"
                    >
                      <div className="space-y-1">
                        <SettingItem
                          label="Two-Factor Authentication"
                          description="Add an extra layer of security to your account"
                        >
                          <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="Biometric Login"
                          description="Use fingerprint or face recognition"
                        >
                          <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="Session Timeout"
                          description="Automatically log out after 30 minutes of inactivity"
                        >
                          <Switch defaultChecked />
                        </SettingItem>
                      </div>
                    </SettingSection>

                    <SettingSection
                      title="Password Management"
                      description="Update your password and security questions"
                      icon={Key}
                      color="orange"
                    >
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password" className="text-sm font-semibold">Current Password</Label>
                          <div className="relative">
                            <Input 
                              id="current-password" 
                              type={showPassword ? "text" : "password"}
                              className="bg-white/80 backdrop-blur-sm border-gray-200 pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="new-password" className="text-sm font-semibold">New Password</Label>
                            <Input 
                              id="new-password" 
                              type="password"
                              className="bg-white/80 backdrop-blur-sm border-gray-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password" className="text-sm font-semibold">Confirm Password</Label>
                            <Input 
                              id="confirm-password" 
                              type="password"
                              className="bg-white/80 backdrop-blur-sm border-gray-200"
                            />
                          </div>
                        </div>

                        <Button variant="outline" className="gap-2">
                          <Key className="h-4 w-4" />
                          Change Password
                        </Button>
                      </div>
                    </SettingSection>

                    <SettingSection
                      title="Active Sessions"
                      description="Manage your currently active login sessions"
                      icon={UserCheck}
                      color="blue"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                          <div className="flex items-center gap-3">
                            <Laptop className="h-5 w-5 text-green-600" />
                            <div>
                              <div className="font-medium text-green-900">Chrome on Windows</div>
                              <div className="text-sm text-green-700">Nairobi, Kenya • Current session</div>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                            Active
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                          <div className="flex items-center gap-3">
                            <Smartphone className="h-5 w-5 text-gray-600" />
                            <div>
                              <div className="font-medium text-gray-900">Safari on iPhone</div>
                              <div className="text-sm text-gray-700">Kampala, Uganda • 2 hours ago</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </SettingSection>
                  </motion.div>
                )}

                {/* Appearance */}
                {activeTab === "appearance" && (
                  <motion.div
                    key="appearance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SettingSection
                      title="Appearance"
                      description="Customize the look and feel of the application"
                      icon={Palette}
                      color="purple"
                    >
                      <div className="space-y-1">
                        <SettingItem
                          label="Dark Mode"
                          description="Switch between light and dark themes"
                        >
                          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="Compact Mode"
                          description="Use compact spacing for better information density"
                        >
                          <Switch />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="High Contrast"
                          description="Increase contrast for better accessibility"
                        >
                          <Switch />
                        </SettingItem>
                      </div>
                    </SettingSection>

                    <SettingSection
                      title="Theme Preferences"
                      description="Choose your preferred color scheme"
                      icon={Zap}
                      color="orange"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { name: "Blue", color: "bg-blue-500" },
                          { name: "Green", color: "bg-green-500" },
                          { name: "Purple", color: "bg-purple-500" },
                          { name: "Orange", color: "bg-orange-500" },
                        ].map((theme) => (
                          <div key={theme.name} className="text-center cursor-pointer group">
                            <div className={cn(
                              "w-12 h-12 rounded-xl mx-auto mb-2 border-2 border-gray-300 group-hover:border-blue-500 transition-colors",
                              theme.color
                            )} />
                            <span className="text-sm font-medium text-gray-700">{theme.name}</span>
                          </div>
                        ))}
                      </div>
                    </SettingSection>
                  </motion.div>
                )}

                {/* Regional */}
                {activeTab === "regional" && (
                  <motion.div
                    key="regional"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SettingSection
                      title="Regional Settings"
                      description="Configure language, timezone, and regional preferences"
                      icon={Globe}
                      color="orange"
                    >
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="language" className="text-sm font-semibold">Language</Label>
                          <Select defaultValue="english">
                            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                              <SelectItem value="french">French</SelectItem>
                              <SelectItem value="swahili">Swahili</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timezone" className="text-sm font-semibold">Timezone</Label>
                          <Select defaultValue="east-africa">
                            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="east-africa">East Africa Time (EAT)</SelectItem>
                              <SelectItem value="west-africa">West Africa Time (WAT)</SelectItem>
                              <SelectItem value="central-africa">Central Africa Time (CAT)</SelectItem>
                              <SelectItem value="utc">UTC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="date-format" className="text-sm font-semibold">Date Format</Label>
                          <Select defaultValue="dd-mm-yyyy">
                            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="temperature" className="text-sm font-semibold">Temperature Unit</Label>
                          <Select defaultValue="celsius">
                            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200">
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="celsius">Celsius (°C)</SelectItem>
                              <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </SettingSection>
                  </motion.div>
                )}

                {/* Data & Storage */}
                {activeTab === "data" && (
                  <motion.div
                    key="data"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SettingSection
                      title="Data & Storage"
                      description="Manage your data, storage, and synchronization settings"
                      icon={Database}
                      color="cyan"
                    >
                      <div className="space-y-1">
                        <SettingItem
                          label="Offline Mode"
                          description="Enable data collection without internet connection"
                        >
                          <Switch defaultChecked />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="Auto Sync"
                          description="Automatically sync data when online"
                        >
                          <Switch defaultChecked />
                        </SettingItem>
                        <Separator />

                        <SettingItem
                          label="Background Sync"
                          description="Sync data periodically in the background"
                        >
                          <Switch defaultChecked />
                        </SettingItem>
                      </div>
                    </SettingSection>

                    <SettingSection
                      title="Storage Management"
                      description="Monitor and manage your storage usage"
                      icon={HardDrive}
                      color="blue"
                    >
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700">Storage Used</span>
                            <span className="font-semibold text-gray-900">
                              {storageStats.used} GB / {storageStats.total} GB
                            </span>
                          </div>
                          <Progress value={storageStats.percentage} className="h-2 bg-gray-200" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{storageStats.files} files</span>
                            <span>Last backup: {storageStats.lastBackup}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                            <div className="text-lg font-bold text-blue-700">2.1 GB</div>
                            <div className="text-xs text-blue-600">Field Data</div>
                          </div>
                          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                            <div className="text-lg font-bold text-green-700">1.8 GB</div>
                            <div className="text-xs text-green-600">Media Files</div>
                          </div>
                          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                            <div className="text-lg font-bold text-purple-700">0.6 GB</div>
                            <div className="text-xs text-purple-600">App Data</div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" className="gap-2 flex-1" onClick={handleExportData}>
                            <Download className="h-4 w-4" />
                            Export Data
                          </Button>
                          <Button variant="outline" className="gap-2 flex-1" onClick={handleClearData}>
                            <Trash2 className="h-4 w-4" />
                            Clear Cache
                          </Button>
                        </div>
                      </div>
                    </SettingSection>
                  </motion.div>
                )}

                {/* Connected Devices */}
                {activeTab === "devices" && (
                  <motion.div
                    key="devices"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SettingSection
                      title="Connected Devices"
                      description="Manage devices connected to your account"
                      icon={Smartphone}
                      color="gray"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl border border-green-200 bg-green-50/50">
                          <div className="flex items-center gap-4">
                            <Laptop className="h-8 w-8 text-green-600" />
                            <div>
                              <div className="font-semibold text-green-900">MacBook Pro</div>
                              <div className="text-sm text-green-700">Safari • Last active: Just now</div>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                            Current
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white/50">
                          <div className="flex items-center gap-4">
                            <Smartphone className="h-8 w-8 text-blue-600" />
                            <div>
                              <div className="font-semibold text-gray-900">iPhone 14 Pro</div>
                              <div className="text-sm text-gray-700">iOS • Last active: 2 hours ago</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            Revoke
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white/50">
                          <div className="flex items-center gap-4">
                            <Tablet className="h-8 w-8 text-purple-600" />
                            <div>
                              <div className="font-semibold text-gray-900">iPad Air</div>
                              <div className="text-sm text-gray-700">iPadOS • Last active: 1 day ago</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </SettingSection>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;