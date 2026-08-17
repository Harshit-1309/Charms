import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CoupleConfig } from '../../types';
import { X, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { triggerHeartConfetti } from '../../utils/confetti';
import { romanticAudio } from '../../utils/audio';

interface CoupleCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupleConfig: CoupleConfig;
  onSave: (config: CoupleConfig) => void;
}

export const CoupleCustomizerModal: React.FC<CoupleCustomizerModalProps> = React.memo(({
  isOpen,
  onClose,
  coupleConfig,
  onSave,
}) => {
  const [partner2PhotoUrl, setPartner2PhotoUrl] = useState(
    coupleConfig.partner2PhotoUrl || '/charmi/1.jpg'
  );

  if (!isOpen) return null;

  const quickPhotos = [
    { url: '/charmi/1.jpg', label: 'Photo 1' },
    { url: '/charmi/2.jpg', label: 'Photo 2' },
    { url: '/charmi/3.jpg', label: 'Photo 3' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...coupleConfig,
      partner2PhotoUrl: partner2PhotoUrl.trim() || '/charmi/1.jpg',
    });
    romanticAudio.playHeartbeat();
    triggerHeartConfetti();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-md w-full glass-card-luxury p-7 rounded-3xl border border-white/20 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5 text-white font-serif-title font-bold text-lg">
            <ImageIcon className="w-5 h-5 text-rose-400" />
            <span>Update Portrait Photo</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* Circular Photo Selection */}
          <div className="space-y-3">
            <label className="block text-slate-300 font-medium text-center text-xs">
              Select Main Portrait Photo (Landing Hero)
            </label>
            <div className="flex items-center justify-center gap-4 py-2">
              {quickPhotos.map((photo, idx) => {
                const isSelected = partner2PhotoUrl === photo.url;
                return (
                  <button
                    key={photo.url}
                    type="button"
                    onClick={() => setPartner2PhotoUrl(photo.url)}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div
                      className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-rose-400 ring-4 ring-rose-500/50 scale-105 shadow-xl shadow-rose-500/30'
                          : 'border-white/25 opacity-70 group-hover:opacity-100 group-hover:scale-105'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-rose-500/25 flex items-center justify-center">
                          <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center shadow-lg">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-medium transition-colors ${
                        isSelected ? 'text-rose-300 font-semibold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {photo.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Path/URL Input */}
          <div className="space-y-1.5">
            <label className="block text-slate-300 font-medium text-[11px]">
              Or enter custom photo path / URL
            </label>
            <input
              type="text"
              value={partner2PhotoUrl}
              onChange={(e) => setPartner2PhotoUrl(e.target.value)}
              placeholder="e.g. /charmi/1.jpg or web image URL"
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-white text-xs"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
          >
            <Check className="w-4 h-4" />
            <span>Save Portrait Photo</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
});
