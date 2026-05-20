import type { Metadata } from "next";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurora Trips | Turismo regional premium",
  description:
    "Plataforma de turismo regional com pacotes bate e volta, saídas com hospedagem, roteiros organizados e reserva assistida.",
  keywords: ["turismo", "viagens", "pacotes", "bate e volta", "hospedagem", "turismo regional"],
  openGraph: {
    title: "Aurora Trips | Turismo regional premium",
    description: "Experiências completas para viajar com conforto, segurança e curadoria profissional.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
