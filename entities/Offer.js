/**
 * Promotional cards for the Offers page.
 * JSON schema: `entities/schemas/offer.schema.json`
 */

/** @typedef {Object} OfferRow
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} tag
 */

/** @type {OfferRow[]} */
export const OFFERS = [
  {
    id: 'week-bundle',
    title: 'Weekender bundle',
    description: '3-day minimum on touring bikes — 12% off the daily rate.',
    tag: 'Save 12%',
  },
  {
    id: 'early-bird',
    title: 'Early bird pickup',
    description: 'Before 9am pickups get a complimentary coffee card in town.',
    tag: 'Perk',
  },
  {
    id: 'gravel-duo',
    title: 'Gravel duo',
    description: 'Book two gravel-ready bikes together and split gear delivery.',
    tag: 'Pair deal',
  },
]
