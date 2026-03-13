import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedinIn, FaBehance } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutFooter = ({ onContactClick }) => {
  const sectionRef = useRef(null)
  const brandCardRef = useRef(null)
  const navCardRef = useRef(null)
  const watermarkRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(brandCardRef.current, {
        x: -80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      })

      gsap.from(navCardRef.current, {
        x: 80,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      })

      gsap.from(watermarkRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: watermarkRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const socialLinks = [
    {
      icon: FaInstagram,
      href: 'https://instagram.com/i_ndahirwas_s',
      label: 'Instagram',
    },
    {
      icon: FaLinkedinIn,
      href: 'https://linkedin.com/in/rylan-phillips',
      label: 'LinkedIn',
    },
    { icon: FaBehance, href: 'https://behance.net', label: 'Behance' },
  ]

  return (
    <section
      ref={sectionRef}
      className="bg-white py-6 px-6 lg:px-10 overflow-hidden"
    >
      <div className="max-w-[1628px] mx-auto">
        {/* Two-card row */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
          {/* Left: Brand card */}
          <div
            ref={brandCardRef}
            className="w-full lg:w-[463px] h-[470px] rounded-[30px] relative overflow-hidden flex-shrink-0"
            style={{
              background:
                'linear-gradient(337deg, #F4F4F4 0%, #FF6100 68%), #1E1E1E',
            }}
          >
            {/* Logo circle */}
            <div className="absolute w-16 h-16 left-[26px] top-[30px] bg-white rounded-full" />
            {/* Brand name */}
            <span className="absolute left-[106px] top-[39px] text-white text-[41px] font-display font-bold">
              Sosthene
            </span>
            {/* Tagline */}
            <span className="absolute left-[18px] top-[329px] text-black text-[26px] font-medium font-sans">
              Smart digital solutions
            </span>
            <span className="absolute left-[18px] top-[360px] text-black text-[20px] font-normal font-sans">
              for your business.
            </span>
            {/* Talk to me link */}
            <button
              onClick={onContactClick}
              className="absolute left-[18px] top-[420px] text-black text-[20px] font-serif italic"
            >
              Talk to me
            </button>
            {/* Social icons */}
            <div className="absolute left-[245px] top-[392px] flex items-center gap-[17px]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[55px] h-[55px] bg-black rounded-[10px] flex items-center justify-center text-white shadow-lg hover:bg-black/80 transition-colors"
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Navigation + Services card */}
          <div
            ref={navCardRef}
            className="flex-1 h-[470px] rounded-[30px] relative overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg, #BEBEBE 3%, rgba(153, 153, 153, 0) 65%)',
              backgroundColor: '#E8E8E8',
            }}
          >
            {/* Navigation */}
            <div className="absolute left-9 top-[39px] flex flex-col gap-[22px]">
              <span className="text-[#404040] text-[26px] font-serif italic font-medium">
                Navigation
              </span>
              <div className="flex flex-col gap-[3px]">
                <Link
                  to="/"
                  className="text-black text-[19px] font-display font-semibold hover:text-[#F9670E] transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-black text-[19px] font-display font-medium hover:text-[#F9670E] transition-colors"
                >
                  About Me
                </Link>
                <Link
                  to="/projects"
                  className="text-black text-[19px] font-display font-medium hover:text-[#F9670E] transition-colors"
                >
                  Projects
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="absolute left-[306px] top-[39px] flex flex-col gap-[22px]">
              <span className="text-[#404040] text-[26px] font-serif italic font-medium">
                Services
              </span>
              <div className="flex flex-col gap-[3px]">
                <span className="text-black text-[19px] font-display font-medium">
                  No-code development
                </span>
                <span className="text-black text-[19px] font-display font-medium">
                  Flutter development
                </span>
                <span className="text-black text-[19px] font-display font-medium">
                  Software engineering
                </span>
              </div>
            </div>

            {/* Newsletter section */}
            <div className="absolute right-[15px] bottom-[80px] flex flex-col gap-[17px] w-[481px]">
              <div className="flex flex-col">
                <span className="text-[#737373] text-[20px] font-display font-medium">
                  Tech moves fast.
                </span>
                <span className="text-black text-[22px] font-sans font-medium">
                  Stay ahead with my blog.
                </span>
              </div>
              <div className="bg-white rounded-[10px] px-[26px] py-[9px] flex items-center justify-between">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="text-[#737373] text-[17px] font-display font-medium bg-transparent outline-none w-[191px]"
                />
                <button className="bg-black text-white rounded-[10px] px-[45px] py-[15px] text-[17px] font-display font-medium hover:bg-black/80 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Copyright */}
            <span className="absolute left-9 bottom-[25px] text-[#404040] text-[16px] font-display font-medium">
              2026 Sosthene. All rights reserved
            </span>
          </div>
        </div>

        {/* Watermark text */}
        <div ref={watermarkRef} className="text-center mt-4 overflow-hidden">
          <span className="text-[#5B5B5B] text-[200px] lg:text-[320px] font-display font-bold opacity-40 leading-none select-none block">
            Sosthene
          </span>
        </div>
      </div>
    </section>
  )
}

export default AboutFooter
