import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppState, User, ActivityLog } from './models.js';
import { initialPiecesOfYou, appreciationList, initialPhotos, initialJourney, initialSongs, initialLetters } from './seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.CONNECTION_STRING || process.env.MONGO_URI || 'mongodb://localhost:27017/charms';
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-charmi-key-123';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve static frontend files from the dist directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Auth Middleware
interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const adminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Forbidden: Admins only' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error verifying admin status' });
  }
};

// Signup Route
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ error: 'Email is already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    // Initialize default AppState for this user
    const appState = new AppState({
      userId: user._id,
      coupleConfig: {
        partner1Name: 'Harshit',
        partner2Name: 'Charmi',
        startDate: '2024-02-14T00:00:00.000Z',
        customQuote: 'Written in the stars, bound by the heart.',
        isProposalAccepted: false,
        anniversaryTitle: 'Our Journey',
        secretMessage: 'A beautiful journey begins.',
        partner2PhotoUrl: '/charmi/1.jpg',
      },
      photos: initialPhotos,
      journey: initialJourney,
      songs: initialSongs,
      letters: initialLetters,
      piecesOfYou: initialPiecesOfYou,
      appreciations: appreciationList
    });
    await appState.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: user.username, isAdmin: user.isAdmin });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: user.username, isAdmin: user.isAdmin });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// Get user's app data
app.get('/api/data', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    let data = await AppState.findOne({ userId: req.userId });
    if (!data) {
      return res.json({});
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Update user's app data
app.post('/api/data', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    let data = await AppState.findOne({ userId: req.userId });
    if (!data) {
      data = new AppState({ ...req.body, userId: req.userId });
    } else {
      Object.assign(data, req.body);
    }
    await data.save();
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// --- Activity Tracking & Admin Routes ---

// Log an activity
app.post('/api/activity/log', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { action, details } = req.body;
    if (!action) return res.status(400).json({ error: 'Action is required' });

    const logEntry = new ActivityLog({
      userId: req.userId,
      action,
      details: details || {}
    });
    
    await logEntry.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Error logging activity:', err);
    res.status(500).json({ error: 'Failed to log activity' });
  }
});

// Admin: Get all users
app.get('/api/admin/users', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Admin: Get specific user activity log
app.get('/api/admin/activity/:targetUserId', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const activities = await ActivityLog.find({ userId: req.params.targetUserId }).sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    console.error('Error fetching activity log:', err);
    res.status(500).json({ error: 'Failed to fetch activity log' });
  }
});

// Catch-all route to serve the frontend's index.html for any unhandled paths (React Router fallback)
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
