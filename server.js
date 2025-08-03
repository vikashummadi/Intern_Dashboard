const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection (using local MongoDB or MongoDB Atlas)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/intern-dashboard';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Intern Schema
const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, required: true, unique: true },
  donationsRaised: { type: Number, default: 0 },
  rewards: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const Intern = mongoose.model('Intern', internSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/interns', async (req, res) => {
  try {
    const interns = await Intern.find().select('-password');
    res.json(interns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interns', error: error.message });
  }
});

app.get('/api/intern/:id', async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id).select('-password');
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }
    res.json(intern);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching intern', error: error.message });
  }
});

app.post('/api/interns', async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;
    
    // Check if intern already exists
    const existingIntern = await Intern.findOne({ email });
    if (existingIntern) {
      return res.status(400).json({ message: 'Intern already exists' });
    }

    const intern = new Intern({
      name,
      email,
      password, // In production, hash this password
      referralCode,
      donationsRaised: Math.floor(Math.random() * 1000) + 100, // Random amount for demo
      rewards: ['Bronze Badge', 'Silver Badge', 'Gold Badge']
    });

    await intern.save();
    res.status(201).json({ message: 'Intern created successfully', intern: { id: intern._id, name: intern.name, email: intern.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error creating intern', error: error.message });
  }
});

// Dummy data endpoint for demo
app.get('/api/demo-data', (req, res) => {
  const demoData = {
    name: "John Doe",
    referralCode: "johndoe2025",
    donationsRaised: 1250,
    rewards: ["Bronze Badge", "Silver Badge", "Gold Badge", "Platinum Badge"]
  };
  res.json(demoData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the dashboard`);
}); 