import React from 'react';
import { Card } from "../components/ui/card";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function StreakCounter({ currentStreak, longestStreak }) {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-none shadow-lg overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Flame className="w-8 h-8" />
          </motion.div>
          <h3 className="text-lg font-bold">Your Streak</h3>
        </div>
        <div className="flex items-end gap-6">
          <div>
            <p className="text-5xl font-bold">{currentStreak}</p>
            <p className="text-sm opacity-90 mt-1">Days Current</p>
          </div>
          <div className="pb-1">
            <p className="text-2xl font-semibold">{longestStreak}</p>
            <p className="text-xs opacity-75">Best Streak</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
