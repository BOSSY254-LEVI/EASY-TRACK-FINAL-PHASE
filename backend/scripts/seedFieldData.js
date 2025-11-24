const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in environment. Aborting.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}).then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

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

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  phone: { type: String },
  bio: { type: String },
  passwordHash: { type: String },
  created_at: { type: Date, default: Date.now }
});

const FieldData = mongoose.model('FieldData', fieldDataSchema);
const User = mongoose.model('User', userSchema);

async function seed() {
  try {
    await FieldData.deleteMany({});
    await User.deleteMany({});

    const sampleUser = new User({
      email: 'bossylevi@gmail.com',
      name: 'Agent ',
      phone: '+254700000000',
      bio: 'Sample field agent for seeding',
      passwordHash: require('crypto').createHash('sha256').update('password123').digest('hex')
    });
    await sampleUser.save();

    const samples = [
      {
        title: 'River Water Sample - Kibera',
        category: 'water',
        location: 'Kibera, Nairobi',
        latitude: -1.286389,
        longitude: 36.817223,
        description: 'pH low, visible contaminants near the bank',
        user_id: sampleUser._id.toString(),
        time_taken: 120
      },
      {
        title: 'Vaccination Drive - Nakuru',
        category: 'health',
        location: 'Nakuru County',
        latitude: -0.303099,
        longitude: 36.080026,
        description: 'Mobile clinic vaccination data collected for 250 people',
        user_id: sampleUser._id.toString(),
        time_taken: 360
      },
      {
        title: 'Deforestation Alert - Kitale',
        category: 'climate',
        location: 'Kitale Forest Edge',
        latitude: 1.0190,
        longitude: 35.0000,
        description: 'Illegal clearing observed near trail',
        user_id: sampleUser._id.toString(),
        time_taken: 45
      }
    ];

    for (const s of samples) {
      const doc = new FieldData(s);
      await doc.save();
    }

    console.log('Seeding complete. Inserted sample field data and user.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
