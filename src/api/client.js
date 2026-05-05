import { MOTORCYCLES, getMotorcycleById } from '../../entities/Motorcycle.js'
import { OFFERS } from '../../entities/Offer.js'
import { submitBookingRequest } from '../../entities/Booking.js'

function mapMotorcycle(row) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category ?? 'Adventure',
    terrain: row.terrain ?? 'Tarmac',

    price_per_day: row.dailyRate ?? row.price_5plus_days ?? row.price_1_3_days ?? 0,
    price_1_3_days: row.price_1_3_days ?? row.dailyRate,
    price_3_5_days: row.price_3_5_days ?? row.dailyRate,
    price_5plus_days: row.price_5plus_days ?? row.dailyRate,

    image_url: row.image,
    description: row.description,

    engine_cc: row.engineCc,
    horsepower: row.horsepower ?? null,
    torque: row.torque ?? null,
    weight: row.weight ?? null,
    seat_height: row.seat_height ?? null,
    fuel_range: row.fuel_range ?? null,

    includes_gps: row.includes_gps ?? true,
    includes_panniers: row.includes_panniers ?? true,
    includes_insurance: row.includes_insurance ?? true,

    available: row.available ?? true,
    performance_level: row.performance_level ?? 6,
  }
}

function mapOffer(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    discount_percent: Number.parseInt(row.tag?.replace(/\D/g, ''), 10) || 0,
    terrain_type: 'Any',
    min_days: 3,
    active: true,
    image_url: row.image_url,
  }
}

export const apiClient = {
  entities: {
    Motorcycle: {
      async list() {
        return MOTORCYCLES.map(mapMotorcycle)
      },

      async get(id) {
        const item = getMotorcycleById(id)
        return item ? mapMotorcycle(item) : null
      },
    },

    Offer: {
      async filter() {
        return OFFERS.map(mapOffer)
      },
    },

    Booking: {
      async create(payload) {
        return submitBookingRequest({
          motorcycleId: payload.motorcycle_id,
          startDate: payload.start_date,
          endDate: payload.end_date,
          fullName: payload.customer_name,
          email: payload.customer_email,
          phone: payload.customer_phone,
          notes: payload.notes,
        })
      },
    },
  },
}