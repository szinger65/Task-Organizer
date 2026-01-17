import React, { useState } from 'react';
import { api } from '../api/client';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import SplitText from '../components/ui/splittext';

import LiquidEther from '../components/ui/liquidether';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api.auth.login({ email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/dashboard');
    } catch (err) {
      setError("Login failed. Check your email and password.");
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset -0 z-0">
        <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center">
      <div className="mb-10 text-center text-white-600">
        <SplitText 
          text="TickedOff" 
          className="text-8xl font-extrabold text-white-900 tracking-tighter" 
          delay={150}
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
        {error && (
          <div className="text-center text-sm text-red-600 font-medium">
            {error}
          </div>
        )}
      </form>
      </div>
      <div className="absolute bottom-6 w-full text-center z-10">
        <Link to="/about" className="text-blue-600 font-semibold hover:underline">
          About
        </Link>
      </div>
    </div>
  );
}