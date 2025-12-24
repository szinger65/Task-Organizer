import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card } from "../components/ui/card";
import { X, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function GoalForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    category: 'personal',
    target_date: '',
    points: 50,
    milestones: []
  });

  const [newMilestone, setNewMilestone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addMilestone = () => {
    if (newMilestone.trim()) {
      setFormData({
        ...formData,
        milestones: [...(formData.milestones || []), { title: newMilestone, completed: false }]
      });
      setNewMilestone('');
    }
  };

  const removeMilestone = (index) => {
    setFormData({
      ...formData,
      milestones: formData.milestones.filter((_, i) => i !== index)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card className="p-6 bg-white border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">
            {initialData ? 'Edit Goal' : 'Create New Goal'}
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="What do you want to achieve?"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your goal in detail..."
              className="mt-1 h-24"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="relationships">Relationships</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="target_date">Target Date</Label>
              <Input
                id="target_date"
                type="date"
                value={formData.target_date}
                onChange={(e) => setFormData({...formData, target_date: e.target.value})}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="points">Points Reward</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={formData.points}
                onChange={(e) => setFormData({...formData, points: parseInt(e.target.value)})}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label>Milestones</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                placeholder="Add a milestone..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMilestone())}
              />
              <Button type="button" onClick={addMilestone} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.milestones && formData.milestones.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-sm">{milestone.title}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMilestone(idx)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4 text-rose-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {initialData ? 'Update Goal' : 'Create Goal'}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
