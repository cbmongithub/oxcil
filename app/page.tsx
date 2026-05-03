import { CallToAction } from "@/components/landing/call-to-action";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { LogoMarquee } from "@/components/landing/logo-marquee";
import { Navbar } from "@/components/landing/navbar";

export default function Home() {
  return (
    <div className="bg-background relative min-h-screen overflow-x-hidden">
      <div className="relative w-full">
        <Navbar />
        <main className="relative z-10 w-full">
          <Hero />
        </main>
      </div>
      <div className="relative z-10">
        <div className="animate-fade-in-delayed relative z-10 pb-12">
          <LogoMarquee />
        </div>
        <FeaturesGrid />
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
}
