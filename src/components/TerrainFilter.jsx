import { motion } from 'framer-motion';
import { Mountain, Waves, TreePine, Globe } from 'lucide-react';

const TERRAINS = [
  { key: 'all', label: 'All', icon: Globe },
  { key: 'Tarmac', label: 'Tarmac', icon: Mountain },
  { key: 'Dirt', label: 'Dirt', icon: TreePine },
  { key: 'Coastal', label: 'Coastal', icon: Waves },
];

export default function TerrainFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 glass rounded-full p-1.5">
      {TERRAINS.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full font-inter text-xs font-medium transition-all duration-300 ${
            active === t.key
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {active === t.key && (
            <motion.div
              layoutId="terrain-bg"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
          )}
          <t.icon className="w-3 h-3 relative z-10" />
          <span className="relative z-10">{t.label}</span>
        </button>
      ))}
    </div>
  );
}