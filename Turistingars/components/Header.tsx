"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/packages";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/#categorias", label: "Categorias" },
  { href: "/procurar", label: "Procurar" },
  { href: "/quem-somos", label: "Quem Somos" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.mensagemPadrao)}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-900/10 bg-white/78 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Turistinga">
          <img src="/LogoTuristinga.png" alt="Turistinga" className="h-11 w-auto object-contain md:h-14" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-semibold text-slate-600 transition hover:text-[#198754]"
            >
              {item.label}
              {index === 0 ? <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[#C62828]" /> : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+5551999999999" className="text-sm font-semibold text-slate-600 hover:text-[#198754]">
            Atendimento
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#198754] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/18 transition hover:-translate-y-0.5 hover:bg-[#0F3D2E]"
          >
            Reservar agora
          </a>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-900/10 bg-white text-[#0F3D2E] lg:hidden"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0F3D2E]/50 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              className="ml-auto h-screen w-[86%] max-w-sm bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <img src="/LogoTuristinga.png" alt="Turistinga" className="h-11 w-auto object-contain" />
                <button className="rounded-full border border-emerald-900/10 p-2 text-[#0F3D2E]" type="button" onClick={() => setOpen(false)} aria-label="Fechar menu">
                  <X size={20} />
                </button>
              </div>
              <div className="mt-10 grid gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl bg-[#E8F5EE] px-4 py-4 text-base font-bold text-[#0F3D2E] transition hover:bg-[#d9efe4]"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-3 rounded-2xl bg-[#198754] px-5 py-4 text-center font-bold text-white shadow-lg shadow-emerald-700/18"
                >
                  Reservar agora
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
