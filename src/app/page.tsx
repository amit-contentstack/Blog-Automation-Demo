import EcoWareHero from "@/components/EcoWareHero";
import ServicesScroll from "@/components/ServicesScroll";
import KeyFeatures from "@/components/KeyFeatures";

export default async function Home() {
  return (
    <main>
      <EcoWareHero />
      <ServicesScroll />
      <KeyFeatures />
      <ServicesScroll />
    </main>
  );
}
