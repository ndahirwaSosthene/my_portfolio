import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiOutlineExternalLink } from 'react-icons/hi'
import skills from '../../data/skills'

gsap.registerPlugin(ScrollTrigger)

// =============================================================================
// ENVELOPE 3D STRUCTURE - CSS-IN-JS STYLES
// =============================================================================
// 
// The envelope is built from four DOM layers that create a mechanical 3D object:
// 
//   1. env-back   - The rear panel (visible when flap is open)
//   2. env-pocket - The inner pocket where cards live (translateZ negative)
//   3. env-front  - The front face with the opening
//   4. env-flap   - The triangular flap that rotates open on a hinge
//
// Z-ordering (back to front): back → pocket → cards → front → flap
// =============================================================================

const envelopeStyles = {
  // Container for the entire envelope - establishes 3D context
  wrapper: {
    width: '500px',
    height: '340px',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  },
  // Back panel - visible through the opening when flap is up
  back: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #e8dfd5 0%, #d4c8b8 100%)',
    borderRadius: '12px',
    transform: 'translateZ(-2px)',
    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
  },
  // Inner pocket - cards sit here, pushed back in Z
  pocket: {
    position: 'absolute',
    width: '92%',
    height: '85%',
    left: '4%',
    top: '10%',
    background: 'linear-gradient(180deg, #f5f0e8 0%, #ede5d8 100%)',
    borderRadius: '8px',
    transform: 'translateZ(-1px)',
    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)',
  },
  // Front face - the main visible body with cutout visual
  front: {
    position: 'absolute',
    width: '100%',
    height: '65%',
    bottom: '0',
    background: 'linear-gradient(180deg, #c9b99a 0%, #b8a888 50%, #a89878 100%)',
    borderRadius: '0 0 12px 12px',
    transform: 'translateZ(1px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
    // Subtle paper texture effect
    backgroundImage: `
      linear-gradient(180deg, #c9b99a 0%, #b8a888 50%, #a89878 100%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 2px,
        rgba(255,255,255,0.02) 2px,
        rgba(255,255,255,0.02) 4px
      )
    `,
  },
  // Flap - rotates on a hinge at the top edge
  flap: {
    position: 'absolute',
    width: '100%',
    height: '45%',
    top: '0',
    transformOrigin: 'top center', // Hinge point
    transformStyle: 'preserve-3d',
    transform: 'translateZ(2px) rotateX(0deg)',
    willChange: 'transform',
  },
  // Flap front face (visible when closed)
  flapFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #d4c4a8 0%, #c4b498 100%)',
    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
    backfaceVisibility: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  // Flap back face (visible when open)
  flapBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #e8dfd5 0%, #ddd4c8 100%)',
    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
    transform: 'rotateY(180deg)',
    backfaceVisibility: 'hidden',
  },
  // Decorative seal on the flap
  seal: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    left: '50%',
    bottom: '20px',
    transform: 'translateX(-50%)',
    background: 'radial-gradient(circle, #8b4513 0%, #654321 100%)',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  sealInner: {
    width: '40px',
    height: '40px',
    background: 'radial-gradient(circle, #a0522d 0%, #8b4513 100%)',
    borderRadius: '50%',
    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2)',
  },
}

// =============================================================================
// SKILL CARD COMPONENT
// =============================================================================

