import React from 'react'

const translations = {
  en: {
    nav: { home: 'Home', fleet: 'Fleet', offers: 'Offers', about: 'About' },
    home: {
      badge: 'PREMIUM MOTORCYCLE RENTALS',
      hero_title_1: 'Ride the',
      hero_title_2: 'Unknown',
      explore_fleet: 'Explore Fleet',
      view_offers: 'View Offers',
      scroll: 'SCROLL',
      fleet_title: 'Premium Fleet',
      fleet_desc: 'Handpicked machines, maintained for peak performance.',
      insurance_title: 'Full Coverage',
      insurance_desc: 'Comprehensive insurance included with every rental.',
      flexible_title: 'Flexible Duration',
      flexible_desc: 'From single-day escapes to multi-week expeditions.',
      routes_title: 'Guided Routes',
      routes_desc: 'Curated itineraries through the best roads.',
      hangar_label: 'THE HANGAR',
      hangar_title_1: 'Select Your',
      hangar_title_2: 'Machine',
      hangar_desc: 'Handpicked for performance, character, and soul.',
      view_full_fleet: 'View full fleet',
      stats: ['Machines in fleet', 'Years of expertise', 'Riders served', 'Pickup locations'],
      cta_label: 'YOUR JOURNEY AWAITS',
      cta_title: 'Start Your Adventure',
      cta_desc: 'We provide the ride for your journey of a lifetime.',
      browse_fleet: 'Browse Fleet',
    },
    fleet: {
      label: 'THE HANGAR',
      title: 'Our Fleet',
      desc: 'Filter by terrain, category, and performance.',
      terrain: 'TERRAIN', category: 'CATEGORY', performance: 'PERFORMANCE', sort: 'SORT',
      leisure: 'LEISURE', extreme: 'EXTREME',
      price_asc: 'PRICE: LOW ? HIGH', price_desc: 'PRICE: HIGH ? LOW', power: 'POWER',
      found: (n) => `${n} MACHINE${n !== 1 ? 'S' : ''} FOUND`,
      no_results: 'No machines match your criteria.',
      adjust_filters: 'Try adjusting your filters.',
    },
    booking: {
      label: 'MISSION BRIEF', title: 'Reserve This Machine',
      pickup: 'PICKUP', return: 'RETURN', name: 'FULL NAME', email: 'EMAIL', phone: 'PHONE',
      conditions: 'Valid license and insurance terms apply.',
      submit: 'Request Booking', processing: 'Processing...',
      toast: "Booking submitted! We'll confirm shortly.",
    },
    footer: {
      tagline: 'Motorcycle adventure trips around Morocco.',
      links: 'Quick Links', hours_label: 'Opening Hours',
      hours: ['Mon–Fri: 08:00 – 19:00', 'Sat: 08:00 – 17:00', 'Sun: By appointment'],
      copyright: '© 2026 Tenere Riders. All rights reserved.',
      privacy: 'Privacy', terms: 'Terms',
    },
  },
  fr: {
    nav: { home: 'Accueil', fleet: 'Flotte', offers: 'Offres', about: 'À propos' },
    home: {
      badge: 'LOCATION DE MOTOS PREMIUM',
      hero_title_1: 'Partez à',
      hero_title_2: "l'Aventure",
      explore_fleet: 'Explorer la Flotte',
      view_offers: 'Voir les Offres',
      scroll: 'DÉFILER',
      fleet_title: 'Flotte Premium',
      fleet_desc: 'Machines sélectionnées et entretenues.',
      insurance_title: 'Couverture Complète',
      insurance_desc: 'Assurance incluse avec chaque location.',
      flexible_title: 'Durée Flexible',
      flexible_desc: 'De la journée à plusieurs semaines.',
      routes_title: 'Itinéraires Guidés',
      routes_desc: 'Parcours soigneusement sélectionnés.',
      hangar_label: 'LE HANGAR',
      hangar_title_1: 'Choisissez Votre',
      hangar_title_2: 'Machine',
      hangar_desc: 'Performance, caractère et âme.',
      view_full_fleet: 'Voir toute la flotte',
      stats: ['Machines en flotte', "Ans d'expérience", 'Motards servis', 'Points de retrait'],
      cta_label: 'VOTRE AVENTURE VOUS ATTEND',
      cta_title: "Commencez l'Aventure",
      cta_desc: 'Nous fournissons la monture pour votre voyage.',
      browse_fleet: 'Voir la Flotte',
    },
    fleet: {
      label: 'LE HANGAR',
      title: 'Notre Flotte',
      desc: 'Filtrez par terrain, catégorie et performance.',
      terrain: 'TERRAIN', category: 'CATÉGORIE', performance: 'PERFORMANCE', sort: 'TRIER',
      leisure: 'LOISIR', extreme: 'EXTRÊME',
      price_asc: 'PRIX : CROISSANT', price_desc: 'PRIX : DÉCROISSANT', power: 'PUISSANCE',
      found: (n) => `${n} MACHINE${n > 1 ? 'S' : ''} TROUVÉE${n > 1 ? 'S' : ''}`,
      no_results: 'Aucune machine ne correspond à vos critères.',
      adjust_filters: 'Essayez de modifier vos filtres.',
    },
    booking: {
      label: 'RÉSUMÉ DE MISSION', title: 'Réserver Cette Machine',
      pickup: 'PRISE EN CHARGE', return: 'RETOUR', name: 'NOM COMPLET', email: 'E-MAIL', phone: 'TÉLÉPHONE',
      conditions: 'Permis valide et assurance requis.',
      submit: 'Demander une Réservation', processing: 'Traitement...',
      toast: 'Demande envoyée !',
    },
    footer: {
      tagline: 'Voyages en moto à travers le Maroc.',
      links: 'Liens Rapides', hours_label: "Horaires d'Ouverture",
      hours: ['Lun–Ven : 08h00 – 19h00', 'Sam : 08h00 – 17h00', 'Dim : Sur rendez-vous'],
      copyright: '© 2026 Tenere Riders. Tous droits réservés.',
      privacy: 'Confidentialité', terms: 'Conditions',
    },
  },
}

const listeners = new Set()
let currentLang = localStorage.getItem('tr_lang') || 'en'

export function setLang(lang) {
  currentLang = lang
  localStorage.setItem('tr_lang', lang)
  listeners.forEach((fn) => fn(lang))
}

export function useLang() {
  const [lang, setLangState] = React.useState(currentLang)
  React.useEffect(() => {
    listeners.add(setLangState)
    return () => listeners.delete(setLangState)
  }, [])
  return lang
}

export function t(lang, path) {
  return path.split('.').reduce((obj, key) => obj?.[key], translations[lang]) ?? path
}