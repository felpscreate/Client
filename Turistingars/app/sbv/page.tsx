import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PackageDirectory } from "@/components/PackageDirectory";

export const metadata: Metadata = {
  title: "Saídas bate e volta | Aurora Trips",
  description: "Pacotes regionais de um dia com transporte, roteiro organizado e reserva assistida pelo WhatsApp.",
};

export default function DayTripsPage() {
  return (
    <>
      <Header />
      <main>
        <PackageDirectory
          label="SBV"
          title="Saídas bate e volta para viver mais em um único dia."
          description="Passeios regionais com transporte organizado, roteiro claro, pontos de parada e experiências selecionadas para aproveitar sem pernoite."
          category="sbv"
        />
      </main>
      <Footer />
    </>
  );
}
