import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Eye, EyeOff, Shield, Zap, Sparkles, Lock, User, Mail, ArrowRight, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Add button press animation effect
    const button = e.currentTarget.querySelector('button[type="submit"]');
    if (button) {
      button.classList.add("scale-95");
      setTimeout(() => button.classList.remove("scale-95"), 150);
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back to Easy Track!",
          className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
        });
        // Add success animation before navigation
        setTimeout(() => navigate("/dashboard"), 800);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'azure') => {
    setLoading(true);
    
    // Add ripple effect
    const event = window.event as MouseEvent;
    if (event) {
      const button = event.target as HTMLElement;
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = 'absolute bg-primary/20 rounded-full animate-ripple';
      
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast({
          title: "OAuth Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  } as Variants;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  } as Variants;
  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  } as Variants;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50/30 px-4 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/30 to-transparent rounded-full blur-2xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Animated floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      <motion.div
        ref={cardRef}
        className="w-full max-w-md relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Premium card with enhanced styling */}
        <motion.div variants={cardVariants}>
          <Card className="w-full relative bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-500 rounded-3xl overflow-hidden">
            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            {/* Premium header section */}
            <CardHeader className="space-y-4 text-center relative z-10 pb-6">
              <motion.div
                className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-blue-500/25 relative group"
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Activity className="h-10 w-10 text-white" />
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <CardDescription className="text-base text-gray-600 flex items-center justify-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  Sign in to your Easy Track account
                  <Zap className="h-4 w-4 text-purple-500" />
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-4">
              <motion.form onSubmit={handleSubmit} className="space-y-5" variants={containerVariants}>
                {/* Enhanced Email Input */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                      onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                      required
                      className="h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white shadow-sm group-hover:border-gray-300"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300">
                      <Mail className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isFocused.email ? "text-blue-500" : "text-gray-400"
                      )} />
                    </div>
                  </div>
                </motion.div>
                
                {/* Enhanced Password Input */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                      onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                      required
                      className="h-12 pl-11 pr-11 rounded-xl border-2 border-gray-200 bg-white/80 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white shadow-sm group-hover:border-gray-300"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300">
                      <Lock className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isFocused.password ? "text-blue-500" : "text-gray-400"
                      )} />
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 hover:bg-gray-100 rounded-r-xl px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Enhanced Submit Button */}
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base relative overflow-hidden group shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 border-0"
                    size="lg" 
                    disabled={loading}
                  >
                    <span className={cn(
                      "flex items-center gap-2 transition-all duration-300 group-hover:gap-3",
                      loading && "opacity-0"
                    )}>
                      Sign In
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    
                    {loading && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                    
                    {/* Button shine effect */}
                    <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </Button>
                </motion.div>
              </motion.form>

              {/* Enhanced OAuth Section */}
              <motion.div variants={itemVariants} className="space-y-5">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>
                
                <motion.div className="flex justify-center" variants={containerVariants}>
                  <motion.div variants={itemVariants}>
                    <Button
                      variant="outline"
                      className="w-40 h-11 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group relative overflow-hidden"
                      onClick={() => handleOAuthLogin('google')}
                      disabled={loading}
                    >
                      <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                        </svg>
                        <span className="font-medium text-gray-700">Google</span>
                      </motion.div>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Enhanced Footer Links */}
              <div className="space-y-4 pt-4">
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-700 font-medium">
                    Don't have an account?{" "}
                    <Link 
                         to ="/register" 
                      className="text-blue-600 hover:text-blue-800 font-bold transition-all duration-300 hover:underline underline-offset-4"
                    >
                      Create account
                    </Link>
                  </p>
                  
                  <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-all duration-300 group font-bold"
                  >
                    <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    Back to homepage
                  </Link>
                </div>
                
                {/* Security badge */}
                <motion.div 
                  className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-gray-500 font-medium">Secure & Encrypted Login</span>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;