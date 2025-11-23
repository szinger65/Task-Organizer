import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Plus, Target, CheckCircle, TrendingUp, Award } from 'lucide-react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

import StatsCard from '../components/dashboard/StatsCard';
import TodaysTasks from '../components/dashboard/TodaysTasks';
import ActiveGoals from '../components/dashboard/ActiveGoals';
import StreakCounter from '../components/StreakCounter';

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => base44.entities.Task.list('-created_date', 100),
  });

  const { data: goals = [], isLoading: goalsLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: () => base44.entities.Goal.list('-created_date', 100),
  });

  const { data: progressData = [] } = useQuery({
    queryKey: ['userProgress', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      return base44.entities.UserProgress.filter({ created_by: user.email });
    },
    enabled: !!user?.email,
  });

  const userProgress = progressData[0] || {
    total_points: 0,
    current_streak: 0,
    longest_streak: 0,
    total_tasks_completed: 0,
    total_goals_completed: 0
  };

  const completeTaskMutation = useMutation({
    mutationFn: async (task) => {
      const now = new Date().toISOString();
      await base44.entities.Task.update(task.id, {
        status: 'completed',
        completed_date: now
      });

      const today = new Date().toISOString().split('T')[0];
      const lastActivity = userProgress.last_activity_date;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      let newStreak = userProgress.current_streak || 0;
      if (lastActivity === yesterday) {
        newStreak += 1;
      } else if (lastActivity !== today) {
        newStreak = 1;
      }

      const updatedProgress = {
        total_points: (userProgress.total_points || 0) + (task.points || 10),
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, userProgress.longest_streak || 0),
        last_activity_date: today,
        total_tasks_completed: (userProgress.total_tasks_completed || 0) + 1
      };

      if (progressData.length > 0) {
        await base44.entities.UserProgress.update(progressData[0].id, updatedProgress);
      } else {
        await base44.entities.UserProgress.create(updatedProgress);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    },
  });

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const activeGoals = goals.filter(g => g.status === 'active');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-slate-500">Let's make today productive and achieve your goals.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={CheckCircle}
            label="Tasks Completed"
            value={userProgress.total_tasks_completed || 0}
            color="bg-green-500"
            delay={0}
          />
          <StatsCard
            icon={Target}
            label="Active Goals"
            value={activeGoals.length}
            color="bg-blue-500"
            delay={0.1}
          />
          <StatsCard
            icon={TrendingUp}
            label="Total Points"
            value={userProgress.total_points || 0}
            color="bg-amber-500"
            delay={0.2}
          />
          <StatsCard
            icon={Award}
            label="Achievements"
            value={userProgress.achievements?.length || 0}
            color="bg-purple-500"
            delay={0.3}
          />
        </div>

        {/* Streak Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <StreakCounter
            currentStreak={userProgress.current_streak || 0}
            longestStreak={userProgress.longest_streak || 0}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <TodaysTasks
              tasks={pendingTasks}
              onComplete={(task) => completeTaskMutation.mutate(task)}
              onViewAll={() => navigate(createPageUrl('Tasks'))}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ActiveGoals
              goals={goals}
              onViewAll={() => navigate(createPageUrl('Goals'))}
            />
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Button
            onClick={() => navigate(createPageUrl('Tasks'))}
            className="bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Task
          </Button>
          <Button
            onClick={() => navigate(createPageUrl('Goals'))}
            className="bg-indigo-600 hover:bg-indigo-700"
            size="lg"
          >
            <Target className="w-5 h-5 mr-2" />
            New Goal
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
