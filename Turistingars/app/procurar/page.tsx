import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PackageDirectory } from "@/components/PackageDirectory";

export const metadata: Metadata = {
  title: "Procurar pacotes | Aurora Trips",
  description: "Busque pacotes bate e volta e saídas com hospedagem em uma plataforma premium de turismo regional.",
};

export default function SearchPackagesPage() {
  return (
    <>
      <Header />
      <main>
        <PackageDirectory
          label="Procurar"
          title="Encontre a próxima experiência regional para reservar."
          description="Use a busca para filtrar destinos, cidades e experiências entre saídas bate e volta e pacotes com hospedagem."
          category="all"
        />
      </main>
      <Footer />
    </>
  );
}
