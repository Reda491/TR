import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { TERRAINS } from '../../entities/Motorcycle.js'

const COUNT_MS = 720

function easeOutCubic(t) {
  const u = 1 - t
  return 1 - u * u * u
}

function parseNumericSpec(raw) {
  if (raw === null || raw === undefined || raw === '' || raw === '—') return null
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw
  const s = String(raw).replace(',', '.')
  const n = Number(s.replace(/[^\d.-]/g, ''))
  return Number.isFinite(n) ? n : null
}

function nonNumericSpecDisplay(rawValue) {
  if (rawValue === null || rawValue === undefined || rawValue === '' || rawValue === '—')
    return '—'
  return String(rawValue)
}

/** Counts between previous and next numeric spec when scroll changes the active bike. */
function AnimatedSpecNumber({ motorcycleId, rawValue, className }) {
  const parsed = parseNumericSpec(rawValue)

  const [display, setDisplay] = useState(() =>
    parsed === null ? nonNumericSpecDisplay(rawValue) : '0'
  )

  /** Last numeric value rendered (during or after tween). Null before first tween completes. */
  const floatingRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)

    if (parsed === null) {
      setDisplay(nonNumericSpecDisplay(rawValue))
      floatingRef.current = null
      return undefined
    }

    const from = floatingRef.current === null ? 0 : floatingRef.current
    const t0 = performance.now()

    const step = (now) => {
      const u = Math.min(1, (now - t0) / COUNT_MS)
      const val = Math.round(from + (parsed - from) * easeOutCubic(u))
      setDisplay(String(val))
      floatingRef.current = val
      if (u < 1) rafRef.current = requestAnimationFrame(step)
      else {
        floatingRef.current = parsed
        setDisplay(String(Math.round(parsed)))
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [motorcycleId, parsed, rawValue])

  return <span className={className}>{display}</span>
}

const BG_COLORS = [
  '#4b5563',
  '#78786f',
  '#6aa79b',
  '#b82014',
  '#465160',
  '#25272b',
  '#6b5b64',
  '#343434',
]

const RIDING_TYPES = TERRAINS.map((terrain) => ({ key: terrain, label: terrain }))

/** Same order as sidebar: Tarmac → Rolling Track → All Terrain → Offroad; within each group use performance_level (desc) then name. */
function sortMotorcyclesForShowcase(list) {
  const rankTerrain = (terrain) => {
    const idx = TERRAINS.findIndex((t) => normalizeTerrainKey(t) === normalizeTerrainKey(terrain))
    return idx === -1 ? TERRAINS.length + 50 : idx
  }

  return [...list].sort((a, b) => {
    const tr = rankTerrain(a.terrain)
    const br = rankTerrain(b.terrain)
    if (tr !== br) return tr - br
    const ap = Number(a.performance_level ?? 0)
    const bp = Number(b.performance_level ?? 0)
    if (bp !== ap) return bp - ap
    return String(a.name ?? '').localeCompare(String(b.name ?? ''), undefined, { sensitivity: 'base' })
  })
}

/** VH of the tall scroll runway; tuned so ~8 bikes ≈ earlier 820vh feel. */
function showcaseSectionVh(itemCount) {
  if (itemCount <= 1) return 360
  return 100 + (itemCount - 1) * 103
}