const SkillCard = ({ skill, index }) => {
  const navigate = useNavigate()
  
  const handleProofClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Fade out scene before navigating
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
      className="skill-card flex-shrink-0 relative rounded-xl overflow-hidden"
      data-index={index}
      style={{
        width: '377px',
        height: '304px',
        background: 'linear-gradient(145deg, #fff8f0 0%, #ffe4c4 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        // Cards start inside the envelope pocket
        transformStyle: 'preserve-3d',
      }}
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

// =============================================================================
// MAIN COMPONENT - MECHANICAL ENVELOPE ANIMATION
// =============================================================================

const EnvelopeSkills = () => {
  const sceneRef = useRef(null)
  const stickyRef = useRef(null)
  const envelopeRef = useRef(null)
  const flapRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsTrackRef = useRef(null)
  const cardsContainerRef = useRef(null)
  
  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const scene = sceneRef.current
    const envelope = envelopeRef.current
    const flap = flapRef.current
    const subtitle = subtitleRef.current
    const cardsTrack = cardsTrackRef.current
    const cardsContainer = cardsContainerRef.current
    const cards = gsap.utils.toArray('.skill-card')
    const proofBtns = gsap.utils.toArray('.proof-btn')

    if (!scene || !envelope || !flap || !cardsTrack || !cardsContainer) return

    // =========================================================================
    // GSAP TIMELINE - SCROLL-DRIVEN MECHANICAL ANIMATION
    // =========================================================================
    //
    // Timeline phases (mapped to scroll progress 0 → 1):
    //
    //   0.00 - 0.15  Idle: Text visible, envelope closed on right
    //   0.15 - 0.25  Transition: Text fades out, envelope moves to center
    //   0.25 - 0.40  Flap opens: Mechanical hinge rotation (rotateX)
    //   0.40 - 0.55  Cards emerge: Translate up/out from pocket with stagger
    //   0.55 - 0.80  Browse: Cards scroll horizontally
    //   0.80 - 0.95  Exit: Cards translate out, envelope closes
    //   0.95 - 1.00  Reset: Ready for next section
    //
    // All animations use ease: 'none' for linear scrubbing.
    // Scrolling backward reverses everything automatically.
    // =========================================================================

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        // markers: true, // Debug
      }
    })

    // --- Phase 1: Idle state (0.00 - 0.15) ---
    // Initial state set in JSX; nothing animates yet

    // --- Phase 2: Text fades, envelope centers (0.15 - 0.25) ---
    tl.to(subtitle, {
      opacity: 0,
      x: -80,
      duration: 0.10,
      ease: 'none'
    }, 0.15)

    tl.to(envelope, {
      x: -280,
      y: 50,
      scale: 1.15,
      rotateY: -5, // Slight 3D turn for depth
      duration: 0.15,
      ease: 'none'
    }, 0.15)

    // --- Phase 3: Flap opens mechanically (0.25 - 0.40) ---
    // The flap rotates on its top edge (transform-origin: top center)
    // rotateX goes from 0 → -160 degrees (opens past vertical)
    tl.to(flap, {
      rotateX: -160,
      duration: 0.15,
      ease: 'none'
    }, 0.25)

    // Envelope tilts slightly as if being held open
    tl.to(envelope, {
      rotateX: 15,
      rotateY: 0,
      duration: 0.15,
      ease: 'none'
    }, 0.30)

    // --- Phase 4: Cards emerge from pocket (0.40 - 0.55) ---
    // Cards translate from inside the envelope (negative Y, pushed back in Z)
    // to their browsing position (Y: 0, Z: forward)
    tl.fromTo(cards, 
      { 
        y: 200,           // Start below (inside envelope)
        z: -50,           // Pushed back into pocket
        rotateX: -20,     // Tilted as if lying in envelope
        opacity: 0,
      },
      {
        y: 0,
        z: 0,
        rotateX: 0,
        opacity: 1,
        stagger: 0.02,    // Cards emerge in sequence
        duration: 0.12,
        ease: 'none'
      },
      0.40
    )

    // Cards container becomes visible
    tl.to(cardsContainer, {
      opacity: 1,
      duration: 0.05,
      ease: 'none'
    }, 0.40)

    // Envelope drops back and fades as cards take over
    tl.to(envelope, {
      y: 150,
      scale: 0.8,
      opacity: 0,
      rotateX: 30,
      duration: 0.15,
      ease: 'none'
    }, 0.50)

    // --- Phase 5: Horizontal card browsing (0.55 - 0.80) ---
    const trackWidth = cardsTrack.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = Math.max(0, trackWidth - viewportWidth + 200)

    tl.to(cardsTrack, {
      x: -scrollDistance,
      duration: 0.25,
      ease: 'none'
    }, 0.55)

    // --- Phase 6: Cards exit, envelope returns (0.80 - 0.95) ---
    // Cards slide up and out
    tl.to(cards, {
      y: -100,
      opacity: 0,
      stagger: 0.01,
      duration: 0.10,
      ease: 'none'
    }, 0.82)

    tl.to(cardsContainer, {
      opacity: 0,
      duration: 0.05,
      ease: 'none'
    }, 0.90)

    // Envelope fades back in and closes (for scroll-back continuity)
    tl.to(envelope, {
      y: 50,
      scale: 1.15,
      opacity: 1,
      rotateX: 15,
      duration: 0.08,
      ease: 'none'
    }, 0.88)

    // Flap closes
    tl.to(flap, {
      rotateX: 0,
      duration: 0.08,
      ease: 'none'
    }, 0.92)

    // Envelope returns to start position
    tl.to(envelope, {
      x: 0,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.05,
      ease: 'none'
    }, 0.95)

    // =========================================================================
    // INTERACTION WINDOW CONTROL
    // =========================================================================
    // Cards are only interactable during the browsing phase (0.55 - 0.85)
    // This prevents accidental clicks during transitions

    ScrollTrigger.create({
      trigger: scene,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress
        const cardsActive = progress > 0.50 && progress < 0.85

        cards.forEach(card => {
          card.style.pointerEvents = cardsActive ? 'auto' : 'none'
        })
        proofBtns.forEach(btn => {
          btn.style.pointerEvents = cardsActive ? 'auto' : 'none'
        })
      }
    })

    // Cleanup on unmount
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
      {/* Sticky viewport - everything stays fixed as user scrolls */}
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        <div className="w-full h-full relative">
          
          {/* ================================================================
              LEFT SIDE - TITLE AND DESCRIPTION
              ================================================================ */}
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

          {/* ================================================================
              RIGHT SIDE - MECHANICAL 3D ENVELOPE
              ================================================================
              
              Structure:
              - envelope (container with preserve-3d)
                - env-back (rear panel, z: -2)
                - env-pocket (where cards live, z: -1)
                - env-front (main body, z: 1)
                - env-flap (hinged lid, z: 2)
                  - flap-front (visible when closed)
                  - flap-back (visible when open)
                  - seal (decorative)
              
              The flap rotates on its TOP EDGE, opening like a real envelope.
              ================================================================ */}
          <div 
            ref={envelopeRef}
            className="envelope absolute right-[80px] top-[100px]"
            style={envelopeStyles.wrapper}
          >
            {/* Back panel - visible through opening */}
            <div className="env-back" style={envelopeStyles.back} />
            
            {/* Inner pocket - cards emerge from here */}
            <div className="env-pocket" style={envelopeStyles.pocket} />
            
            {/* Front face - main envelope body */}
            <div className="env-front" style={envelopeStyles.front} />
            
            {/* Flap - rotates open on hinge */}
            <div 
              ref={flapRef}
              className="env-flap"
              style={envelopeStyles.flap}
            >
              {/* Front face of flap (visible when closed) */}
              <div style={envelopeStyles.flapFront}>
                {/* Wax seal decoration */}
                <div style={envelopeStyles.seal}>
                  <div style={envelopeStyles.sealInner} />
                </div>
              </div>
              {/* Back face of flap (visible when open) */}
              <div style={envelopeStyles.flapBack} />
            </div>
          </div>
        </div>

        {/* ================================================================
            CARDS CONTAINER - POSITIONED FOR EMERGENCE
            ================================================================
            
            Cards start with:
            - y: 200 (below, inside envelope)
            - z: -50 (pushed back into pocket)
            - rotateX: -20 (tilted as if lying flat)
            
            They animate to y: 0, z: 0, rotateX: 0 during emergence.
            ================================================================ */}
        <div 
          ref={cardsContainerRef}
          className="cards-container absolute inset-0 flex items-center pointer-events-none opacity-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            ref={cardsTrackRef}
            className="cards-track flex gap-12 pl-20"
            style={{ 
              willChange: 'transform',
              transformStyle: 'preserve-3d',
            }}
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
