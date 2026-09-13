import { CBSC } from '../components/CBSC'
import { Research } from '../components/Research'
import { Publications } from '../components/Publications'
import { Grants } from '../components/Grants'
import { Projects } from '../components/Projects'
import { SectionSeam } from '../components/SectionSeam'
import { PublicationsSeam } from '../components/PublicationsSeam'

export function ResearchPage() {
  return (
    <div className="pt-16">
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
