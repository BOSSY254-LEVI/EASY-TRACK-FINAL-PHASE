import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Droplet, Heart, Cloud, Users, Shield, TrendingUp, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: Droplet,
      title: "Water Quality Monitoring",
      description: "Track and analyze water test results across multiple locations in real-time.",
      color: "bg-secondary",
    },
    {
      icon: Heart,
      title: "Health Data Collection",
      description: "Document disease cases, vaccination drives, and health metrics efficiently.",
      color: "bg-destructive",
    },
    {
      icon: Cloud,
      title: "Climate Action Insights",
      description: "Monitor weather patterns and environmental changes to inform decision-making.",
      color: "bg-muted-foreground",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Enable seamless coordination between field agents and supervisors.",
      color: "bg-success",
    },
    {
      icon: Shield,
      title: "Offline-First Design",
      description: "Collect data even without connectivity, sync automatically when online.",
      color: "bg-primary",
    },
    {
      icon: TrendingUp,
      title: "Interactive Dashboards",
      description: "Visualize trends and KPIs with powerful charts and real-time updates.",
      color: "bg-secondary",
    },
  ];

  const stats = [
    { value: "50K+", label: "Data Points Collected" },
    { value: "120+", label: "Organizations" },
    { value: "15", label: "Countries" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-foreground">EASY TRACK</h1>
              <p className="text-xs text-muted-foreground">Data for Life. Insight for Action.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-success/5" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Empowering Field Teams Worldwide</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-tight text-foreground">
                Data for Life.
                <br />
                <span className="bg-gradient-hero bg-clip-text text-transparent">Insight for Action.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-balance">
                World-class collaborative dashboard empowering field teams in health, water, and climate action 
                across Africa and developing regions with data-driven insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button variant="hero" size="lg" className="shadow-lg">
                    Start Monitoring
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="absolute -inset-4 bg-gradient-hero rounded-2xl blur-2xl opacity-20" />
              <img
                src={heroImage}
                alt="Field health workers collecting data with tablets"
                className="relative rounded-2xl shadow-soft w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <p className="text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-heading font-bold text-foreground">Powerful Features for Impact</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Everything you need to collect, analyze, and act on field data with absolute confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-border bg-card neumorphic animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative space-y-6">
          <h2 className="text-4xl font-heading font-bold text-foreground">Ready to Make an Impact?</h2>
          <p className="text-xl text-muted-foreground text-balance">
            Join thousands of field agents and organizations using EASY TRACK to drive meaningful change.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button variant="hero" size="lg" className="shadow-lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground">EASY TRACK</h3>
                  <p className="text-xs text-muted-foreground">Data for Life. Insight for Action.</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering field teams with world-class data collection and analysis tools for health, water, and climate action.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 EASY TRACK. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
