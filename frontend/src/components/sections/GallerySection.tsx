import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoItem } from '../../types';
import {
  Image as ImageIcon,
  MapPin,
  Calendar,
  X,
  Plus,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { romanticAudio } from '../../utils/audio';
import { triggerHeartConfetti } from '../../utils/confetti';

interface GallerySectionProps {
  photos: PhotoItem[];
  onToggleFavorite?: (id: string) => void;
  onLikePhoto?: (id: string) => void;
  onAddPhoto: (photo: PhotoItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = React.memo(({
  photos,
  onAddPhoto,
}) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New photo form state
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const activeLightboxPhoto = activeLightboxIndex !== null ? photos[activeLightboxIndex] : null;

  const handleOpenLightbox = (index: number) => {
    romanticAudio.playHeartbeat();
    setActiveLightboxIndex(index);
  };

  const handleNextPhoto = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + photos.length) % photos.length);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const newPhoto: PhotoItem = {
      id: 'photo_' + Date.now(),
      title: title.trim(),
      url: url.trim(),
      caption: caption.trim() || 'A cherished memory in our universe.',
      date: date.trim() || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      ...(location.trim() ? { location: location.trim() } : {}),
    };

    onAddPhoto(newPhoto);
    triggerHeartConfetti();
    setIsAddModalOpen(false);
    setTitle('');
    setUrl('');
    setCaption('');
    setLocation('');
    setDate('');
  };

  return (
    <section className="min-h-screen pt-28 pb-24 px-4 max-w-7xl mx-auto z-10 relative space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-luxury text-xs text-sky-300 font-medium mb-3 shadow-lg">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Celestial Memory Gallery</span>
          </div>
          <h2 className="font-serif-title text-4xl sm:text-6xl font-bold text-white tracking-wide text-glow">
            Moments Frozen In Time
          </h2>
          <p className="text-xs sm:text-sm text-slate-300/85 mt-2 font-sans-ui max-w-xl leading-relaxed">
            Every snapshot holds a story, quiet laughter, and an eternal piece of my heart.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-medium text-xs tracking-wider uppercase shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo Memory</span>
        </button>
      </div>

      {/* Masonry / Floating Photo Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => handleOpenLightbox(idx)}
            className="break-inside-avoid glass-card-luxury glass-card-hover rounded-3xl overflow-hidden cursor-pointer group relative shadow-2xl"
          >
            {/* Photo Container */}
            <div className="relative overflow-hidden aspect-4/3 sm:aspect-auto">
              <img
                src={photo.url}
                alt={photo.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Photo Caption Overlay */}
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans-ui">
                {photo.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-rose-400" />
                    {photo.date}
                  </span>
                )}
                {photo.location && photo.location.trim() !== '' && (
                  <span className="flex items-center gap-1 ml-auto">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    {photo.location}
                  </span>
                )}
              </div>

              <h3 className="font-serif-title font-bold text-lg text-white group-hover:text-rose-200 transition-colors">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-300/80 font-sans-ui line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>

              {/* Bottom Footer Note */}
              <div className="pt-3 flex items-center justify-end border-t border-white/10 text-xs">
                <span className="text-[11px] text-rose-300/80 font-signature">
                  Tap to view story ✨
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl overflow-y-auto"
            onClick={() => setActiveLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full glass-card-luxury rounded-3xl overflow-hidden shadow-2xl my-8 border border-white/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass-pill text-white hover:bg-rose-500/30 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full glass-pill text-white hover:bg-white/20 transition-all cursor-pointer hidden md:flex"
                title="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full glass-pill text-white hover:bg-white/20 transition-all cursor-pointer hidden md:flex"
                title="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Photo Display */}
                <div className="md:w-3/5 bg-slate-950/80 flex items-center justify-center p-6 min-h-[320px]">
                  <img
                    src={activeLightboxPhoto.url}
                    alt={activeLightboxPhoto.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
                  />
                </div>

                {/* Details Side Panel */}
                <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-serif-title font-bold text-2xl sm:text-3xl text-white">
                      {activeLightboxPhoto.title}
                    </h3>

                    <div className="flex flex-col gap-2 text-xs text-slate-300 font-sans-ui">
                      {activeLightboxPhoto.date && (
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-rose-400" />
                          {activeLightboxPhoto.date}
                        </span>
                      )}
                      {activeLightboxPhoto.location && activeLightboxPhoto.location.trim() !== '' && (
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-sky-400" />
                          {activeLightboxPhoto.location}
                        </span>
                      )}
                    </div>

                    <p className="font-handwriting text-2xl sm:text-3xl text-rose-100/95 leading-relaxed pt-3 border-t border-white/10">
                      "{activeLightboxPhoto.caption}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                    <span className="text-xs text-rose-300/80 font-signature">
                      Forever cherished ✨
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Photo Modal */}
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
              className="max-w-md w-full glass-card-luxury p-6 rounded-3xl shadow-2xl space-y-4 border border-white/20"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif-title font-bold text-xl text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-400" />
                  Add Photo Memory
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
                  <label className="block text-slate-300 mb-1 font-medium">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stargazing at Pine Peak"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Image URL</label>
                  <input
                    type="url"
                    required
                    placeholder="/charmi/1.jpg or https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Date (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. November 12, 2023"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full glass-input rounded-xl px-3 py-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Location (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Tulip Touch Cafe"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full glass-input rounded-xl px-3 py-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Caption / Story</label>
                  <textarea
                    rows={3}
                    placeholder="Write a sweet memory caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2 font-handwriting text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-xs"
                >
                  Save Photo Memory 📸
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
});
