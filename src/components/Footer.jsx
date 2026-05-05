import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useLang, t } from '../lib/Lang.js'

export default function Footer() {
  const lang = useLang()

  const links = [
    ['/', t(lang, 'nav.home')],
    ['/fleet', t(lang, 'nav.fleet')],
    ['/offers', t(lang, 'nav.offers')],
    ['/about', t(lang, 'nav.about')],
  ]

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />

      {/* Shadow typography — Syne 800 only is loaded; extrabold avoids faux 900 */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden">
        <p
          className="whitespace-nowrap font-syne text-[14vw] font-extrabold leading-none tracking-tighter text-transparent"
          style={{
            WebkitTextStroke: '1px color-mix(in oklab, hsl(var(--foreground)) 12%, transparent)',
            WebkitTextFillColor: 'transparent',
          }}
          aria-hidden
        >
          TENERE RIDERS
        </p>
      </div>

      <div className="container-narrow relative z-10 pt-20 pb-44">
        <div className="grid grid-cols-1 gap-12 border-b border-border pb-14 md:grid-cols-[1.2fr_0.8fr_1fr_0.8fr]">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 font-inter text-[24px] font-semibold tracking-[-0.015em] text-foreground md:gap-3 md:text-[26px]"
              aria-label={t(lang, 'nav.aria_home')}
            >
              <img
                src="/logo_white.png"
                alt=""
                width={44}
                height={44}
                className="h-10 w-10 shrink-0 object-contain md:h-11 md:w-11"
                decoding="async"
              />
              <span className="leading-none">
                Tenere<span className="text-primary">Riders</span>
              </span>
            </Link>

            <p className="mt-5 max-w-[240px] text-[15px] leading-relaxed text-muted-foreground">
              {t(lang, 'footer.tagline')}
            </p>
          </div>

          <div>
            <FooterTitle>{t(lang, 'footer.links')}</FooterTitle>

            <div className="flex flex-col gap-3">
              {links.map(([path, label]) => (
                <Link
                  key={path}
                  to={path}
                  className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <FooterTitle>Contact</FooterTitle>

            <div className="flex flex-col gap-3">
              <ContactLine icon={Mail}>infos@tenereriders.com</ContactLine>
              <ContactLine icon={Phone}>+212 661327902</ContactLine>
              <ContactLine icon={Phone}>+212 666182063</ContactLine>
              <ContactLine icon={MapPin}>Marrakech - Morocco</ContactLine>
            </div>
          </div>

          <div>
            <FooterTitle>{t(lang, 'footer.hours_label')}</FooterTitle>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              {t(lang, 'footer.hours').map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            {t(lang, 'footer.copyright')}
          </p>

          <div className="flex gap-6">
            <span className="cursor-pointer font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-primary">
              {t(lang, 'footer.privacy')}
            </span>

            <span className="cursor-pointer font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-primary">
              {t(lang, 'footer.terms')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterTitle({ children }) {
  return (
    <h3 className="mb-5 font-mono text-[9px] uppercase tracking-[0.26em] text-primary/80">
      {children}
    </h3>
  )
}

function ContactLine({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <Icon className="h-3.5 w-3.5 text-primary/80" />
      <span>{children}</span>
    </div>
  )
}
