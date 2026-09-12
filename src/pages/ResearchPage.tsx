import { Research } from '../components/Research'
import { Publications } from '../components/Publications'
import { Grants } from '../components/Grants'
import { Projects } from '../components/Projects'

export function ResearchPage() {
  return (
    <div className="pt-16">
      <Research />
      <Publications />
      <Grants />
      <Projects />
    </div>
  )
}
