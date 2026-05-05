/**
 * Client-side booking submission (replace with Base44 / REST).
 * JSON schema: `entities/schemas/booking.schema.json`
 */

/**
 * @typedef {Object} BookingPayload
 * @property {string} motorcycleId
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} fullName
 * @property {string} email
 * @property {string} [notes]
 */

/**
 * @param {BookingPayload} payload
 * @returns {Promise<{ id: string, motorcycleId: string }>}
 */
export async function submitBookingRequest(payload) {
  await new Promise((r) => setTimeout(r, 600))
  return { id: `bk_${Date.now()}`, motorcycleId: payload.motorcycleId }
}
