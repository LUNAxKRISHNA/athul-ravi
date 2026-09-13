import { Research } from '../components/Research'
import { Publications } from '../components/Publications'
import { Grants } from '../components/Grants'
import { Projects } from '../components/Projects'
import { SectionSeam } from '../components/SectionSeam'

export function ResearchPage() {
  return (
    <div className="pt-16">
      <Research />
      <SectionSeam to="#000000" />
      <Publications />
      <SectionSeam to="#ffffff" />
      <Grants />
      <Projects />
    </div>
  )
}
