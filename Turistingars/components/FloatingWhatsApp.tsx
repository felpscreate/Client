"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/packages";

export function FloatingWhatsApp() {
  const [runtimeConfig, setRuntimeConfig] = useState(siteConfig);

  useEffect(() => {
    let active = true;

    async function loadConfig() {
      try {
        const response = await fetch(`/data/config.json?v=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) return;
        const config = await response.json();
        if (active) setRuntimeConfig(config);
      } catch {
        if (active) setRuntimeConfig(siteConfig);
      }
    }

    loadConfig();

    return () => {
      active = false;
    };
  }, []);

  const whatsappUrl = `https://wa.me/${runtimeConfig.whatsapp}?text=${encodeURIComponent(runtimeConfig.mensagemPadrao)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float group fixed bottom-5 right-5 z-[70] inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#0f9f52] via-[#25D366] to-[#198754] text-white shadow-2xl shadow-emerald-800/25 transition hover:scale-105 md:bottom-7 md:right-7 md:h-auto md:w-auto md:px-5 md:py-4"
      aria-label="Abrir WhatsApp"
    >
      <span className="whatsapp-shine" aria-hidden="true" />
      <MessageCircle size={26} className="relative z-10" />
      <span className="relative z-10 ml-2 hidden text-sm font-extrabold md:inline">WhatsApp</span>
    </a>
  );
}
