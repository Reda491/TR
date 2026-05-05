import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, Wrench, Award, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import TechStat from '../components/TechStat';

const HERO_IMG = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1600&q=80';

const VALUES = [
  { icon: Target, title: 'Precision', desc: 'Every bike is maintained to factory standards. No compromises on safety or performance.' },
  { icon: Users, title: 'Community', desc: 'We ride together. Join our group rides and connect with fellow enthusiasts.' },
  { icon: Wrench, title: 'Expertise', desc: 'Our team of certified mechanics ensures peak condition for every machine.' },
  { icon: Award, title: 'Excellence', desc: 'Over 10 years of delivering premium motorcycle experiences across Morocco.' },
];

const STATS = [
  { label: 'MACHINES', value: '40+', unit: 'IN FLEET' },
  { label: 'YEARS', value: '10+', unit: 'EXPERIENCE' },
  { label: 'RIDERS', value: '5K+', unit: 'SERVED' },
  { label: 'ROUTES', value: '25+', unit: 'CURATED' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Motorcycle detail" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-[11px] tracking-[0.4em] text-primary mb-6">WHO WE ARE</p>
            <h1 className="font-syne text-5xl md:text-7xl font-black text-foreground tracking-tighter">
              BUILT FOR<br />THE ROAD
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <TechStat key={stat.label} label={stat.label} value={stat.value} unit={stat.unit} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeader
                label="OUR STORY"
                title="Born From Passion"
              />
              <div className="space-y-6 font-inter text-base text-muted-foreground leading-relaxed">
                <p>
                  MotoVerse was founded by riders, for riders. What started as a small garage with three bikes and a dream has evolved into Morocco's premier motorcycle rental experience.
                </p>
                <p>
                  We believe every ride should be transformative. That's why we curate not just machines, but complete experiences — from hand-picked routes through the Atlas Mountains to coastal highways along the Mediterranean.
                </p>
                <p>
                  Our fleet is constantly evolving, featuring the latest models from the world's best manufacturers. Each motorcycle is maintained to the highest standards by our in-house team of certified mechanics.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-5 p-5 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-syne text-lg font-bold text-foreground mb-1">{v.title}</h3>
                    <p className="font-inter text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] text-primary mb-6">JOIN THE RIDE</p>
            <h2 className="font-syne text-4xl md:text-6xl font-black text-foreground tracking-tight mb-6">
              Ready to Explore?
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-lg mx-auto mb-10">
              From the Sahara dunes to the Rif mountains — your next chapter begins with the twist of a throttle.
            </p>
            <Link
              to="/fleet"
              className="inline-flex items-center gap-3 font-mono text-sm tracking-[0.2em] px-12 py-5 bg-primary text-primary-foreground rounded hover:animate-pulse-glow transition-all"
            >
              VIEW THE FLEET <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}