import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Research } from './components/Research'
import { Experience } from './components/Experience'
import { Publications } from './components/Publications'
import { Grants } from './components/Grants'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-paper text-body">
      <Nav />
      <main>
        <Hero />
        <About />
        <Research />
        <Experience />
        <Publications />
        <Grants />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
