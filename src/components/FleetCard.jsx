import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Gauge, Weight, Zap } from 'lucide-react'
import { translateCategory, useLang } from '../lib/Lang.js'

export default function FleetCard({ motorcycle, index = 0 }) {
  const lang = useLang()
  const isFr = lang === 'fr'
  const performance = Math.min(Math.max(motorcycle.performance_level || 6, 1), 10)

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.46,
        delay: Math.min(index * 0.045, 0.22),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link to={`/motorcycle/${motorcycle.id}`} className="group block">
        <article className="overflow-hidden rounded-[22px] border border-border bg-card transition duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg dark:border-white/[0.08] dark:bg-[#0c0d11] dark:hover:shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
          <div className="relative aspect-[1.33] overflow-hidden bg-muted dark:bg-[#090a0e]">
            {motorcycle.image_url ? (
              <img
                src={motorcycle.image_url}
                alt={motorcycle.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Gauge className="h-12 w-12 text-muted-foreground/40 dark:text-white/20" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent dark:from-[#0c0d11] dark:via-[#0c0d11]/18" />

            <div className="absolute left-5 top-5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.24em] text-primary">
              {translateCategory(lang, motorcycle.category)}
            </div>

            {motorcycle.available !== false && (
              <div className="absolute right-5 top-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-emerald-400">
                  {isFr ? 'DISPO.' : 'Avail.'}
                </span>
              </div>
            )}
          </div>

          <div className="p-5 md:p-6">
            <div className="mb-5 grid grid-cols-[1fr_auto] gap-4">
              <div>
                <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.28em] text-muted-foreground dark:text-white/32">
                  {motorcycle.brand || 'Motorcycle'}
                </p>
                <h3 className="max-w-[220px] font-inter text-[22px] font-bold leading-snug tracking-[-0.02em] text-foreground transition group-hover:text-primary dark:text-white">
                  {motorcycle.name}
                </h3>
              </div>

              <div className="pt-6 text-right">
                <p className="font-inter text-[34px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-primary">
                  €{motorcycle.price_per_day}
                </p>
                <p className="mt-1 font-mono text-[8px] text-muted-foreground dark:text-white/45">
                  {isFr ? '/jour' : '/day'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-border pt-4 dark:border-white/[0.075]">
              <Spec icon={Zap} value={`${motorcycle.horsepower || '—'} hp`} />
              <Spec icon={Weight} value={`${motorcycle.weight || '—'} kg`} />
              <Spec icon={Gauge} value={`${motorcycle.engine_cc || '—'} cc`} />

              <div className="ml-auto hidden items-center gap-1 sm:flex">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i < performance ? 'bg-primary' : 'bg-border dark:bg-white/10'
                    }`}
                  />
                ))}
              </div>

              <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition group-hover:text-primary dark:text-white/30 sm:ml-2" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

function Spec({ icon: Icon, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-primary/75" />
      <span className="font-mono text-[9px] text-muted-foreground dark:text-white/45">{value}</span>
    </div>
  )
}
