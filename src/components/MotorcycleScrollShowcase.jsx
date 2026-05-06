import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const BG_COLORS = [
  '#050608', // seamless with website background
  '#2a2521', // dark earth
  '#5a4536', // clay brown
  '#8a4b2f', // terracotta
  '#b05a32', // burnt orange
  '#7d6f5f', // warm stone
  '#55675f', // olive atlas
  '#2d3534', // dark green-grey
]

const RIDING_TYPES = [
  { key: 'Tarmac', label: 'Tarmac' },
  { key: 'Rolling Track', label: 'Rolling Track' },
  { key: 'All Terrain', label: 'All Terrain' },
  { key: 'Offroad', label: 'Offroad' },
]

/** Vertical spacing between model lines in the stack (px) */
const LIST_LINE_STEP = 56

export default function MotorcycleScrollShowcase({ motorcycles = [] }) {
  const sectionRef = useRef(null)
  const [progressIndex, setProgressIndex] = useState(0)

  const items = useMemo(() => motorcycles.slice(0, 8), [motorcycles])
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
    <section ref={sectionRef} className="relative h-[820vh] border-y border-white/[0.08]">
      <div
        className="sticky top-0 h-screen overflow-hidden transition-[background-color] duration-500 ease-out"
        style={{
          backgroundColor: bg,
          ...{ '--motor-showcase-copy-inset': 'max(5.75rem, 44%)' },
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-40 bg-gradient-to-b from-[#050608] via-[#050608]/55 to-transparent"
          style={{ height: 'clamp(5.5rem, 14vh, 10rem)' }}
        />

        {/* LEFT RIDING CATEGORY NAV */}
        <div className="absolute left-0 top-0 z-30 hidden h-full w-[86px] border-r border-white/28 lg:block">
          <div className="absolute left-[43px] top-0 h-full w-px bg-white/28" />

          <div className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-col gap-14">
            {RIDING_TYPES.map((type) => {
              const isActive = normalize(active.terrain) === normalize(type.key)

              return (
                <button
                  key={type.key}
                  onClick={() => {
                    const targetIndex = items.findIndex(
                      (moto) => normalize(moto.terrain) === normalize(type.key)
                    )

                    if (targetIndex !== -1) {
                      scrollToMoto(sectionRef.current, targetIndex, items.length)
                    }
                  }}
                  className="group flex h-8 items-center gap-4 pl-8"
                >
                  <span
                    className={`h-px transition-all duration-300 ${
                      isActive ? 'w-10 bg-white' : 'w-5 bg-white/22'
                    }`}
                  />

                  <span
                    className={`origin-left -rotate-90 whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.2em] transition ${
                      isActive ? 'text-white' : 'text-white/25'
                    }`}
                  >
                    {type.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* MOTORCYCLES */}
        <div className="absolute inset-0 z-10">
          {items.map((moto, index) => {
            const offset = index - progressIndex
            const dist = Math.abs(offset)
            const bikeTranslateY = offset * 108
            const bikeOpacity = Math.max(0, 1 - dist * 0.78)
            // Smaller base art; center bike reads larger — strong falloff with scroll distance
            const bikeScale = Math.max(0.72, 1 - dist * 0.12)

            return (
              <div
                key={moto.id}
                className="motor-showcase-bike-x absolute top-[56%] left-[6%] sm:left-[5vw] lg:-translate-x-1/2"
                style={{
                  opacity: bikeOpacity,
                  zIndex: 20 - Math.abs(Math.round(offset)),
                }}
              >
                <div
                  className="w-[min(88vw,520px)] max-w-[520px] sm:w-[min(82vw,600px)] sm:max-w-[600px] lg:w-[min(34vw,600px)] lg:max-w-[600px] xl:w-[min(36vw,680px)] xl:max-w-[680px] 2xl:max-w-[740px]"
                  style={{
                    transform: `translateY(calc(-50% + ${bikeTranslateY}vh)) scale(${bikeScale})`,
                  }}
                >
                  <img
                    src={moto.image_url}
                    alt={moto.name}
                    className="w-full object-contain drop-shadow-[0_60px_50px_rgba(0,0,0,0.34)]"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* DESKTOP: groupe liste + specs (max-width + ml-auto) pour éviter le vide entre les deux blocs */}
        <div
          className="absolute top-1/2 z-20 hidden h-[min(620px,80vh)] min-h-[380px] -translate-y-1/2 lg:block xl:h-[640px] xl:min-h-0"
          style={{
            left: 'var(--motor-showcase-copy-inset)',
            right: 'max(1rem, 3vw, env(safe-area-inset-right, 0px))',
          }}
        >
          <div className="ml-auto flex h-full max-w-[min(800px,100%)] items-center gap-8 pl-4 max-[1100px]:max-w-[min(640px,100%)] max-[1100px]:gap-6 xl:max-w-[min(880px,100%)] xl:gap-11 2xl:gap-12">
            <div className="relative h-full min-w-0 w-[min(46%,320px)] shrink-0 overflow-hidden pr-2 sm:w-[min(48%,360px)] xl:w-[min(52%,400px)] xl:pr-3">
              {items.map((moto, index) => {
              const offset = index - progressIndex
              const listTranslateY = offset * LIST_LINE_STEP
              const isActive = index === activeIndex
              const distance = Math.abs(index - progressIndex)

              return (
                <button
                  key={moto.id}
                  type="button"
                  onClick={() => scrollToMoto(sectionRef.current, index, items.length)}
                  className="absolute left-0 max-w-full py-1.5 text-left"
                  style={{
                    top: `calc(50% + ${listTranslateY}px)`,
                    transform: 'translateY(-50%)',
                  }}
                >
                  <span
                    className="block min-w-0 max-w-full whitespace-nowrap font-inter text-[clamp(22px,min(5vw,3.25vw),52px)] font-extrabold uppercase leading-[1.05] tracking-[-0.035em] transition-colors duration-300"
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

            <div className="flex shrink-0 items-center gap-5 border-l border-white/[0.08] pl-6 max-[1100px]:gap-3 max-[1100px]:pl-4 xl:gap-8 xl:pl-8 2xl:gap-10">
              <Spec value={active.engine_cc || '—'} label="CC" />
              <Spec value={active.seat_height || '—'} label="Seat" />
              <Spec value={active.horsepower || '—'} label="HP" />
            </div>
          </div>
        </div>

        <Link
          to={`/motorcycle/${active.id}`}
          className="absolute bottom-10 right-[max(0.75rem,3vw)] z-40 hidden items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:text-primary lg:inline-flex"
        >
          View details <ArrowRight className="h-4 w-4" />
        </Link>

        {/* MOBILE INFO */}
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

function Spec({ value, label }) {
  return (
    <div className="min-w-0 max-w-[5.25rem] text-center text-white sm:max-w-[6rem] xl:max-w-none">
      <span className="font-inter text-[clamp(1.375rem,min(8vw,5.5vmin),2.75rem)] font-extrabold leading-none tracking-[-0.03em] tabular-nums">
        {value}
      </span>

      <div className="mx-auto mt-1.5 h-px w-[min(74px,100%)] bg-white/95 xl:mt-2" />

      <p className="mt-1 font-mono text-[7px] uppercase leading-tight tracking-[0.2em] text-white/72 xl:mt-2 xl:text-[8px] xl:tracking-[0.24em]">
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

function normalize(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
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