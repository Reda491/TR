import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  BatteryCharging,
  Gauge,
  Shield,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { apiClient } from '@/api/client'
import { useLang, t } from '../lib/Lang.js'
import FleetCard from '../components/FleetCard'
import TerrainFilter from '../components/TerrainFilter'

const HERO_BG =
  'https://images.unsplash.com/photo-1529429611278-7bb0f5f6c8e5?auto=format&fit=crop&w=2200&q=80'

const TECH_PILLARS = [
  {
    icon: BatteryCharging,
    title: 'Long-ride confidence',
    text: 'Reliable machines with transparent maintenance logs and route-ready prep.',
  },
  {
    icon: Gauge,
    title: 'Performance by profile',
    text: 'Filter by terrain and riding style to quickly find your ideal bike.',
  },
  {
    icon: Shield,
    title: 'Insurance-first process',
    text: 'Clear terms, rider support, and premium coverage options at booking.',
  },
  {
    icon: Wrench,
    title: 'Workshop-grade care',
    text: 'Every bike passes a strict inspection before each hand-off.',
  },
]

const LINES = [
  { key: 'Adventure', heading: 'Adventure Line', sub: 'Touring + mixed terrain' },
  { key: 'Road', heading: 'Road Line', sub: 'Urban + tarmac precision' },
  { key: 'Touring', heading: 'Touring Line', sub: 'Long distance comfort' },
]

function mapCategory(item) {
  const category = (item.category || '').toLowerCase()
  if (category.includes('adventure')) return 'Adventure'
  if (category.includes('tour')) return 'Touring'
  return 'Road'
}

export default function Home() {
  const lang = useLang()
  const [motorcycles, setMotorcycles] = useState([])
  const [terrain, setTerrain] = useState('all')
  const [line, setLine] = useState('Adventure')
  const [loading, setLoading] = useState(true)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  useEffect(() => {
    apiClient.entities.Motorcycle.list().then((data) => {
      const normalized = data.map((item) => ({
        ...item,
        line: mapCategory(item),
      }))
      setMotorcycles(normalized)
      setLoading(false)
    })
  }, [])

  const terrainFiltered = useMemo(() => {
    if (terrain === 'all') return motorcycles
    return motorcycles.filter((m) => m.terrain === terrain)
  }, [motorcycles, terrain])

  const lineFiltered = useMemo(() => {
    return terrainFiltered.filter((m) => m.line === line)
  }, [terrainFiltered, line])

  const featured = lineFiltered.slice(0, 3)

  return (
    <div className="pb-24">
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={HERO_BG} alt="Premium motorcycles" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-background" />
        </motion.div>

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-200">
              PREMIUM MOTORCYCLE RENTALS
            </span>
          </div>

          <h1 className="mt-8 font-syne text-[clamp(58px,10vw,138px)] font-black leading-[0.88] tracking-[-0.04em] text-white">
            {t(lang, 'home.hero_title_1')}
            <br />
            <span className="text-primary">{t(lang, 'home.hero_title_2')}</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-200/90 md:text-xl">
            Upgrade your ride with a premium fleet, flexible packages, and booking
            that feels as refined as the machines themselves.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/fleet"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-sm font-semibold text-primary-foreground transition hover:shadow-[0_0_40px_rgba(255,62,0,0.35)]"
            >
              Explore Fleet
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-10 py-4 text-sm font-medium text-white backdrop-blur transition hover:border-white/40"
            >
              View Offers
            </Link>
          </div>
        </div>
      </section>

      <section className="-mt-8 px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090a10] sm:grid-cols-2 lg:grid-cols-4">
          {TECH_PILLARS.map((item) => (
            <article
              key={item.title}
              className="border-b border-white/[0.06] p-7 sm:border-r sm:border-b-0 last:sm:border-r-0"
            >
              <item.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-5 text-2xl font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-3 text-sm text-zinc-400">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-20 px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-primary">? THE HANGAR</p>
              <h2 className="mt-4 font-syne text-[clamp(48px,7vw,88px)] font-black leading-[0.9] tracking-[-0.03em] text-zinc-100">
                Select Your
                <br />
                Machine
              </h2>
              <p className="mt-4 text-zinc-400">Handpicked for performance, character, and soul.</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 rounded-full border border-white/[0.06] bg-[#0d0e15] p-1.5">
                {LINES.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setLine(item.key)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      line === item.key
                        ? 'bg-primary text-primary-foreground'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {item.heading}
                  </button>
                ))}
              </div>
              <TerrainFilter active={terrain} onChange={setTerrain} />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(featured.length ? featured : terrainFiltered.slice(0, 3)).map((moto, i) => (
                <FleetCard key={moto.id} motorcycle={moto} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}