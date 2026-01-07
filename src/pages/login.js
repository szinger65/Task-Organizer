import React, { useState } from 'react';
import { api } from '../api/client';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import SplitText from '../components/ui/splittext';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await api.auth.login({ email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/dashboard');
    } catch (err) {
      alert("Login failed. Check your email and password.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
      <div className="mb-10 text-center">
        <SplitText 
          text="TickedOff" 
          className="text-8xl font-extrabold text-slate-900 tracking-tighter" 
          delay={200}
        />
        <p className="text-slate-500 mt-3 text-lg">Master your day, conquer your goals.</p>
      </div>
      <form onSubmit={handleLogin} className="p-8 bg-white rounded-xl shadow-lg w-96 space-y-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-slate-900">Login</h1>
          <p className="text-slate-500 text-sm">Welcome back to TickedOff</p>
        </div>

        <Input 
          placeholder="Email" 
          type="email"
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required
        />
        
        <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
          Sign In
        </Button>

        {}
        <div className="text-center mt-4 text-sm">
          <span className="text-slate-500">Don't have an account? </span>
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </form>
      <div>
        <Link to="/about" className="text-blue-600 font-semibold hover:underline">
          About TickedOff
        </Link>
      </div>
    </div>
  );
}