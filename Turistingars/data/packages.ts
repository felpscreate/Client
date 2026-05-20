import {
  BadgeCheck,
  Bus,
  CalendarDays,
  Coffee,
  Headphones,
  Hotel,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  Utensils,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import configData from "@/data/config.json";
import homeData from "@/data/home.json";
import sbvData from "@/data/sbv.json";
import hospedagemData from "@/data/hospedagem.json";

export type PackageCategory = "sbv" | "shospedagem";

export type TravelBenefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type TravelStep = {
  time: string;
  title: string;
  description: string;
};

export type TravelPackage = {
  id: string;
  category: PackageCategory;
  active: boolean;
  featured: boolean;
  type: string;
  title: string;
  destination: string;
  date: string;
  price: string;
  installment?: string;
  paymentCondition?: string;
  badge?: string;
  status?: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  benefits: TravelBenefit[];
  itinerary: TravelStep[];
  whatsapp?: string;
  whatsappMessage?: string;
};

export type RawPackage = {
  id: string;
  ativo?: boolean;
  destaque?: boolean;
  tipo: string;
  titulo: string;
  destino: string;
  data: string;
  valor: string;
  parcelamento?: string;
  condicaoPagamento?: string;
  imagem: string;
  badge?: string;
  status?: string;
  resumo: string;
  sobreDestino: string;
  beneficios: { icone?: string; titulo: string; descricao: string }[];
  galeria: string[];
  roteiro: { horario: string; titulo: string; descricao: string }[];
  whatsapp?: string;
  mensagemWhatsapp?: string;
};

const iconMap: Record<string, LucideIcon> = {
  badge: BadgeCheck,
  bus: Bus,
  calendar: CalendarDays,
  coffee: Coffee,
  food: Utensils,
  hotel: Hotel,
  map: MapPinned,
  shield: ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  support: Headphones,
  ticket: Ticket,
  waves: Waves,
};

export function normalizePackage(item: RawPackage, category: PackageCategory): TravelPackage {
  return {
    id: item.id,
    category,
    active: item.ativo !== false,
    featured: item.destaque === true,
    type: item.tipo,
    title: item.titulo,
    destination: item.destino,
    date: item.data,
    price: item.valor,
    installment: item.parcelamento,
    paymentCondition: item.condicaoPagamento,
    image: item.imagem,
    badge: item.badge,
    status: item.status,
    summary: item.resumo,
    description: item.sobreDestino,
    gallery: item.galeria,
    benefits: item.beneficios.map((benefit) => ({
      icon: iconMap[benefit.icone || "badge"] || BadgeCheck,
      title: benefit.titulo,
      description: benefit.descricao,
    })),
    itinerary: item.roteiro.map((step) => ({
      time: step.horario,
      title: step.titulo,
      description: step.descricao,
    })),
    whatsapp: item.whatsapp,
    whatsappMessage: item.mensagemWhatsapp,
  };
}

export const siteConfig = configData;
export const whatsappNumber = siteConfig.whatsapp;
export const homeContent = homeData;

export const dayTripPackages = (sbvData as RawPackage[])
  .map((item) => normalizePackage(item, "sbv"))
  .filter((item) => item.active);

export const lodgingPackages = (hospedagemData as RawPackage[])
  .map((item) => normalizePackage(item, "shospedagem"))
  .filter((item) => item.active);

export const allPackages = [...dayTripPackages, ...lodgingPackages];

export const featuredPackage = allPackages.find((item) => item.featured) || allPackages[0];

export const testimonials = [
  {
    name: "Marina Costa",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    comment: "Viagem muito bem organizada. O roteiro tinha conforto, tempo livre e uma sensação real de cuidado do começo ao fim.",
  },
  {
    name: "Roberto Almeida",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    comment: "A estrutura surpreendeu. Foi simples reservar e tudo aconteceu exatamente como combinado.",
  },
  {
    name: "Helena Duarte",
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
    comment: "Parecia viagem de agência grande, mas com atendimento próximo. Recomendo para quem quer descansar de verdade.",
  },
];

export const faqs = [
  {
    question: "Como faço a reserva?",
    answer: "Clique em Reservar agora no pacote desejado. O WhatsApp abre com uma mensagem pronta para a equipe confirmar vagas, valores e formas de pagamento.",
  },
  {
    question: "Os pacotes incluem transporte?",
    answer: "A maioria dos roteiros inclui transporte turismo. Cada pacote informa os benefícios incluídos e as orientações de embarque.",
  },
  {
    question: "Existe pacote bate e volta e com hospedagem?",
    answer: "Sim. A plataforma separa Saídas bate e volta e Saídas com hospedagem para facilitar a escolha do estilo ideal de viagem.",
  },
  {
    question: "Posso reservar para grupo ou família?",
    answer: "Sim. A equipe confirma disponibilidade, acomodação quando houver hospedagem e condições especiais conforme o tamanho do grupo.",
  },
];

export const trustItems = [
  { icon: BadgeCheck, label: "Curadoria regional" },
  { icon: ShieldCheck, label: "Reserva assistida" },
  { icon: Star, label: "Experiências selecionadas" },
  { icon: CalendarDays, label: "Saídas organizadas" },
];
