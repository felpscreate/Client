import type { Metadata } from "next";
import { Award, BadgeCheck, HeartHandshake, MapPinned, ShieldCheck, Users } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FinalCTA, SectionHeading } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Quem Somos | Aurora Trips",
  description: "Conheça a Aurora Trips, plataforma regional de turismo premium com curadoria, atendimento humano e saídas organizadas.",
};

export default function AboutPage() {
  const pillars = [
    { icon: MapPinned, title: "Turismo regional", description: "Roteiros que valorizam destinos próximos, experiências autênticas e operação local." },
    { icon: HeartHandshake, title: "Atendimento humano", description: "Reserva assistida, comunicação clara e suporte antes e durante a viagem." },
    { icon: ShieldCheck, title: "Organização", description: "Datas, benefícios, horários e informações importantes apresentados com transparência." },
    { icon: Award, title: "Curadoria premium", description: "Pacotes escolhidos para entregar conforto, emoção e boa experiência comercial." },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0F3D2E] px-5 pb-24 pt-36 text-white lg:px-8">
          <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1600&q=85" alt="" className="absolute inset-0 h-full w-full object-cover opacity-32" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D2E] via-[#0F3D2E]/84 to-[#C62828]/16" />
          <div className="relative mx-auto max-w-7xl">
            <span className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] backdrop-blur-xl">
              Quem Somos
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-balance md:text-7xl">
              Uma plataforma moderna para turismo regional bem organizado.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              A Aurora Trips nasceu para unir a confiança de uma agência, a clareza de um marketplace e a experiência visual de um aplicativo premium de viagens.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <SectionHeading
            eyebrow="Nossa proposta"
            title="Facilitar a escolha, a reserva e a experiência de cada viajante."
            description="Organizamos pacotes em categorias claras, com benefícios, roteiro, fotos e atendimento direto para transformar interesse em viagem."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#198754]"><pillar.icon size={22} /></span>
                <h2 className="mt-5 text-lg font-extrabold text-[#1C1C1C]">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white px-5 py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] bg-[#0F3D2E] p-8 text-white">
              <Users size={34} className="text-[#E8F5EE]" />
              <h2 className="mt-6 text-3xl font-extrabold">Feito para viajantes e equipes comerciais.</h2>
              <p className="mt-4 leading-8 text-white/70">
                A estrutura foi pensada para crescer com novos destinos, categorias e datas sem perder consistência visual.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Pacotes fáceis de editar", "Reserva por WhatsApp", "Modal com informações completas", "Experiência mobile premium"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-5">
                  <BadgeCheck className="shrink-0 text-[#C62828]" size={22} />
                  <span className="font-extrabold text-[#1C1C1C]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
