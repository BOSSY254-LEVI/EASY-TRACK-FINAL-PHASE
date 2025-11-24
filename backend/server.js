const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const mongoose = require('mongoose');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: process.env.MAX_REQUEST_SIZE || '50mb' }));
app.use(express.urlencoded({ limit: process.env.MAX_REQUEST_SIZE || '50mb', extended: true }));

// Request timeout
app.use((req, res, next) => {
  req.setTimeout(parseInt(process.env.REQUEST_TIMEOUT) || 30000);
  res.setTimeout(parseInt(process.env.REQUEST_TIMEOUT) || 30000);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime()
  });
});

// Initialize Supabase client
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;
// Initialize Supabase admin (service role) client when provided
const supaAdmin = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  : null;

// Connect to MongoDB (only if URI is provided)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    maxPoolSize: 1, // Limit connection pool size
    bufferCommands: false, // Disable mongoose buffering
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('MongoDB URI not provided, running without database connection');
}

// Define Field Data Schema
const fieldDataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, enum: ['water', 'health', 'climate', 'environment'] },
  location: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  description: { type: String, required: true },
  user_id: { type: String },
  time_taken: { type: Number },
  created_at: { type: Date, default: Date.now }
});

const FieldData = mongoose.model('FieldData', fieldDataSchema);

// Basic User schema for local auth/profile fallback (use Supabase in production)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  phone: { type: String },
  bio: { type: String },
  passwordHash: { type: String },
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Initialize OpenAI (OpenRouter for better model support)
let openai = null;
if (process.env.BOSS_AI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.BOSS_AI_API_KEY,
    baseURL: process.env.AI_BASE_URL || 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'https://easy-track-organization.vercel.app',
      'X-Title': 'EASY TRACK AI'
    }
  });
} else {
  console.warn('BOSS_AI_API_KEY not provided, AI features will be limited');
}

// Enhanced System Prompt for Better AI
const ENHANCED_SYSTEM_PROMPT = `You are Boss AI, the intelligent assistant for EASY TRACK, a comprehensive data collection and analysis platform for field teams in health, water, and climate action across Africa and developing regions.

## EASY TRACK Mission & Vision
- **Mission**: Transform raw field data into actionable insights that drive meaningful change
- **Vision**: Empower every field worker with tools to make data-driven decisions
- **Impact**: Since 2020, helped 120+ organizations in 15+ countries collect 50K+ data points

## Core Features You Support
1. **Water Quality Monitoring**: pH tracking, contaminant detection, source mapping, quality alerts
2. **Health Data Collection**: Patient records, vaccination tracking, disease surveillance, medical inventory
3. **Climate Action**: Weather monitoring, deforestation tracking, carbon metrics, disaster prediction
4. **Team Collaboration**: Role management, task assignment, real-time chat, progress tracking
5. **Offline-First Design**: Offline forms, auto sync, conflict resolution, battery optimization
6. **Interactive Dashboards**: 30+ chart types, custom dashboards, real-time maps, export reports

## Your Capabilities
- Provide detailed technical information about EASY TRACK features
- Guide users through navigation and feature usage
- Answer questions about data collection, analysis, and field operations
- Offer best practices for field data management
- Assist with troubleshooting and common issues
- Help troubleshoot common issues
- Analyze user data and provide insights
- Suggest improvements based on usage patterns
- Support multiple languages (prioritize user's language)

## Data Handling
- When users share field data, you can analyze it and suggest improvements
- Provide real-time insights from collected data
- Generate summary reports from multiple data entries
- Identify trends and anomalies in field data

## Personality
- Friendly, professional, and knowledgeable
- Empathetic to field workers' challenges
- Action-oriented with clear next steps
- Data-driven in recommendations

Keep responses clear and actionable. Use bullet points for lists. Ask clarifying questions when needed.`;

// Global facts that should always be included in the AI system prompt
const globalFacts = [
  `The CEO AND FOUNDER OF EASY TRACK IS DEV LIVINGSTONE ODUOR OTIENO COMMONLY KNOWN AS BOSSY LEVI`
  
];

