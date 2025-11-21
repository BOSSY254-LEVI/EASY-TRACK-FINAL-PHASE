import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, Droplet, Heart, Cloud, Users, Shield, TrendingUp, MapPin, 
  Mail, Phone, Globe, Award, Target, Eye, Zap, Sparkles, Play, Star,
  CheckCircle, ArrowRight, Clock, BarChart3, Smartphone, Database,
  ShieldCheck, Globe2, Download, Calendar, TrendingUp as TrendingUpIcon,
  MessageCircle, Video, ArrowUpRight, Leaf, Cpu, Wifi, WifiOff
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-image.jpg";
import dashboardPreview from "@/assets/Dashboard-preview.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("health");
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Droplet,
      title: "Water Quality Monitoring",
      description: "Track and analyze water test results across multiple locations in real-time with advanced analytics.",
      color: "from-blue-500 to-cyan-500",
      stats: "98% accuracy rate",
      capabilities: ["pH Level Tracking", "Contaminant Detection", "Source Mapping", "Quality Alerts"]
    },
    {
      icon: Heart,
      title: "Health Data Collection",
      description: "Document disease cases, vaccination drives, and health metrics efficiently with mobile-first forms.",
      color: "from-emerald-500 to-green-500",
      stats: "60% faster reporting",
      capabilities: ["Patient Records", "Vaccination Tracking", "Disease Surveillance", "Medical Inventory"]
    },

    {
      icon: Cloud,
      title: "Climate Action Insights",
      description: "Monitor weather patterns and environmental changes to inform data-driven decision-making.",
      color: "from-purple-500 to-indigo-500",
      stats: "Real-time alerts",
      capabilities: ["Weather Monitoring", "Deforestation Tracking", "Carbon Metrics", "Disaster Prediction"]
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Enable seamless coordination between field agents and supervisors with role-based access.",
      color: "from-orange-500 to-red-500",
      stats: "Unlimited team members",
      capabilities: ["Role Management", "Task Assignment", "Real-time Chat", "Progress Tracking"]
    },
    {
      icon: Shield,
      title: "Offline-First Design",
      description: "Collect data even without connectivity, sync automatically when online with conflict resolution.",
      color: "from-gray-600 to-gray-800",
      stats: "Zero data loss",
      capabilities: ["Offline Forms", "Auto Sync", "Conflict Resolution", "Battery Optimized"]
    },
    {
      icon: TrendingUp,
      title: "Interactive Dashboards",
      description: "Visualize trends and KPIs with powerful charts, maps, and real-time updates.",
      color: "from-pink-500 to-rose-500",
      stats: "30+ chart types",
      capabilities: ["Custom Dashboards", "Real-time Maps", "Export Reports", "KPI Tracking"]
    },
  ];

  const stats = [
    { value: "50K+", label: "Data Points Collected", icon: Database, color: "text-blue-600" },
    { value: "120+", label: "Organizations", icon: Users, color: "text-emerald-600" },
    { value: "15+", label: "Countries", icon: Globe2, color: "text-purple-600" },
    { value: "99.9%", label: "Uptime", icon: ShieldCheck, color: "text-green-600" },
  ];

  const testimonials = [
    {
      quote: "EASY TRACK has revolutionized our vaccination campaigns. The offline-first design ensures we never lose data, even in remote areas of rural Kenya.",
      author: "Dr. Ian Johnson",
      role: "Health Program Director, WHO",
      rating: 5,
      image: "👨‍⚕️",
      location: "Nairobi, Kenya"
    },
    {
      quote: "The real-time dashboards have improved our response time to water quality issues by 60%. Incredible platform that actually saves lives.",
      author: "Damaris Chen",
      role: "Water Quality Manager, UNICEF",
      rating: 5,
      image: "👩‍💼",
      location: "Lagos, Nigeria"
    },
    {
      quote: "EASY TRACK's climate monitoring tools have helped us predict and prevent environmental disasters across multiple regions in East Africa.",
      author: "Dr. Levi Okafor",
      role: "Climate Action Coordinator, Green Africa",
      rating: 5,
      image: "👨‍🔬",
      location: "Kampala, Uganda"
    }
  ];

  const sectors = [
    {
      id: "health",
      name: "Public Health",
      icon: Heart,
      description: "Transform healthcare delivery with real-time data collection and analysis",
      features: ["Disease Surveillance", "Vaccination Tracking", "Patient Records", "Medical Supply Chain"]
    },
    {
      id: "water",
      name: "Water Management",
      icon: Droplet,
      description: "Ensure clean water access with comprehensive quality monitoring",
      features: ["Quality Testing", "Source Mapping", "Contaminant Tracking", "Maintenance Logs"]
    },
    {
      id: "climate",
      name: "Climate Action",
      icon: Cloud,
      description: "Monitor environmental changes and drive sustainable practices",
      features: ["Weather Data", "Carbon Tracking", "Deforestation Monitoring", "Disaster Alerts"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-green-50/20">
      {/* Enhanced Navigation */}
      <motion.nav 
        className="border-b border-emerald-200/50 bg-white/80 backdrop-blur-lg sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-2xl bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                EASY TRACK
              </h1>
              <p className="text-xs text-emerald-600 font-medium">Data for Life. Insight for Action.</p>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Features</a>
            <a href="#sectors" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Sectors</a>
            <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Testimonials</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-emerald-600">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50 to-green-100/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <Badge variant="secondary" className="px-4 py-2 bg-emerald-500/10 text-emerald-700 border-emerald-200 hover:bg-emerald-500/20">
                  <Sparkles className="h-3 w-3 mr-2" />
                  Trusted by 120+ Organizations Worldwide
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight">
                  Data for
                  <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 bg-clip-text text-transparent">
                    Life.
                  </span>
                  Insight for
                  <span className="block bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 bg-clip-text text-transparent">
                    Action.
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  World-class collaborative dashboard empowering field teams in health, water, and climate action across Africa and developing regions with real-time, data-driven insights.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">Offline Data Collection</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">Real-time Analytics</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">Multi-language Support</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">24/7 Support</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-8"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Start Free Trial
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-emerald-500" />
                    <span>15+ Countries</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl blur-3xl opacity-20 animate-pulse" />
                <div className="relative bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden">
                  <img
                    src={dashboardPreview}
                    alt="EASY TRACK Dashboard Preview"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-emerald-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Live Dashboard</p>
                        <p className="text-sm text-gray-600">Real-time data from field teams</p>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-500 text-white">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                        Live
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-emerald-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-medium text-gray-700">Mobile App</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-emerald-100"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-medium text-gray-700">Analytics</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-emerald-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="px-4 py-2 border-emerald-200 text-emerald-700 bg-emerald-50">
              Powerful Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900">
              Everything You Need for
              <span className="block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Field Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for field teams operating in challenging environments across Africa and developing regions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <Card className="h-full border border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="relative p-6 space-y-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-heading font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                      <TrendingUpIcon className="h-4 w-4" />
                      {feature.stats}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700">Capabilities:</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.capabilities.map((capability, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Sectors Section */}
      <section id="sectors" className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="px-4 py-2 border-emerald-200 text-emerald-700 bg-emerald-50">
              Industry Solutions
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900">
              Tailored for Your
              <span className="block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Sector Needs
              </span>
            </h2>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 p-1 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-2xl">
              {sectors.map((sector) => (
                <TabsTrigger
                  key={sector.id}
                  value={sector.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
                >
                  <sector.icon className="h-4 w-4 mr-2" />
                  {sector.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {sectors.map((sector) => (
                <TabsContent key={sector.id} value={sector.id} asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                  >
                    <div className="space-y-6">
                      <h3 className="text-3xl font-heading font-bold text-gray-900">{sector.name}</h3>
                      <p className="text-xl text-gray-600 leading-relaxed">{sector.description}</p>
                      
                      <div className="grid gap-4">
                        {sector.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
                        Learn More About {sector.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8">
                        <div className="aspect-video bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                          <sector.icon className="h-16 w-16 text-emerald-500" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="px-4 py-2 border-emerald-200 text-emerald-700 bg-emerald-50">
              Success Stories
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900">
              Trusted by
              <span className="block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Organizations Worldwide
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border border-gray-200 bg-white hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white text-lg">
                        {testimonial.image}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-xs text-emerald-600">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              Ready to Transform Your
              <span className="block">Field Operations?</span>
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of field agents and organizations using EASY TRACK to drive meaningful change across Africa and developing regions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-600 hover:bg-gray-100 shadow-2xl hover:scale-105 transition-all duration-300 px-8"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8 text-emerald-100 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl">EASY TRACK</h3>
                  <p className="text-emerald-200 text-sm">Data for Life. Insight for Action.</p>
                </div>
              </div>
              <p className="text-emerald-200 text-sm leading-relaxed">
                Empowering field teams with world-class data collection and analysis tools for health, water, and climate action across Africa and developing regions.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="text-emerald-200 hover:text-white hover:bg-white/10">
                  <Globe className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-emerald-200 hover:text-white hover:bg-white/10">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-emerald-200 hover:text-white hover:bg-white/10">
                  <Video className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Integrations", "Mobile App"]
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Partners", "Contact"]
              },
              {
                title: "Resources",
                links: ["Documentation", "Help Center", "Community", "Status", "Download"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-6">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-emerald-200 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-emerald-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center">
            <p className="text-emerald-200 text-sm">
              © 2025 EASY TRACK. All rights reserved. Making impact across Africa and beyond.
            </p>
            <div className="flex gap-6 mt-4 lg:mt-0">
              <a href="#" className="text-emerald-200 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-emerald-200 hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-emerald-200 hover:text-white transition-colors text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
