import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PackageDirectory } from "@/components/PackageDirectory";

export const metadata: Metadata = {
  title: "Saídas com hospedagem | Aurora Trips",
  description: "Pacotes completos com hospedagem, transporte, roteiro e suporte para viagens regionais premium.",
};

export default function LodgingTripsPage() {
  return (
    <>
      <Header />
      <main>
        <PackageDirectory
          label="SHospedagem"
          title="Saídas com hospedagem para viajar com conforto e tranquilidade."
          description="Pacotes completos com pernoite, apoio de viagem, benefícios organizados e informações prontas para decidir a próxima experiência."
          category="shospedagem"
        />
      </main>
      <Footer />
    </>
  );
}
