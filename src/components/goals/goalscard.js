import React from 'react';
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Checkbox } from "../components/ui/checkbox";
import { motion } from "framer-motion";
import { Calendar, Target, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const categoryColors = {
  health: "from-green-400 to-emerald-600",
  career: "from-blue-400 to-indigo-600",
  education: "from-purple-400 to-violet-600",
  personal: "from-pink-400 to-rose-600",
  financial: "from-amber-400 to-orange-600",
  relationships: "from-red-400 to-pink-600"
};

const categoryBg = {
  health: "border-green-200",
  career: "border-blue-200",
  education: "border-purple-200",
  personal: "border-pink-200",
  financial: "border-amber-200",
  relationships: "border-red-200"
};

export default function GoalCard({ goal, onEdit, onDelete, onUpdateProgress }) {
  const isCompleted = goal.status === 'completed';

  const handleMilestoneToggle = (milestoneIndex, completed) => {
    const updatedMilestones = [...goal.milestones];
    updatedMilestones[milestoneIndex] = {
      ...updatedMilestones[milestoneIndex],
      completed,
      completed_date: completed ? new Date().toISOString() : null
    };
    
    const completedCount = updatedMilestones.filter(m => m.completed).length;
    const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
    
    onUpdateProgress(goal, { milestones: updatedMilestones, progress: newProgress });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <Card className={`p-6 bg-white border-2 ${categoryBg[goal.category].replace('bg-', 'border-')} hover:shadow-lg transition-all ${isCompleted ? 'opacity-75' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-xl font-bold text-slate-800 ${isCompleted ? 'line-through' : ''}`}>
                {goal.title}
              </h3>
              {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-600" />}
            </div>
            {goal.description && (
              <p className="text-sm text-slate-600">{goal.description}</p>
            )}
          </div>
          
          {!isCompleted && (
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onEdit(goal)}
                className="h-8 w-8"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onDelete(goal)}
                className="h-8 w-8 text-rose-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge className={`bg-gradient-to-r ${categoryColors[goal.category]} text-white border-none capitalize`}>
              {goal.category}
            </Badge>
            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[goal.category]} text-white text-sm font-bold`}>
              {goal.progress || 0}%
            </div>
          </div>

          <Progress value={goal.progress || 0} className="h-2" />

          {goal.target_date && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Target: {format(new Date(goal.target_date), 'MMM d, yyyy')}</span>
            </div>
          )}

          {goal.milestones && goal.milestones.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-semibold text-slate-700">Milestones</span>
              </div>
              <div className="space-y-2">
                {goal.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Checkbox
                      checked={milestone.completed}
                      onCheckedChange={(checked) => handleMilestoneToggle(idx, checked)}
                      disabled={isCompleted}
                      className="mt-0.5"
                    />
                    <span className={milestone.completed ? 'line-through text-slate-500' : 'text-slate-700'}>
                      {milestone.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
