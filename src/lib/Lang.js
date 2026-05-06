import React from 'react'

const translations = {
  en: {
    nav: {
      home: 'Home',
      fleet: 'Fleet',
      offers: 'Offers',
      about: 'About',
      book: 'Book a Ride',
      aria_home: 'Tenere Riders  Home',
      aria_toggle_theme: 'Toggle theme',
      aria_menu_open: 'Open navigation menu',
      aria_menu_close: 'Close navigation menu',
    },
    home: {
      badge: 'PREMIUM MOTORCYCLE RENTALS',
      hero_subline: 'Premium motorcycle rentals \u00b7 Morocco',
      hero_title_1: 'Ride the',
      hero_title_2: 'Unknown',
      hero_desc:
        'Every machine in our fleet is ready for Morocco\u2019s roads, mountains, and desert escapes.',
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
      routes_desc: 'Curated itineraries through Morocco\u2019s best roads.',
      showcase_kicker: 'The Hangar',
      showcase_title_1: 'Scroll Through',
      showcase_title_2: 'The Fleet',
      showcase_desc:
        'Move down to discover our fleet of motorcycles.',
      hangar_label: 'THE HANGAR',
      hangar_title_1: 'Select Your',
      hangar_title_2: 'Machine',
      hangar_desc: 'Handpicked for performance, character, and soul.',
      view_full_fleet: 'View full fleet',
      stats: ['Machines in fleet', 'Years of expertise', 'Riders served', 'Pickup locations'],
      cta_label: 'YOUR JOURNEY AWAITS',
      cta_title: 'Start Your Adventure',
      cta_desc:
        'From Marrakech to the Atlas mountains, we provide the ride for your journey of a lifetime.',
      browse_fleet: 'Browse Fleet',
    },
    showcase: {
      view_details: 'View details',
      per_day: 'per day',
      details: 'Details',
      cc: 'CC',
      seat: 'Seat',
      hp: 'HP',
    },
    fleet: {
      label: 'THE HANGAR',
      title: 'Our Fleet',
      desc: 'Filter by terrain, category, and performance.',
      terrain: 'TERRAIN',
      category: 'CATEGORY',
      performance: 'PERFORMANCE',
      sort: 'SORT',
      leisure: 'LEISURE',
      extreme: 'EXTREME',
      price_asc: 'PRICE: LOW TO HIGH',
      price_desc: 'PRICE: HIGH TO LOW',
      power: 'POWER',
      found: (n) => `${n} MACHINE${n !== 1 ? 'S' : ''} FOUND`,
      no_results: 'No machines match your criteria.',
      adjust_filters: 'Try adjusting your filters.',
    },
    booking: {
      label: 'MISSION BRIEF',
      title: 'Reserve This Machine',
      subtitle:
        'Request availability. The team will confirm your dates and final pickup details.',
      pickup: 'PICKUP',
      return: 'RETURN',
      name: 'FULL NAME',
      email: 'EMAIL',
      phone: 'PHONE',
      conditions: 'Valid license and insurance terms apply.',
      submit: 'Request Booking',
      processing: 'Processing...',
      toast: "Booking submitted! We'll confirm shortly.",
      error_toast: 'Could not submit your booking request.',
      estimate_label: 'Estimated total',
      day_one: 'day',
      days: 'days',
      per_day_slug: 'day',
    },
    detail: {
      per_day: 'per day',
    },
    footer: {
      tagline: 'Motorcycle adventure trips around Morocco.',
      links: 'Quick Links',
      contact: 'Contact',
      hours_label: 'Opening Hours',
      hours: ['Mon-Fri: 08:00 - 19:00', 'Sat: 08:00 - 17:00', 'Sun: By appointment'],
      copyright: '\u00a9 2026 Tenere Riders. All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      fleet: 'Flotte',
      offers: 'Offres',
      about: '\u00c0 propos',
      book: 'R\u00e9server',
      aria_home: 'Tenere Riders  Accueil',
      aria_toggle_theme: 'Basculer le th\u00e8me',
      aria_menu_open: 'Ouvrir le menu',
      aria_menu_close: 'Fermer le menu',
    },
    home: {
      badge: 'LOCATION DE MOTOS PREMIUM',
      hero_subline: 'Location moto premium \u00b7 Maroc',
      hero_title_1: 'Affrontez',
      hero_title_2: 'l\u2019Inconnu',
      hero_desc:
        'Chaque machine de notre flotte est pr\u00eate pour les routes du Maroc, les montagnes et le d\u00e9sert.',
      explore_fleet: 'Explorer la flotte',
      view_offers: 'Voir les offres',
      scroll: 'D\u00e9filer',
      fleet_title: 'Flotte premium',
      fleet_desc: 'Machines s\u00e9lectionn\u00e9es et entretenues pour la perf\u2019 maximale.',
      insurance_title: 'Couverture compl\u00e8te',
      insurance_desc: 'Assurance incluse avec chaque location.',
      flexible_title: 'Dur\u00e9e flexible',
      flexible_desc: 'De la sortie d\u2019une journ\u00e9e \u00e0 l\u2019exp\u00e9dition de plusieurs semaines.',
      routes_title: 'Itin\u00e9raires guid\u00e9s',
      routes_desc: 'Parcours s\u00e9lectionn\u00e9s sur les plus belles routes du Maroc.',
      showcase_kicker: 'Le hangar',
      showcase_title_1: 'D\u00e9filer dans',
      showcase_title_2: 'la flotte',
      showcase_desc:
        'Faites d\u00e9filer pour d\u00e9couvrir chaque machine : couleur, fiches technique, prix et caract\u00e8re.',
      hangar_label: 'LE HANGAR',
      hangar_title_1: 'Choisissez votre',
      hangar_title_2: 'machine',
      hangar_desc: 'S\u00e9lection pour la perf\u2019, le caract\u00e8re et l\u2019\u00e2me.',
      view_full_fleet: 'Voir toute la flotte',
      stats: ['Machines en flotte', "Ans d'exp\u00e9rience", 'Motards servis', 'Points de retrait'],
      cta_label: 'VOTRE AVENTURE VOUS ATTEND',
      cta_title: "Commencer l'aventure",
      cta_desc:
        'De Marrakech \u00e0 l\u2019Atlas, nous vous offrons la monture pour le voyage de votre vie.',
      browse_fleet: 'Voir la flotte',
    },
    showcase: {
      view_details: 'Voir les d\u00e9tails',
      per_day: 'par jour',
      details: 'D\u00e9tails',
      cc: 'CC',
      seat: 'Selle',
      hp: 'CV',
    },
    fleet: {
      label: 'LE HANGAR',
      title: 'Notre flotte',
      desc: 'Filtrez par terrain, cat\u00e9gorie et performance.',
      terrain: 'TERRAIN',
      category: 'CAT\u00e9GORIE',
      performance: 'PERFORMANCE',
      sort: 'TRIER',
      leisure: 'LOISIR',
      extreme: 'EXTR\u00caME',
      price_asc: 'PRIX : CROISSANT',
      price_desc: 'PRIX : D\u00c9CROISSANT',
      power: 'PUISSANCE',
      found: (n) => `${n} MACHINE${n > 1 ? 'S' : ''} TROUV\u00c9E${n > 1 ? 'S' : ''}`,
      no_results: 'Aucune machine ne correspond \u00e0 vos crit\u00e8res.',
      adjust_filters: 'Essayez de modifier vos filtres.',
    },
    booking: {
      label: 'R\u00e9SUM\u00e9 DE MISSION',
      title: 'R\u00e9server cette machine',
      subtitle:
        "Demandez la disponibilit\u00e9. L'\u00e9quipe confirmera vos dates et le point de retrait.",
      pickup: 'PRISE EN CHARGE',
      return: 'RETOUR',
      name: 'NOM COMPLET',
      email: 'E-MAIL',
      phone: 'T\u00c9L\u00c9PHONE',
      conditions: 'Permis valide et conditions d\u2019assurance requises.',
      submit: 'Demander une r\u00e9servation',
      processing: 'Traitement...',
      toast: 'Demande envoy\u00e9e !',
      error_toast: 'Impossible d\u2019envoyer la demande.',
      estimate_label: 'Total estim\u00e9',
      day_one: 'jour',
      days: 'jours',
      per_day_slug: 'jour',
    },
    detail: {
      per_day: 'par jour',
    },
    footer: {
      tagline: 'Voyages moto au Maroc.',
      links: 'Liens rapides',
      contact: 'Contact',
      hours_label: 'Horaires',
      hours: ['Lun\u2013Ven : 08h00 \u2013 19h00', 'Sam : 08h00 \u2013 17h00', 'Dim : sur RDV'],
      copyright: '\u00a9 2026 Tenere Riders. Tous droits r\u00e9serv\u00e9s.',
      privacy: 'Confidentialit\u00e9',
      terms: 'Conditions',
    },
  },
}

