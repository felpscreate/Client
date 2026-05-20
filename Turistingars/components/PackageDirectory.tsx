"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PackageModal } from "@/components/PackageModal";
import {
  allPackages,
  dayTripPackages,
  lodgingPackages,
  normalizePackage,
  type PackageCategory,
  type RawPackage,
  type TravelPackage,
} from "@/data/packages";

export function PackageDirectory({
  title,
  description,
  category,
  label,
}: {
  title: string;
  description: string;
  category: PackageCategory | "all";
  label: string;
}) {
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [query, setQuery] = useState("");
  const fallbackPackages = useMemo(() => (category === "all" ? allPackages : category === "sbv" ? dayTripPackages : lodgingPackages), [category]);
  const [packages, setPackages] = useState<TravelPackage[]>(fallbackPackages);

  useEffect(() => {
    let active = true;

    async function loadPackages() {
      try {
        const files = category === "all" ? ["sbv.json", "hospedagem.json"] : [category === "sbv" ? "sbv.json" : "hospedagem.json"];
        const loaded = await Promise.all(
          files.map(async (file) => {
            const response = await fetch(`/data/${file}?v=${Date.now()}`, { cache: "no-store" });
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            const items = (await response.json()) as RawPackage[];
            const packageCategory: PackageCategory = file === "sbv.json" ? "sbv" : "shospedagem";
            return items.map((item) => normalizePackage(item, packageCategory)).filter((item) => item.active);
          }),
        );
        if (active) setPackages(loaded.flat());
      } catch {
        if (active) setPackages(fallbackPackages);
      }
    }

    setPackages(fallbackPackages);
    loadPackages();

    return () => {
      active = false;
    };
  }, [category, fallbackPackages]);

  const filteredPackages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const sortedPackages = [...packages].sort((a, b) => Number(b.featured) - Number(a.featured));
    if (!normalizedQuery) return sortedPackages;
    return sortedPackages.filter((item) => `${item.title} ${item.destination} ${item.summary}`.toLowerCase().includes(normalizedQuery));
  }, [packages, query]);

  return (
    <>
      <section className="relative overflow-hidden bg-[#0F3D2E] px-5 pb-20 pt-32 text-white lg:px-8">
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=85" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D2E] via-[#0F3D2E]/86 to-[#C62828]/18" />
        <div className="relative mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] backdrop-blur-xl">
            <Sparkles size={15} /> {label}
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-balance md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76">{description}</p>
          <div className="glass-panel mt-10 flex max-w-2xl items-center gap-3 rounded-[1.5rem] p-3 text-[#1C1C1C]">
            <Search className="ml-2 shrink-0 text-slate-400" size={22} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Procurar por destino, cidade ou experiência"
              className="min-h-12 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="group overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/12"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/76 via-transparent to-transparent" />
                {item.badge ? <span className="absolute left-4 top-4 rounded-full bg-[#FDECEC]/95 px-4 py-2 text-xs font-extrabold text-[#C62828] backdrop-blur-xl">{item.badge}</span> : null}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-xl font-extrabold leading-tight">{item.title}</h2>
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-white/76"><MapPin size={14} /> {item.destination}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-600">
                    <CalendarDays size={15} /> {item.date}
                  </span>
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-[#0F3D2E]">{item.price}</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{item.installment || "por pessoa"}</p>
                  </div>
                </div>
                <p className="mt-4 min-h-20 text-sm leading-7 text-slate-600">{item.summary}</p>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(item)}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#198754] px-5 py-4 font-extrabold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#0F3D2E]"
                >
                  Ver pacote
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      <PackageModal travelPackage={selectedPackage} onClose={() => setSelectedPackage(null)} />
    </>
  );
}