export default function MotorcycleScrollShowcase({ motorcycles = [] }) {
  const sectionRef = useRef(null)
  const [progressIndex, setProgressIndex] = useState(0)

  const items = useMemo(() => sortMotorcyclesForShowcase(motorcycles), [motorcycles])

  const sectionMinHeightVh = useMemo(() => showcaseSectionVh(items.length), [items.length])

  const activeIndex = Math.min(items.length - 1, Math.max(0, Math.round(progressIndex)))
  const active = items[activeIndex]

  useEffect(() => {
    let raf = null

    const handleScroll = () => {
      if (raf) cancelAnimationFrame(raf)

      raf = requestAnimationFrame(() => {
        if (!sectionRef.current || items.length === 0) return

        const rect = sectionRef.current.getBoundingClientRect()
        const maxScroll = sectionRef.current.offsetHeight - window.innerHeight
        const passed = Math.min(Math.max(-rect.top, 0), maxScroll)
        const ratio = maxScroll > 0 ? passed / maxScroll : 0

        setProgressIndex(ratio * (items.length - 1))
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [items.length])

  if (!items.length || !active) return null

  const bg = interpolateColor(BG_COLORS, progressIndex)

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-white/[0.08]"
      style={{ minHeight: `${sectionMinHeightVh}vh` }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: bg }}
      >
        {/* LEFT RIDING CATEGORY NAV — soft gradient rail (avoids harsh black aliasing on 1px lines) */}
        <div className="absolute left-0 top-0 z-30 hidden h-full w-[86px] border-r border-white/[0.06] lg:block">
          <div
            className="pointer-events-none absolute left-[42px] top-[8%] bottom-[8%] w-px opacity-70"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.14) 12%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.14) 88%, transparent 100%)',
            }}
          />

          <div className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-col gap-14">
            {RIDING_TYPES.map((type) => {
              const isActive = normalizeTerrainKey(active.terrain) === normalizeTerrainKey(type.key)

              return (
                <button
                  key={type.key}
                  onClick={() => {
                    const targetIndex = items.findIndex(
                      (moto) => normalizeTerrainKey(moto.terrain) === normalizeTerrainKey(type.key)
                    )

                    if (targetIndex !== -1) {
                      scrollToMoto(sectionRef.current, targetIndex, items.length)
                    }
                  }}
                  className="group flex h-8 items-center gap-4 pl-8"
                >
                  <span
                    className={`h-px transition-all duration-300 ${
                      isActive ? 'w-10 bg-white shadow-[0_0_12px_rgba(255,255,255,0.35)]' : 'w-5 bg-white/[0.16]'
                    }`}
                  />

                  <span
                    className={`origin-left -rotate-90 whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.2em] transition ${
                      isActive ? 'text-white' : 'text-white/35'
                    }`}
                  >
                    {type.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* MOTORCYCLES — FASTER PARALLAX */}
        <div className="absolute inset-0 z-10">
          {items.map((moto, index) => {
            const offset = index - progressIndex
            const bikeTranslateY = offset * 108
            const bikeOpacity = Math.max(0, 1 - Math.abs(offset) * 0.78)
            const bikeScale = 1 - Math.min(Math.abs(offset) * 0.035, 0.08)

            return (
              <div
                key={moto.id}
                className="absolute left-[5vw] top-[56%] w-[52vw] max-w-[1100px]"
                style={{
                  transform: `translateY(calc(-50% + ${bikeTranslateY}vh)) scale(${bikeScale})`,
                  opacity: bikeOpacity,
                  zIndex: 20 - Math.abs(Math.round(offset)),
                }}
              >
                <img
                  src={moto.image_url}
                  alt={moto.name}
                  className="w-full object-contain drop-shadow-[0_60px_50px_rgba(0,0,0,0.34)]"
                />
              </div>
            )
          })}
        </div>

        {/* MODEL LIST — SLOWER PARALLAX */}
        <div className="absolute left-[53vw] top-1/2 z-20 hidden h-[610px] w-[540px] -translate-y-1/2 overflow-hidden lg:block">
          {items.map((moto, index) => {
            const offset = index - progressIndex
            const listTranslateY = offset * 46
            const isActive = index === activeIndex
            const distance = Math.abs(index - progressIndex)

            return (
              <button
                key={moto.id}
                onClick={() => scrollToMoto(sectionRef.current, index, items.length)}
                className="absolute left-0 w-full text-left"
                style={{
                  top: `calc(50% + ${listTranslateY}px)`,
                  transform: 'translateY(-50%)',
                }}
              >
                <span
                  className="block whitespace-nowrap font-inter text-[clamp(36px,3.25vw,54px)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] transition-colors duration-300"
                  style={{
                    color: isActive
                      ? 'rgba(255,255,255,1)'
                      : `rgba(255,255,255,${Math.max(0.12, 0.35 - distance * 0.05)})`,
                  }}
                >
                  {modelCode(moto.name)}
                </span>
              </button>
            )
          })}
        </div>

        {/* RIGHT SPECS */}
        <div className="absolute right-[6vw] top-[51%] z-20 hidden -translate-y-1/2 lg:block">
          <div className="flex items-center gap-12">
            <Spec rawValue={active.engine_cc ?? '—'} label="CC" motorcycleId={active.id} />
            <Spec rawValue={active.seat_height ?? '—'} label="Seat" motorcycleId={active.id} />
            <Spec rawValue={active.horsepower ?? '—'} label="HP" motorcycleId={active.id} />
          </div>
        </div>

        {/* DETAILS LINK */}
        <Link
          to={`/motorcycle/${active.id}`}
          className="absolute bottom-10 right-[6vw] z-40 hidden items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:text-primary lg:inline-flex"
        >
          View details <ArrowRight className="h-4 w-4" />
        </Link>

        {/* MOBILE INFO CARD */}
        <div className="absolute bottom-8 left-6 right-6 z-40 rounded-[24px] border border-white/15 bg-black/20 p-6 backdrop-blur-xl lg:hidden">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-white/60">
            {active.brand} · {active.category}
          </p>

          <h3 className="font-inter text-[32px] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
            {active.name}
          </h3>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="font-inter text-[42px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-white">
                €{active.price_per_day}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/52">
                per day
              </p>
            </div>

            <Link
              to={`/motorcycle/${active.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold tracking-[0.02em] text-black transition hover:bg-primary hover:text-white"
            >
              Details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function scrollToMoto(section, index, total) {
  if (!section) return

  const maxScroll = section.offsetHeight - window.innerHeight
  const target = section.offsetTop + (index / Math.max(total - 1, 1)) * maxScroll

  window.scrollTo({
    top: target,
    behavior: 'smooth',
  })
}

function Spec({ rawValue, label, motorcycleId }) {
  return (
    <div className="text-center text-white">
      <AnimatedSpecNumber
        motorcycleId={motorcycleId}
        rawValue={rawValue}
        className="font-inter text-[44px] font-extrabold leading-none tracking-[-0.03em] tabular-nums"
      />

      <div className="mx-auto mt-2 h-px w-[74px] bg-white" />

      <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.24em] text-white/72">
        {label}
      </p>
    </div>
  )
}

function modelCode(name = '') {
  return name
    .replace(/\(.*?\)/g, '')
    .replace('KTM', '')
    .replace('Kove', '')
    .replace('CF Moto', 'MT')
    .replace('CF', '')
    .replace('Royal Enfield', 'RE')
    .replace('Himalayan', 'HIM')
    .replace('Adventure', 'ADV')
    .replace('Classic', 'CLS')
    .replace('Rally', 'RALLY')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeTerrainKey(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, '')
}

function interpolateColor(colors, index) {
  const i = Math.floor(index)
  const t = index - i

  const c1 = hexToRgb(colors[i] || colors[0])
  const c2 = hexToRgb(colors[i + 1] || colors[i] || colors[0])

  const r = Math.round(c1.r + (c2.r - c1.r) * t)
  const g = Math.round(c1.g + (c2.g - c1.g) * t)
  const b = Math.round(c1.b + (c2.b - c1.b) * t)

  return `rgb(${r}, ${g}, ${b})`
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '')

  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  }
}