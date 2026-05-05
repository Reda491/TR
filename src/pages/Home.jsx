import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Clock, MapPin, Shield, Zap } from 'lucide-react'
import { apiClient } from '@/api/client'
import MotorcycleScrollShowcase from '../components/MotorcycleScrollShowcase'
import { useLang, t } from '../lib/Lang.js'

const HERO_BG = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2200'

const FEATURE_KEYS = [
  { icon: Zap, titleKey: 'home.fleet_title', descKey: 'home.fleet_desc' },
  { icon: Shield, titleKey: 'home.insurance_title', descKey: 'home.insurance_desc' },
  { icon: Clock, titleKey: 'home.flexible_title', descKey: 'home.flexible_desc' },
  { icon: MapPin, titleKey: 'home.routes_title', descKey: 'home.routes_desc' },
]

export default function Home() {
  const lang = useLang()
  const [motorcycles, setMotorcycles] = useState([])
  const [loading, setLoading] = useState(true)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.55])

  useEffect(() => {
    apiClient.entities.Motorcycle.list().then((data) => {
      setMotorcycles(data)
      setLoading(false)
    })
  }, [])

  const stats = t(lang, 'home.stats')
  const statsData = [
    ['12+', stats[0]],
    ['10+', stats[1]],
    ['5K+', stats[2]],
    ['3', stats[3]],
  ]

  return (
    <main className="page-fade">
      <section
        ref={heroRef}
        className="relative flex min-h-[94vh] items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img src={HERO_BG} alt="Motorcycle workshop" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/58" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-[#050608]" />
          <div className="absolute inset-0 grid-overlay opacity-[0.22]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-[1040px] px-6 pt-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 font-mono text-[10px] uppercase tracking-[0.36em] text-white/48"
          >
            {t(lang, 'home.hero_subline')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-inter text-[clamp(54px,8vw,120px)] font-extrabold leading-[0.88] tracking-[-0.038em] text-balance text-white"
          >
            {t(lang, 'home.hero_title_1')}
            <br />
            <span className="text-primary">{t(lang, 'home.hero_title_2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-[520px] text-base leading-relaxed text-white/58 md:text-lg"
          >
            {t(lang, 'home.hero_desc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link
              to="/fleet"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[14px] font-bold text-primary-foreground transition hover:shadow-[0_0_35px_rgba(255,78,28,0.32)]"
            >
              {t(lang, 'home.explore_fleet')} <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/offers"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.07] px-8 py-3.5 text-[14px] font-semibold text-white/72 backdrop-blur-xl transition hover:text-white"
            >
              {t(lang, 'home.view_offers')} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-narrow">
          <div className="grid overflow-hidden rounded-[22px] border border-border bg-card md:grid-cols-4 dark:border-white/[0.08] dark:bg-white/[0.025]">
            {FEATURE_KEYS.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.42, delay: index * 0.05 }}
                className="border-b border-border p-8 last:border-b-0 dark:border-white/[0.06] md:border-b-0 md:border-r md:border-border md:last:border-r-0 md:dark:border-white/[0.06]"
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>

                <h3 className="mb-2 font-inter text-[17px] font-bold tracking-[-0.025em] text-foreground dark:text-white">
                  {t(lang, feature.titleKey)}
                </h3>

                <p className="text-[15px] leading-relaxed text-muted-foreground dark:text-white/52">
                  {t(lang, feature.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-narrow mb-12">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
            {'\u2014 '}
            {t(lang, 'home.showcase_kicker')}
          </p>

          <h2 className="heading-display text-[clamp(44px,5.2vw,76px)] dark:text-white">
            {t(lang, 'home.showcase_title_1')}
            <br />
            {t(lang, 'home.showcase_title_2')}
          </h2>

          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground dark:text-white/50">
            {t(lang, 'home.showcase_desc')}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <MotorcycleScrollShowcase motorcycles={motorcycles} />
        )}
      </section>

      <section className="py-28">
        <div className="container-narrow grid grid-cols-1 gap-6 md:grid-cols-4">
          {statsData.map(([number, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.42, delay: index * 0.04 }}
              className="rounded-[20px] border border-border bg-card p-9 text-center dark:border-white/[0.08] dark:bg-white/[0.045]"
            >
              <h3 className="font-inter text-[48px] font-extrabold leading-none tracking-[-0.06em] text-foreground dark:text-white">
                {number}
              </h3>
              <p className="mt-3 text-[15px] text-muted-foreground dark:text-white/46">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-32">
        <div className="container-narrow">
          <div className="rounded-[28px] border border-border bg-card px-8 py-20 text-center shadow-sm md:px-16 dark:border-white/[0.08] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,78,28,0.18),transparent_34rem),linear-gradient(135deg,rgba(255,78,28,0.12),rgba(255,255,255,0.02))] dark:shadow-none">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.34em] text-primary">
              {t(lang, 'home.cta_label')}
            </p>

            <h2 className="heading-display text-[clamp(40px,4.8vw,72px)] dark:text-white">
              {t(lang, 'home.cta_title')}
            </h2>

            <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed text-muted-foreground dark:text-white/55">
              {t(lang, 'home.cta_desc')}
            </p>

            <Link
              to="/fleet"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-[14px] font-bold text-primary-foreground transition hover:shadow-[0_0_35px_rgba(255,78,28,0.32)]"
            >
              {t(lang, 'home.browse_fleet')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
