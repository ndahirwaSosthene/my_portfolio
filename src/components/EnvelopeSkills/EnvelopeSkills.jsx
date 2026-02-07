import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiOutlineExternalLink } from 'react-icons/hi'
import skills from '../../data/skills'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const SkillCard = ({ skill, index }) => {
  const navigate = useNavigate()
  
  const handleProofClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Navigate to projects page with filter
    gsap.to('.envelope-scene', {
      opacity: 0,
      scale: 0.98,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        navigate(`/projects?filter=${skill.filterTag}`)
      }
    })
  }

  return (
    <article 
      className="skill-card w-[377px] h-[304px] flex-shrink-0 relative bg-primary/20 rounded-xl overflow-hidden"
      data-index={index}
    >
      <div className="absolute left-7 top-9">
        <h3 className="text-black text-[32px] font-display font-bold">{skill.name}</h3>
      </div>
      <p className="w-[316px] absolute left-7 top-[90px] text-black text-lg font-display leading-relaxed">
        {skill.description}
      </p>
      <div className="absolute left-7 top-[182px] flex flex-col gap-2">
        <div className="flex items-center gap-2.5 px-2.5">
          <div className="w-1 h-1 bg-black rounded-full" />
          <span className="text-black text-lg font-display font-medium">{skill.tools[0]}</span>
        </div>
        <div className="flex items-center gap-2.5 px-2.5">
          <div className="w-1 h-1 bg-black rounded-full" />
          <span className="text-black text-lg font-display font-medium">{skill.experience}</span>
        </div>
        <div className="flex items-center gap-2.5 px-2.5">
          <div className="w-1 h-1 bg-black rounded-full" />
          <span className="text-black text-lg font-display font-medium">{skill.projectCount} Projects</span>
        </div>
      </div>
      <button 
        onClick={handleProofClick}
        className="proof-btn absolute right-5 bottom-5 flex items-center gap-2 text-black hover:text-primary transition-colors cursor-pointer"
      >
        <span className="text-lg font-nav font-medium">Proof</span>
        <HiOutlineExternalLink size={14} />
      </button>
    </article>
  )
}

const EnvelopeSkills = () => {
  const sceneRef = useRef(null)
  const stickyRef = useRef(null)
  const envelopeRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsTrackRef = useRef(null)
  const cardsContainerRef = useRef(null)
  
  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const scene = sceneRef.current
    const envelope = envelopeRef.current
    const subtitle = subtitleRef.current
    const cardsTrack = cardsTrackRef.current
    const cardsContainer = cardsContainerRef.current
    const cards = gsap.utils.toArray('.skill-card')
    const proofBtns = gsap.utils.toArray('.proof-btn')
    const envelopeClosed = envelope?.querySelector('.envelope-closed')
    const envelopeOpen = envelope?.querySelector('.envelope-open')

    if (!scene || !envelope || !cardsTrack || !cardsContainer) return

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        // markers: true, // Uncomment for debugging
      }
    })

    // Phase 1: Text visible on left, closed envelope on right (0 - 0.15)
    // Initial state is already set in JSX

    // Phase 2: Text fades out, envelope transitions to open (0.15 - 0.35)
    tl.to(subtitle, {
      opacity: 0,
      x: -100,
      duration: 0.20,
      ease: 'none'
    }, 0.15)

    // Swap closed to open envelope
    if (envelopeClosed && envelopeOpen) {
      tl.to(envelopeClosed, {
        opacity: 0,
        duration: 0.10,
        ease: 'none'
      }, 0.25)

      tl.to(envelopeOpen, {
        opacity: 1,
        duration: 0.10,
        ease: 'none'
      }, 0.25)
    }

    // Move envelope to center and scale up slightly (0.30 - 0.45)
    tl.to(envelope, {
      x: -200,
      scale: 1.1,
      duration: 0.15,
      ease: 'none'
    }, 0.30)

    // Show cards container (0.40)
    tl.to(cardsContainer, {
      opacity: 1,
      duration: 0.05,
      ease: 'none'
    }, 0.40)

    // Phase 3: Cards emerge from envelope (0.45 - 0.60)
    tl.fromTo(cards, 
      { 
        y: 150, 
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.03,
        duration: 0.15,
        ease: 'none'
      },
      0.45
    )

    // Fade out envelope as cards appear
    tl.to(envelope, {
      opacity: 0,
      scale: 0.6,
      y: 100,
      duration: 0.15,
      ease: 'none'
    }, 0.50)

    // Phase 4: Horizontal card browsing (0.60 - 0.85)
    const trackWidth = cardsTrack.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = Math.max(0, trackWidth - viewportWidth + 200)

    tl.to(cardsTrack, {
      x: -scrollDistance,
      duration: 0.25,
      ease: 'none'
    }, 0.60)

    // Phase 5: Cards fade out, prepare for next section (0.85 - 1.00)
    tl.to(cardsContainer, {
      y: -80,
      opacity: 0,
      duration: 0.15,
      ease: 'none'
    }, 0.85)

    // Interaction window control
    ScrollTrigger.create({
      trigger: scene,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const active = self.progress > 0.55 && self.progress < 0.90

        cards.forEach(card => {
          card.style.pointerEvents = active ? 'auto' : 'none'
        })
        proofBtns.forEach(btn => {
          btn.style.pointerEvents = active ? 'auto' : 'none'
        })
        if (envelope) {
          envelope.style.pointerEvents = active ? 'none' : 'auto'
        }
      }
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sceneRef}
      className="envelope-scene relative bg-white"
      style={{ height: '500vh' }}
    >
      {/* Sticky wrapper */}
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Phase 1: Two-column layout matching design */}
        <div className="w-full h-full relative">
          {/* Left Side - Title and Description */}
          <div 
            ref={subtitleRef}
            className="absolute left-[50px] top-[154px] w-[515px] flex flex-col gap-5 z-10"
          >
            <h2 className="text-6xl font-display font-medium text-black leading-tight">
              I CAN DO WONDERS
            </h2>
            <p className="text-2xl font-display font-light text-stone-900 leading-relaxed">
              Crafting exceptional digital experiences through innovative design and 
              cutting-edge solutions. From concept to completion, I deliver results.
            </p>
          </div>

          {/* Right Side - Envelope */}
          <div 
            ref={envelopeRef}
            className="envelope absolute right-[80px] top-[62px]"
            style={{ 
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              width: '666px',
              height: '404px'
            }}
          >
            {/* Closed envelope image */}
            <img 
              src="/assets/envelope/best_cover.png" 
              alt="Envelope closed" 
              className="envelope-closed w-full h-full object-contain"
            />
            
            {/* Open envelope image (initially hidden, shown during animation) */}
            <img 
              src="/assets/envelope/open_best.png" 
              alt="Envelope open" 
              className="envelope-open absolute inset-0 w-full h-full object-contain opacity-0"
            />
          </div>
        </div>

        {/* Cards container - initially hidden below */}
        <div 
          ref={cardsContainerRef}
          className="cards-container absolute inset-0 flex items-center pointer-events-none opacity-0"
        >
          <div 
            ref={cardsTrackRef}
            className="cards-track flex gap-12 pl-20"
            style={{ willChange: 'transform' }}
          >
            {skills.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnvelopeSkills
