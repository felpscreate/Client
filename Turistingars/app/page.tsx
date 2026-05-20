import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CategoryChooser, FinalCTA, Hero, TestimonialsSection, TrustBar } from "@/components/Sections";
import { faqs } from "@/data/packages";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <CategoryChooser />
        <TestimonialsSection />
        <section id="faq" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 lg:grid-cols-[0.8fr_1fr] lg:px-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C62828]">FAQ</span>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#1C1C1C] text-balance">Perguntas frequentes antes de reservar.</h2>
            <p className="mt-5 leading-8 text-slate-600">As principais informações para escolher o tipo de saída, confirmar detalhes e reservar com segurança.</p>
          </div>
          <FAQ items={faqs} />
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
