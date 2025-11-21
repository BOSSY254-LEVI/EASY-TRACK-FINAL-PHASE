import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Sparkles, 
  Zap, 
  Globe,
  Shield,
  Download,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Mic,
  MicOff,
  Paperclip
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  liked?: boolean;
}

const SYSTEM_PROMPT = `You are Boss AI, the intelligent assistant for EASY TRACK, a comprehensive data collection and analysis platform for field teams in health, water, and climate action across Africa and developing regions.

About EASY TRACK:
- Mission: Transform raw field data into actionable insights that drive meaningful change in communities across Africa and developing regions.
- Vision: A world where every field worker has the tools to make data-driven decisions that improve lives and protect our planet.
- Impact: Since 2020, we've helped over 120 organizations in 15+ countries collect 50K+ data points, leading to improved health outcomes and environmental protection.
- Features: Water Quality Monitoring, Health Data Collection, Climate Action Insights, Team Collaboration, Offline-First Design, Interactive Dashboards.
- Target Users: Health workers, environmentalists, NGOs, field agents.

Your role:
- Provide detailed information about EASY TRACK's features, mission, and capabilities
- Assist users with navigating and using the web application
- Answer questions about data collection, analysis, and field operations
- Offer guidance on best practices for field data management
- Help troubleshoot common issues
- Be helpful, professional, and knowledgeable
- Always maintain a friendly and supportive tone
- If you don't know something specific, admit it and suggest alternatives

Keep responses concise but informative. Use bullet points for lists when appropriate.`;

const BossAIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Boss AI, your EASY TRACK assistant. I can help you with information about our platform, guide you through features, and answer questions about data collection and analysis. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "What are EASY TRACK's main features?",
    "How does offline data collection work?",
    "Tell me about water quality monitoring",
    "How can I get started with field data collection?"
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content: userMessage.content }
          ],
          userId: 'web-user',
          context: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || 'I apologize, but I encountered an error processing your request.',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling backend API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I apologize, but I'm currently experiencing technical difficulties: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or check that the backend server is running on port 3001.`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleLikeMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, liked: !msg.liked } : msg
    ));
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm Boss AI, your EASY TRACK assistant. I can help you with information about our platform, guide you through features, and answer questions about data collection and analysis. How can I assist you today?",
        role: 'assistant',
        timestamp: new Date()
      }
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <TooltipProvider>
      {/* Enhanced Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={cn(
            "h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden",
            "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900"
          )}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <div className="relative">
                <Sparkles className="h-7 w-7" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            )}
          </motion.div>
          
          {/* Animated ring */}
          <motion.div
            className="absolute inset-0 border-2 border-yellow-400 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </Button>
      </motion.div>

      {/* Enhanced Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-32 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="shadow-2xl border-2 border-blue-200/20 rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md">
              {/* Enhanced Header */}
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <div className="flex items-center gap-2">
                        Boss AI Assistant
                        <Badge variant="secondary" className="bg-white/20 text-white border-0">
                          <Zap className="h-3 w-3 mr-1" />
                          Live
                        </Badge>
                      </div>
                      <div className="text-xs opacity-90 font-normal">
                        EASY TRACK Support Specialist
                      </div>
                    </div>
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
                          onClick={handleClearChat}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Clear Chat</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages Area */}
                <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    <AnimatePresence initial={false}>
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          variants={messageVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={cn(
                            "flex gap-3 group",
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          )}
                        >
                          {message.role === 'assistant' && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                    <Sparkles className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>Boss AI</TooltipContent>
                            </Tooltip>
                          )}
                          
                          <div className="flex flex-col gap-1 max-w-[85%]">
                            <div
                              className={cn(
                                "rounded-2xl px-4 py-3 text-sm relative",
                                message.role === 'user'
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                                  : 'bg-gray-100 text-gray-800 rounded-bl-md border'
                              )}
                            >
                              {message.content}
                              
                              {/* Message actions */}
                              <div className={cn(
                                "absolute -bottom-6 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                                message.role === 'user' ? 'right-2' : 'left-2'
                              )}>
                                {message.role === 'assistant' && (
                                  <>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6 rounded-full bg-white shadow-sm"
                                          onClick={() => handleLikeMessage(message.id)}
                                        >
                                          <ThumbsUp className={cn(
                                            "h-3 w-3",
                                            message.liked ? "text-green-600 fill-green-600" : "text-gray-600"
                                          )} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Helpful</TooltipContent>
                                    </Tooltip>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className={cn(
                              "text-xs text-gray-500 px-1",
                              message.role === 'user' ? 'text-right' : 'text-left'
                            )}>
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                          
                          {message.role === 'user' && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                                    <User className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>You</TooltipContent>
                            </Tooltip>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 justify-start"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            <Sparkles className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm border">
                          <div className="flex items-center gap-2 text-gray-600">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <Sparkles className="h-4 w-4 text-blue-500" />
                            </motion.div>
                            <div className="flex space-x-1">
                              <motion.div
                                className="w-2 h-2 bg-blue-500 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-blue-500 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-blue-500 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Suggested Questions */}
                    {messages.length === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2 pt-4"
                      >
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Quick Questions
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {suggestedQuestions.map((question, index) => (
                            <motion.button
                              key={question}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              onClick={() => handleQuickQuestion(question)}
                              className="text-left p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200/50 text-sm text-blue-700 transition-all duration-200 hover:scale-[1.02]"
                            >
                              {question}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                {/* Enhanced Input Area */}
                <div className="border-t bg-gray-50/50 p-4">
                  <div className="flex gap-2 items-end">
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about EASY TRACK..."
                        disabled={isLoading}
                        className="pr-20 rounded-xl border-2 focus:border-blue-500 transition-colors duration-200 bg-white"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-8 w-8 rounded-lg transition-all duration-200",
                                isListening 
                                  ? "bg-red-500 text-white hover:bg-red-600" 
                                  : "hover:bg-gray-200"
                              )}
                              onClick={toggleSpeechRecognition}
                              disabled={!recognitionRef.current}
                            >
                              {isListening ? (
                                <MicOff className="h-4 w-4" />
                              ) : (
                                <Mic className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isListening ? 'Stop listening' : 'Voice input'}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isLoading}
                          size="icon"
                          className={cn(
                            "rounded-xl transition-all duration-300",
                            inputValue.trim() && !isLoading
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                              : "bg-gray-300"
                          )}
                        >
                          <motion.div
                            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                            transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                          >
                            <Send className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                  </div>
                  
                  {/* Security Footer */}
                  <div className="flex items-center justify-center gap-2 pt-3 mt-2 border-t border-gray-200">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-gray-500">
                      Secure & Private • EASY TRACK AI
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default BossAIChatbot;