// Endpoints to manage global facts for the AI
app.post('/api/ai/facts', (req, res) => {
  try {
    const { fact } = req.body;
    if (!fact || typeof fact !== 'string') return res.status(400).json({ error: 'fact (string) is required' });
    globalFacts.push(fact);
    res.json({ message: 'Fact added', fact, totalFacts: globalFacts.length });
  } catch (err) {
    console.error('Error adding fact:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/ai/facts', (req, res) => {
  res.json(globalFacts);
});

// Context Manager for Better AI Responses
class ContextManager {
  constructor() {
    this.userContexts = new Map();
    this.conversationHistory = new Map();
  }

  addContext(userId, context) {
    if (!this.userContexts.has(userId)) {
      this.userContexts.set(userId, []);
    }
    this.userContexts.get(userId).push(context);
  }

  getContext(userId) {
    return this.userContexts.get(userId) || [];
  }

  addMessage(userId, message) {
    if (!this.conversationHistory.has(userId)) {
      this.conversationHistory.set(userId, []);
    }
    this.conversationHistory.get(userId).push(message);
  }

  getHistory(userId, limit = 10) {
    const history = this.conversationHistory.get(userId) || [];
    return history.slice(-limit);
  }

  clearContext(userId) {
    this.userContexts.delete(userId);
    this.conversationHistory.delete(userId);
  }
}

const contextManager = new ContextManager();

// Field Data CRUD endpoints
app.get('/api/field-data', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      return res.json([]); // Return empty array if no database connection
    }
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const fieldData = await FieldData.find().sort({ created_at: -1 }).maxTimeMS(5000);
    res.json(fieldData);
  } catch (error) {
    console.error('Error fetching field data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/field-data', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const { title, category, location, latitude, longitude, description, user_id, time_taken } = req.body;

    const newFieldData = new FieldData({
      title,
      category,
      location,
      latitude,
      longitude,
      description,
      user_id,
      time_taken
    });

    const savedData = await newFieldData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error('Error saving field data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/field-data/:id', async (req, res) => {
  try {
    const fieldData = await FieldData.findById(req.params.id);
    if (!fieldData) {
      return res.status(404).json({ error: 'Field data not found' });
    }
    res.json(fieldData);
  } catch (error) {
    console.error('Error fetching field data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/field-data/:id', async (req, res) => {
  try {
    const { title, category, location, latitude, longitude, description, user_id, time_taken } = req.body;

    const updatedData = await FieldData.findByIdAndUpdate(
      req.params.id,
      { title, category, location, latitude, longitude, description, user_id, time_taken },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: 'Field data not found' });
    }

    res.json(updatedData);
  } catch (error) {
    console.error('Error updating field data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/field-data/:id', async (req, res) => {
  try {
    const deletedData = await FieldData.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ error: 'Field data not found' });
    }
    res.json({ message: 'Field data deleted successfully' });
  } catch (error) {
    console.error('Error deleting field data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User profile update (supports Supabase if configured, otherwise uses Mongo fallback)
app.put('/api/user/profile', async (req, res) => {
  try {
    const { email, name, phone, bio, userId } = req.body;

    if (!email && !userId) {
      return res.status(400).json({ error: 'email or userId required' });
    }

    // If Supabase is configured and a service key is available, prefer updating Supabase users table
    if (supabase && process.env.SUPABASE_SERVICE_KEY) {
      try {
        // Use service role key client
        const supaAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
        const updates = {};
        if (name) updates.name = name;
        if (phone) updates.phone = phone;
        if (bio) updates.bio = bio;

        const { data, error } = await supaAdmin.from('users').update(updates).match(userId ? { id: userId } : { email });
        if (error) throw error;
        return res.json(data?.[0] || {});
      } catch (err) {
        console.error('Supabase profile update failed:', err.message || err);
        // fallthrough to mongo fallback
      }
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }

    const query = userId ? { _id: userId } : { email };
    const updated = await User.findOneAndUpdate(query, { $set: { name, phone, bio } }, { new: true, upsert: true });
    res.json(updated);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Change password endpoint (local mongo fallback). For production, use Supabase auth admin APIs.
const crypto = require('crypto');
function hashPassword(pw) {
  return crypto.createHash('sha256').update(pw || '').digest('hex');
}

app.post('/api/user/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'email, currentPassword and newPassword are required' });
    }

    // If Supabase admin client is available, prefer using it for password changes
    if (supaAdmin) {
      try {
        // If we have the regular (anon) supabase client and currentPassword, try to validate the current password first
        let userId = null;
        if (supabase && currentPassword) {
          try {
            const signIn = await supabase.auth.signInWithPassword({ email, password: currentPassword });
            if (signIn.error) {
              return res.status(403).json({ error: 'Current password is incorrect' });
            }
            userId = signIn.data?.user?.id || signIn.user?.id || null;
          } catch (e) {
            // proceed to lookup by email below
            console.warn('Supabase sign-in verification failed, will attempt admin lookup', e?.message || e);
          }
        }

        // If we still don't have userId, list users via admin API and find by email
        if (!userId) {
          const listRes = await supaAdmin.auth.admin.listUsers();
          if (listRes.error) throw listRes.error;
          const users = listRes.data?.users || listRes.users || listRes.data || [];
          const found = Array.isArray(users) ? users.find(u => (u.email || u.user?.email) === email || (u.user?.email === email)) : null;
          userId = found?.id || found?.user?.id || null;
        }

        if (!userId) {
          return res.status(404).json({ error: 'User not found in Supabase auth' });
        }

        const updateRes = await supaAdmin.auth.admin.updateUserById(userId, { password: newPassword });
        if (updateRes.error) throw updateRes.error;
        return res.json({ message: 'Password updated successfully (Supabase admin)' });
      } catch (err) {
        console.error('Supabase admin password update failed:', err?.message || err);
        return res.status(500).json({ error: 'Failed to update password via Supabase admin API' });
      }
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.passwordHash !== hashPassword(currentPassword)) {
      return res.status(403).json({ error: 'Current password is incorrect' });
    }

    user.passwordHash = hashPassword(newPassword);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Enhanced Chat endpoint with context awareness
app.post('/api/chat', async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ 
        error: 'OpenAI API key not configured',
        message: 'Please set BOSS_AI_API_KEY in environment variables'
      });
    }

    const { messages, userId = 'anonymous', context = {} } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // Add user context
    if (userId !== 'anonymous') {
      contextManager.addContext(userId, context);
    }

    // Build conversation with history and include global facts in the system prompt
    const systemContent = ENHANCED_SYSTEM_PROMPT + (globalFacts && globalFacts.length ? `\n\nImportant Facts:\n${globalFacts.join('\n')}` : '');

    // Include any per-user stored context as additional system instructions (stringified)
    const userCtx = contextManager.getContext(userId) || [];
    const userCtxMessages = [];
    if (Array.isArray(userCtx) && userCtx.length) {
      userCtx.forEach((c) => {
        try {
          const text = typeof c === 'string' ? c : JSON.stringify(c);
          userCtxMessages.push({ role: 'system', content: `User context: ${text}` });
        } catch (e) {
          // ignore context that can't be stringified
        }
      });
    }

    const conversationMessages = [
      { role: 'system', content: systemContent },
      ...userCtxMessages,
      ...messages.map(msg => ({ role: msg.role || 'user', content: msg.content || '' }))
    ];

    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'openrouter/auto',
      messages: conversationMessages,
      max_tokens: 2000,
      temperature: 0.7,
      top_p: 0.9,
      frequency_penalty: 0.5,
      presence_penalty: 0.5
    });

    const assistantMessage = completion.choices[0].message.content;

    // Store message in context history
    if (userId !== 'anonymous') {
      contextManager.addMessage(userId, { role: 'user', content: messages[messages.length - 1].content });
      contextManager.addMessage(userId, { role: 'assistant', content: assistantMessage });
    }

    res.json({
      message: assistantMessage,
      model: completion.model,
      usage: completion.usage,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    const errorMessage = error.message || 'An error occurred processing your request';
    res.status(500).json({ 
      error: 'Failed to process chat message',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
});

// AI Analysis endpoint - analyze field data
app.post('/api/ai/analyze-field-data', async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ error: 'OpenAI API key not configured' });
    }

    const { fieldData, dataType = 'general' } = req.body;

    if (!fieldData) {
      return res.status(400).json({ error: 'fieldData is required' });
    }

    const analysisPrompt = `As EASY TRACK's AI assistant, analyze the following ${dataType} field data and provide:
1. Key insights and patterns
2. Potential issues or anomalies
3. Recommendations for improvement
4. Next steps for field teams

Field Data:
${JSON.stringify(fieldData, null, 2)}

Provide a concise, actionable analysis.`;

    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'openrouter/auto',
      messages: [
        { role: 'system', content: ENHANCED_SYSTEM_PROMPT },
        { role: 'user', content: analysisPrompt }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    res.json({
      analysis: completion.choices[0].message.content,
      dataType,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in analyze endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to analyze data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// AI Insights endpoint - get insights from all data
app.post('/api/ai/insights', async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ error: 'OpenAI API key not configured' });
    }

    const { allFieldData, timeRange = 'month' } = req.body;

    if (!allFieldData || !Array.isArray(allFieldData)) {
      return res.status(400).json({ error: 'allFieldData array is required' });
    }

    const summary = {
      total: allFieldData.length,
      byCategory: {},
      dateRange: timeRange,
      samples: allFieldData.slice(0, 5)
    };

    allFieldData.forEach(item => {
      summary.byCategory[item.category] = (summary.byCategory[item.category] || 0) + 1;
    });

    const insightPrompt = `Analyze these EASY TRACK field data summaries and provide executive insights:

Summary:
${JSON.stringify(summary, null, 2)}

Provide:
1. Overall data quality assessment
2. Major trends and patterns
3. Critical alerts or concerns
4. Top 3 recommendations for improvement
5. Team performance insights`;

    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'openrouter/auto',
      messages: [
        { role: 'system', content: ENHANCED_SYSTEM_PROMPT },
        { role: 'user', content: insightPrompt }
      ],
      max_tokens: 2500,
      temperature: 0.7
    });

    res.json({
      insights: completion.choices[0].message.content,
      dataSummary: summary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in insights endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to generate insights',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Legacy chat endpoint (backwards compatibility)
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // Forward to main chat endpoint
    const response = await fetch('http://localhost:' + port + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) throw new Error('Chat request failed');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Supabase endpoints
// Get users from Supabase
app.get('/api/supabase/users', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Supabase not configured' });
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching users from Supabase:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get field data from Supabase
app.get('/api/supabase/field-data', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Supabase not configured' });
    }
    
    const { data, error } = await supabase
      .from('field_data')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching field data from Supabase:', error);
    res.status(500).json({ error: error.message });
  }
});

// Post field data to Supabase
app.post('/api/supabase/field-data', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Supabase not configured' });
    }
    
    const { data, error } = await supabase
      .from('field_data')
      .insert([req.body])
      .select();
    
    if (error) throw error;
    res.status(201).json(data?.[0] || {});
  } catch (error) {
    console.error('Error saving field data to Supabase:', error);
    res.status(500).json({ error: error.message });
  }
});

// Sync endpoint - get data from both MongoDB and Supabase
app.get('/api/sync/all-data', async (req, res) => {
  try {
    const syncData = {
      mongodb: [],
      supabase: [],
      timestamp: new Date().toISOString()
    };

    // Fetch from MongoDB
    if (mongoose.connection.readyState === 1) {
      const mongoData = await FieldData.find().sort({ created_at: -1 }).limit(100);
      syncData.mongodb = mongoData;
    }

    // Fetch from Supabase
    if (supabase) {
      const { data, error } = await supabase
        .from('field_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (!error && data) {
        syncData.supabase = data;
      }
    }

    res.json(syncData);
  } catch (error) {
    console.error('Error syncing data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
    method: req.method
  });
});

const SERVER_HOST = process.env.HOST || '0.0.0.0';

app.listen(port, SERVER_HOST, () => {
  console.log(`\n====================================`);
  console.log(`🚀 EASY TRACK Backend Server`);
  console.log(`====================================`);
  console.log(`📍 Server running on ${SERVER_HOST}:${port}`);
  console.log(`🔗 API Base: http://localhost:${port}`);
  console.log(`🏥 Health Check: http://localhost:${port}/health`);
  console.log(`🤖 Chat API: POST ${port}/api/chat`);
  console.log(`📊 Data API: GET/POST ${port}/api/field-data`);
  console.log(`💾 Sync API: GET ${port}/api/sync/all-data`);
  console.log(`\n📦 Configuration:`);
  console.log(`  - MongoDB: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '⚠️  Disconnected'}`);
  console.log(`  - Supabase: ${supabase ? '✅ Configured' : '⚠️  Not configured'}`);
  console.log(`  - OpenAI API: ${openai ? '✅ Configured' : '⚠️  Not configured'}`);
  console.log(`  - Node Env: ${process.env.NODE_ENV || 'development'}`);
  console.log(`====================================\n`);
});
