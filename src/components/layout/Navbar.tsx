import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LogOutIcon, HomeIcon, MenuIcon, LayoutDashboardIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Side - Logo */}
        <div className="flex items-center space-x-2">
          <h1 
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate(user ? '/' : '/')}
          >
            <span className="text-brand-purple">Task</span> Tracker
          </h1>
        </div>

        {/* Center - Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-gray-700 hover:text-brand-purple">
            Home
          </Button>
          {user && (
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-brand-purple">
              Dashboard
            </Button>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>

          {/* User Avatar / Auth Buttons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-brand-purple text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="flex items-center gap-2 cursor-pointer">
                  <LayoutDashboardIcon className="w-4 h-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-default">
                  <UserIcon className="w-4 h-4" />
                  <span>{user.name}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                  <LogOutIcon className="w-4 h-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button onClick={() => navigate('/signup')} className="bg-brand-purple hover:bg-opacity-90 text-white">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col p-4 space-y-2">
            <Button variant="ghost" onClick={() => { navigate('/'); setMenuOpen(false); }}>
              Home
            </Button>
            {user && (
              <>
                <Button variant="ghost" onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}>
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            )}
            {!user && (
              <>
                <Button variant="outline" onClick={() => { navigate('/login'); setMenuOpen(false); }}>
                  Log In
                </Button>
                <Button onClick={() => { navigate('/signup'); setMenuOpen(false); }} className="bg-brand-purple hover:bg-opacity-90 text-white">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
