import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AppState } from './models.js';
import { initialPiecesOfYou } from './seedData.js';

dotenv.config();

const MONGO_URI = process.env.CONNECTION_STRING || process.env.MONGO_URI || 'mongodb://localhost:27017/charms';

async function patchDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB. Patching piecesOfYou for all users...');

    const appStates = await AppState.find({});
    
    for (const state of appStates) {
      let updated = false;
      const currentPieces = state.piecesOfYou || [];
      
      for (const initialPiece of initialPiecesOfYou) {
        if (!currentPieces.find((p: any) => p.id === initialPiece.id)) {
          currentPieces.push(initialPiece);
          updated = true;
        }
      }
      
      if (updated) {
        state.piecesOfYou = currentPieces;
        await state.save();
        console.log(`Updated AppState for user ${state.userId}`);
      }
    }
    
    console.log('Successfully patched database!');
    process.exit(0);
  } catch (error) {
    console.error('Error patching database:', error);
    process.exit(1);
  }
}

patchDatabase();
