import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Eye, EyeOff, Shield, Zap, Sparkles, User, Mail, Building, Lock, ArrowRight, Home, CheckCircle, ArrowLeft, LogIn } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
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

  // Theme configuration with direct class names
  const themes = {
    classic: {
      gradient: "from-white via-gray-50 to-blue-50/30",
      primaryColor: "text-blue-500",
      primaryBorder: "border-blue-500",
      primaryBg: "bg-blue-500",
      primaryBgGradient: "from-blue-500 to-purple-600",
      primaryHoverGradient: "from-blue-700 to-purple-700",
      buttonGradient: "from-blue-600 to-purple-600",
      buttonHover: "from-blue-700 to-purple-700",
      shadowColor: "shadow-blue-500/25",
      bgLight: "bg-blue-100/40",
      bgLight2: "bg-blue-100/30",
      accent: "bg-blue-400/20"
    },
    green: {
      gradient: "from-white via-emerald-50/80 to-green-50/40",
      primaryColor: "text-emerald-500",
      primaryBorder: "border-emerald-500",
      primaryBg: "bg-emerald-500",
      primaryBgGradient: "from-emerald-500 to-green-600",
      primaryHoverGradient: "from-emerald-700 to-green-700",
      buttonGradient: "from-emerald-600 to-green-600",
      buttonHover: "from-emerald-700 to-green-700",
      shadowColor: "shadow-emerald-500/25",
      bgLight: "bg-emerald-100/40",
      bgLight2: "bg-emerald-100/30",
      accent: "bg-emerald-400/20"
    }
  };

  const currentTheme = themes.green;

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
          className: "bg-green-500 text-white",
        });
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

  // Fixed navigation handlers - using window.location as fallback
  const handleLogin = () => {
    try {
      navigate("/login");
    } catch (error) {
      window.location.href = "/login";
    }
  };

  const handleGoHome = () => {
    try {
      navigate("/");
    } catch (error) {
      window.location.href = "/";
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'azure') => {
    setLoading(true);
    
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
        damping: 15
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
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTheme.gradient} px-4 py-8 relative overflow-hidden`}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${currentTheme.bgLight} to-transparent rounded-full blur-2xl`}></div>
        <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr ${currentTheme.bgLight2} to-transparent rounded-full blur-2xl`}></div>
        
        <motion.div
          className={`absolute top-1/4 right-1/4 w-4 h-4 ${currentTheme.accent} rounded-full`}
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
          className={`absolute bottom-1/3 left-1/4 w-3 h-3 ${currentTheme.accent} rounded-full`}
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
      >
        <motion.div variants={cardVariants}>
          <Card className="w-full relative bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="space-y-4 text-center relative z-10 pb-6">
              <motion.div
                className={`mx-auto w-20 h-20 bg-gradient-to-br ${currentTheme.primaryBgGradient} rounded-2xl flex items-center justify-center mb-2 shadow-lg ${currentTheme.shadowColor} relative group`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Activity className="h-10 w-10 text-white" />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Join Easy Track
                </CardTitle>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <CardDescription className="text-base text-gray-600 flex items-center justify-center gap-2 font-medium">
                  <Sparkles className={`h-4 w-4 ${currentTheme.primaryColor}`} />
                  Create your account and start making an impact
                  <Zap className={`h-4 w-4 ${currentTheme.primaryColor}`} />
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-4">
              <motion.form onSubmit={handleSubmit} className="space-y-5" variants={containerVariants}>
                {/* Form inputs remain the same */}
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
                      className="h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isFocused.name ? currentTheme.primaryColor : "text-gray-400"
                      )} />
                    </div>
                  </div>
                </motion.div>

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
                      className="h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isFocused.email ? currentTheme.primaryColor : "text-gray-400"
                      )} />
                    </div>
                  </div>
                </motion.div>
                
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
                      className="h-12 pl-11 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isFocused.organization ? currentTheme.primaryColor : "text-gray-400"
                      )} />
                    </div>
                  </div>
                </motion.div>
                
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
                      className="h-12 pl-11 pr-11 rounded-xl border-2 border-gray-200 bg-white/80 text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isFocused.password ? currentTheme.primaryColor : "text-gray-400"
                      )} />
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 hover:bg-gray-100 rounded-r-xl px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  
                  {formData.password && (
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
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
                      className="h-12 pl-11 pr-11 rounded-xl border-2 border-gray-200 bg-white/80 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={cn(
                        "h-5 w-5 transition-colors duration-300",
                        isFocused.confirmPassword ? currentTheme.primaryColor : "text-gray-400"
                      )} />
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 hover:bg-gray-100 rounded-r-xl px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  
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

                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className={`w-full h-12 rounded-xl bg-gradient-to-r ${currentTheme.buttonGradient} hover:${currentTheme.buttonHover} text-white font-semibold text-base relative overflow-hidden group transition-all duration-300 border-0`}
                    disabled={loading}
                  >
                    <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
                      Create Account
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              <motion.div variants={itemVariants} className="space-y-5">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="w-40 h-11 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300"
                    onClick={() => handleOAuthLogin('google')}
                    disabled={loading}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                      </svg>
                      <span className="font-medium text-gray-700">Google</span>
                    </div>
                  </Button>
                </div>
              </motion.div>
              
              {/* FIXED NAVIGATION BUTTONS */}
              <div className="space-y-4 pt-4">
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-700 font-medium">
                    Already have an account?
                  </p>
                  
                  {/* Login Button - Fixed with proper styling */}
                  <Button
                    variant="ghost"
                    onClick={handleLogin}
                    className="text-emerald-600 hover:text-emerald-800 font-bold transition-all duration-300 hover:underline underline-offset-4 flex items-center gap-2 mx-auto"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign in to your account
                  </Button>

                  {/* Home Button - Fixed with proper styling */}
                  <Button
                    variant="ghost"
                    onClick={handleGoHome}
                    className="text-gray-700 hover:text-gray-900 transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Home className="h-4 w-4" />
                    Back to homepage
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-gray-500 font-medium">Your data is securely encrypted</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;