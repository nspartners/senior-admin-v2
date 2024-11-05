import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, MessageSquare, Image } from 'lucide-react';

export function Header() {
  const location = useLocation();

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-brand-600">
                Senior Living Portal
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink 
                to="/dashboard" 
                icon={<Home className="w-5 h-5" />}
                isActive={location.pathname === '/dashboard'}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/admin/care-teams" 
                icon={<Users className="w-5 h-5" />}
                isActive={location.pathname === '/admin/care-teams'}
              >
                Care Teams
              </NavLink>
              <NavLink 
                to="/admin/media" 
                icon={<Image className="w-5 h-5" />}
                isActive={location.pathname === '/admin/media'}
              >
                Media
              </NavLink>
              <NavLink 
                to="/activities" 
                icon={<Calendar className="w-5 h-5" />}
                isActive={location.pathname === '/activities'}
              >
                Activities
              </NavLink>
              <NavLink 
                to="/messages" 
                icon={<MessageSquare className="w-5 h-5" />}
                isActive={location.pathname === '/messages'}
              >
                Messages
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  isActive: boolean;
}

function NavLink({ to, children, icon, isActive }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
        isActive
          ? 'border-brand-500 text-brand-600'
          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
      }`}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </Link>
  );
}