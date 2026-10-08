import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CodingSection } from "@/components/sections/CodingSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <CodingSection />
      <AchievementsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
