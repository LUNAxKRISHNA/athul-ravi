import { CBSC } from '../components/CBSC'
import { Research } from '../components/Research'
import { Publications } from '../components/Publications'
import { Grants } from '../components/Grants'
import { Projects } from '../components/Projects'
import { SectionSeam } from '../components/SectionSeam'
import { PublicationsSeam } from '../components/PublicationsSeam'
import { Seo } from '../components/Seo'

export function ResearchPage() {
  return (
    <div className="pt-16">
      <Seo
        title="Research — Athul Ravi | CBSC, Publications & Grants"
        description="Explore Athul Ravi's research at the Centre for Biomaterials and Sustainable Chemistry (CBSC): biomaterials, publications, grants, and ongoing projects."
        path="/research"
      />
      <CBSC />
      <Research />
      <PublicationsSeam />
      <Grants />
      <Publications />
      <SectionSeam to="#ffffff" />
      <Projects />
    </div>
  )
}
