/**
 * Demo fleet for the rental UI.
 * JSON schema mirrored for Base44: `entities/schemas/motorcycle.schema.json`
 */

/** @typedef {'asphalt' | 'gravel' | 'touring' | 'urban'} Terrain */

export const TERRAINS = /** @type {const} */ ([
  'Tarmac',
  'Dirt',
  'Coastal',
])

/** @typedef {Object} Motorcycle
 * @property {string} id
 * @property {string} name
 * @property {string} brand
 * @property {number} year
 * @property {Terrain} terrain
 * @property {number} engineCc
 * @property {number} dailyRate
 * @property {string} image
 * @property {string} description
 */

/** @type {Motorcycle[]} */
export const MOTORCYCLES = [
  {
    id: 'ktm390-2026',
    name: 'KTM 390 ADV R (2026)',
    brand: 'KTM',
    year: 2026,
    terrain: 'Dirt',
    category: 'Adventure',
    engineCc: 399,
    horsepower: 46,
    weight: 158,
    performance_level: 7,
    dailyRate: 90,
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
    description:
      'Lightweight and sharp for daily city riding and off-road weekend escapes.',
  },
  {
    id: 'ktm890-2025',
    name: 'KTM 890 ADV R (2025)',
    brand: 'KTM',
    year: 2025,
    terrain: 'Coastal',
    category: 'Adventure',
    engineCc: 890,
    horsepower: 105,
    weight: 218,
    performance_level: 9,
    dailyRate: 130,
    image:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
    description:
      'Premium travel-enduro for long distance routes and aggressive mountain riding.',
  },
  {
    id: 'ktm390-2025',
    name: 'KTM 390 ADV (2025)',
    brand: 'KTM',
    year: 2025,
    terrain: 'Tarmac',
    category: 'Adventure',
    engineCc: 373,
    horsepower: 44,
    weight: 177,
    performance_level: 6,
    dailyRate: 70,
    image:
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
    description:
      'Balanced entry adventure bike with daily comfort and proven reliability.',
  },
]

/** @param {string} id */
export function getMotorcycleById(id) {
  return MOTORCYCLES.find((m) => m.id === id)
}
