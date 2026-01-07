import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6">
      <div className="max-w-2xl w-full bg-white p-10 rounded-2xl shadow-xl">
        {}
        <Link to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
        </Link>
        {}
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">
          About FlowTask
        </h1>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            FlowTask isn't just another to-do list. It is a philosophy of productivity designed 
            to bridge the gap between your daily grind and your life's biggest ambitions.
          </p>
          <p>
            We believe that <strong>micro-tasks</strong> (the small things you do every day) should directly 
            contribute to your <strong>macro-goals</strong>. When you can see the progress bar move 
            on a life goal just by checking off a daily chore, motivation becomes automatic.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Why we built this</h2>
          <p>
            Traditional productivity tools are lists of endless obligations. FlowTask is a 
            game where you are the protagonist. Earn points, build streaks, and watch 
            your profile grow as you conquer your day.
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-400">© 2025 FlowTask Inc.</p>
        </div>
      </div>
    </div>
  );
}

