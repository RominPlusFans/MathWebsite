import { Link } from 'react-router-dom';
import { BookOpen, Youtube, Twitter, Github, MessageCircle, Mail } from 'lucide-react';

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/notes', label: 'Browse Notes' },
  { path: '/videos', label: 'Video Library' },
  { path: '/support', label: 'Support' },
];

const sections = [
  { path: '/notes?category=calculus', label: 'Calculus' },
  { path: '/notes?category=linear-algebra', label: 'Linear Algebra' },
  { path: '/notes?category=differential-equations', label: 'Differential Equations' },
  { path: '/notes?category=probability-statistics', label: 'Statistics' },
  { path: '/notes?category=abstract-algebra', label: 'Abstract Algebra' },
];

const socialLinks = [
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' },
  { icon: Mail, href: 'mailto:hello@mathnotes.com', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-[#404040]">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-[#d4a373]" />
              <span className="text-2xl font-bold font-['Cormorant_Garamond'] text-white">
                MathNotes
              </span>
            </Link>
            <p className="text-[#b0b0b0] text-sm leading-relaxed mb-6">
              Making mathematics accessible, one note at a time. Beautiful lecture notes with
              LaTeX rendering and video explanations.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center 
                             text-[#b0b0b0] hover:text-[#d4a373] hover:bg-[#d4a373]/10 
                             transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#b0b0b0] hover:text-[#d4a373] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sections</h4>
            <ul className="space-y-3">
              {sections.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#b0b0b0] hover:text-[#d4a373] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-[#b0b0b0] text-sm mb-4">
              Get notified when new notes and videos are published.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-[#2a2a2a] border border-[#404040] rounded-lg 
                         text-white text-sm placeholder:text-[#505050] 
                         focus:outline-none focus:border-[#d4a373] transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#d4a373] text-[#1a1a1a] rounded-lg font-medium 
                         text-sm hover:bg-[#e4b383] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#404040]">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#b0b0b0]">
              © {new Date().getFullYear()} MathNotes. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-sm text-[#b0b0b0] hover:text-[#d4a373] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-[#b0b0b0] hover:text-[#d4a373] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
