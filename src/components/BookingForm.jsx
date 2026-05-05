import { useState } from 'react'
import { differenceInDays } from 'date-fns'
import { toast } from 'sonner'
import { CalendarDays, Mail, Phone, User } from 'lucide-react'
import { apiClient } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLang, t } from '../lib/Lang.js'

function calcPrice(motorcycle, days) {
  if (!days || !motorcycle) return 0

  let rate

  if (days <= 3) rate = motorcycle.price_1_3_days || motorcycle.price_per_day
  else if (days <= 5) rate = motorcycle.price_3_5_days || motorcycle.price_per_day
  else rate = motorcycle.price_5plus_days || motorcycle.price_per_day

  return days * rate
}

function getDailyRate(motorcycle, days) {
  if (!days || !motorcycle) return motorcycle?.price_per_day || 0
  if (days <= 3) return motorcycle.price_1_3_days || motorcycle.price_per_day
  if (days <= 5) return motorcycle.price_3_5_days || motorcycle.price_per_day
  return motorcycle.price_5plus_days || motorcycle.price_per_day
}

export default function BookingForm({ motorcycle }) {
  const lang = useLang()
  const isFr = lang === 'fr'

  const [form, setForm] = useState({
    start_date: '',
    end_date: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  })

  const [loading, setLoading] = useState(false)

  const totalDays =
    form.start_date && form.end_date
      ? Math.max(1, differenceInDays(new Date(form.end_date), new Date(form.start_date)))
      : 0

  const dailyRate = getDailyRate(motorcycle, totalDays)
  const totalPrice = calcPrice(motorcycle, totalDays)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await apiClient.entities.Booking.create({
        motorcycle_id: motorcycle.id,
        motorcycle_name: motorcycle.name,
        start_date: form.start_date,
        end_date: form.end_date,
        total_days: totalDays,
        total_price: totalPrice,
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        status: 'pending',
      })

      toast.success(t(lang, 'booking.toast'))

      setForm({
        start_date: '',
        end_date: '',
        customer_name: '',
        customer_email: '',
        customer_phone: '',
      })
    } catch (error) {
      toast.error(t(lang, 'booking.error_toast'))
    } finally {
      setLoading(false)
    }
  }

  const priceTiers = [
    { label: isFr ? '1–3 jours' : '1–3 days', price: motorcycle.price_1_3_days },
    { label: isFr ? '3–5 jours' : '3–5 days', price: motorcycle.price_3_5_days },
    { label: isFr ? '5+ jours' : '5+ days', price: motorcycle.price_5plus_days },
  ].filter((tier) => tier.price)

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.32em] text-primary">
          {t(lang, 'booking.label')}
        </p>

        <h3 className="font-inter text-[28px] font-bold leading-tight tracking-[-0.02em] text-foreground dark:text-white">
          {t(lang, 'booking.title')}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-white/45">
          {t(lang, 'booking.subtitle')}
        </p>
      </div>

      {priceTiers.length > 0 && (
        <div className="grid grid-cols-3 gap-2 rounded-[18px] border border-border bg-muted/40 p-2 dark:border-white/[0.08] dark:bg-black/18">
          {priceTiers.map((tier) => {
            const active = totalDays > 0 && dailyRate === tier.price

            return (
              <div
                key={tier.label}
                className={`rounded-[14px] border p-3 text-center transition ${
                  active
                    ? 'border-primary/45 bg-primary/14'
                    : 'border-transparent bg-card dark:bg-white/[0.025]'
                }`}
              >
                <p className="font-inter text-[22px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-foreground dark:text-white">
                  €{tier.price}
                </p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground dark:text-white/42">
                  {tier.label}
                </p>
              </div>
            )
          })}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label={t(lang, 'booking.pickup')} icon={CalendarDays}>
          <Input
            type="date"
            value={form.start_date}
            onChange={(event) => updateField('start_date', event.target.value)}
            required
            className="h-12 rounded-[14px] border-border bg-secondary font-mono text-sm text-foreground dark:border-white/[0.08] dark:bg-white/[0.055] dark:text-white"
          />
        </Field>

        <Field label={t(lang, 'booking.return')} icon={CalendarDays}>
          <Input
            type="date"
            value={form.end_date}
            onChange={(event) => updateField('end_date', event.target.value)}
            required
            min={form.start_date}
            className="h-12 rounded-[14px] border-border bg-secondary font-mono text-sm text-foreground dark:border-white/[0.08] dark:bg-white/[0.055] dark:text-white"
          />
        </Field>
      </div>

      <Field label={t(lang, 'booking.name')} icon={User}>
        <Input
          value={form.customer_name}
          onChange={(event) => updateField('customer_name', event.target.value)}
          required
          placeholder={isFr ? 'Nom complet' : 'Full name'}
          className="h-12 rounded-[14px] border-border bg-secondary text-foreground placeholder:text-muted-foreground/60 dark:border-white/[0.08] dark:bg-white/[0.055] dark:text-white dark:placeholder:text-white/28"
        />
      </Field>

      <Field label={t(lang, 'booking.email')} icon={Mail}>
        <Input
          type="email"
          value={form.customer_email}
          onChange={(event) => updateField('customer_email', event.target.value)}
          required
          placeholder={isFr ? 'email@exemple.com' : 'email@example.com'}
          className="h-12 rounded-[14px] border-border bg-secondary text-foreground placeholder:text-muted-foreground/60 dark:border-white/[0.08] dark:bg-white/[0.055] dark:text-white dark:placeholder:text-white/28"
        />
      </Field>

      <Field label={t(lang, 'booking.phone')} icon={Phone}>
        <Input
          type="tel"
          value={form.customer_phone}
          onChange={(event) => updateField('customer_phone', event.target.value)}
          placeholder={isFr ? '+212...' : '+212...'}
          className="h-12 rounded-[14px] border-border bg-secondary text-foreground placeholder:text-muted-foreground/60 dark:border-white/[0.08] dark:bg-white/[0.055] dark:text-white dark:placeholder:text-white/28"
        />
      </Field>

      {totalDays > 0 && (
        <div className="rounded-[18px] border border-primary/25 bg-primary/10 p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground dark:text-white/44">
                {t(lang, 'booking.estimate_label')}
              </p>
              <p className="mt-2 text-sm text-muted-foreground dark:text-white/52">
                {totalDays}{' '}
                {totalDays > 1 ? t(lang, 'booking.days') : t(lang, 'booking.day_one')}
                {' × €'}
                {dailyRate}/{t(lang, 'booking.per_day_slug')}
              </p>
            </div>

            <p className="font-inter text-[38px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-primary">
              €{totalPrice}
            </p>
          </div>
        </div>
      )}

      <p className="text-[11px] leading-relaxed text-muted-foreground dark:text-white/35">
        {t(lang, 'booking.conditions')}
      </p>

      <Button
        type="submit"
        disabled={loading || totalDays === 0}
        className="h-12 w-full rounded-full bg-primary text-sm font-bold text-primary-foreground transition hover:shadow-[0_0_34px_rgba(255,78,28,0.32)] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {loading ? t(lang, 'booking.processing') : t(lang, 'booking.submit')}
      </Button>
    </form>
  )
}

function Field({ label, icon: Icon, children }) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground dark:text-white/42">
        <Icon className="h-3 w-3 text-primary/80" />
        {label}
      </Label>
      {children}
    </div>
  )
}