/**
 * Home Page
 * Professional sales-focused homepage for auto-parts marketplace
 */

import HeroSection from "@/components/HeroSection";
import ProductCategoryGrid from "@/components/ProductCategoryGrid";
import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import LatestProductsGrid from "@/components/LatestProductsGrid";
import DualPromotionalBanner from "@/components/DualPromotionalBanner";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductCategoryGrid />
      <FeaturedProductsCarousel />
      <LatestProductsGrid />
      <DualPromotionalBanner />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
