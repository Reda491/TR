import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  Gauge,
  Navigation,
  Shield,
  Weight,
  Zap,
} from 'lucide-react'
import { apiClient } from '@/api/client'
import BookingForm from '../components/BookingForm'
import { translateCategory, translateTerrain, t, useLang } from '../lib/Lang.js'

export default function MotorcycleDetail() {
  const { motorcycleId } = useParams()
  const [moto, setMoto] = useState(null)
  const [loading, setLoading] = useState(true)
  const lang = useLang()
  const isFr = lang === 'fr'

  useEffect(() => {
    const load = async () => {
      const data = await apiClient.entities.Motorcycle.get(motorcycleId)
      setMoto(data)
      setLoading(false)
    }

    load()
  }, [motorcycleId])

  const inclusions = useMemo(() => {
    if (!moto) return []

    return [
      {
        key: 'includes_gps',
        label: isFr ? 'Navigation GPS' : 'GPS Navigation',
        icon: Navigation,
      },
      {
        key: 'includes_panniers',
        label: isFr ? 'Valises latérales' : 'Side Panniers',
        icon: Briefcase,
      },
      {
        key: 'includes_insurance',
        label: isFr ? 'Assurance incluse' : 'Insurance Included',
        icon: Shield,
      },
    ].filter((item) => moto[item.key])
  }, [moto, isFr])

  const techSpecs = useMemo(() => {
    if (!moto) return []

    return [
      { label: isFr ? 'Moteur' : 'Engine', value: moto.engine_cc, unit: 'cc', icon: Gauge },
      { label: isFr ? 'Puissance' : 'Power', value: moto.horsepower, unit: 'hp', icon: Zap },
      { label: isFr ? 'Couple' : 'Torque', value: moto.torque, unit: 'Nm', icon: Gauge },
      { label: isFr ? 'Poids' : 'Weight', value: moto.weight, unit: 'kg', icon: Weight },
      { label: isFr ? 'Selle' : 'Seat', value: moto.seat_height, unit: 'mm', icon: Weight },
      { label: isFr ? 'Autonomie' : 'Range', value: moto.fuel_range, unit: 'km', icon: Navigation },
    ]
  }, [moto, isFr])

  if (loading) {
    return (
      <main className="page-fade flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </main>
    )
  }

  if (!moto) {
    return (
      <main className="page-fade flex min-h-screen items-center justify-center px-6">
        <div className="rounded-[22px] border border-border bg-card p-10 text-center dark:border-white/[0.08] dark:bg-white/[0.035]">
          <p className="font-inter text-2xl font-extrabold tracking-[-0.03em] text-foreground dark:text-white">
            {isFr ? 'Moto introuvable.' : 'Motorcycle not found.'}
          </p>
          <Link
            to="/fleet"
            className="mt-6 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground"
          >
            {isFr ? 'Retour à la flotte' : 'Back to fleet'}
          </Link>
        </div>
      </main>
    )
  }

  const performance = Math.min(Math.max(moto.performance_level || 6, 1), 10)

  return (
    <main className="page-fade min-h-screen pt-28 pb-32">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42 }}
        >
          <Link
            to="/fleet"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground dark:text-white/48 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {isFr ? 'Retour à la flotte' : 'Back to fleet'}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
          <section className="space-y-8">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                {translateCategory(lang, moto.category)} · {translateTerrain(lang, moto.terrain)}
              </p>

              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="heading-display text-left text-[clamp(36px,4.8vw,76px)] md:text-[clamp(40px,5.2vw,88px)]">
                    {moto.name}
                  </h1>

                  <p className="mt-4 text-[17px] text-muted-foreground dark:text-white/52">{moto.brand}</p>
                </div>

                <div className="rounded-[20px] border border-border bg-card px-6 py-5 text-right dark:border-white/[0.08] dark:bg-white/[0.045]">
                  <p className="font-inter text-[42px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-primary">
                    €{moto.price_per_day}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground dark:text-white/42">
                    {t(lang, 'detail.per_day')}
                  </p>
                </div>
              </div>
            </motion.header>

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.62, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[28px] border border-border bg-muted dark:border-white/[0.08] dark:bg-[#0b0c10]"
            >
              {moto.image_url ? (
                <img
                  src={moto.image_url}
                  alt={moto.name}
                  className="aspect-[16/10] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[16/10] w-full items-center justify-center">
                  <Gauge className="h-16 w-16 text-muted-foreground/35 dark:text-white/15" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent" />

              {inclusions.length > 0 && (
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  {inclusions.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-black/35 px-3.5 py-2 backdrop-blur-xl"
                    >
                      <item.icon className="h-3.5 w-3.5 text-primary" />
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/72">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <section className="overflow-hidden rounded-[24px] border border-border bg-card dark:border-white/[0.08] dark:bg-white/[0.035]">
              <div className="border-b border-border px-6 py-5 dark:border-white/[0.06]">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  {isFr ? 'Caractéristiques techniques' : 'Technical specifications'}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                {techSpecs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.38, delay: index * 0.04 }}
                    className="border-b border-r border-border p-6 last:border-r-0 dark:border-white/[0.06] xl:border-b-0"
                  >
                    <spec.icon className="mb-4 h-4 w-4 text-primary/80" />
                    <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.22em] text-muted-foreground dark:text-white/34">
                      {spec.label}
                    </p>
                    <p className="font-inter text-[30px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-foreground dark:text-white">
                      {spec.value || '—'}
                    </p>
                    {spec.unit && (
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                        {spec.unit}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[24px] border border-border bg-card p-7 dark:border-white/[0.08] dark:bg-white/[0.035]">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                    {isFr ? 'Performance' : 'Performance'}
                  </p>
                  <span className="font-inter text-2xl font-extrabold tracking-[-0.03em] tabular-nums text-foreground dark:text-white">
                    {performance}/10
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-border dark:bg-white/[0.08]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${performance * 10}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>

                <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground dark:text-white/36">
                  <span>{isFr ? 'Loisir' : 'Leisure'}</span>
                  <span>{isFr ? 'Extrême' : 'Extreme'}</span>
                </div>
              </div>

              <div className="rounded-[24px] border border-border bg-card p-7 dark:border-white/[0.08] dark:bg-white/[0.035]">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                  {isFr ? 'Préparation à la location' : 'Rental readiness'}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <InfoPill
                    icon={CalendarDays}
                    title={isFr ? 'Dates flexibles' : 'Flexible dates'}
                  />
                  <InfoPill
                    icon={Shield}
                    title={isFr ? 'Assistance assurance' : 'Insurance support'}
                  />
                  <InfoPill
                    icon={Navigation}
                    title={isFr ? 'Conseils d’itinéraire' : 'Route advice'}
                  />
                  <InfoPill
                    icon={Briefcase}
                    title={isFr ? 'Équipement du voyage' : 'Trip equipment'}
                  />
                </div>
              </div>
            </section>

            {moto.description && (
              <section className="rounded-[24px] border border-border bg-card p-7 dark:border-white/[0.08] dark:bg-white/[0.035]">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                  {isFr ? 'À propos de cette machine' : 'About this machine'}
                </p>
                <p className="max-w-3xl text-[16px] leading-relaxed text-muted-foreground dark:text-white/55">
                  {moto.description}
                </p>
              </section>
            )}
          </section>

          <aside>
            <div className="sticky top-28 rounded-[28px] border border-border bg-card p-6 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-white/[0.045]">
              <BookingForm motorcycle={moto} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function InfoPill({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.035]">
      <Icon className="h-3.5 w-3.5 text-primary" />
      <span className="text-xs font-semibold text-foreground dark:text-white/62">{title}</span>
    </div>
  )
}