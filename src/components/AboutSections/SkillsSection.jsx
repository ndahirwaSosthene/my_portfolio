import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Card data matching the design
const skillCards = [
  {
    id: 'overview',
    type: 'overview',
    title: 'Skills',
    titleAccent: 'and',
    subtitle: 'Tools',
  },
  {
    id: 'figma',
    type: 'tool-dark',
    toolName: 'Figma',
    toolSubtitle: 'UI/UX Designing',
    gradient: 'linear-gradient(180deg, #1D1D1D 0%, black 95%)',
    description:
      'Expert in creating high-fidelity prototypes, design systems, and collaborative workflows using Figma.',
    experience: '4+ Years of experience',
    projects: '20 Personal Projects',
  },
  {
    id: 'mobile-dev',
    type: 'skill-light',
    title: 'Mobile App development',
    description:
      'Building cross-platform mobile applications with focus on performance and beautiful user experience.',
    tools: ['Flutter & Dart', 'Full app design'],
    experience: '4+ Years of experience',
  },
  {
    id: 'software-eng',
    type: 'skill-light',
    title: 'Software engineering',
    description:
      'Full-stack development with modern frameworks, APIs, and scalable architecture patterns.',
    tools: ['Python', 'Full stack'],
    experience: '4+ Years of experience',
  },
  {
    id: 'notion',
    type: 'tool-orange',
    toolName: 'Notion',
    toolSubtitle: 'Project Management',
    gradient: 'linear-gradient(180deg, #F9670E 0%, black 95%)',
    description:
      'Streamlining workflows and team collaboration with structured project management and documentation.',
    experience: '4+ Years of experience',
    projects: '20 Personal Projects',
  },
  {
    id: 'software-eng-2',
    type: 'skill-light',
    title: 'Software engineering',
    description:
      'Building robust backend systems and APIs with clean architecture and test-driven development.',
    tools: ['Python', 'Full stack'],
    experience: '4+ Years of experience',
  },
  {
    id: 'notion-dark',
    type: 'tool-dark',
    toolName: 'Notion',
    toolSubtitle: 'Project Management',
    gradient: 'linear-gradient(180deg, #5B5B5B 0%, black 95%)',
    description:
      'Advanced workspace design and automation for efficient team productivity and knowledge management.',
    experience: '4+ Years of experience',
    projects: '20 Personal Projects',
  },
]

// Fan positions from design reference (left, top, rotation)
const fanPositions = [
  { x: 0, y: 126, rotation: -10 },
  { x: 157, y: 110, rotation: -6 },
  { x: 364, y: 50, rotation: -7 },
  { x: 554, y: 3, rotation: -1 },
  { x: 732, y: 35, rotation: 5 },
  { x: 982, y: 22, rotation: 11 },
  { x: 1100, y: 76, rotation: 16 },
]

// Card components
const OverviewCard = () => (
  <div
    className="w-[346px] h-[361px] rounded-[10px] bg-[#D9D9D9] relative overflow-hidden"
    style={{ willChange: 'transform' }}
  >
    {/* Decorative grid/matrix background */}
    <div className="absolute inset-5 top-7 bottom-20 bg-gradient-to-b from-black/5 to-black/15 rounded-lg" />
    <div className="absolute bottom-4 left-[74px] flex items-baseline gap-1">
      <span className="text-black text-[32px] font-medium font-sans">
        Skills
      </span>
      <span className="text-[#F9670E] text-[32px] font-serif italic font-medium ml-2">
        and
      </span>
      <span className="text-black text-[32px] font-medium font-sans ml-2">
        Tools
      </span>
    </div>
  </div>
)

