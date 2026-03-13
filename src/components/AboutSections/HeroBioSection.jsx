import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroBioSection = ({ onContactClick }) => {
  const triggerRef = useRef(null)
  const pinnedRef = useRef(null)
  const photoRef = useRef(null)
  const overlayRef = useRef(null)
  const heroBgRef = useRef(null)
  const heroContentRef = useRef(null)
  const bioContentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // [0% - 30%] — Nothing moves. Idle scroll.

      // [30% - 70%] — Photo scales up, hero fades, overlay darkens
      // Hero content elements fade out with directional movement
      const heroTopElements = heroContentRef.current.querySelectorAll('.hero-fade-up')
      const heroBottomElements = heroContentRef.current.querySelectorAll('.hero-fade-down')
      const heroBadges = heroContentRef.current.querySelectorAll('.hero-badge')

      tl.to(
        heroTopElements,
        {
          opacity: 0,
          y: -40,
          duration: 0.4,
          ease: 'none',
          stagger: 0.02,
        },
        0.3
      )

      tl.to(
        heroBottomElements,
        {
          opacity: 0,
          y: 40,
          duration: 0.4,
          ease: 'none',
          stagger: 0.02,
        },
        0.3
      )

      tl.to(
        heroBadges,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.35,
          ease: 'none',
          stagger: 0.03,
        },
        0.3
      )

      // Photo: scale up, remove border-radius
      tl.to(
        photoRef.current,
        {
          scale: 1.8,
          borderRadius: '0px',
          duration: 0.4,
          ease: 'none',
        },
        0.3
      )

      // Dark overlay fades in
      tl.to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: 'none',
        },
        0.3
      )

      // Hero bg fades out
      tl.to(
        heroBgRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'none',
        },
        0.35
      )

      // [70% - 100%] — Section 2 content fades in staggered
      const bioElements = bioContentRef.current.querySelectorAll('.bio-animate')

      tl.to(
        bioContentRef.current,
        {
          opacity: 1,
          duration: 0.05,
          ease: 'none',
        },
        0.7
      )

      tl.fromTo(
        bioElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.25,
          ease: 'none',
        },
        0.72
      )
    }, triggerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={triggerRef} className="relative" style={{ height: '250vh' }}>
      <div
        ref={pinnedRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Layer 1: Hero background (light gray) */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 bg-[#D4D4D4]"
          style={{ zIndex: 1 }}
        />

        {/* Layer 2: Hero content elements */}
        <div
          ref={heroContentRef}
          className="absolute inset-0"
          style={{ zIndex: 15 }}
        >
          {/* Top bar: Menu + Black circle */}
          <div className="hero-fade-up absolute top-8 left-12 right-12 flex justify-between items-center">
            <span className="text-black text-[40px] font-medium font-sans">
              Menu
            </span>
            <div className="w-[100px] h-[100px] bg-black rounded-full" />
          </div>

          {/* Heading: "Hello there, I'm Sosthene." */}
          <div className="hero-fade-up absolute top-[155px] left-1/2 -translate-x-1/2 text-center w-full max-w-[943px]">
            <span className="text-[#F9670E] text-[54px] font-serif italic font-medium block">
              Hello there,
            </span>
            <span className="text-black text-[77px] font-sans font-medium leading-tight">
              I'm Sosthene.
            </span>
          </div>

          {/* Decorative circles cluster (left of photo) */}
          <div className="hero-badge absolute" style={{ left: 370, top: 369 }}>
            <div className="relative w-[139px] h-[159px]">
              <div className="absolute w-[139px] h-[139px] left-0 top-5 bg-black rounded-full" />
              <div className="absolute w-6 h-6 left-[112px] top-0 bg-black rounded-full" />
            </div>
          </div>

          {/* Services badge (orange pill, overlapping photo left) */}
          <div
            className="hero-badge absolute flex items-center gap-5 bg-[#F9670E] rounded-full pl-3 pr-[99px] py-2"
            style={{ left: 100, top: 625, height: 96, width: 459 }}
          >
            <div className="w-[79px] h-[79px] bg-white rounded-full flex-shrink-0" />
            <div className="flex flex-col gap-2">
              <span className="text-white text-lg font-medium font-sans">
                Services
              </span>
              <span className="text-white text-[32px] font-medium font-sans leading-tight">
                App development
              </span>
            </div>
          </div>

          {/* Digital Architect badge (orange pill, right side) */}
          <div
            className="hero-badge absolute bg-[#F9670E] rounded-full overflow-hidden flex items-center justify-center"
            style={{ left: 1008, top: 457, width: 283, height: 116 }}
          >
            <span className="text-white text-[35px] font-medium font-sans px-6">
              Digital Architect
            </span>
          </div>

          {/* Experience card (white rounded, bottom right) */}
          <div
            className="hero-fade-down absolute bg-white rounded-full flex items-center gap-3"
            style={{ left: 913, top: 756, width: 459, height: 122 }}
          >
            {/* Stacked circles */}
            <div className="relative w-[65px] h-[104px] ml-5 flex-shrink-0">
              <div className="absolute w-[37px] h-[37px] left-[18px] top-0 bg-[#5B5B5B] rounded-full" />
              <div className="absolute w-[37px] h-[37px] left-0 top-[19px] bg-[#8A8A8A] rounded-full" />
              <div className="absolute w-[37px] h-[37px] left-0 top-[38px] bg-[#BEBEBE] rounded-full" />
              <div className="absolute w-[37px] h-[37px] left-[10px] top-[57px] bg-[#4E4747] rounded-full" />
              <div className="absolute w-[37px] h-[37px] left-[28px] top-[67px] bg-[#1E1E1E] rounded-full" />
            </div>
            <div className="flex flex-col items-end flex-1 pr-8">
              <span className="text-[#F9670E] text-lg font-medium font-sans">
                Experience
              </span>
              <span className="text-black text-[32px] font-medium font-sans leading-tight text-right">
                5 Years of relevant work
              </span>
              <span className="text-black text-lg font-medium font-sans self-start ml-4">
                + many more
              </span>
            </div>
          </div>
        </div>

        {/* Layer 3: The shared photo (z-20) */}
        <img
          ref={photoRef}
          src="/assets/profile/avatar.png"
          alt="Sosthene"
          className="absolute object-cover"
          style={{
            width: 498,
            height: 455,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -30%)',
            borderRadius: 60,
            zIndex: 20,
          }}
        />

        {/* Layer 4: Dark overlay (z-10) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#0A0A0A]"
          style={{ zIndex: 10, opacity: 0 }}
        />

        {/* Layer 5: Section 2 / Bio content (z-30) */}
        <div
          ref={bioContentRef}
          className="absolute inset-0 flex"
          style={{ zIndex: 30, opacity: 0 }}
        >
          <div className="flex flex-col justify-center px-12 lg:px-[50px] pt-[72px] max-w-[700px]">
            <div className="bio-animate flex flex-col">
              <span className="text-[#F9670E] text-[86px] font-serif italic font-medium leading-none">
                Hello there,
              </span>
              <span className="text-white text-[86px] font-sans font-medium leading-tight">
                I'm Sosthene
              </span>
            </div>

            <p className="bio-animate text-white text-[26px] font-sans font-normal leading-relaxed mt-[62px] max-w-[676px]">
              I'm a passionate UI/UX Designer and Mobile App Developer based in
              Kigali, Rwanda. With over 3 years of experience, I specialize in
              creating digital experiences that are not only visually stunning
              but also highly functional and user-centered.
            </p>

            <div className="bio-animate flex items-center gap-14 mt-[62px]">
              <button
                onClick={onContactClick}
                className="relative w-[284px] h-[76px] bg-[#1E1E1E] rounded-[25px] overflow-hidden border-b border-[#F9670E] group"
              >
                <span className="relative z-10 text-white text-[28px] font-medium font-sans">
                  More about me
                </span>
              </button>
              <button
                onClick={onContactClick}
                className="relative w-[252px] h-[76px] bg-[#1E1E1E] rounded-[25px] overflow-hidden border-b border-[#F9670E] group"
              >
                <span className="relative z-10 text-white text-[28px] font-medium font-sans">
                  Let's talk
                </span>
              </button>
            </div>
          </div>

          {/* Photo placeholder on the right (the actual photo is already visible at z-20) */}
        </div>
      </div>
    </section>
  )
}

export default HeroBioSection
