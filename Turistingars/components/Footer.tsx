import { Camera, Mail, MapPin, MessageCircle, Phone, Send, Share2 } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/packages";

export function Footer() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.mensagemPadrao)}`;

  return (
    <footer className="bg-[#0F3D2E] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <span className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg shadow-emerald-950/20">
            <img src="/LogoTuristinga.png" alt="Turistinga" className="h-12 w-auto object-contain" />
          </span>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
            Turismo regional premium com curadoria, atendimento humano e pacotes organizados para viagens memoráveis.
          </p>
          <div className="mt-6 flex gap-3">
            {[Camera, Share2, Send].map((Icon, index) => (
              <a key={index} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#C62828]" aria-label="Rede social">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Links rápidos</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/68">
            <Link className="transition hover:text-[#ffb3b3]" href="/">Início</Link>
            <Link className="transition hover:text-[#ffb3b3]" href="/#categorias">Categorias</Link>
            <Link className="transition hover:text-[#ffb3b3]" href="/sbv">Saídas bate e volta</Link>
            <Link className="transition hover:text-[#ffb3b3]" href="/shospedagem">Saídas com hospedagem</Link>
            <Link className="transition hover:text-[#ffb3b3]" href="/quem-somos">Quem Somos</Link>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Contato</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/68">
            <span className="flex items-center gap-2"><Phone size={16} /> {siteConfig.agencia.telefone}</span>
            <span className="flex items-center gap-2"><Mail size={16} /> {siteConfig.agencia.email}</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> {siteConfig.agencia.cidade}</span>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white transition hover:text-[#ffb3b3]">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Operação</h3>
          <p className="mt-5 text-sm leading-7 text-white/68">
            Estrutura preparada para múltiplos destinos, categorias, datas, preços, benefícios e roteiros editáveis.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-xs font-semibold text-white/50">
        © 2026 {siteConfig.agencia.nome}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
