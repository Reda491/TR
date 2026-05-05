import { useState, useEffect, useMemo } from 'react';
import { useLang, t } from '../lib/Lang.js';
import { apiClient } from '@/api/client';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import FleetCard from '../components/FleetCard';
import TerrainFilter from '../components/TerrainFilter';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Fleet() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [terrain, setTerrain] = useState('all');
  const [category, setCategory] = useState('all');
  const [perfRange, setPerfRange] = useState([1]);
  const [sortBy, setSortBy] = useState('price_asc');
  const lang = useLang();

  useEffect(() => {
    const load = async () => {
      const data = await apiClient.entities.Motorcycle.list('-created_date', 100);
      setMotorcycles(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = [...motorcycles];
    if (terrain !== 'all') result = result.filter((m) => m.terrain === terrain);
    if (category !== 'all') result = result.filter((m) => m.category === category);
    if (perfRange[0] > 1) result = result.filter((m) => (m.performance_level || 5) >= perfRange[0]);

    if (sortBy === 'price_asc') result.sort((a, b) => (a.price_per_day || 0) - (b.price_per_day || 0));
    else if (sortBy === 'price_desc') result.sort((a, b) => (b.price_per_day || 0) - (a.price_per_day || 0));
    else if (sortBy === 'power') result.sort((a, b) => (b.horsepower || 0) - (a.horsepower || 0));

    return result;
  }, [motorcycles, terrain, category, perfRange, sortBy]);

  const categories = ['all', ...new Set(motorcycles.map((m) => m.category).filter(Boolean))];

  return (
    <div className="pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          label={t(lang,'fleet.label')}
          title={t(lang,'fleet.title')}
          description={t(lang,'fleet.desc')}
        />

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-12 p-6 bg-card border border-border rounded-lg">
          <div className="flex-1">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-3">{t(lang,'fleet.terrain')}</p>
            <TerrainFilter active={terrain} onChange={setTerrain} />
          </div>

          <div className="w-full lg:w-48">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-3">{t(lang,'fleet.category')}</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-secondary border-border font-mono text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c} className="font-mono text-xs">
                    {c === 'all' ? 'ALL' : c.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full lg:w-48">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-3">
              {t(lang,'fleet.performance')} ≥ {perfRange[0]}
            </p>
            <Slider
              min={1}
              max={10}
              step={1}
              value={perfRange}
              onValueChange={setPerfRange}
              className="mt-2"
            />
            <div className="flex justify-between font-mono text-[9px] text-muted-foreground mt-1">
            <span>{t(lang,'fleet.leisure')}</span>
            <span>{t(lang,'fleet.extreme')}</span>
            </div>
          </div>

          <div className="w-full lg:w-44">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-3">{t(lang,'fleet.sort')}</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-secondary border-border font-mono text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc" className="font-mono text-xs">{t(lang,'fleet.price_asc')}</SelectItem>
                <SelectItem value="price_desc" className="font-mono text-xs">{t(lang,'fleet.price_desc')}</SelectItem>
                <SelectItem value="power" className="font-mono text-xs">{t(lang,'fleet.power')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <motion.p
          key={filtered.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs text-muted-foreground tracking-wider mb-8"
        >
          {t(lang,'fleet.found')(filtered.length)}
        </motion.p>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border rounded-lg">
            <p className="font-syne text-xl text-muted-foreground">{t(lang,'fleet.no_results')}</p>
            <p className="font-inter text-sm text-muted-foreground mt-2">{t(lang,'fleet.adjust_filters')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((moto, i) => (
              <FleetCard key={moto.id} motorcycle={moto} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}