import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Zap, Shield, Clock, MapPin } from 'lucide-react'
import { apiClient } from '@/api/client'
import { useLang, t } from '../lib/Lang.js'
import FleetCard from '../components/FleetCard'
import TerrainFilter from '../components/TerrainFilter'

const HERO_BG =
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920'

const FEATURES = [
  { icon: Zap, title: 'Premium Fleet', desc: 'Handpicked machines, maintained for peak performance.' },
  { icon: Shield, title: 'Full Coverage', desc: 'Comprehensive insurance included with every rental.' },
  { icon: Clock, title: 'Flexible Duration', desc: 'From single-day escapes to multi-week expeditions.' },
  { icon: MapPin, title: 'Guided Routes', desc: 'Curated itineraries through Morocco’s best roads.' },
]

export default function Home() {
  const [motorcycles, setMotorcycles] = useState([])
  const [terrain, setTerrain] = useState('all')
  const [loading, setLoading] = useState(true)
  const heroRef = useRef(null)
  const lang = useLang()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  useEffect(() => {
    apiClient.entities.Motorcycle.list('-created_date', 50).then((data) => {
      setMotorcycles(data)
      setLoading(false)
    })
  }, [])

  const filtered =
    terrain === 'all'
      ? motorcycles.slice(0, 6)
      : motorcycles.filter((m) => m.terrain === terrain).slice(0, 6)

  return (
    <div className="bg-background text-foreground">

      {/* ================= HERO ================= */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={HERO_BG} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 grid-overlay opacity-[0.15]" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="mb-6 text-[11px] tracking-[0.3em] font-mono text-white/50">
            PREMIUM MOTORCYCLE RENTALS · MOROCCO
          </div>

          <h1 className="font-syne text-[clamp(56px,9vw,120px)] leading-[0.9] font-black tracking-[-0.05em]">
            Ride the <br />
            <span className="text-primary">Unknown</span>
          </h1>

          <p className="mt-6 text-white/60 max-w-xl mx-auto text-lg">
            Every machine in our fleet is a masterpiece. Choose your ride and explore Morocco differently.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/fleet"
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 justify-center hover:scale-[1.03] transition"
            >
              Explore Fleet <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/offers"
              className="glass-dark px-8 py-4 rounded-full flex items-center gap-2 justify-center text-white/80 hover:text-white"
            >
              View Offers <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24">
        <div className="container-site">
          <div className="grid md:grid-cols-4 border border-white/[0.08] rounded-2xl overflow-hidden">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-8 border-r border-white/[0.06] last:border-none">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 mb-5">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-syne font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FLEET ================= */}
      <section className="pb-28">
        <div className="container-site">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-primary text-xs tracking-[0.25em] mb-3">THE HANGAR</p>
              <h2 className="font-syne text-5xl font-black leading-[1.1]">
                Select Your <br /> Machine
              </h2>
              <p className="text-white/50 mt-4 max-w-md">
                Handpicked for performance, character, and soul.
              </p>
            </div>

            <TerrainFilter active={terrain} onChange={setTerrain} />
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filtered.map((moto, i) => (
                <FleetCard key={moto.id} motorcycle={moto} index={i} />
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link
              to="/fleet"
              className="glass-dark px-8 py-4 rounded-full inline-flex items-center gap-2 text-white/70 hover:text-white"
            >
              View full fleet <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="pb-28">
        <div className="container-site grid md:grid-cols-4 gap-6">
          {[
            ['12+', 'Machines in fleet'],
            ['10+', 'Years of expertise'],
            ['5K+', 'Riders served'],
            ['3', 'Pickup locations'],
          ].map(([num, label], i) => (
            <div key={i} className="glass-dark p-10 rounded-xl text-center">
              <h3 className="text-4xl font-black font-syne mb-2">{num}</h3>
              <p className="text-white/50 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="pb-32">
        <div className="container-site">
          <div className="bg-gradient-to-br from-primary/20 to-black border border-white/[0.08] rounded-2xl p-16 text-center">
            <p className="text-primary text-xs tracking-[0.25em] mb-4">
              YOUR JOURNEY AWAITS
            </p>

            <h2 className="font-syne text-5xl font-black mb-6">
              Start Your Adventure
            </h2>

            <p className="text-white/60 max-w-xl mx-auto mb-10">
              From Marrakech to the Atlas mountains, we provide the ride for your journey of a lifetime.
            </p>

            <Link
              to="/fleet"
              className="bg-primary px-8 py-4 rounded-full text-white font-semibold inline-flex items-center gap-2 hover:scale-[1.03]"
            >
              Browse Fleet <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}