const ToolCard = ({ card }) => (
  <div
    className="w-[398px] h-[402px] rounded-[31px] relative overflow-hidden"
    style={{
      background: card.gradient,
      outline: '1.75px rgba(0,0,0,0.08) solid',
      willChange: 'transform',
    }}
  >
    {/* Tool icon placeholder */}
    <div className="absolute left-9 top-[69px]">
      <div className="w-[67px] h-[93px] relative">
        {card.id === 'figma' || card.toolName === 'Figma' ? (
          // Figma icon approximation
          <>
            <div className="absolute w-8 h-8 left-8 top-[29px] bg-[#1ABCFE]" />
            <div className="absolute w-8 h-8 left-[6px] top-[61px] bg-[#0ACF83]" />
            <div className="absolute w-8 h-8 left-[29px] top-0 bg-[#FF7262]" />
            <div className="absolute w-8 h-8 left-0 top-[3px] bg-[#F24E1E]" />
            <div className="absolute w-8 h-8 left-[3px] top-8 bg-[#A259FF]" />
          </>
        ) : (
          // Notion icon approximation
          <>
            <div className="absolute w-[86px] h-[89px] left-0 top-0 bg-black" />
            <div className="absolute w-[68px] h-[9px] left-[10px] top-[12px] bg-white" />
            <div className="absolute w-[63px] h-[56px] left-[15px] top-[27px] bg-white" />
          </>
        )}
      </div>
    </div>
    <span className="absolute left-[138px] top-[52px] text-white text-[41px] font-semibold font-display tracking-wide">
      {card.toolName}
    </span>
    <span className="absolute left-[143px] top-[100px] text-white text-[28px] font-normal font-display">
      {card.toolSubtitle}
    </span>
    <p className="absolute left-[47px] top-[157px] w-[329px] text-white text-[16px] font-medium font-sans leading-5">
      {card.description}
    </p>
    <span className="absolute left-[60px] top-[299px] text-white text-[15px] font-medium font-sans leading-[17px]">
      {card.experience}
    </span>
    <span className="absolute left-[63px] top-[326px] text-white text-[15px] font-medium font-sans leading-[17px]">
      {card.projects}
    </span>
  </div>
)

const SkillLightCard = ({ card }) => (
  <div
    className="w-[322px] h-[443px] rounded-[26px] bg-white relative overflow-hidden"
    style={{
      outline: '0.91px #8A8A8A solid',
      willChange: 'transform',
    }}
  >
    <div className="absolute left-[7px] top-[6px] right-[7px] bottom-[6px] rounded-[18px] overflow-hidden bg-gray-50">
      <h3 className="absolute left-5 top-9 text-black text-[26px] font-medium font-sans w-[280px]">
        {card.title}
      </h3>
      <p className="absolute left-5 top-[74px] w-[278px] text-[#8C8B90] text-[16px] font-normal font-sans">
        {card.description}
      </p>
      {/* Tools list */}
      {card.tools?.map((tool, i) => (
        <span
          key={i}
          className="absolute left-[36px] text-black text-[15px] font-medium font-sans leading-[17px]"
          style={{ top: 182 + i * 21 }}
        >
          {tool}
        </span>
      ))}
      {/* Progress bar */}
      <div className="absolute left-[82px] bottom-[36px] w-[238px] h-[32px] bg-[#5A5A5A] rounded-full">
        <div className="absolute left-0 top-0 w-[147px] h-full bg-[#66D46D] rounded-full" />
        <span className="absolute left-[50px] top-1/2 -translate-y-1/2 text-white text-[15px] font-medium font-sans leading-[17px]">
          {card.experience}
        </span>
      </div>
    </div>
  </div>
)

const SkillCard = ({ card }) => {
  switch (card.type) {
    case 'overview':
      return <OverviewCard />
    case 'tool-dark':
    case 'tool-orange':
      return <ToolCard card={card} />
    case 'skill-light':
      return <SkillLightCard card={card} />
    default:
      return null
  }
}