const listeners = new Set()
let currentLang = localStorage.getItem('tr_lang') || 'en'

export function translateCategory(lang, value) {
  if (!value) return lang === 'fr' ? 'Aventure' : 'Adventure'
  if (lang !== 'fr') return value
  const map = {
    Adventure: 'Aventure',
    Rally: 'Rallye',
    Touring: 'Tourisme',
    Cruiser: 'Custom',
    Scrambler: 'Scrambler',
    Road: 'Route',
    Mountain: 'Montagne',
  }
  return map[value] || value
}

export function translateTerrain(lang, value) {
  if (!value) return lang === 'fr' ? 'Maroc' : 'Morocco'
  if (lang !== 'fr') return value
  const map = {
    Tarmac: 'Asphalte',
    Dirt: 'Terre',
    Coastal: 'C\u00f4tier',
    'All-Terrain': 'Tout-terrain',
    Any: 'Tous',
  }
  return map[value] || value
}

export function setLang(lang) {
  currentLang = lang
  localStorage.setItem('tr_lang', lang)
  listeners.forEach((fn) => fn(lang))
}

export function useLang() {
  const [lang, setLangState] = React.useState(currentLang)
  React.useEffect(() => {
    listeners.add(setLangState)
    return () => {
      listeners.delete(setLangState)
    }
  }, [])
  return lang
}

export function t(lang, path) {
  const value = path.split('.').reduce((obj, key) => obj?.[key], translations[lang])
  if (typeof value === 'function') return value
  return value ?? path
}

/** @param {string} lang */
export function formatFleetFound(lang, count) {
  const fn = translations[lang]?.fleet?.found
  return typeof fn === 'function' ? fn(count) : `${count} machines`
}
