import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Capabilities } from "@/components/sections/capabilities";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Capabilities />
      <About />
      <Work />
      <Contact />
    </>
  );
}
