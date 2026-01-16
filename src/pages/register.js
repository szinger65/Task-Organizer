import React, { useState } from 'react';
import { api } from '../api/client';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const[errr, setErrr] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    let pswrd = formData.password;
    let array = pswrd.split();
    for (let i = 0; i <= formData.password.length; i++ ) {
        if (array[i] !== '!') {
          setErrr("You must have a character in your password");
        }
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match, please try again");
      return;
    }

    try {
      const data = await api.auth.register({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password
      });
    
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Registration failed. Try again.";
      setError(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <form onSubmit={handleRegister} className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Create an Account</h1>
          <p className="text-slate-500 text-sm">Join TickedOff to track your progress</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input 
            id="full_name"
            name="full_name" 
            placeholder="John Doe" 
            required
            value={formData.full_name} 
            onChange={handleChange} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            name="email" 
            type="email" 
            placeholder="john@example.com" 
            required
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password"
            name="password" 
            type="password" 
            placeholder="••••••••" 
            required
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>

        {errr && (
          <div className="text-center text-sm mt-4 text-red-600">
            {errr}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword"
            name="confirmPassword" 
            type="password" 
            placeholder="••••••••" 
            required
            value={formData.confirmPassword} 
            onChange={handleChange} 
          />
        </div>

        {error && (
          <div className="text-center text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Sign Up
        </Button>

        <div className="text-center mt-4 text-sm">
          <span className="text-slate-500">Already have an account? </span>
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}