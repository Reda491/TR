import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useLang, setLang, t } from '../lib/Lang.js'
import { useTheme, toggleTheme } from '../lib/theme'

const NAV_PATHS = [
  { key: 'fleet', path: '/fleet' },
  { key: 'offers', path: '/offers' },
  { key: 'about', path: '/about' },
]

const SCROLL_TOP_THRESHOLD = 20
const SCROLL_DELTA = 10

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const lang = useLang()
  const theme = useTheme()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > SCROLL_TOP_THRESHOLD)

      if (mobileOpen) {
        setNavHidden(false)
        lastScrollY.current = y
        return
      }

      if (y <= SCROLL_TOP_THRESHOLD) {
        setNavHidden(false)
      } else {
        const delta = y - lastScrollY.current
        if (delta > SCROLL_DELTA) setNavHidden(true)
        else if (delta < -SCROLL_DELTA) setNavHidden(false)
      }

      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setNavHidden(false)
    lastScrollY.current = window.scrollY
  }, [location.pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{
          y: navHidden ? '-100%' : 0,
          opacity: 1,
        }}
        transition={{
          y: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        }}
        className={`fixed left-0 right-0 top-0 z-50 will-change-transform ${
          navHidden ? 'pointer-events-none' : 'pointer-events-auto'
        } ${
          scrolled
            ? 'border-b border-white/10 bg-background/55 shadow-[0_8px_28px_rgba(0,0,0,0.08)] backdrop-blur-xl backdrop-saturate-125 dark:border-white/[0.08] dark:bg-[#0b0c10]/45 dark:shadow-[0_8px_24px_rgba(0,0,0,0.25)]'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-site">
          <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
            <Link
              to="/"
              className="flex max-w-[min(100%,280px)] items-center gap-2.5 font-inter text-[22px] font-semibold tracking-[-0.015em] text-foreground md:gap-3 md:text-[24px]"
              aria-label={t(lang, 'nav.aria_home')}
            >
              <img
                src="/logo_white.png"
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 shrink-0 object-contain md:h-10 md:w-10"
                decoding="async"
              />
              <span className="min-w-0 leading-none">
                Tenere<span className="text-primary">Riders</span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 rounded-full border border-border bg-card/70 px-2 py-1.5 backdrop-blur-2xl md:flex">
              {NAV_PATHS.map((link) => {
                const active = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative rounded-full px-5 py-2 font-inter text-[13px] font-semibold tracking-[0.01em] transition-colors ${
                      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-secondary"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{t(lang, `nav.${link.key}`)}</span>
                  </Link>
                )
              })}
            </div>

            <div className="hidden items-center justify-end gap-3 md:flex">
              <button
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary/45 hover:text-foreground"
                aria-label={t(lang, 'nav.aria_toggle_theme')}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                className="rounded-full border border-border px-3.5 py-2 font-mono text-[9px] tracking-[0.16em] text-muted-foreground transition hover:border-primary/45"
              >
                <span className={lang === 'en' ? 'font-bold text-primary' : ''}>EN</span>
                <span className="mx-2 opacity-35">/</span>
                <span className={lang === 'fr' ? 'font-bold text-primary' : ''}>FR</span>
              </button>

              <Link
                to="/fleet"
                className="rounded-full bg-primary px-6 py-2.5 font-inter text-[13px] font-bold tracking-[0.01em] text-primary-foreground shadow-[0_0_0_rgba(255,78,28,0)] transition duration-300 hover:shadow-[0_0_34px_rgba(255,78,28,0.32)]"
              >
                {t(lang, 'nav.book')}
              </Link>
            </div>

            <button
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={
                mobileOpen ? t(lang, 'nav.aria_menu_close') : t(lang, 'nav.aria_menu_open')
              }
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 bg-background/95 pt-28 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_PATHS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-inter text-5xl font-bold tracking-[-0.03em] text-foreground"
                >
                  {t(lang, `nav.${link.key}`)}
                </Link>
              ))}

              <Link
                to="/fleet"
                className="mt-4 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground"
              >
                {t(lang, 'nav.book')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}