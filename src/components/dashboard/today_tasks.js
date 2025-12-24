import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { format, isToday } from "date-fns";

const priorityColors = {
  low: "border-l-blue-400",
  medium: "border-l-amber-400",
  high: "border-l-rose-400"
};

export default function TodaysTasks({ tasks, onComplete, onViewAll }) {
  const todaysTasks = tasks.filter(task => 
    task.status === 'pending' && 
    (!task.due_date || isToday(new Date(task.due_date)) || new Date(task.due_date) < new Date())
  ).slice(0, 5);

  return (
    <Card className="bg-white border border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-bold text-slate-900">
          Today's Focus
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onViewAll}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="popLayout">
          {todaysTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-amber-400" />
              <p className="text-slate-500">All caught up! Great job! 🎉</p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              {todaysTasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-start gap-3 p-3 rounded-xl border-l-4 ${priorityColors[task.priority]} bg-slate-50 hover:bg-slate-100 transition-colors`}
                >
                  <Checkbox
                    checked={false}
                    onCheckedChange={() => onComplete(task)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800">{task.title}</p>
                    {task.description && (
                      <p className="text-sm text-slate-500 mt-1 line-clamp-1">{task.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold bg-amber-50 px-2 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    {task.points}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
