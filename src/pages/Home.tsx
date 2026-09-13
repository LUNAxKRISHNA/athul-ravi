import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Education } from '../components/Education'
import { Skills } from '../components/Skills'
import { SectionSeam } from '../components/SectionSeam'
import { Seo } from '../components/Seo'

export function Home() {
  return (
    <>
      <Seo
        title="Athul Ravi — Chemistry Researcher"
        description="Athul Ravi is an Assistant Professor of Chemistry and Founding Head of the Centre for Biomaterials and Sustainable Chemistry (CBSC), working on biomaterials, tissue regeneration, and phytopharmaceuticals."
        path="/"
      />
      <Hero />
      <SectionSeam to="#ffffff" />
      <About />
      <Education />
      <Skills />
    </>
  )
}
