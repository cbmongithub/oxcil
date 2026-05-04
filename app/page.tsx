import { FaqSection } from "@/components/faq-section";
import { FeaturedBlogsSection } from "@/components/featured-blogs-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ModelsTableSection } from "@/components/models-table-section";
import { Navbar } from "@/components/navbar";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
  return (
    <main id="main-content">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ModelsTableSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <FeaturedBlogsSection />
      <Footer />
    </main>
  );
}
