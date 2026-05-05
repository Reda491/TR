import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang, setLang, t } from '../lib/Lang.js';
import { useTheme, toggleTheme } from '../lib/theme';
import { Sun, Moon } from 'lucide-react';

const NAV_PATHS = [
  { key: 'fleet', path: '/fleet' },
  { key: 'offers', path: '/offers' },
  { key: 'about', path: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const lang = useLang();
  const theme = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 border-t-2 border-primary transition-all duration-500 ${
          scrolled
            ? 'bg-background/70 backdrop-blur-2xl border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2">
              <div className="relative">
                <span className="font-syne font-extrabold text-[30px] tracking-[-0.04em] text-foreground">Tenere</span>
                <span className="font-syne font-extrabold text-[30px] tracking-[-0.04em] text-primary">Riders</span>
              </div>
            </Link>

            {/* Center Nav */}
            <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
              {NAV_PATHS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-2 rounded-full text-sm font-inter font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-foreground bg-white/[0.08]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(lang, `nav.${link.key}`)}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA + Lang */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:border-primary/40 hover:text-primary text-muted-foreground transition-all duration-200"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                className="flex items-center gap-1 font-mono text-[10px] tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/10 hover:border-primary/40 hover:text-primary text-muted-foreground transition-all duration-200"
              >
                <span className={lang === 'en' ? 'text-primary font-bold' : ''}>EN</span>
                <span className="opacity-30">/</span>
                <span className={lang === 'fr' ? 'text-primary font-bold' : ''}>FR</span>
              </button>
              <Link
                to="/fleet"
                className="group relative overflow-hidden font-inter text-sm font-semibold px-5 py-2.5 rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,62,0,0.4)]"
              >
                <span className="relative z-10">{lang === 'fr' ? 'Réserver' : 'Book a Ride'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl pt-20"
          >
            <div className="flex flex-col items-center gap-6 py-14">
              {NAV_PATHS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className={`font-syne text-4xl font-black tracking-tight transition-colors ${
                      location.pathname === link.path ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {t(lang, `nav.${link.key}`)}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Link to="/fleet" className="mt-4 font-inter text-sm font-semibold px-8 py-3.5 rounded-full bg-primary text-primary-foreground">
                  Book a Ride
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}