const SkillsSection = ({ onContactClick }) => {
  const triggerRef = useRef(null)
  const headingRef = useRef(null)
  const skillsBadgeRef = useRef(null)
  const toolsBadgeRef = useRef(null)
  const bottomRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const cardRefs = useRef([])

  const setCardRef = useCallback((el, i) => {
    cardRefs.current[i] = el
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Calculate responsive values
      const containerWidth = triggerRef.current.offsetWidth
      const isMobile = containerWidth < 768
      const rotationMultiplier = isMobile ? 0.5 : 1

      // Scale fan positions for viewport
      const scaleFactor = Math.min(containerWidth / 1728, 1)
      const scaledFanPositions = fanPositions.map((pos) => ({
        x: pos.x * scaleFactor,
        y: pos.y * scaleFactor,
        rotation: pos.rotation * rotationMultiplier,
      }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // === PHASE A: Text cascade in (0% - 20%) ===
      tl.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1, ease: 'none' },
        0
      )

      tl.fromTo(
        skillsBadgeRef.current,
        { x: -100, opacity: 0, rotation: 0 },
        { x: 0, opacity: 1, rotation: -11, duration: 0.08, ease: 'none' },
        0.05
      )

      tl.fromTo(
        toolsBadgeRef.current,
        { x: 100, opacity: 0, rotation: 0 },
        { x: 0, opacity: 1, rotation: 11, duration: 0.08, ease: 'none' },
        0.08
      )

      tl.fromTo(
        bottomRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1, ease: 'none' },
        0.1
      )

      // === PHASE B: Cards fan out from center stack (20% - 37%) ===
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const pos = scaledFanPositions[i]

        tl.fromTo(
          card,
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 0,
            scale: 0.85,
          },
          {
            x: pos.x,
            y: pos.y,
            rotation: pos.rotation,
            opacity: 1,
            scale: 1,
            duration: 0.15,
            ease: 'none',
          },
          0.2 + i * 0.005
        )
      })

      // === PHASE C: Hold fan position (37% - 57%) ===
      // No tweens — breathing room

      // === PHASE D: De-rotate and align horizontally (57% - 74%) ===
      const cardWidth = isMobile ? 280 : 340
      const cardGap = isMobile ? 20 : 30
      const carouselY = 0

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const horizontalX = i * (cardWidth + cardGap)

        tl.to(
          card,
          {
            x: horizontalX,
            y: carouselY,
            rotation: 0,
            duration: 0.17,
            ease: 'none',
          },
          0.57
        )
      })

      // === PHASE E: Horizontal scroll drive (74% - 100%) ===
      const totalCarouselWidth =
        skillCards.length * (cardWidth + cardGap) - cardGap
      const scrollDistance = Math.max(
        totalCarouselWidth - containerWidth + 200,
        0
      )
      const mobileScrollDistance = isMobile
        ? scrollDistance * 0.65
        : scrollDistance

      tl.to(
        cardsContainerRef.current,
        {
          x: -mobileScrollDistance,
          duration: 0.26,
          ease: 'none',
        },
        0.74
      )
    }, triggerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={triggerRef}
      className="relative bg-white"
      style={{ height: '550vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {/* Heading: "I can do Wonders" */}
        <div
          ref={headingRef}
          className="absolute top-[75px] left-1/2 -translate-x-1/2 text-center z-10 opacity-0"
        >
          <span className="text-black text-[41px] font-medium font-sans block">
            I can do
          </span>
          <span className="text-black text-[164px] font-serif italic font-medium leading-none block -mt-4">
            Wonders
          </span>
        </div>

        {/* "Skills" badge - orange pill, rotated -11deg */}
        <div
          ref={skillsBadgeRef}
          className="absolute z-10 opacity-0"
          style={{ left: 190, top: 178 }}
        >
          <div className="bg-[#F9670E]/90 rounded-full px-[30px] py-[18px]">
            <span className="text-white text-[26px] font-medium font-sans">
              Skills
            </span>
          </div>
        </div>

        {/* "Tools" badge - black pill, rotated 11deg */}
        <div
          ref={toolsBadgeRef}
          className="absolute z-10 opacity-0"
          style={{ right: 190, top: 147 }}
        >
          <div className="bg-black rounded-[30px] px-[30px] py-[18px]">
            <span className="text-white text-[26px] font-medium font-sans">
              Tools
            </span>
          </div>
        </div>

        {/* Cards container */}
        <div
          ref={cardsContainerRef}
          className="absolute"
          style={{ left: 122, top: 215, width: '1500px', height: '540px' }}
        >
          {skillCards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => setCardRef(el, i)}
              className="absolute"
              style={{
                left: 0,
                top: 0,
                opacity: 0,
                zIndex: card.type === 'overview' ? 1 : skillCards.length - Math.abs(i - 3) + 1,
              }}
            >
              <SkillCard card={card} />
            </div>
          ))}
        </div>

        {/* Bottom description + CTA */}
        <div
          ref={bottomRef}
          className="absolute bottom-[80px] left-1/2 -translate-x-1/2 text-center z-10 opacity-0"
        >
          <p className="text-black text-[22px] font-medium font-sans max-w-[853px]">
            Expert in designing intuitive interfaces and building scalable
            solutions across mobile and web platforms.
          </p>
          <button
            onClick={onContactClick}
            className="bg-black text-white rounded-full px-[30px] py-[18px] mt-10 text-[21px] font-medium font-sans hover:bg-black/80 transition-colors"
          >
            Let's talk
          </button>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
