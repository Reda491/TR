import { motion } from 'framer-motion'
import { Globe, Mountain, TreePine, Waves } from 'lucide-react'
import { useLang } from '../lib/Lang.js'

function translateTerrainLabel(lang, key) {
  if (lang === 'fr') {
    switch (key) {
      case 'all':
        return 'Tout'
      case 'Tarmac':
        return 'Asphalte'
      case 'Dirt':
        return 'Terre'
      case 'Coastal':
        return 'C\u00f4tier'
      default:
        return key
    }
  }

  return key === 'all' ? 'All' : key
}

export default function TerrainFilter({ active, onChange }) {
  const lang = useLang()

  return (
    <div className="inline-flex flex-wrap gap-1.5 rounded-full border border-border bg-secondary/80 p-1.5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.045]">
      {[
        { key: 'all', icon: Globe },
        { key: 'Tarmac', icon: Mountain },
        { key: 'Dirt', icon: TreePine },
        { key: 'Coastal', icon: Waves },
      ].map((terrain) => {
        const isActive = active === terrain.key
        return (
          <button
            key={terrain.key}
            onClick={() => onChange(terrain.key)}
            className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold transition ${
              isActive
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground dark:text-white/46 dark:hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="terrain-active"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 440, damping: 34 }}
              />
            )}
            <terrain.icon className="relative z-10 h-3.5 w-3.5" />
            <span className="relative z-10">{translateTerrainLabel(lang, terrain.key)}</span>
          </button>
        )
      })}
    </div>
  )
}
