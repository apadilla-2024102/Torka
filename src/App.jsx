import ScrollProgress from './components/ScrollProgress.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Propuesta from './components/Propuesta.jsx'
import Catalogo from './components/Catalogo.jsx'
import Comparador from './components/Comparador.jsx'
import Ahorro from './components/Ahorro.jsx'
import Distribuidores from './components/Distribuidores.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a
        href="#gama"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:font-semibold focus:text-mist"
      >
        Saltar al contenido
      </a>

      <ScrollProgress />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Propuesta />
        <Catalogo />
        <Comparador />
        <Ahorro />
        <Distribuidores />
        <FAQ />
      </main>

      <Footer />
    </>
  )
}
