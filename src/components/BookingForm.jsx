import { useState } from 'react';
import { useLang, t } from '../lib/Lang.js';
import { apiClient } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays, User, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { differenceInDays } from 'date-fns';

function calcPrice(motorcycle, days) {
  if (!days || !motorcycle) return 0;
  let rate;
  if (days <= 3) rate = motorcycle.price_1_3_days || motorcycle.price_per_day;
  else if (days <= 5) rate = motorcycle.price_3_5_days || motorcycle.price_per_day;
  else rate = motorcycle.price_5plus_days || motorcycle.price_per_day;
  return days * rate;
}

function getDailyRate(motorcycle, days) {
  if (!days || !motorcycle) return motorcycle?.price_per_day || 0;
  if (days <= 3) return motorcycle.price_1_3_days || motorcycle.price_per_day;
  if (days <= 5) return motorcycle.price_3_5_days || motorcycle.price_per_day;
  return motorcycle.price_5plus_days || motorcycle.price_per_day;
}

export default function BookingForm({ motorcycle }) {
  const lang = useLang();
  const [form, setForm] = useState({
    start_date: '',
    end_date: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  });
  const [loading, setLoading] = useState(false);

  const totalDays =
    form.start_date && form.end_date
      ? Math.max(1, differenceInDays(new Date(form.end_date), new Date(form.start_date)))
      : 0;
  const totalPrice = calcPrice(motorcycle, totalDays);
  const dailyRate = getDailyRate(motorcycle, totalDays);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    });
    toast.success(t(lang, 'booking.toast'));
    setLoading(false);
    setForm({ start_date: '', end_date: '', customer_name: '', customer_email: '', customer_phone: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="font-mono text-[9px] tracking-[0.3em] text-primary mb-1">{t(lang,'booking.label')}</p>
        <h3 className="font-syne text-lg font-black text-foreground">{t(lang,'booking.title')}</h3>
      </div>

      {/* Tiered pricing display */}
      {(motorcycle.price_1_3_days || motorcycle.price_3_5_days || motorcycle.price_5plus_days) && (
        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          {[
            { label: '1–3 days', price: motorcycle.price_1_3_days },
            { label: '3–5 days', price: motorcycle.price_3_5_days },
            { label: '5+ days', price: motorcycle.price_5plus_days },
          ].map((tier) => tier.price && (
            <div
              key={tier.label}
              className={`text-center rounded-lg p-2 transition-colors ${
                totalDays > 0 && getDailyRate(motorcycle, totalDays) === tier.price
                  ? 'bg-primary/20 border border-primary/40'
                  : 'border border-transparent'
              }`}
            >
              <p className="font-syne text-lg font-black text-foreground">€{tier.price}</p>
              <p className="font-mono text-[8px] tracking-wider text-muted-foreground">{tier.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="font-mono text-[9px] tracking-wider text-muted-foreground flex items-center gap-1.5">
            <CalendarDays className="w-3 h-3" /> {t(lang,'booking.pickup')}
          </Label>
          <Input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            required
            className="bg-white/[0.04] border-white/[0.08] font-mono text-sm rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="font-mono text-[9px] tracking-wider text-muted-foreground flex items-center gap-1.5">
            <CalendarDays className="w-3 h-3" /> {t(lang,'booking.return')}
          </Label>
          <Input
            type="date"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            required
            min={form.start_date}
            className="bg-white/[0.04] border-white/[0.08] font-mono text-sm rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="font-mono text-[9px] tracking-wider text-muted-foreground flex items-center gap-1.5">
        <User className="w-3 h-3" /> {t(lang,'booking.name')}
        </Label>
        <Input
          value={form.customer_name}
          onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
          required
          className="bg-white/[0.04] border-white/[0.08] rounded-xl"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="font-mono text-[9px] tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Mail className="w-3 h-3" /> {t(lang,'booking.email')}
        </Label>
        <Input
          type="email"
          value={form.customer_email}
          onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
          required
          className="bg-white/[0.04] border-white/[0.08] rounded-xl"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="font-mono text-[9px] tracking-wider text-muted-foreground flex items-center gap-1.5">
        <Phone className="w-3 h-3" /> {t(lang,'booking.phone')}
        </Label>
        <Input
          type="tel"
          value={form.customer_phone}
          onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
          className="bg-white/[0.04] border-white/[0.08] rounded-xl"
        />
      </div>

      {/* Summary */}
      {totalDays > 0 && (
        <div className="rounded-xl p-4 bg-primary/10 border border-primary/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-mono text-[9px] tracking-wider text-muted-foreground">
                {totalDays} DAY{totalDays > 1 ? 'S' : ''} × €{dailyRate}/day
              </p>
            </div>
            <p className="font-syne text-2xl font-black text-primary">€{totalPrice}</p>
          </div>
        </div>
      )}

      {/* Rental conditions note */}
      <p className="font-mono text-[9px] text-muted-foreground/60 leading-relaxed">
        {t(lang,'booking.conditions')}
      </p>

      <Button
        type="submit"
        disabled={loading || totalDays === 0}
        className="w-full h-12 font-inter text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(255,62,0,0.4)] transition-all duration-300"
      >
        {loading ? t(lang,'booking.processing') : t(lang,'booking.submit')}
      </Button>
    </form>
  );
}