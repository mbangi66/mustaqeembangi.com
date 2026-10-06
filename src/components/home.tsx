import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Projects } from "@/components/sections/projects";
import { Highlights } from "@/components/sections/highlights";
import { Capabilities } from "@/components/sections/capabilities";
import { Toolbox } from "@/components/sections/toolbox";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Contact } from "@/components/sections/contact";

/** The single page, shared by every language. */
export function Home() {
  return (
    <>
      <Hero />
      <Industries />
      <Projects />
      <Highlights />
      <Capabilities />
      <Toolbox />
      <About />
      <Process />
      <Work />
      <Contact />
    </>
  );
}
