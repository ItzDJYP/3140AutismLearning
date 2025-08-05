// server/app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.json()); // parse JSON bodies

// Serve static files from the client folder (unchanged from your version)
app.use(express.static(path.join(__dirname, '../client')));

// --- Database connection ---
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI in .env');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}
connectDB();

// --- Sessions (stored in MongoDB) ---
app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60 * 60 * 24 * 7 // 7 days
    }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set to true if you serve over HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

// --- Auth helpers ---
function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
  next();
}

// --- API Routes ---

// Sign up (Parent + Child)
app.post('/api/signup', async (req, res) => {
  try {
    const { parentName, childName, email, password } = req.body;
    if (!parentName || !childName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      parentName,
      childName,
      email,
      password: hashed
    });

    // Optionally auto-login after signup:
    req.session.user = { id: user._id, parentName: user.parentName, childName: user.childName, email: user.email };

    res.json({ message: 'Signup successful', user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error during signup', error: err.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    req.session.user = { id: user._id, parentName: user.parentName, childName: user.childName, email: user.email };

    res.json({ message: 'Login successful', user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error during login', error: err.message });
  }
});

// Get current session user
app.get('/api/me', (req, res) => {
  res.json({ user: req.session.user || null });
});

// Example of a protected route
app.get('/api/profile', requireAuth, (req, res) => {
  res.json({ profile: req.session.user });
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('sid');
    res.json({ message: 'Logged out' });
  });
});

// --- Root route (unchanged from your version) ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// --- Start server ---
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
