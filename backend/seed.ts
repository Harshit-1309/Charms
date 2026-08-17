import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AppState } from './models.js';
import {
  initialCoupleConfig,
  initialPhotos,
  initialJourney,
  initialSongs,
  initialLetters,
  initialPiecesOfYou,
  appreciationList
} from './seedData.js';

dotenv.config();

const MONGO_URI = process.env.CONNECTION_STRING || process.env.MONGO_URI || 'mongodb://localhost:27017/charms';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    const existingData = await AppState.findOne();
    if (existingData) {
      console.log('Database already contains data. Skipping seed.');
      process.exit(0);
    }

    const seedData = new AppState({
      coupleConfig: initialCoupleConfig,
      photos: initialPhotos,
      journey: initialJourney,
      songs: initialSongs,
      letters: initialLetters,
      piecesOfYou: initialPiecesOfYou,
      appreciations: appreciationList
    });

    await seedData.save();
    console.log('Successfully seeded database with initial data!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
