import { Hero } from '@/sections/Hero';
import { FeaturedSections } from '@/sections/FeaturedSections';
import { RecentNotes } from '@/sections/RecentNotes';
import { VideoSection } from '@/sections/VideoSection';
import { LatexShowcase } from '@/sections/LatexShowcase';
import { Monetization } from '@/sections/Monetization';
import { Footer } from '@/sections/Footer';

export function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <Hero />
      <FeaturedSections />
      <RecentNotes />
      <VideoSection />
      <LatexShowcase />
      <Monetization />
      <Footer />
    </main>
  );
}
