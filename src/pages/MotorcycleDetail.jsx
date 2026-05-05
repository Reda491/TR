import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '@/api/client';
import { motion } from 'framer-motion';
import { ArrowLeft, Navigation, Briefcase, Shield, Gauge } from 'lucide-react';
import BookingForm from '../components/BookingForm';

export default function MotorcycleDetail() {
  const { motorcycleId } = useParams();
  const [moto, setMoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.entities.Motorcycle.get(motorcycleId).then((data) => {
      setMoto(data);
      setLoading(false);
    });
  }, [motorcycleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!moto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-sm text-muted-foreground">Motorcycle not found.</p>
      </div>
    );
  }

  const inclusions = [
    { key: 'includes_gps', label: 'GPS Navigation', icon: Navigation },
    { key: 'includes_panniers', label: 'Side Panniers', icon: Briefcase },
    { key: 'includes_insurance', label: 'Insurance Included', icon: Shield },
  ];

  const techSpecs = [
    { label: 'Engine', value: moto.engine_cc, unit: 'cc' },
    { label: 'Power', value: moto.horsepower, unit: 'hp' },
    { label: 'Torque', value: moto.torque, unit: 'Nm' },
    { label: 'Weight', value: moto.weight, unit: 'kg' },
    { label: 'Seat Height', value: moto.seat_height, unit: 'mm' },
    { label: 'Range', value: moto.fuel_range, unit: 'km' },
  ];

  return (
    <div className="pt-24 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to="/fleet"
            className="inline-flex items-center gap-2 font-inter text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Fleet
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="font-mono text-[10px] tracking-[0.25em] text-primary mb-3">
                {moto.category?.toUpperCase()} · {moto.terrain?.toUpperCase()}
              </p>
              <h1 className="font-syne text-5xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9] text-foreground">
                {moto.name}
              </h1>
              <p className="font-inter text-muted-foreground mt-2">{moto.brand}</p>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden glass"
            >
              {moto.image_url ? (
                <img src={moto.image_url} alt={moto.name} className="w-full aspect-[16/10] object-cover" />
              ) : (
                <div className="w-full aspect-[16/10] flex items-center justify-center bg-card">
                  <Gauge className="w-16 h-16 text-muted-foreground/20" />
                </div>
              )}

              {/* Price */}
              <div className="absolute bottom-5 right-5 glass rounded-xl px-5 py-3">
                <p className="font-syne text-3xl font-black text-primary leading-none">€{moto.price_per_day}</p>
                <p className="font-mono text-[9px] tracking-wider text-muted-foreground text-right mt-0.5">per day</p>
              </div>

              {/* Inclusions */}
              <div className="absolute top-5 left-5 flex flex-col gap-2">
                {inclusions.map((inc) =>
                  moto[inc.key] ? (
                    <div key={inc.key} className="flex items-center gap-2 glass rounded-lg px-3 py-1.5">
                      <inc.icon className="w-3 h-3 text-accent" />
                      <span className="font-mono text-[9px] tracking-wider text-foreground">{inc.label}</span>
                    </div>
                  ) : null
                )}
              </div>
            </motion.div>

            {/* Tech Specs */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.04]">
                <p className="font-mono text-[9px] tracking-[0.25em] text-primary">TECHNICAL SPECIFICATIONS</p>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6">
                {techSpecs.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="text-center px-4 py-6 border-r border-white/[0.04] last:border-r-0"
                  >
                    <p className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground mb-2">
                      {spec.label.toUpperCase()}
                    </p>
                    <p className="font-syne text-2xl font-black text-foreground">{spec.value || '—'}</p>
                    {spec.unit && (
                      <p className="font-mono text-[8px] tracking-wider text-primary mt-0.5">{spec.unit}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Performance Bar */}
            {moto.performance_level && (
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-mono text-[9px] tracking-[0.25em] text-primary">PERFORMANCE LEVEL</p>
                  <span className="font-syne text-lg font-black text-foreground">{moto.performance_level}/10</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${moto.performance_level * 10}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <div className="flex justify-between font-mono text-[8px] text-muted-foreground mt-2">
                  <span>LEISURE</span>
                  <span>EXTREME</span>
                </div>
              </div>
            )}

            {/* Description */}
            {moto.description && (
              <div className="glass rounded-2xl p-6">
                <p className="font-mono text-[9px] tracking-[0.25em] text-primary mb-4">ABOUT THIS MACHINE</p>
                <p className="font-inter text-base text-muted-foreground leading-relaxed">{moto.description}</p>
              </div>
            )}
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 glass rounded-2xl p-6">
              <BookingForm motorcycle={moto} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}