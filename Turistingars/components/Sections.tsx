"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Check, MapPin, MessageCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Motion";
import { featuredPackage, homeContent, siteConfig, testimonials, trustItems } from "@/data/packages";

export function Hero() {
  const [runtimeHome, setRuntimeHome] = useState(homeContent);
  const [runtimeConfig, setRuntimeConfig] = useState(siteConfig);

  useEffect(() => {
    let active = true;

    async function loadHomeData() {
      try {
        const [homeResponse, configResponse] = await Promise.all([
          fetch(`/data/home.json?v=${Date.now()}`, { cache: "no-store" }),
          fetch(`/data/config.json?v=${Date.now()}`, { cache: "no-store" }),
        ]);
        if (!homeResponse.ok || !configResponse.ok) return;
        const [homeJson, configJson] = await Promise.all([homeResponse.json(), configResponse.json()]);
        if (active) {
          setRuntimeHome(homeJson);
          setRuntimeConfig(configJson);
        }
      } catch {
        if (active) {
          setRuntimeHome(homeContent);
          setRuntimeConfig(siteConfig);
        }
      }
    }

    loadHomeData();

    return () => {
      active = false;
    };
  }, []);

  const highlight = runtimeHome.destaqueCentral;
  const isHighlightActive = highlight.ativo !== false;
  const heroImage = isHighlightActive ? highlight.imagem : featuredPackage.image;
  const heroTitle = isHighlightActive ? highlight.subtitulo : "Viagens regionais com curadoria premium.";
  const heroDescription = isHighlightActive
    ? highlight.descricao
    : "Encontre saídas bate e volta e pacotes com hospedagem em uma plataforma regional moderna, organizada e feita para reservar sem complicação.";

  return (
    <section className="relative min-h-[780px] overflow-hidden bg-[#0F3D2E] pt-28 text-white">
      <div className="absolute inset-0">
        <img src={heroImage} alt={heroTitle} className="h-full w-full scale-105 object-cover opacity-72" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D2E]/96 via-[#0F3D2E]/64 to-[#C62828]/18" />
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[#f7fafc] to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-32 pt-20 lg:grid-cols-[1.06fr_0.7fr] lg:px-8 lg:pt-28">
        <Reveal>
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#E8F5EE] backdrop-blur-xl">
              {isHighlightActive ? highlight.titulo : "Promoção principal"}
            </span>
            <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight text-balance md:text-7xl">
              {heroTitle}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-white/88">
              <span className="flex items-center gap-2"><MapPin size={18} /> Turismo regional</span>
              <span className="flex items-center gap-2"><CalendarDays size={18} /> {isHighlightActive ? highlight.data : featuredPackage.date}</span>
              <span className="flex items-center gap-1 text-[#E8F5EE]">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={17} fill="currentColor" />)}
                <span className="ml-2 text-white">Experiências selecionadas</span>
              </span>
            </div>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/82">{heroDescription}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/#categorias" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#198754] px-7 py-4 font-extrabold text-white shadow-xl shadow-emerald-700/20 transition hover:-translate-y-1 hover:bg-[#0F3D2E]">
                Escolher pacote <ArrowRight size={19} />
              </Link>
              <a href={`https://wa.me/${runtimeConfig.whatsapp}?text=${encodeURIComponent(runtimeConfig.mensagemPadrao)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/24 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-xl transition hover:bg-white/18">
                Falar com consultor
              </a>
            </div>
          </div>
        </Reveal>

        {isHighlightActive ? (
          <Reveal delay={0.15} className="self-end">
            <div className="glass-panel rounded-[2rem] p-5 text-[#1C1C1C]">
              <p className="text-sm font-bold text-slate-500">{highlight.titulo}</p>
              <h2 className="mt-2 text-3xl font-extrabold">{highlight.subtitulo}</h2>
              <p className="mt-3 leading-7 text-slate-600">{highlight.descricao}</p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-extrabold">{highlight.valor}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{highlight.parcelamento}</p>
                </div>
                <span className="rounded-full bg-[#FDECEC] px-4 py-2 text-xs font-extrabold text-[#C62828]">{highlight.badge}</span>
              </div>
              <div className="mt-6 grid gap-3">
                {[highlight.data, highlight.condicaoPagamento, "Reserva assistida pelo WhatsApp"].map((item) => (
                  <span key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold">
                    <Check size={18} className="text-[#198754]" /> {item}
                  </span>
                ))}
              </div>
              <Link href={highlight.botaoLink} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#198754] px-6 py-4 font-extrabold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#0F3D2E]">
                {highlight.botaoTexto} <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C62828]">{eyebrow}</span>
      <h2 className={tone === "dark" ? "mt-3 text-3xl font-extrabold tracking-tight text-white text-balance md:text-5xl" : "mt-3 text-3xl font-extrabold tracking-tight text-[#1C1C1C] text-balance md:text-5xl"}>{title}</h2>
      <p className={tone === "dark" ? "mt-4 text-base leading-8 text-white/68" : "mt-4 text-base leading-8 text-slate-600"}>{description}</p>
    </Reveal>
  );
}

export function TrustBar() {
  return (
    <div className="mx-auto mt-12 grid max-w-6xl gap-3 px-5 md:grid-cols-4 lg:px-8">
      {trustItems.map((item) => (
        <Reveal key={item.label}>
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#198754]"><item.icon size={19} /></span>
            <span className="text-sm font-bold text-[#1C1C1C]">{item.label}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function CategoryChooser() {
  const categories = [
    {
      title: "Saídas bate e volta",
      description: "Viagens rápidas e experiências inesquecíveis para aproveitar o melhor do dia.",
      href: "/sbv",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
      badge: "Experiências de 1 dia",
    },
    {
      title: "Saídas com hospedagem",
      description: "Pacotes completos para quem deseja viajar com conforto e tranquilidade.",
      href: "/shospedagem",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85",
      badge: "Viagens completas",
    },
  ];

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Categorias"
        title="Escolha o pacote ideal para o seu estilo de viagem."
        description="Navegue por experiências regionais organizadas por tipo de saída, com informações claras e reserva pelo WhatsApp."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {categories.map((category, index) => (
          <Reveal key={category.title} delay={index * 0.08}>
            <Link href={category.href} className="group relative block min-h-[420px] overflow-hidden rounded-[2.4rem] bg-[#0F3D2E] p-6 text-white shadow-2xl shadow-emerald-900/12 transition hover:-translate-y-1 md:p-8">
              <img src={category.image} alt={category.title} className="absolute inset-0 h-full w-full object-cover opacity-72 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D2E]/92 via-[#0F3D2E]/44 to-transparent" />
              <div className="relative flex h-full min-h-[360px] flex-col justify-end">
                <span className="mb-auto w-fit rounded-full border border-white/20 bg-white/14 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] backdrop-blur-xl">
                  {category.badge}
                </span>
                <h3 className="text-3xl font-extrabold tracking-tight md:text-5xl">{category.title}</h3>
                <p className="mt-4 max-w-xl leading-8 text-white/76">{category.description}</p>
                <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#198754] px-6 py-4 font-extrabold text-white shadow-lg shadow-emerald-700/20">
                  Ver pacotes <ArrowRight size={19} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Depoimentos" title="Viajantes que voltaram com a sensação de ter escolhido bem." description="Relatos de quem prioriza organização, conforto e atendimento próximo durante a experiência." />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((person, index) => (
            <Reveal key={person.name} delay={index * 0.08}>
              <article className="h-full rounded-[2rem] border border-slate-200 bg-[#f8fafc] p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <img src={person.photo} alt={person.name} className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <h3 className="font-extrabold text-[#1C1C1C]">{person.name}</h3>
                    <div className="mt-1 flex text-[#198754]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
                  </div>
                </div>
                <p className="mt-5 leading-8 text-slate-600">"{person.comment}"</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
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

  return (
    <section className="px-5 py-24 lg:px-8">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#0F3D2E] p-8 text-white premium-shadow md:p-14">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80" alt="Viagem premium" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="relative max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FDECEC]">Reserve sua experiência</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance md:text-6xl">Pronto para viver uma viagem memorável?</h2>
            <p className="mt-5 max-w-2xl leading-8 text-white/76">Fale com a equipe, confirme disponibilidade e receba as orientações para reservar seu pacote com segurança.</p>
            <a href={`https://wa.me/${runtimeConfig.whatsapp}?text=${encodeURIComponent(runtimeConfig.mensagemPadrao)}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#198754] px-7 py-4 font-extrabold text-white shadow-xl shadow-emerald-700/20 transition hover:-translate-y-1 hover:bg-[#0F3D2E]">
              <MessageCircle size={20} /> Reservar agora
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
