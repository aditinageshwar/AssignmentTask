import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const breakingNews = [
  "BREAKING: AI Revolution continues with GPT-5 announcement",
  "Markets rally as Fed signals potential rate cuts",
  "NASA announces Artemis III crew for historic Moon mission",
  "Tech stocks surge amid positive earnings reports",
  "Global markets react to central bank decisions"
];

export default function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-accent/90 text-accent-foreground py-3 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <AlertCircle size={20} className="animate-pulse" />
          <span className="font-bold text-sm uppercase tracking-wider hidden sm:inline">Breaking</span>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base font-medium"
          >
            {breakingNews[currentIndex]}
          </motion.div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {breakingNews.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
