"use client";

import { motion } from "framer-motion";
import { Calendar, Hotel, Search, Users } from "lucide-react";

const fields = [
  { icon: Calendar, label: "Data ida", value: "05 set 2026" },
  { icon: Calendar, label: "Data volta", value: "07 set 2026" },
  { icon: Users, label: "Pessoas", value: "2 viajantes" },
  { icon: Hotel, label: "Hospedagem", value: "Resort premium" },
];

export function SearchBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35 }}
      className="glass-panel mx-auto -mt-14 grid max-w-6xl gap-3 rounded-[2rem] p-3 md:grid-cols-[repeat(4,minmax(0,1fr))_auto]"
      id="reserva"
    >
      {fields.map((field) => (
        <button
          key={field.label}
          type="button"
          className="group flex min-h-20 items-center gap-4 rounded-[1.45rem] px-4 py-3 text-left transition hover:bg-white hover:shadow-lg hover:shadow-slate-900/8"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#198754] transition group-hover:bg-[#198754] group-hover:text-white">
            <field.icon size={20} />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{field.label}</span>
            <span className="block truncate text-sm font-bold text-[#1C1C1C]">{field.value}</span>
          </span>
        </button>
      ))}
      <button
        type="button"
        className="flex min-h-16 items-center justify-center gap-2 rounded-[1.45rem] bg-[#198754] px-7 font-extrabold text-white shadow-xl shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-[#0F3D2E]"
      >
        <Search size={20} />
        Pesquisar
      </button>
    </motion.div>
  );
}
