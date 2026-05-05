import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { apiClient } from '@/api/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import FleetCard from '../components/FleetCard'
import TerrainFilter from '../components/TerrainFilter'
import { formatFleetFound, translateCategory, t, useLang } from '../lib/Lang.js'

export default function Fleet() {
  const lang = useLang()
  const isFr = lang === 'fr'

  const [motorcycles, setMotorcycles] = useState([])
  const [loading, setLoading] = useState(true)
  const [terrain, setTerrain] = useState('all')
  const [category, setCategory] = useState('all')
  const [perfRange, setPerfRange] = useState([1])
  const [sortBy, setSortBy] = useState('price_asc')

  useEffect(() => {
    const load = async () => {
      const data = await apiClient.entities.Motorcycle.list()
      setMotorcycles(data)
      setLoading(false)
    }

    load()
  }, [])

  const categories = useMemo(() => {
    return ['all', ...new Set(motorcycles.map((moto) => moto.category).filter(Boolean))]
  }, [motorcycles])

  const filtered = useMemo(() => {
    let result = [...motorcycles]

    if (terrain !== 'all') result = result.filter((moto) => moto.terrain === terrain)
    if (category !== 'all') result = result.filter((moto) => moto.category === category)
    if (perfRange[0] > 1) {
      result = result.filter((moto) => (moto.performance_level || 5) >= perfRange[0])
    }

    if (sortBy === 'price_asc') {
      result.sort((a, b) => (a.price_per_day || 0) - (b.price_per_day || 0))
    }

    if (sortBy === 'price_desc') {
      result.sort((a, b) => (b.price_per_day || 0) - (a.price_per_day || 0))
    }

    if (sortBy === 'power') {
      result.sort((a, b) => (b.horsepower || 0) - (a.horsepower || 0))
    }

    return result
  }, [motorcycles, terrain, category, perfRange, sortBy])

  const triggerClass =
    'h-11 rounded-full border border-border bg-secondary/70 px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-white'

  return (
    <main className="page-fade min-h-screen pb-32 pt-32">
      <div className="container-narrow">
        <header className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-primary"
          >
            {'\u2014'} {t(lang, 'fleet.label')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04 }}
            className="heading-display text-[clamp(40px,5vw,80px)]"
          >
            {t(lang, 'fleet.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-muted-foreground dark:text-white/52"
          >
            {t(lang, 'fleet.desc')}
          </motion.p>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.16 }}
          className="mb-12 rounded-[20px] border border-border bg-card p-6 dark:border-white/[0.08] dark:bg-white/[0.035]"
        >
          <div className="grid gap-7 lg:grid-cols-[1.6fr_0.7fr_0.9fr_0.7fr] lg:items-center">
            <div>
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground dark:text-white/38">
                {t(lang, 'fleet.terrain')}
              </p>
              <TerrainFilter active={terrain} onChange={setTerrain} />
            </div>

            <div>
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground dark:text-white/38">
                {t(lang, 'fleet.category')}
              </p>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className={triggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item) => (
                    <SelectItem key={item} value={item} className="font-mono text-xs uppercase">
                      {item === 'all'
                        ? isFr
                          ? 'Tout'
                          : 'All'
                        : translateCategory(lang, item)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground dark:text-white/38">
                {`${t(lang, 'fleet.performance')} \u2265 ${perfRange[0]}`}
              </p>
              <Slider
                min={1}
                max={10}
                step={1}
                value={perfRange}
                onValueChange={setPerfRange}
                className="mt-3"
              />
              <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground dark:text-white/35">
                <span>{t(lang, 'fleet.leisure')}</span>
                <span>{t(lang, 'fleet.extreme')}</span>
              </div>
            </div>

            <div>
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground dark:text-white/38">
                {t(lang, 'fleet.sort')}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className={triggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price_asc" className="font-mono text-xs uppercase">
                    {isFr ? 'Prix : croissant' : 'Price: low to high'}
                  </SelectItem>
                  <SelectItem value="price_desc" className="font-mono text-xs uppercase">
                    {isFr ? 'Prix : d\u00e9croissant' : 'Price: high to low'}
                  </SelectItem>
                  <SelectItem value="power" className="font-mono text-xs uppercase">
                    {t(lang, 'fleet.power')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.section>

        <motion.p
          key={filtered.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground dark:text-white/42"
        >
          {formatFleetFound(lang, filtered.length)}
        </motion.p>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-border py-24 text-center dark:border-white/[0.12]">
            <p className="font-inter text-2xl font-extrabold tracking-[-0.03em] text-foreground dark:text-white/75">
              {t(lang, 'fleet.no_results')}
            </p>
            <p className="mt-3 text-sm text-muted-foreground dark:text-white/45">
              {t(lang, 'fleet.adjust_filters')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((moto, index) => (
              <FleetCard key={moto.id} motorcycle={moto} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
