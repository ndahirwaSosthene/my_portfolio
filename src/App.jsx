import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import ContactModal from './components/ContactModal/ContactModal'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))

function App() {
  const location = useLocation()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const openContactModal = () => setIsContactModalOpen(true)
  const closeContactModal = () => setIsContactModalOpen(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation onContactClick={openContactModal} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home onContactClick={openContactModal} />} />
              <Route path="/about" element={<About onContactClick={openContactModal} />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
      
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  )
}

export default App
