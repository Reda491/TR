import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Map, ShieldCheck, Users, Wrench } from 'lucide-react'
import { useLang } from '../lib/Lang.js'

const HERO_IMG =
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=2200&q=85'

const VALUES = [
  {
    icon: Wrench,
    titleEn: 'Maintained for real trips',
    titleFr: 'Entretenu pour de vraies sorties',
    descEn:
      'Each motorcycle is checked, prepared, and kept ready for Moroccan terrain, not just showroom photos.',
    descFr:
      'Chaque moto est contrôlée, préparée et tenue prête pour le terrain marocain — pas seulement pour les photos du showroom.',
  },
  {
    icon: Map,
    titleEn: 'Route intelligence',
    titleFr: 'Intelligence d’itinéraire',
    descEn: 'We help riders choose routes according to duration, riding level, terrain, and season.',
    descFr: 'Nous aidons les riders à choisir des itinéraires selon la durée, le niveau, le terrain et la saison.',
  },
  {
    icon: ShieldCheck,
    titleEn: 'Safety-first experience',
    titleFr: 'Une expérience axée sécurité',
    descEn: 'Rental conditions, insurance support, and technical preparation are handled with clarity.',
    descFr: 'Les conditions de location, l’assistance assurance et la préparation technique sont gérées avec clarté.',
  },
  {
    icon: Users,
    titleEn: 'Rider-focused service',
    titleFr: 'Un service pensé pour les riders',
    descEn: 'The experience is designed around riders: practical, responsive, and direct.',
    descFr: 'L’expérience est conçue autour des riders : pratique, réactive et directe.',
  },
]

const STATS = [
  { number: '40+', labelEn: 'Machines', labelFr: 'Motos', unitEn: 'In fleet', unitFr: 'en flotte' },
  { number: '10+', labelEn: 'Years', labelFr: 'Années', unitEn: 'Experience', unitFr: "d’expertise" },
  { number: '5K+', labelEn: 'Riders', labelFr: 'Motards', unitEn: 'Served', unitFr: 'servis' },
  { number: '25+', labelEn: 'Routes', labelFr: 'Itinéraires', unitEn: 'Curated', unitFr: 'sélectionnés' },
]

export default function About() {
  const lang = useLang()
  const isFr = lang === 'fr'

  return (
    <main className="page-fade min-h-screen">
      <section className="relative flex min-h-[62vh] items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Motorcycle detail" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/62" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#050608]" />
          <div className="absolute inset-0 grid-overlay opacity-[0.18]" />
        </div>

        <div className="relative z-10 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48 }}
            className="mb-5 font-mono text-[10px] uppercase tracking-[0.36em] text-primary"
          >
            {isFr ? 'Qui nous sommes' : 'Who we are'}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.05 }}
            className="heading-display text-[clamp(44px,5.8vw,88px)] text-white"
          >
            {isFr ? 'Conçu pour' : 'Built for'}
            <br />
            {isFr ? 'la route' : 'the Road'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.12 }}
            className="mx-auto mt-7 max-w-[560px] text-[17px] leading-relaxed text-white/70"
          >
            {isFr
              ? 'Une expérience de location premium façonnée autour du Maroc, avec des motos fiables et un accompagnement pratique pour les riders.'
              : 'A premium motorcycle rental experience shaped around Morocco, reliable machines, and practical rider support.'}
          </motion.p>
        </div>
      </section>

      <section className="border-y border-border bg-card dark:border-white/[0.08] dark:bg-white/[0.025]">
        <div className="container-narrow grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.labelEn}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.42, delay: index * 0.04 }}
              className="border-r border-border px-6 py-8 last:border-r-0 dark:border-white/[0.06]"
            >
              <p className="font-inter text-[44px] font-extrabold leading-none tracking-[-0.03em] text-foreground dark:text-white">
                {stat.number}
              </p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
                {isFr ? stat.labelFr : stat.labelEn}
              </p>
              <p className="mt-1 text-sm text-muted-foreground dark:text-white/42">
                {isFr ? stat.unitFr : stat.unitEn}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-28">
        <div className="container-narrow grid grid-cols-1 gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
              — {isFr ? 'Notre histoire' : 'Our story'}
            </p>

            <h2 className="heading-display text-[clamp(36px,4vw,56px)]">
              {isFr ? 'Né de' : 'Born from'}
              <br />
              {isFr ? 'la culture du pilotage' : 'Riding Culture'}
            </h2>

            <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-muted-foreground dark:text-white/55">
              <p>
                {isFr
                  ? 'Tenere Riders est pensé pour ceux qui veulent explorer le Maroc en moto avec confiance, clarté et la bonne machine pour la route qui s’ouvre devant vous.'
                  : 'Tenere Riders is built for people who want to explore Morocco by motorcycle with confidence, clarity, and the right machine for the road ahead.'}
              </p>

              <p>
                {isFr
                  ? 'Le service combine une flotte préparée, une connaissance pratique des itinéraires et un processus de location direct. Objectif simple : rendre la sortie plus facile à planifier et plus agréable à vivre.'
                  : 'The service combines a prepared fleet, practical route knowledge, and a direct rental process. The goal is simple: make the ride easier to plan and better to experience.'}
              </p>

              <p>
                {isFr
                  ? 'De Marrakech aux montagnes de l’Atlas, aux routes côtières et aux approches désertiques, chaque sortie est traitée comme une expérience complète — pas seulement une réservation.'
                  : 'From Marrakech to the Atlas mountains, coastal roads, and desert approaches, every ride is treated as a complete experience — not only a booking.'}
              </p>
            </div>

            <Link
              to="/fleet"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition hover:shadow-[0_0_34px_rgba(255,78,28,0.32)]"
            >
              {isFr ? 'Voir la flotte' : 'View the fleet'} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-5">
            {VALUES.map((value, index) => (
              <motion.div
                key={isFr ? value.titleFr : value.titleEn}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="flex gap-5 rounded-[22px] border border-border bg-card p-6 transition hover:border-primary/28 dark:border-white/[0.08] dark:bg-white/[0.035]"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[16px] border border-primary/22 bg-primary/10">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-inter text-[20px] font-bold tracking-[-0.02em] text-foreground dark:text-white">
                    {isFr ? value.titleFr : value.titleEn}
                  </h3>

                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground dark:text-white/52">
                    {isFr ? value.descFr : value.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-narrow">
          <div className="rounded-[28px] border border-border bg-card px-8 py-20 text-center shadow-sm md:px-16 dark:border-white/[0.08] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,78,28,0.18),transparent_34rem),linear-gradient(135deg,rgba(255,78,28,0.12),rgba(255,255,255,0.02))] dark:shadow-none">
            <Award className="mx-auto mb-6 h-8 w-8 text-primary" />

            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.34em] text-primary">
              {isFr ? 'Rejoignez l’aventure' : 'Join the ride'}
            </p>

            <h2 className="heading-display text-[clamp(36px,4.2vw,64px)]">
              {isFr ? 'Prêt à explorer ?' : 'Ready to Explore?'}
            </h2>

            <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed text-muted-foreground dark:text-white/55">
              {isFr
                ? 'De l’approche du Sahara aux routes de montagne, votre prochain itinéraire commence avec la bonne moto.'
                : 'From the Sahara approach to mountain roads, your next route starts with the right machine.'}
            </p>

            <Link
              to="/fleet"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-[14px] font-bold text-primary-foreground transition hover:shadow-[0_0_35px_rgba(255,78,28,0.32)]"
            >
              {isFr ? 'Parcourir la flotte' : 'Browse fleet'} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}