import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Target, TrendingUp, Menu, X, Zap } from 'lucide-react';
//import { Button } from "./components/ui/button";
import { useState } from 'react';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: 'Dashboard' },
    { name: 'Tasks', icon: CheckSquare, path: 'Tasks' },
    { name: 'Goals', icon: Target, path: 'Goals' },
    { name: 'Progress', icon: TrendingUp, path: 'Progress' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4">
          <div className="flex h-20 shrink-0 items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              FlowTask
            </span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPageName === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={`/${item.path.toLowerCase()}`}
                      className={`group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="h-6 w-6 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
      <div className="sticky top-0 z-40 lg:hidden">
        <div className="flex h-16 items-center gap-x-4 bg-slate-900 px-4 shadow-sm sm:gap-x-6 sm:px-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-slate-400 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FlowTask</span>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="bg-slate-900 border-t border-slate-700">
            <nav className="px-4 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPageName === item.path;
                return (
                  <Link
                    key={item.name}
                    to={`/${item.path.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
      <main className="lg:pl-72">
        {children}
      </main>
    </div>
  );
}
