import Cta from "@/components/ui/landing/Cta";
import Faq from "@/components/ui/landing/Faq";
import Features from "@/components/ui/landing/Features";
import Hero from "@/components/ui/landing/Hero";
import Testimonials from "@/components/ui/landing/Testimonials";
import { testimonialsData } from "@/lib/constants";


export default async function Home() {

  return (
    <>
      <Hero />
      <Features />
      <Testimonials testimonials={testimonialsData} />
      <Faq />
      <Cta />
    </>
  );
}
