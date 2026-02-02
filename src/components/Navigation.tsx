import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Youtube, Heart } from 'lucide-react';
import { UserMenu } from './UserMenu';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/notes', label: 'Browse Notes' },
  { path: '/videos', label: 'Videos' },
  { path: '/support', label: 'Support' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            style={{ perspective: '500px' }}
          >
            <div className="relative transition-transform duration-300 group-hover:scale-105">
              <BookOpen className="w-8 h-8 text-[#d4a373]" />
              <span className="absolute -top-1 -right-1 text-xs text-[#d4a373]">∫</span>
            </div>
            <span className="text-2xl font-bold font-['Cormorant_Garamond'] text-white group-hover:text-[#d4a373] transition-colors">
              MathNotes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-[#d4a373]'
                    : 'text-[#b0b0b0] hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-0.5 bg-[#d4a373] transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'w-full -translate-x-1/2'
                      : 'w-0 -translate-x-1/2 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#b0b0b0] hover:text-red-500 transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#d4a373] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-[#404040]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#d4a373]'
                    : 'text-[#b0b0b0] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/support"
              className="btn-primary flex items-center justify-center gap-2 mt-4"
            >
              <Heart className="w-4 h-4" />
              Get Premium
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
