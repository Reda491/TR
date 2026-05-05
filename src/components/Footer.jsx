import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLang, t } from '../lib/Lang.js';

export default function Footer() {
  const lang = useLang();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.04]">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Shadow Typography */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <p
          className="font-syne font-black text-[14vw] leading-none tracking-tighter text-transparent whitespace-nowrap"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.04)' }}
        >
          TENERE RIDERS
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-44">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <span className="font-syne font-black text-2xl tracking-[-0.04em] text-foreground">Tenere</span>
              <span className="font-syne font-black text-2xl tracking-[-0.04em] text-primary">Riders</span>
            </Link>
            <p className="font-inter text-sm text-muted-foreground leading-relaxed max-w-[180px]">
              {t(lang, 'footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/60 mb-5">{t(lang, 'footer.links').toUpperCase()}</h3>
            <div className="flex flex-col gap-3">
              {[['/', t(lang,'nav.home')], ['/fleet', t(lang,'nav.fleet')], ['/offers', t(lang,'nav.offers')], ['/about', t(lang,'nav.about')]].map(([path, label]) => (
                <Link key={path} to={path} className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/60 mb-5">CONTACT</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-primary/70" />
                infos@tenereriders.com
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-3.5 h-3.5 text-primary/70" />
                +212 661 327 902
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary/70" />
                Marrakech, Morocco
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/60 mb-5">{t(lang,'footer.hours_label').toUpperCase()}</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              {t(lang,'footer.hours').map((h, i) => <p key={i}>{h}</p>)}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-muted-foreground/50 tracking-wider">
            {t(lang,'footer.copyright').toUpperCase()}
          </p>
          <div className="flex gap-6">
            <span className="font-mono text-[10px] text-muted-foreground/50 hover:text-primary cursor-pointer transition-colors">{t(lang,'footer.privacy').toUpperCase()}</span>
            <span className="font-mono text-[10px] text-muted-foreground/50 hover:text-primary cursor-pointer transition-colors">{t(lang,'footer.terms').toUpperCase()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}