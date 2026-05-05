import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Weight, Gauge, ArrowUpRight } from 'lucide-react';

export default function FleetCard({ motorcycle, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/motorcycle/${motorcycle.id}`} className="group block">
        <div className="relative overflow-hidden rounded-[18px] border border-white/[0.06] bg-[#07080d] transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(255,62,0,0.08)]">
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="font-mono text-[9px] tracking-[0.2em] text-primary/80 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
              {motorcycle.category?.toUpperCase() || 'SPORT'}
            </span>
          </div>

          {/* Arrow icon */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>

          {/* Availability dot */}
          {motorcycle.available !== false && (
            <div className="absolute top-[52px] right-4 z-10 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[9px] tracking-wider text-accent">AVAIL.</span>
            </div>
          )}

          {/* Image */}
          <div className="relative aspect-[3/2] overflow-hidden bg-[#07080d]">
            {motorcycle.image_url ? (
              <img
                src={motorcycle.image_url}
                alt={motorcycle.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <Gauge className="w-12 h-12 text-muted-foreground/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-transparent to-transparent opacity-90" />
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground mb-1">
                  {motorcycle.brand?.toUpperCase()}
                </p>
                <h3 className="font-syne text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {motorcycle.name}
                </h3>
              </div>
              <div className="text-right">
                <p className="font-syne text-[40px] font-black text-primary leading-none">
                  €{motorcycle.price_per_day}
                </p>
                <p className="font-mono text-[9px] tracking-wider text-muted-foreground mt-0.5">/day</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-5 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-primary/70" />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {motorcycle.horsepower || '—'} hp
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Weight className="w-3 h-3 text-primary/70" />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {motorcycle.weight || '—'} kg
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3 h-3 text-primary/70" />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {motorcycle.engine_cc || '—'} cc
                </span>
              </div>

              {/* Performance bar */}
              {motorcycle.performance_level && (
                <div className="ml-auto flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          i < motorcycle.performance_level ? 'bg-primary' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}