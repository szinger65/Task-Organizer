import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Target, TrendingUp, Menu, X, Zap, LogOut, User } from 'lucide-react';

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUserData(user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: 'Dashboard' },
    { name: 'Tasks', icon: CheckSquare, path: 'Tasks' },
    { name: 'Goals', icon: Target, path: 'Goals' },
    { name: 'Progress', icon: TrendingUp, path: 'Progress' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4">
          <div className="flex h-20 shrink-0 items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">FlowTask</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.includes(item.path.toLowerCase());
                return (
                  <li key={item.name}>
                    <Link
                      to={`/${item.path.toLowerCase()}`}
                      className={`group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold transition-all ${
                        isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
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

      {}
      <main className="lg:pl-72">
        {}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-slate-700 lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Open sidebar</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end items-center">
            {}
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-x-4 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200">
                  {userData?.profile_picture ? (
                    <img src={userData.profile_picture} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-bold text-indigo-600">
                      {userData?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
              </button>

              {}
              {userMenuOpen && (
                <div className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-medium text-gray-900">{userData?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 text-sm leading-6 text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4" /> Your Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm leading-6 text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {}
        <div className="p-4 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}