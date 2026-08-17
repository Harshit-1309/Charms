import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JourneyMilestone } from '../../types';
import {
  Clock,
  Calendar,
  MapPin,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Heart,
  Tag,
  ZoomIn
} from 'lucide-react';
import { romanticAudio } from '../../utils/audio';
import { triggerStardustBurst } from '../../utils/confetti';

interface JourneySectionProps {
  milestones: JourneyMilestone[];
  onAddMilestone: (milestone: JourneyMilestone) => void;
}

export const JourneySection: React.FC<JourneySectionProps> = React.memo(({
  milestones,
  onAddMilestone,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(milestones[0]?.id || null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<{ url: string; title: string } | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [fullStory, setFullStory] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const toggleExpand = (id: string) => {
    romanticAudio.playHeartbeat();
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    const newMilestone: JourneyMilestone = {
      id: 'j_' + Date.now(),
      title: title.trim(),
      date: date.trim(),
      location: location.trim() || 'Our Memory Lane',
      description: description.trim() || 'A cherished chapter in our story.',
      fullStory: fullStory.trim() || description.trim() || 'A memory we will hold dear forever.',
      photoUrl: photoUrl.trim() || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    };

    onAddMilestone(newMilestone);
    triggerStardustBurst();
    setIsAddModalOpen(false);
    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
    setFullStory('');
    setPhotoUrl('');
  };

  return (
    <section className="min-h-screen pt-28 pb-24 px-4 max-w-5xl mx-auto z-10 relative space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-luxury text-xs text-amber-300 font-medium shadow-lg">
          <Clock className="w-3.5 h-3.5" />
          <span>The Sacred Timeline of Us</span>
        </div>
        <h2 className="font-serif-title text-4xl sm:text-6xl font-bold text-white tracking-wide text-glow">
          Our Journey
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/85 font-sans-ui max-w-lg mx-auto leading-relaxed">
          From that first magical glance to all the quiet adventures and milestones that built our world.
        </p>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-medium text-xs tracking-wider uppercase shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer border border-white/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Milestone</span>
        </button>
      </div>

      {/* Vertical Animated Timeline Line */}
      <div className="relative border-l-2 border-rose-500/30 ml-4 sm:ml-36 space-y-12">
        {milestones.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Glowing Timeline Node Icon */}
              <div className="absolute -left-[17px] top-2 w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-rose-500/50 border-2 border-slate-950 group-hover:scale-125 transition-transform duration-300">
                <Heart className="w-4 h-4 fill-white" />
              </div>

              {/* Date Badge on the Left (Desktop) */}
              <div className="hidden sm:block absolute -left-40 top-2 text-right w-32">
                <span className="font-serif-title font-bold text-sm text-rose-300 block">
                  {item.date}
                </span>
                <span className="text-[11px] text-slate-400 block font-sans-ui truncate">
                  {item.location}
                </span>
              </div>

              {/* Card Container */}
              <div className="glass-card-luxury glass-card-hover rounded-3xl p-6 sm:p-7 border border-white/15 space-y-4 shadow-2xl">
                
                {/* Mobile Date Header */}
                <div className="sm:hidden flex items-center justify-between text-xs text-rose-300 font-semibold mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    {item.date}
                  </span>
                  <span className="text-[10px] text-slate-400">{item.location}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-white group-hover:text-rose-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300/85 font-sans-ui leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="px-4 py-2 rounded-full glass-pill text-xs text-rose-200 hover:text-white font-medium flex items-center gap-1.5 transition-all self-end sm:self-auto shrink-0 cursor-pointer hover:border-rose-400/40"
                  >
                    <span>{isExpanded ? 'Hide Story' : 'Read Full Story'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expandable Story Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-white/10 space-y-4"
                    >
                      {item.photoUrl && (
                        <div
                          onClick={() => {
                            setActiveLightboxPhoto({ url: item.photoUrl!, title: item.title });
                            romanticAudio.playPianoNote(523.25, 0.4);
                          }}
                          className="relative group/journey-photo cursor-zoom-in w-full overflow-hidden rounded-2xl bg-black/40 border border-white/15 shadow-2xl flex items-center justify-center p-2 sm:p-3"
                        >
                          <img
                            src={item.photoUrl}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src.endsWith('.jpeg')) {
                                target.src = target.src.replace('.jpeg', '.jpg');
                              } else if (target.src.endsWith('.jpg')) {
                                target.src = target.src.replace('.jpg', '.jpeg');
                              }
                            }}
                            className="w-auto h-auto max-h-[460px] sm:max-h-[560px] max-w-full object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover/journey-photo:scale-[1.01]"
                          />

                          {/* Hover Zoom Hint */}
                          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/journey-photo:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span className="px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-sans-ui flex items-center gap-1.5 backdrop-blur-md shadow-lg border border-white/20">
                              <ZoomIn className="w-3.5 h-3.5 text-amber-300" /> Click to view full image
                            </span>
                          </div>
                        </div>
                      )}

                      <p className="font-handwriting text-2xl sm:text-3xl text-rose-100/95 leading-relaxed bg-slate-950/70 p-6 rounded-2xl border border-rose-500/30 shadow-inner">
                        "{item.fullStory}"
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <MapPin className="w-4 h-4 text-sky-400" />
                        <span><strong className="text-slate-200">{item.location}</strong></span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Milestone Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full glass-card-luxury p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif-title font-bold text-xl text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Add Journey Milestone
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Milestone Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Moving Into Our First Home"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. March 15, 2024"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Central Park, New York"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Short Summary</label>
                  <input
                    type="text"
                    placeholder="Brief 1-sentence recap..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Full Story</label>
                  <textarea
                    rows={3}
                    placeholder="Write the full romantic story behind this day..."
                    value={fullStory}
                    onChange={(e) => setFullStory(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2 font-handwriting text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-xs"
                >
                  Save Milestone ✨
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen High-Res Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-slate-900/95 border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col items-center cursor-default space-y-3"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="text-white font-serif-title font-bold text-base sm:text-lg pr-8 truncate max-w-full">
                {activeLightboxPhoto.title}
              </div>

              {/* Full Image */}
              <div className="w-full max-h-[75vh] overflow-hidden rounded-2xl bg-black/50 flex items-center justify-center border border-white/10">
                <img
                  src={activeLightboxPhoto.url}
                  alt={activeLightboxPhoto.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('.jpeg')) {
                      target.src = target.src.replace('.jpeg', '.jpg');
                    } else if (target.src.endsWith('.jpg')) {
                      target.src = target.src.replace('.jpg', '.jpeg');
                    }
                  }}
                  className="w-auto h-auto max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
});
