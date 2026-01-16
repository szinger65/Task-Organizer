import React from 'react';
import { api } from '../api/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const COLORS = ['#8b5cf6', '#14b8a6', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899'];

export default function Progress() {
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: api.tasks.list,
  });

  const { data: goals = [] } = useQuery({
    queryKey: ['goals'],
    queryFn: api.goals.list,
  });

  const { data: progressData = [] } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => api.userProgress.get('default'),
  });

  const userProgress = progressData[0] || {
    total_points: 0,
    total_tasks_completed: 0,
    total_goals_completed: 0,
    achievements: []
  };

  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date()
  });

  const weeklyData = last7Days.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const completed = tasks.filter(t => 
      t.completed_date && t.completed_date.startsWith(dayStr)
    ).length;
    return {
      date: format(day, 'EEE'),
      completed
    };
  });

  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length }
  ].filter(d => d.value > 0);

  const completionRate = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Progress & Analytics</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-purple-600 text-white"><CardContent className="p-6">
             <p className="text-purple-100 text-sm">Total Points</p><p className="text-4xl font-bold">{userProgress.total_points}</p>
          </CardContent></Card>
          <Card className="bg-teal-600 text-white"><CardContent className="p-6">
             <p className="text-teal-100 text-sm">Completion Rate</p><p className="text-4xl font-bold">{completionRate}%</p>
          </CardContent></Card>
          <Card className="bg-amber-500 text-white"><CardContent className="p-6">
             <p className="text-amber-100 text-sm">Tasks Done</p><p className="text-4xl font-bold">{userProgress.total_tasks_completed}</p>
          </CardContent></Card>
          <Card className="bg-rose-500 text-white"><CardContent className="p-6">
             <p className="text-rose-100 text-sm">Goals Achieved</p><p className="text-4xl font-bold">{userProgress.total_goals_completed}</p>
          </CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card><CardHeader><CardTitle>Weekly Activity</CardTitle></CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
            </CardContent></Card>

            <Card><CardHeader><CardTitle>Task Priority</CardTitle></CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={priorityData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
            </CardContent></Card>
        </div>
      </div>
    </div>
  );
}