import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Clients from './components/Clients'
import QuickForm from './components/QuickForm'
import Testimonials from './components/Testimonials'
import ContactMap from './components/ContactMap'
import Footer from './components/Footer'
import FloatingAction from './components/FloatingAction'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Clients />
      <QuickForm />
      <Testimonials />
      <ContactMap />
      <Footer />
      <FloatingAction />
    </main>
  )
}
