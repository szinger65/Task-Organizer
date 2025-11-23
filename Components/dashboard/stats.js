import React from 'react';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatsCard({ icon: Icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium mb-2">{label}</p>
            <p className="text-3xl font-bold text-slate-900">
              {value}
            </p>
          </div>
          <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
