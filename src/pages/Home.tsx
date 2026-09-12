import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Education } from '../components/Education'
import { Skills } from '../components/Skills'
import { SectionSeam } from '../components/SectionSeam'

export function Home() {
  return (
    <>
      <Hero />
      <SectionSeam to="#ffffff" />
      <About />
      <SectionSeam to="#0D0D0D" />
      <Education />
      <SectionSeam to="#f5f5f7" />
      <Skills />
    </>
  )
}
