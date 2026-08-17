import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppState, User } from './models.js';
import { initialPiecesOfYou, appreciationList, initialPhotos, initialJourney, initialSongs, initialLetters } from './seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.CONNECTION_STRING || 'mongodb+srv://harsh13:Harsh1998@harshcluster.4rgtm44.mongodb.net/charms?retryWrites=true&w=majority';
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-charmi-key-123';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

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
    res.json({ token, username: user.username });
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
    res.json({ token, username: user.username });
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
