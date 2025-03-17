
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { 
  Menu, X, ChevronDown, LogIn, LogOut, User, BookOpen, 
  Calendar, Phone, Home, School, Bell, Settings
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  // Track scrolling for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Navigation items
  const navItems = [
    { label: 'Home', path: '/', icon: <Home className="h-4 w-4" /> },
    { label: 'Courses', path: '/courses', icon: <BookOpen className="h-4 w-4" /> },
    { label: 'Events', path: '/events', icon: <Calendar className="h-4 w-4" /> },
    { label: 'Admission', path: '/admission', icon: <School className="h-4 w-4" /> },
    { label: 'Contact', path: '/contact', icon: <Phone className="h-4 w-4" /> },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary font-bold text-xl"
          >
            <School className="h-6 w-6" />
            <span className="hidden sm:inline-block">EduSchool</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link
                      to={item.path}
                      className={`px-3 py-2 flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                        location.pathname === item.path ? 'text-primary border-b-2 border-primary' : 'text-foreground/80'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                {isAuthenticated && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                      <Bell className="h-4 w-4 mr-1" />
                      <span>Notifications</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[220px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <div className="flex flex-col space-y-3">
                              <h4 className="text-sm font-medium leading-none">Recent Notifications</h4>
                              <p className="text-xs text-gray-500">No new notifications</p>
                              <Link to="/notifications" className="text-xs text-primary">View all notifications</Link>
                            </div>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 bg-primary/10 text-primary rounded-full px-3 py-1.5 text-sm font-medium">
                  <User className="h-4 w-4" />
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-md shadow-lg overflow-hidden z-20 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right">
                  <div className="py-1">
                    <Link to={`/${currentUser.role}-portal`} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link to={`/profile/${currentUser.role}`} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                    <button 
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 bg-primary text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/admission"
                  className="flex items-center space-x-1 border border-primary text-primary rounded-full px-4 py-1.5 text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  <span>Apply Now</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-gray-900 shadow-lg animate-slide-in z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  to={`/${currentUser.role}-portal`}
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to={`/profile/${currentUser.role}`}
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <User className="h-5 w-5" />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex w-full items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium bg-primary text-white"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/admission"
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium border border-primary text-primary"
                >
                  <School className="h-5 w-5" />
                  <span>Apply Now</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
