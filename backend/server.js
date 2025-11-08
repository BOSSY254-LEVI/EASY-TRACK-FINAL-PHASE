const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

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

// Initialize OpenAI (only if API key is provided)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

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

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ error: 'OpenAI API key not configured' });
    }
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    res.json({
      message: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
