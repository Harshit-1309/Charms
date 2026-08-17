import React from 'react';
import { motion } from 'framer-motion';
import { PieceOfYouItem } from '../../types';
import { Sparkles, Heart } from 'lucide-react';

interface PiecesOfYouSectionProps {
  pieces: PieceOfYouItem[];
}

export const PiecesOfYouSection: React.FC<PiecesOfYouSectionProps> = React.memo(({ pieces }) => {
  return (
    <section className="min-h-screen pt-28 pb-24 px-4 max-w-7xl mx-auto z-10 relative space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-luxury text-xs text-rose-300 font-medium mb-3 shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Chaaru Aesthetic</span>
          </div>
          <h2 className="font-serif-title text-4xl sm:text-6xl font-bold text-white tracking-wide text-glow">
            Pieces of You
          </h2>
          <p className="text-xs sm:text-sm text-slate-300/85 mt-2 font-sans-ui max-w-lg leading-relaxed">
            A chaotic, beautiful, and perfect collection of all the little things that make you, you. No context needed.
          </p>
        </div>
      </div>

      {/* Masonry-like Grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {pieces.map((piece, index) => (
          <motion.div
            key={piece.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
            className="relative group break-inside-avoid"
          >
            <div className="glass-card-luxury p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-rose-400/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-rose-500/20">
              <div className="relative w-full rounded-xl overflow-hidden aspect-[4/5] bg-slate-900/50">
                <img
                  src={piece.photoUrl}
                  alt={piece.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <h3 className="font-serif-title font-bold text-white text-lg sm:text-xl text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {piece.title}
                  </h3>
                </div>

                {/* Floating Heart Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <div className="p-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-rose-400">
                    <Heart className="w-4 h-4 fill-rose-400/30" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
});
