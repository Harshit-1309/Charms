import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models.js';

dotenv.config();

const MONGO_URI = process.env.CONNECTION_STRING || process.env.MONGO_URI || 'mongodb://localhost:27017/charms';

async function makeAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.error('Usage: npm run make-admin <user-email>');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User with email ${email} not found.`);
      process.exit(1);
    }

    user.isAdmin = true;
    await user.save();
    
    console.log(`Success: Granted admin privileges to ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error making user admin:', error);
    process.exit(1);
  }
}

makeAdmin();
