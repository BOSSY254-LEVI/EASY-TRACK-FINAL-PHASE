import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Eye, EyeOff, Shield, Zap, Sparkles, User, Mail, Building, Lock, ArrowRight, Home, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    organization: false,
    password: false,
    confirmPassword: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password strength calculator
  useEffect(() => {
    const calculateStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(password)) strength += 25;
      setPasswordStrength(strength);
    };

    calculateStrength(formData.password);
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (passwordStrength < 75) {
      toast({
        title: "Weak Password",
        description: "Please choose a stronger password with uppercase, numbers, and special characters.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Add button press animation
    const button = e.currentTarget.querySelector('button[type="submit"]');
    if (button) {
      button.classList.add("scale-95");
      setTimeout(() => button.classList.remove("scale-95"), 150);
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            organization: formData.organization,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Successful!",
          description: "Please check your email to confirm your account.",
          className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
        });
        // Show success state before potential redirect
        setTimeout(() => {
          navigate('/login', { state: { message: 'Please check your email to verify your account.' } });
        }, 2000);
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

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFocus = (field: string) => () => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => () => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
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
  };

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
  };

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
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return "bg-green-500";
    if (passwordStrength >= 50) return "bg-yellow-500";
    if (passwordStrength >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 75) return "Strong";
    if (passwordStrength >= 50) return "Good";
    if (passwordStrength >= 25) return "Weak";
    return "Very Weak";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50/30 px-4 py-8 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric patterns */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-green-100/40 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-2xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Animated floating elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-green-400/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-blue-400/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
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
        className="w-full max-w-lg relative"
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
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-green-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            {/* Premium header section */}
            <CardHeader className="space-y-4 text-center relative z-10 pb-6">
              <motion.div
                className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-green-500/25 relative group"
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Activity className="h-10 w-10 text-white" />
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Join Easy Track
                </CardTitle>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <CardDescription className="text-base text-gray-600 flex items-center justify-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-green-500" />
                  Create your account and start making an impact
                  <Zap className="h-4 w-4 text-blue-500" />
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-4">
              <motion.form onSubmit={handleSubmit} className="space-y-5" variants={containerVariants}>
                {/* Enhanced Name Input */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <div className="relative group">
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange("name")}
                      onFocus={handleFocus("name")}
                      onBlur={handleBlur("name")}
                      required
                      className="h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white shadow-sm group-hover:border-gray-300"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300">
                      <User className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isFocused.name ? "text-blue-500" : "text-gray-400"
                      )} />
                    </div>
                  </div>
                </motion.div>

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
                      placeholder="you@organization.org"
                      value={formData.email}
                      onChange={handleChange("email")}
                      onFocus={handleFocus("email")}
                      onBlur={handleBlur("email")}
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
                
                {/* Enhanced Organization Input */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label htmlFor="organization" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Organization
                  </Label>
                  <div className="relative group">
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Your NGO or Agency"
                      value={formData.organization}
                      onChange={handleChange("organization")}
                      onFocus={handleFocus("organization")}
                      onBlur={handleBlur("organization")}
                      required
                      className="h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white shadow-sm group-hover:border-gray-300"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300">
                      <Building className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isFocused.organization ? "text-blue-500" : "text-gray-400"
                      )} />
                    </div>
                  </div>
                </motion.div>
                
                {/* Enhanced Password Input with Strength Meter */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange("password")}
                      onFocus={handleFocus("password")}
                      onBlur={handleBlur("password")}
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
                  
                  {/* Password Strength Meter */}
                  {formData.password && (
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">Password strength:</span>
                        <span className={cn(
                          "font-semibold",
                          passwordStrength >= 75 ? "text-green-600" :
                          passwordStrength >= 50 ? "text-yellow-600" :
                          passwordStrength >= 25 ? "text-orange-600" : "text-red-600"
                        )}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className={cn("h-2 rounded-full transition-all duration-500", getPasswordStrengthColor())}
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Enhanced Confirm Password Input */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Confirm Password
                  </Label>
                  <div className="relative group">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      onFocus={handleFocus("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      required
                      className="h-12 pl-11 pr-11 rounded-xl border-2 border-gray-200 bg-white/80 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white shadow-sm group-hover:border-gray-300"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300">
                      <Lock className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isFocused.confirmPassword ? "text-blue-500" : "text-gray-400"
                      )} />
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 hover:bg-gray-100 rounded-r-xl px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <motion.div 
                      className="flex items-center gap-2 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-600 font-medium">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <div className="h-4 w-4 rounded-full bg-red-500"></div>
                          <span className="text-red-600 font-medium">Passwords don't match</span>
                        </>
                      )}
                    </motion.div>
                  )}
                </motion.div>

                {/* Enhanced Submit Button */}
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold text-base relative overflow-hidden group shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 border-0"
                    size="lg" 
                    disabled={loading}
                  >
                    <span className={cn(
                      "flex items-center gap-2 transition-all duration-300 group-hover:gap-3",
                      loading && "opacity-0"
                    )}>
                      Create Account
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
                
                <motion.div className="grid grid-cols-2 gap-3" variants={containerVariants}>
                  <motion.div variants={itemVariants}>
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group relative overflow-hidden"
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
                  
                  <motion.div variants={itemVariants}>
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group relative overflow-hidden"
                      onClick={() => handleOAuthLogin('azure')}
                      disabled={loading}
                    >
                      <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM9 7h6v2H9V7zm0 4h6v2H9v-2zm0 4h4v2H9v-2z"/>
                        </svg>
                        <span className="font-medium text-gray-700">Microsoft</span>
                      </motion.div>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Enhanced Footer Links */}
              <motion.div variants={itemVariants} className="space-y-4 pt-4">
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:underline underline-offset-4 flex items-center gap-1 justify-center group"
                    >
                      Sign in to your account
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </p>
                  
                  <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-all duration-300 group font-medium"
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
                  <span className="text-xs text-gray-500 font-medium">Your data is securely encrypted</span>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;