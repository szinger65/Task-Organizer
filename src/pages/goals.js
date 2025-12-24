import React, { useState } from 'react';
import { api } from '../api/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Target, Plus } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import GoalForm from '../components/goals/formgoals'; 
import GoalCard from '../components/goals/goalscard';

export default function Goals() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [filter, setFilter] = useState('all');


  const { data: goals = [] } = useQuery({
    queryKey: ['goals'],
    queryFn: api.goals.list,
  });

  const { data: progressData = [] } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => api.userProgress.get('default'),
  });

  const userProgress = progressData[0] || {};

  const createGoalMutation = useMutation({
    mutationFn: (data) => api.goals.create({ ...data, progress: 0 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setShowForm(false);
    },
  });

  const updateGoalMutation = useMutation({
    mutationFn: ({ id, data }) => api.goals.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setShowForm(false);
      setEditingGoal(null);
    },
  });

  const deleteGoalMutation = useMutation({
    mutationFn: (id) => api.goals.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ goal, data }) => {
      const updatedData = { ...data };
      
      if (updatedData.progress === 100 && goal.status !== 'completed') {
        updatedData.status = 'completed';
        updatedData.completed_date = new Date().toISOString();

        const updatedProgress = {
          ...userProgress,
          total_points: (userProgress.total_points || 0) + (goal.points || 50),
          total_goals_completed: (userProgress.total_goals_completed || 0) + 1
        };

        if (userProgress._id) { 
          await api.userProgress.update(userProgress._id, updatedProgress);
        } else {
          await api.userProgress.create(updatedProgress);
        }
      }

      return api.goals.update(goal._id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    },
  });

  const handleSubmit = (data) => {
    if (editingGoal) {
      updateGoalMutation.mutate({ id: editingGoal._id, data });
    } else {
      createGoalMutation.mutate(data);
    }
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true;
    if (filter === 'active') return goal.status === 'active';
    if (filter === 'completed') return goal.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              My Goals
            </h1>
            <p className="text-slate-500">Set and track your long-term objectives</p>
          </div>
          <Button
            onClick={() => {
              setEditingGoal(null);
              setShowForm(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Goal
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger value="all">All Goals</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowForm(false);
                setEditingGoal(null);
              }}
            >
              <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl">
                <GoalForm
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingGoal(null);
                  }}
                  initialData={editingGoal}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGoals.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-2 text-center py-12"
              >
                <Target className="w-16 h-16 mx-auto mb-4 text-teal-400" />
                <p className="text-slate-500 text-lg">No goals found. Create your first goal to get started!</p>
              </motion.div>
            ) : (
              filteredGoals.map((goal) => (
                <GoalCard
                  key={goal._id} 
                  goal={goal}
                  onEdit={(g) => {
                    setEditingGoal(g);
                    setShowForm(true);
                  }}
                  onDelete={(g) => { 
                    if (window.confirm('Are you sure you want to delete this goal?')) {
                      deleteGoalMutation.mutate(g._id);
                    }
                  }}
                  onUpdateProgress={(g, data) => updateProgressMutation.mutate({ goal: g, data })}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}