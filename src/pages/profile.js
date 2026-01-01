import React, { useState, useEffect } from 'react';
import { api, apiClient } from '../api/client';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { UserCircle } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({ name: '', email: '', profile_picture: '' });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, profile_picture: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiClient.put('/profile', {
        full_name: user.name,
        email: user.email,
        profile_picture: user.profile_picture,
        password: password || undefined
      });

      localStorage.setItem('user', JSON.stringify(res.data));
      alert("Profile updated!");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Profile Settings</h1>
      
      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 rounded-xl border border-slate-200">
        
        {}
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
            {user.profile_picture ? (
              <img src={user.profile_picture} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <UserCircle className="h-16 w-16 text-slate-300" />
            )}
          </div>
          <div>
            <Label htmlFor="picture" className="cursor-pointer bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Change Picture
            </Label>
            <Input 
              id="picture" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />
            <p className="text-xs text-slate-500 mt-2">Max size 5MB.</p>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Full Name</Label>
          <Input 
            value={user.name || ''} 
            onChange={(e) => setUser({...user, name: e.target.value})} 
          />
        </div>

        <div className="grid gap-2">
          <Label>Email</Label>
          <Input 
            value={user.email || ''} 
            onChange={(e) => setUser({...user, email: e.target.value})} 
          />
        </div>

        <div className="grid gap-2">
          <Label>New Password (Optional)</Label>
          <Input 
            type="password" 
            placeholder="Leave blank to keep current"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <Button type="submit" className="bg-black hover:bg-gray-800 text-white" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}