import React, { useState } from 'react';
import { api } from '../api/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/Components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

import TaskForm from '../Components/tasks/formtasks';
import TaskCard from '../Components/tasks/taskcard';

export default function Tasks() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: api.tasks.list,
  });

  const { data: progressData = [] } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => api.userProgress.get('default'),
  });

  const userProgress = progressData[0] || {};

 
  const createTaskMutation = useMutation({
    mutationFn: (data) => api.tasks.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setShowForm(false);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }) => api.tasks.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setShowForm(false);
      setEditingTask(null);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id) => api.tasks.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const completeTaskMutation = useMutation({
    mutationFn: async (task) => {
      const now = new Date().toISOString();
      // MongoDB uses _id, not id
      await api.tasks.update(task._id, {
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
        ...userProgress,
        total_points: (userProgress.total_points || 0) + (task.points || 10),
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, userProgress.longest_streak || 0),
        last_activity_date: today,
        total_tasks_completed: (userProgress.total_tasks_completed || 0) + 1
      };

      if (userProgress._id) {
        await api.userProgress.update(userProgress._id, updatedProgress);
      } else {
        await api.userProgress.create(updatedProgress);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    },
  });

  const handleSubmit = (data) => {
    if (editingTask) {
      updateTaskMutation.mutate({ id: editingTask._id, data });
    } else {
      createTaskMutation.mutate(data);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              My Tasks
            </h1>
            <p className="text-slate-500">Manage your daily tasks and stay productive</p>
          </div>
          <Button
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Task
          </Button>
        </div>

        {}
        <div className="mb-6">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            >
              <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl">
                <TaskForm
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingTask(null);
                  }}
                  initialData={editingTask}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-slate-500 text-lg">No tasks found. Create your first task to get started!</p>
              </motion.div>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onComplete={(t) => completeTaskMutation.mutate(t)}
                  onEdit={(t) => {
                    setEditingTask(t);
                    setShowForm(true);
                  }}
                  onDelete={(t) => {
                    if (window.confirm('Are you sure you want to delete this task?')) {
                      deleteTaskMutation.mutate(t._id);
                    }
                  }}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}