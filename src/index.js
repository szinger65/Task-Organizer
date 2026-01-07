import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';

import Layout from './layout';
import Login from './pages/login'; 
import Dashboard from './pages/dashboard';
import Tasks from './pages/tasks';
import Goals from './pages/goals';
import Progress from './pages/progress';
import Register from './pages/register';
import Profile from './pages/profile';


const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

const LayoutWrapper = ({ children, pageName }) => (
  <Layout currentPageName={pageName}>
    {children}
  </Layout>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      
      {}
      <Analytics />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <LayoutWrapper pageName="Dashboard"><Dashboard /></LayoutWrapper>
            </ProtectedRoute>
          } />
          
          <Route path="/tasks" element={
            <ProtectedRoute>
              <LayoutWrapper pageName="Tasks"><Tasks /></LayoutWrapper>
            </ProtectedRoute>
          } />
          
          <Route path="/goals" element={
            <ProtectedRoute>
              <LayoutWrapper pageName="Goals"><Goals /></LayoutWrapper>
            </ProtectedRoute>
          } />
          
          <Route path="/progress" element={
            <ProtectedRoute>
              <LayoutWrapper pageName="Progress"><Progress /></LayoutWrapper>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <LayoutWrapper pageName="Profile"><Profile /></LayoutWrapper>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);