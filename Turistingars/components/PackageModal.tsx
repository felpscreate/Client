"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, CreditCard, MapPin, MessageCircle, Tag, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { TravelPackage } from "@/data/packages";
import { siteConfig } from "@/data/packages";
import { cn } from "@/lib/utils";

const tabs = ["Sobre o destino", "Benefícios", "Galeria", "Roteiro"] as const;

export function PackageModal({
  travelPackage,
  onClose,
}: {
  travelPackage: TravelPackage | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Sobre o destino");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!travelPackage) return;
    setActiveTab("Sobre o destino");
    setActiveImage(0);
  }, [travelPackage]);

  useEffect(() => {
    if (!travelPackage) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, travelPackage]);

  const reserveUrl = useMemo(() => {
    if (!travelPackage) return "#";
    const message = travelPackage.whatsappMessage || `Olá, gostaria de reservar o pacote ${travelPackage.title} - ${travelPackage.date}.`;
    const phone = travelPackage.whatsapp || siteConfig.whatsapp;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, [travelPackage]);

  return (
    <AnimatePresence>
      {travelPackage ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#0F3D2E]/78 p-0 backdrop-blur-xl md:items-center md:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ y: 42, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 42, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl md:rounded-[2rem]"
          >
            <div className="relative min-h-52 overflow-hidden bg-[#0F3D2E] md:min-h-64">
              <img src={travelPackage.image} alt={travelPackage.title} className="absolute inset-0 h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D2E]/92 via-[#0F3D2E]/50 to-[#C62828]/18" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/18 text-white backdrop-blur-xl transition hover:bg-white/28"
                aria-label="Fechar pacote"
              >
                <X size={22} />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-8">
                <div className="flex flex-wrap gap-2">
                  {travelPackage.badge ? (
                    <span className="rounded-full bg-[#FDECEC] px-3 py-1.5 text-xs font-extrabold text-[#C62828]">{travelPackage.badge}</span>
                  ) : null}
                  <span className="rounded-full bg-white/14 px-3 py-1.5 text-xs font-bold backdrop-blur-xl">{travelPackage.type}</span>
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">{travelPackage.title}</h2>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-white/82">
                  <span className="flex items-center gap-2"><MapPin size={17} /> {travelPackage.destination}</span>
                  <span className="flex items-center gap-2"><CalendarDays size={17} /> {travelPackage.date}</span>
                </div>
              </div>
            </div>

            <div className="hide-scrollbar flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3 md:px-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold transition",
                    activeTab === tab ? "bg-[#198754] text-white shadow-lg shadow-emerald-900/12" : "bg-[#E8F5EE] text-[#0F3D2E] hover:bg-[#d9efe4]",
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5 md:p-8">
              {activeTab === "Sobre o destino" ? (
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                  <div>
                    <p className="text-lg leading-9 text-slate-700">{travelPackage.description}</p>
                    <div className="mt-8 rounded-[1.5rem] bg-slate-50 p-5">
                      <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#C62828]">Resumo da viagem</p>
                      <p className="mt-3 leading-7 text-slate-600">{travelPackage.summary}</p>
                    </div>
                  </div>
                  <aside className="rounded-[1.75rem] bg-[#0F3D2E] p-6 text-white">
                    <p className="text-sm font-bold text-white/60">Informações comerciais</p>
                    <p className="mt-3 text-4xl font-extrabold">{travelPackage.price}</p>
                    {travelPackage.installment ? <p className="mt-1 text-sm font-semibold text-white/68">{travelPackage.installment}</p> : null}
                    <div className="mt-6 grid gap-3 text-sm font-bold text-white/78">
                      <span className="flex items-center gap-2"><CalendarDays size={17} className="text-[#E8F5EE]" /> {travelPackage.date}</span>
                      <span className="flex items-center gap-2"><Tag size={17} className="text-[#E8F5EE]" /> {travelPackage.type}</span>
                      {travelPackage.status ? <span className="flex items-center gap-2"><CreditCard size={17} className="text-[#FDECEC]" /> {travelPackage.status}</span> : null}
                    </div>
                  </aside>
                </div>
              ) : null}

              {activeTab === "Benefícios" ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {travelPackage.benefits.map((benefit) => (
                    <div key={benefit.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#198754]"><benefit.icon size={22} /></span>
                      <h3 className="mt-4 font-extrabold text-[#1C1C1C]">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {activeTab === "Galeria" ? (
                <div>
                  <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-100">
                    <img src={travelPackage.gallery[activeImage]} alt={`${travelPackage.title} ${activeImage + 1}`} className="h-[300px] w-full object-cover md:h-[460px]" />
                    <button
                      type="button"
                      onClick={() => setActiveImage((activeImage - 1 + travelPackage.gallery.length) % travelPackage.gallery.length)}
                      className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/84 text-[#0F3D2E] shadow-lg backdrop-blur-xl"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveImage((activeImage + 1) % travelPackage.gallery.length)}
                      className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/84 text-[#0F3D2E] shadow-lg backdrop-blur-xl"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                    {travelPackage.gallery.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={cn("h-20 min-w-28 overflow-hidden rounded-2xl border-2 transition", activeImage === index ? "border-[#C62828]" : "border-transparent opacity-70")}
                      >
                        <img src={image} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeTab === "Roteiro" ? (
                <div className="grid gap-4">
                  {travelPackage.itinerary.map((step, index) => (
                    <div key={`${step.time}-${step.title}`} className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[150px_1fr]">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5EE] text-sm font-extrabold text-[#198754]">{index + 1}</span>
                        <span className="text-sm font-extrabold text-[#C62828]">{step.time}</span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-[#1C1C1C]">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="border-t border-slate-200 bg-white p-4 md:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-2xl font-extrabold text-[#0F3D2E]">{travelPackage.price}</p>
                  {travelPackage.installment ? <p className="text-sm font-bold text-slate-500">{travelPackage.installment}</p> : null}
                  {travelPackage.paymentCondition ? <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{travelPackage.paymentCondition}</p> : null}
                </div>
                <a href={reserveUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#198754] px-6 py-4 font-extrabold text-white shadow-xl shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-[#0F3D2E] md:w-auto">
                  <MessageCircle size={20} /> Reservar agora
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
