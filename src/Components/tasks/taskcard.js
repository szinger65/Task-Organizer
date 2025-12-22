import React from 'react';
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Sparkles, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

const priorityColors = {
  low: "bg-blue-100 text-blue-700 border-blue-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-rose-100 text-rose-700 border-rose-200"
};

const priorityBorders = {
  low: "border-l-blue-400",
  medium: "border-l-amber-400",
  high: "border-l-rose-400"
};

export default function TaskCard({ task, onComplete, onEdit, onDelete }) {
  const isCompleted = task.status === 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      layout
    >
      <Card className={`p-4 border-l-4 ${priorityBorders[task.priority]} ${isCompleted ? 'bg-slate-50 opacity-60' : 'bg-white'} border border-slate-200 hover:shadow-md transition-all`}>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => !isCompleted && onComplete(task)}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold text-slate-800 ${isCompleted ? 'line-through' : ''}`}>
              {task.title}
            </h4>
            {task.description && (
              <p className="text-sm text-slate-600 mt-1">{task.description}</p>
            )}
            
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge variant="outline" className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
              
              {task.due_date && (
                <Badge variant="outline" className="text-slate-600">
                  <Calendar className="w-3 h-3 mr-1" />
                  {format(new Date(task.due_date), 'MMM d')}
                </Badge>
              )}
              
              <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200">
                <Sparkles className="w-3 h-3 mr-1" />
                {task.points} pts
              </Badge>
            </div>
          </div>

          {!isCompleted && (
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onEdit(task)}
                className="h-8 w-8 text-slate-400 hover:text-slate-600"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onDelete(task)}
                className="h-8 w-8 text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
