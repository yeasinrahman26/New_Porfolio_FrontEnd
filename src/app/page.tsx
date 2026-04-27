import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import { getProjects, getSkills } from "@/lib/api";
import ScrollToHash from "@/components/shared/ScrollToHash";

export default async function Home() {
  const [projects, skills] = await Promise.all([getProjects(), getSkills()]);

  return (
    <>
      <ScrollToHash />
      <Hero />
      <About />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Contact />
    </>
  );
}
