import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { motion } from "framer-motion";
import { ChevronRight, Target } from "lucide-react";

const categoryColors = {
  health: "from-green-400 to-emerald-600",
  career: "from-blue-400 to-indigo-600",
  education: "from-purple-400 to-violet-600",
  personal: "from-pink-400 to-rose-600",
  financial: "from-amber-400 to-orange-600",
  relationships: "from-red-400 to-pink-600"
};

export default function ActiveGoals({ goals, onViewAll }) {
  const activeGoals = goals.filter(g => g.status === 'active').slice(0, 3);

  return (
    <Card className="bg-white border border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-bold text-slate-900">
          Active Goals
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
        {activeGoals.length === 0 ? (
          <div className="text-center py-8">
            <Target className="w-12 h-12 mx-auto mb-3 text-teal-400" />
            <p className="text-slate-500">No active goals. Start setting some!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeGoals.map((goal, idx) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{goal.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 capitalize">{goal.category}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[goal.category]} text-white text-xs font-bold`}>
                    {goal.progress}%
                  </div>
                </div>
                <Progress value={goal.progress} className="h-2" />
                {goal.milestones && goal.milestones.length > 0 && (
                  <p className="text-xs text-slate-500 mt-2">
                    {goal.milestones.filter(m => m.completed).length} / {goal.milestones.length} milestones
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
