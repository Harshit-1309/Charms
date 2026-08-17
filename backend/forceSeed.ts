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

const MONGO_URI = process.env.CONNECTION_STRING || 'mongodb+srv://harsh13:Harsh1998@harshcluster.4rgtm44.mongodb.net/charms?retryWrites=true&w=majority';

async function forceSeedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB. Wiping existing data...');

    await AppState.deleteMany({});
    console.log('Cleared existing data.');

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
    console.log('Successfully seeded database with initial data including piecesOfYou!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

forceSeedDatabase();
