import { Contact } from '../components/Contact'
import { Seo } from '../components/Seo'

export function ContactPage() {
  return (
    <div className="pt-16">
      <Seo
        title="Contact — Athul Ravi"
        description="Get in touch with Athul Ravi, Assistant Professor of Chemistry and Founding Head of the Centre for Biomaterials and Sustainable Chemistry (CBSC)."
        path="/contact"
      />
      <Contact />
    </div>
  )
}
