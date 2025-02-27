"use client";

import { motion } from "framer-motion";

export default function ExchangeYearBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400"
    >
      <span>🇩🇰</span>
      <span className="text-xs">→</span>
      <span>🇺🇸</span>
      <span className="text-xs font-medium">Exchange Student &apos;24-&apos;25</span>
    </motion.div>
  );
}
