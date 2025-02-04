import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { Pricing } from "@/sections/Pricing";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Testimonials } from "@/sections/Team";
import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    {/*<LogoTicker />*/}
    <Pricing /> 
    <ProductShowcase />
    <Testimonials />
    <CallToAction />
    <Footer />
    </> 
    );
}
