export type SectionId = 
  | 'landing'
  | 'planets'
  | 'about'
  | 'gallery'
  | 'journey'
  | 'songs'
  | 'letters'
  | 'pieces'
  | 'proposal'
  | 'forever'
  | 'admin';

export interface CoupleConfig {
  partner1Name: string;
  partner2Name: string;
  startDate: string; // ISO format e.g. "2023-10-14"
  customQuote: string;
  isProposalAccepted: boolean;
  proposalAcceptedAt?: string;
  anniversaryTitle: string;
  secretMessage: string;
  partner2PhotoUrl?: string;
  rotatingQuotes?: string[];
}

export interface PhotoItem {
  id: string;
  title: string;
  url: string;
  caption: string;
  date?: string;
  location?: string;
  category?: string;
  likes?: number;
  isFavorite?: boolean;
  audioNoteText?: string;
}

export interface JourneyMilestone {
  id: string;
  title: string;
  date?: string;
  location?: string;
  description: string;
  fullStory: string;
  photoUrl: string;
  videoPreviewUrl?: string;
  audioStoryTitle?: string;
}

export interface LyricLine {
  time: number; // in seconds
  text: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  synthMelodyKey: string; // Key for synthesized audio generator
  audioUrl?: string; // Path to real audio file (.mp3, .wav)
  lyrics: LyricLine[];
  feelingNote: string;
}

export interface LoveLetter {
  id: string;
  title: string;
  date: string;
  sender: string;
  isOpenWhen: string;
  content: string;
  waxSealColor: 'rose' | 'gold' | 'emerald' | 'violet' | 'ruby';
  isRead: boolean;
  customWritten?: boolean;
}

export interface PieceOfYouItem {
  id: string;
  title: string;
  photoUrl: string;
  category?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export type AppreciationCategory =
  | 'Little Things'
  | 'Favorite Memories'
  | 'Quiet Moments'
  | "Reasons I'd Choose You Again"
  | 'Things I Never Told You'
  | 'The Magic You Bring Into My Life'
  | 'Sweet'
  | 'Deep'
  | 'Playful'
  | 'Grateful'
  | 'Personality'
  | 'Quirks'
  | 'Memories';

export interface AppreciationItem {
  id: string;
  title?: string;
  text: string;
  category?: AppreciationCategory;
  emoji?: string;
  photoUrl?: string;
  date?: string;
  location?: string;
  voiceNoteText?: string;
  isGoldenCard?: boolean;
  unlockThreshold?: number; // Number of cards that must be opened to unlock
  isFavorite?: boolean;
}

export interface ConstellationItem {
  id: string;
  name: string;
  quote: string;
  description: string;
  coordinates: { x: number; y: number }[];
}

export interface DateNightIdea {
  id: string;
  title: string;
  category: 'Cozy Night In' | 'Outdoor Adventure' | 'Romantic Dinner' | 'Spontaneous Fun' | 'Relaxation' | 'Sweet & Simple' | 'Creative Fun';
  description: string;
  setupTime: string;
}
