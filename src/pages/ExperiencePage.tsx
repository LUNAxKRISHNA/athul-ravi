import { Experience } from '../components/Experience'
import { Activities } from '../components/Activities'
import { Seo } from '../components/Seo'

export function ExperiencePage() {
  return (
    <div className="pt-16">
      <Seo
        title="Experience — Athul Ravi | Career & Activities"
        description="Athul Ravi's professional experience, academic appointments, and institutional activities in chemistry and biomaterials research."
        path="/experience"
      />
      <Experience />
      <Activities />
    </div>
  )
}
