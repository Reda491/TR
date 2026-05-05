import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Percent, Tag } from 'lucide-react'
import { apiClient } from '@/api/client'
import { useLang } from '../lib/Lang.js'

const HERO_IMG =
  'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=2200&q=85'

const DEFAULT_PACKAGES = [
  {
    id: 'atlas',
    title: 'Atlas Escape',
    terrain_type: 'Mountain',
    description:
      'A flexible multi-day riding experience through mountain roads, scenic passes, and curated viewpoints.',
    discount_percent: 10,
    min_days: 3,
    image_url:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'desert',
    title: 'Desert Approach',
    terrain_type: 'Adventure',
    description:
      'Built for riders who want open roads, remote landscapes, and a stronger expedition feel.',
    discount_percent: 15,
    min_days: 5,
    image_url:
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'weekend',
    title: 'Weekend Ride',
    terrain_type: 'Road',
    description:
      'A simple short-format package for riders looking for a clean, premium weekend experience.',
    discount_percent: 5,
    min_days: 2,
    image_url:
      'https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=1400&q=85',
  },
]

export default function Offers() {
  const lang = useLang()
  const isFr = lang === 'fr'
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const data = await apiClient.entities.Offer.filter()
      setOffers(data)
      setLoading(false)
    }

    load()
  }, [])

  const items = offers.length > 0 ? offers : DEFAULT_PACKAGES

  const localizedItems = items.map((item) => {
    if (!isFr) return item

    // Localize both API offers (week-bundle/early-bird/gravel-duo) and default packages (atlas/desert/weekend)
    switch (item.id) {
      case 'atlas':
        return {
          ...item,
          title: 'Échappée Atlas',
          description:
            'Une expérience de conduite flexible sur plusieurs jours : routes de montagne, cols panoramiques et points de vue soigneusement choisis.',
          terrain_type: 'Montagne',
        }
      case 'desert':
        return {
          ...item,
          title: 'Approche Désert',
          description:
            'Conçu pour les riders qui cherchent de la liberté : routes ouvertes, paysages lointains et une vraie vibe d’expédition.',
          terrain_type: 'Aventure',
        }
      case 'weekend':
        return {
          ...item,
          title: 'Balade Week-end',
          description:
            'Un forfait premium sur format court pour un week-end propre et mémorable.',
          terrain_type: 'Route',
        }
      case 'week-bundle':
        return {
          ...item,
          title: 'Forfait Weekender',
          description:
            'Minimum 3 jours sur les motos touring — 12% de réduction sur le tarif journalier.',
        }
      case 'early-bird':
        return {
          ...item,
          title: 'Enlèvement de bonne heure',
          description:
            'Avant 9h : une carte “coffee card” offerte en ville.',
        }
      case 'gravel-duo':
        return {
          ...item,
          title: 'Duo Gravel',
          description:
            'Réservez deux motos “gravel-ready” ensemble et partagez la livraison d’équipement.',
        }
      default:
        return item
    }
  })

  return (
    <main className="page-fade min-h-screen">
      <section className="relative flex min-h-[62vh] items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Motorcycle road" className="h-full w-full object-cover" />
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
            {isFr ? 'Offres spéciales' : 'Special deals'}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.05 }}
            className="heading-display text-[clamp(44px,5.8vw,88px)] text-white"
          >
            {isFr ? 'Offres &' : 'Offers &'}
            <br />
            {isFr ? 'Forfaits' : 'Packages'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.12 }}
            className="mx-auto mt-7 max-w-[560px] text-[17px] leading-relaxed text-white/70"
          >
            {isFr
              ? 'Forfaits saisonniers, offres multi-jours et itinéraires soigneusement sélectionnés pour ceux qui veulent plus qu’une simple location.'
              : 'Seasonal packages, multi-day offers, and curated routes for riders who want more than a rental.'}
          </motion.p>
        </div>
      </section>

      <section className="py-28">
        <div className="container-narrow">
          <div className="mb-12 max-w-[720px]">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
              — {isFr ? 'Promotions en cours' : 'Current promotions'}
            </p>

            <h2 className="heading-display text-[clamp(36px,4vw,56px)]">
              {isFr ? 'Roulez plus,' : 'Ride More,'}
              <br />
              {isFr ? 'Économisez plus' : 'Save More'}
            </h2>

            <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground dark:text-white/52">
              {isFr
                ? 'Choisissez un forfait, explorez les motos éligibles et demandez vos dates préférées.'
                : 'Choose a package, browse eligible motorcycles, and request your preferred dates.'}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-28">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-border py-24 text-center dark:border-white/[0.12]">
              <Tag className="mx-auto mb-5 h-12 w-12 text-muted-foreground/35 dark:text-white/20" />
              <p className="font-inter text-2xl font-extrabold tracking-[-0.03em] text-foreground dark:text-white/72">
                {isFr ? 'Aucune offre active pour le moment.' : 'No active offers right now.'}
              </p>
              <Link
                to="/fleet"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground"
              >
                {isFr ? 'Voir la flotte' : 'Browse fleet'} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {localizedItems.map((offer, index) => (
                <OfferCard key={offer.id} offer={offer} index={index} isFr={isFr} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function OfferCard({ offer, index, isFr }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.46, delay: index * 0.05 }}
      className="group overflow-hidden rounded-[24px] border border-border bg-card transition duration-500 hover:-translate-y-1 hover:border-primary/35 dark:border-white/[0.08] dark:bg-[#0c0d11]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted dark:bg-[#090a0e]">
        {offer.image_url ? (
          <img
            src={offer.image_url}
            alt={offer.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Tag className="h-12 w-12 text-muted-foreground/30 dark:text-white/15" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent dark:from-[#0c0d11]" />

        {offer.discount_percent && (
          <div className="absolute right-5 top-5 rounded-full bg-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
            -{offer.discount_percent}%
          </div>
        )}
      </div>

      <div className="p-6">
        {offer.terrain_type && offer.terrain_type !== 'Any' && (
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.26em] text-primary">
            {offer.terrain_type} {isFr ? 'sorties' : 'rides'}
          </p>
        )}

        <h3 className="font-inter text-[28px] font-bold leading-tight tracking-[-0.02em] text-foreground dark:text-white">
          {offer.title}
        </h3>

        <p className="mt-4 min-h-[72px] text-[15px] leading-relaxed text-muted-foreground dark:text-white/52">
          {offer.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-5 dark:border-white/[0.08]">
          {offer.min_days && (
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground dark:text-white/42">
                {isFr ? `Durée min: ${offer.min_days} jours` : `Min ${offer.min_days} days`}
              </span>
            </div>
          )}

          {offer.discount_percent && (
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                {isFr ? `Économisez ${offer.discount_percent}%` : `Save ${offer.discount_percent}%`}
              </span>
            </div>
          )}
        </div>

        <Link
          to="/fleet"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-5 py-3 text-xs font-bold text-foreground transition hover:text-primary dark:border-white/[0.08] dark:bg-white/[0.045] dark:text-white/70 dark:hover:text-white"
        >
          {isFr ? 'Voir les motos éligibles' : 'Browse eligible bikes'} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.article>
  )
}