import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles, Image, Mic, MapPin, Calendar } from 'lucide-react';
import { AppreciationItem, AppreciationCategory } from '../../types';
import { triggerHeartConfetti } from '../../utils/confetti';
import { romanticAudio } from '../../utils/audio';

interface WriteMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: AppreciationItem) => void;
}

export const WriteMemoryModal: React.FC<WriteMemoryModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState<AppreciationCategory>('Little Things');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [voiceNoteText, setVoiceNoteText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newItem: AppreciationItem = {
      id: 'app_' + Date.now(),
      title: title.trim() || 'A Reason From My Heart',
      text: text.trim(),
      category,
      emoji: category === 'Little Things' ? '🌸' : category === 'Quiet Moments' ? '🕊️' : category === 'Favorite Memories' ? '🌌' : '💖',
      location: location.trim() || undefined,
      date: date.trim() || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      photoUrl: photoUrl.trim() || undefined,
      voiceNoteText: voiceNoteText.trim() || undefined
    };

    onAdd(newItem);
    romanticAudio.playEnvelopeOpen();
    triggerHeartConfetti();

    // Reset fields
    setTitle('');
    setText('');
    setLocation('');
    setDate('');
    setPhotoUrl('');
    setVoiceNoteText('');
    onClose();
  };

  const categories: AppreciationCategory[] = [
    'Little Things',
    'Favorite Memories',
    'Quiet Moments',
    "Reasons I'd Choose You Again",
    'Things I Never Told You',
    'The Magic You Bring Into My Life'
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-lg w-full glass-card-luxury p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 border border-white/20 max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300">
                <Heart className="w-5 h-5 fill-rose-400" />
              </div>
              <div>
                <h3 className="font-serif-title font-bold text-xl text-white">
                  Add to Our Scrapbook of Love
                </h3>
                <p className="text-xs text-slate-300/80">
                  Write a new memory or appreciation into our universe
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Category Select */}
            <div>
              <label className="block text-slate-300 mb-1.5 font-medium">Scrapbook Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AppreciationCategory)}
                className="w-full glass-input rounded-xl px-3 py-2.5 bg-slate-900/90 text-slate-200 border border-white/15"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Memory Title (e.g. 'The Way You Smile')</label>
              <input
                type="text"
                placeholder="Give this memory or reason a poetic title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-white font-medium"
              />
            </div>

            {/* Letter Text */}
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Handwritten Love Note</label>
              <textarea
                rows={4}
                required
                placeholder="Write your heartfelt memory, confession, or why you love them..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2.5 font-handwriting text-xl text-rose-100 placeholder:text-slate-500"
              />
            </div>

            {/* Date & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" /> Date (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. October 14, 2023"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" /> Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Corner Bookstore Café"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-slate-300 mb-1 font-medium flex items-center gap-1">
                <Image className="w-3.5 h-3.5 text-sky-400" /> Polaroid Photo URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-white"
              />
            </div>

            {/* Voice Note Text */}
            <div>
              <label className="block text-slate-300 mb-1 font-medium flex items-center gap-1">
                <Mic className="w-3.5 h-3.5 text-purple-400" /> Spoken Voice Note Quote (Optional)
              </label>
              <input
                type="text"
                placeholder="Short whisper or message to be spoken aloud..."
                value={voiceNoteText}
                onChange={(e) => setVoiceNoteText(e.target.value)}
                className="w-full glass-input rounded-xl px-3 py-2 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Preserve in Scrapbook 💖</span>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
