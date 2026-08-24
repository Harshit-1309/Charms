import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);

const ActivityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

const AppStateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  // Using Mixed types to allow seamless mapping from frontend TypeScript definitions
  // without needing to duplicate 100+ lines of strict Mongoose schemas.
  coupleConfig: { type: mongoose.Schema.Types.Mixed, default: {} },
  photos: { type: [mongoose.Schema.Types.Mixed], default: [] },
  journey: { type: [mongoose.Schema.Types.Mixed], default: [] },
  songs: { type: [mongoose.Schema.Types.Mixed], default: [] },
  letters: { type: [mongoose.Schema.Types.Mixed], default: [] },
  piecesOfYou: { type: [mongoose.Schema.Types.Mixed], default: [] },
  appreciations: { type: [mongoose.Schema.Types.Mixed], default: [] },
}, { timestamps: true });

export const AppState = mongoose.model('AppState', AppStateSchema);
