import { motion } from 'framer-motion';

export default function SectionHeader({ label, title, description, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${align === 'center' ? 'text-center' : ''}`}
    >
      {label && (
        <div className="inline-flex items-center gap-2 mb-5">
          <div className="w-4 h-px bg-primary" />
          <p className="font-mono text-[10px] tracking-[0.25em] text-primary">{label}</p>
        </div>
      )}
      <h2 className="font-inter text-4xl font-extrabold tracking-[-0.03em] text-foreground md:text-5xl lg:text-6xl lg:leading-[1.08]">
        {title}
      </h2>
      {description && (
        <p className="font-inter text-base text-muted-foreground mt-5 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}