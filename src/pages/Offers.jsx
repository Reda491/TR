import { useState, useEffect } from 'react';
import { apiClient } from '@/api/client';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, CalendarDays, ArrowRight, Percent } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const HERO_IMG = 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80';

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await apiClient.entities.Offer.filter({ active: true }, '-created_date', 50);
      setOffers(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Coastal road" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-[11px] tracking-[0.4em] text-primary mb-6">SPECIAL DEALS</p>
            <h1 className="font-syne text-5xl md:text-7xl font-black text-foreground tracking-tighter">
              {"OFFERS &"}
              <br />
              PACKAGES
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            label="CURRENT PROMOTIONS"
            title="Ride More, Save More"
            description="Take advantage of our seasonal deals and multi-day packages for unforgettable adventures at unbeatable prices."
          />

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border rounded-lg">
              <Tag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-syne text-xl text-muted-foreground">No active offers right now.</p>
              <p className="font-inter text-sm text-muted-foreground mt-2">Check back soon for new deals.</p>
              <Link
                to="/fleet"
                className="inline-flex items-center gap-2 font-mono text-sm tracking-wider text-primary mt-6 hover:text-foreground transition-colors"
              >
                BROWSE FLEET <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map((offer, i) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500"
                >
                  {offer.image_url && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={offer.image_url}
                        alt={offer.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {offer.discount_percent && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground font-mono text-sm font-bold px-3 py-1 rounded">
                          -{offer.discount_percent}%
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    {offer.terrain_type && offer.terrain_type !== 'Any' && (
                      <span className="font-mono text-[10px] tracking-[0.2em] text-primary">
                        {offer.terrain_type.toUpperCase()} RIDES
                      </span>
                    )}
                    <h3 className="font-syne text-xl font-bold text-foreground mt-2 mb-3">
                      {offer.title}
                    </h3>
                    <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-4">
                      {offer.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      {offer.min_days && (
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-3.5 h-3.5 text-primary" />
                          <span className="font-mono text-xs text-muted-foreground">
                            MIN {offer.min_days} DAYS
                          </span>
                        </div>
                      )}
                      {offer.discount_percent && (
                        <div className="flex items-center gap-2">
                          <Percent className="w-3.5 h-3.5 text-accent" />
                          <span className="font-mono text-xs text-accent font-bold">
                            SAVE {offer.discount_percent}%
                          </span>
                        </div>
                      )}
                    </div>

                    <Link
                      to="/fleet"
                      className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-primary mt-4 hover:text-foreground transition-colors"
                    >
                      BROWSE ELIGIBLE BIKES <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}