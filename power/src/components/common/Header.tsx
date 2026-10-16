'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { Searchbar } from './Searchbar';   // ✅ Added Searchbar

// Icon Type
type IconName =
  | 'MagnifyingGlassIcon'
  | 'UserGroupIcon'
  | 'ChartBarIcon'
  | 'BriefcaseIcon'
  | 'ArrowRightOnRectangleIcon'
  | 'EllipsisHorizontalIcon'
  | 'CogIcon'
  | 'QuestionMarkCircleIcon'
  | 'AdjustmentsHorizontalIcon'
  | 'XMarkIcon'
  | 'Bars3Icon'
  | 'UserIcon'
  | 'LockIcon'
  | 'EyeIcon'
  | 'EyeSlashIcon';

// Navigation interface
interface NavigationItem {
  name: string;
  href: string;
  icon: IconName;
}

// User interface
interface User {
  fullName?: string;
  email: string;
  role?: 'admin' | 'technician' | 'customer';
}

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  
  // ---------------- SEARCH BAR AFTER SCROLL ----------------
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSearch(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // ----------------------------------------------------------

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        setUser({
          ...parsedUser,
          fullName: parsedUser.fullName || parsedUser.email?.split('@')[0] || 'User',
          role: parsedUser.role || 'customer',
        });
      }
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const navigationItems: NavigationItem[] = [
    { name: 'Find Services', href: '/service-booking-flow', icon: 'MagnifyingGlassIcon' },
    { name: 'Services', href: '/services', icon: 'UserGroupIcon' },
    { name: 'Customer Dashboard', href: '/customer-dashboard', icon: 'ChartBarIcon' },
    { name: 'Provider Dashboard', href: '/provider-dashboard', icon: 'BriefcaseIcon' },
  ];

  const moreMenuItems: NavigationItem[] = [
    { name: 'Admin Dashboard', href: '/admin-dashboard', icon: 'CogIcon' },
    { name: 'Help Center', href: '/help', icon: 'QuestionMarkCircleIcon' },
    { name: 'Settings', href: '/settings', icon: 'AdjustmentsHorizontalIcon' },
  ];

  const loginItem: NavigationItem = {
    name: 'Sign In',
    href: '/login',
    icon: 'ArrowRightOnRectangleIcon',
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    try {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('rememberedUser');
      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const getDashboardLink = (role?: string) => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'technician':
        return '/provider-dashboard';
      default:
        return '/customer-dashboard';
    }
  };

  const getDisplayName = () =>
    user?.fullName || user?.email?.split('@')[0] || 'User';

  const getAvatarInitial = () => getDisplayName().charAt(0).toUpperCase();

  if (isLoading) {
    return (
      <header className={`bg-card border-b border-border shadow-sm sticky top-0 z-50 ${className}`}>
        <div className="h-16 flex items-center px-4 animate-pulse">Loading...</div>
      </header>
    );
  }

  return (
    <header className={`bg-card border-b border-border shadow-sm sticky top-0 z-50 ${className}`}>
      <div className="w-full">

        {/* -------------------- TOP NAVBAR -------------------- */}
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/homepage" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
              <span className="hidden sm:block text-xl font-bold">ServiceHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map(item => (
              <Link key={item.name} href={item.href} className="flex items-center px-4 py-2 text-sm hover:text-primary">
                <Icon name={item.icon} size={16} />
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}

            <div className="relative group">
              <button className="flex items-center px-4 py-2 text-sm hover:text-primary">
                <Icon name="EllipsisHorizontalIcon" size={16} />
                <span className="ml-2">More</span>
              </button>

              <div className="absolute right-0 w-48 bg-white border rounded-md shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {moreMenuItems.map(e => (
                  <Link key={e.name} href={e.href} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                    <Icon name={e.icon} size={16} />
                    <span className="ml-2">{e.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* ------------------ DESKTOP RIGHT + SEARCH ------------------ */}
          <div className="hidden lg:flex items-center space-x-3">

            {/* 🔍 SHOW SEARCHBAR WHEN SCROLLED */}
            {showSearch && (
              <div className="transition-all duration-300">
                <Searchbar small />
              </div>
            )}

            {/* User Logged In */}
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center">
                    {getAvatarInitial()}
                  </div>
                  <span className="text-sm truncate max-w-32">{getDisplayName()}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                >
                  <Icon name="ArrowRightOnRectangleIcon" size={16} />
                  <span className="ml-2">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center px-4 py-2 text-sm hover:text-primary">
                  <Icon name="ArrowRightOnRectangleIcon" size={16} />
                  <span className="ml-2">Sign In</span>
                </Link>

                <Link href="/register" className="px-4 py-2 bg-primary text-white text-sm rounded-md">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button onClick={toggleMobileMenu} className="lg:hidden">
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>

        {/* ------------------ MOBILE MENU ------------------ */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t p-4 space-y-2">

            {/* 🌟 MOBILE SEARCHBAR ALWAYS SHOWING */}
            <div className="mb-3">
              <Searchbar />
            </div>

            {navigationItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center py-3 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item.icon} size={20} />
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}

            <div className="border-t pt-4">
              {user ? (
                <>
                  <div className="px-2 py-1 text-sm mb-4">
                    <p className="font-medium">{getDisplayName()}</p>
                    <p className="text-xs">{user.email}</p>
                  </div>

                  <Link
                    href={getDashboardLink(user.role)}
                    className="flex items-center py-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="ChartBarIcon" size={20} />
                    <span className="ml-3">Dashboard</span>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center py-3 w-full text-left"
                  >
                    <Icon name="ArrowRightOnRectangleIcon" size={20} />
                    <span className="ml-3">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center py-3" onClick={() => setIsMobileMenuOpen(false)}>
                    <Icon name="ArrowRightOnRectangleIcon" size={20} />
                    <span className="ml-3">Sign In</span>
                  </Link>

                  <Link
                    href="/register"
                    className="block bg-primary text-white py-3 rounded-md text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
