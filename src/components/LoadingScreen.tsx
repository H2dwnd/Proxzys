import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const defaultLines = [
  "system.init()...",
  "loading core modules...",
  "establishing secure connection...",
  "connecting...",
  "connected.",
  "access granted."
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    // Random total duration between 3 to 5 seconds
    const totalDuration = Math.random() * 2000 + 3000;
    const intervalTime = totalDuration / (defaultLines.length + 1);

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < defaultLines.length) {
        setLines(prev => [...prev, defaultLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-[#060606] flex flex-col justify-end p-8 md:p-12 font-mono"
    >
      <div className="flex flex-col gap-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/70 text-sm md:text-base flex items-center gap-3"
          >
            <span className="text-white/30">{'>'}</span>
            <span>{line}</span>
          </motion.div>
        ))}
        {lines.length < defaultLines.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2.5 h-4 bg-white/70 ml-5 mt-2"
          />
        )}
      </div>
    </motion.div>
  );
}
