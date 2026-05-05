import { motion } from 'framer-motion';

export default function TechStat({ label, value, unit, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center px-6 py-8 border-r border-border last:border-r-0"
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-3">
        {label}
      </p>
      <p className="font-inter text-4xl font-extrabold tabular-nums tracking-[-0.03em] text-foreground md:text-5xl">
        {value}
      </p>
      {unit && (
        <p className="font-mono text-xs tracking-wider text-primary mt-1">{unit}</p>
      )}
    </motion.div>
  );
}