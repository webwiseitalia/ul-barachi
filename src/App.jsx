import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import SplitType from 'split-type'
import { motion, AnimatePresence } from 'framer-motion'
import { Mountain, Trophy, Users, Dog, Coffee, Cake, Beer, TreePine, Armchair, Truck, Sun, Snowflake, Star } from 'lucide-react'

import barEsterno from './assets/foto/bar-esterno-legno.webp'
import areaPicnic from './assets/foto/area-picnic-campo.webp'
import campoCalcetto from './assets/foto/campo-calcetto-giochi.webp'
import campoSportivo from './assets/foto/campo-sportivo-borgo.webp'
import presolanaInnevata from './assets/foto/presolana-innevata.webp'
import seggioviaImg from './assets/foto/seggiovia-sciatori.webp'
import mappaColere from './assets/hf_20260128_172442_6c557fdb-cb30-4fb7-a0bf-cadbd0eb5f84.webp'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const heroTitleRef = useRef(null)
  const heroSubRef = useRef(null)
  const introRef = useRef(null)
  const serviziRef = useRef(null)
  const sportRef = useRef(null)
  const presolanaRef = useRef(null)
  const recensioniRef = useRef(null)
  const contattiRef = useRef(null)
  const cursorDotRef = useRef(null)
  const cursorOutlineRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    setTimeout(() => setIsLoaded(true), 100)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      // Hero title animation
      if (heroTitleRef.current) {
        const splitTitle = new SplitType(heroTitleRef.current, { types: 'chars' })
        gsap.fromTo(splitTitle.chars,
          {
            y: 150,
            rotateX: -90,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'expo.out',
            stagger: {
              each: 0.05,
              from: 'random'
            },
            delay: 0.3
          }
        )
      }

      // Hero subtitle animation
      if (heroSubRef.current) {
        const splitSub = new SplitType(heroSubRef.current, { types: 'words' })
        gsap.fromTo(splitSub.words,
          { y: 80, opacity: 0, rotateZ: 5 },
          {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.08,
            delay: 1
          }
        )
      }

      // Hero parallax images
      gsap.to('.hero-img-main', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      gsap.to('.hero-img-overlay', {
        yPercent: 50,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2
        }
      })

      // Intro section - broken grid reveal
      gsap.fromTo('.intro-title',
        { x: -200, opacity: 0, skewX: 10 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.intro-text',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.intro-img',
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.3 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          scale: 1,
          duration: 1.8,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.intro-img',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // USP cards staggered from different directions
      gsap.fromTo('.usp-card',
        (i) => ({
          x: i % 2 === 0 ? -100 : 100,
          y: 50 + i * 20,
          rotation: i % 2 === 0 ? -5 : 5,
          opacity: 0
        }),
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          stagger: {
            each: 0.15,
            from: 'edges'
          },
          scrollTrigger: {
            trigger: '.usp-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Servizi section - horizontal scroll effect
      const servizioCards = gsap.utils.toArray('.servizio-card')
      servizioCards.forEach((card, i) => {
        gsap.fromTo(card,
          {
            y: 150 + i * 30,
            x: i % 2 === 0 ? -50 : 50,
            rotation: i % 2 === 0 ? -3 : 3,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            x: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Sport section - cinematic reveal
      gsap.fromTo('.sport-title',
        { scale: 0.5, opacity: 0, y: 100 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sportRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Sport images - masonry reveal
      const sportImgs = gsap.utils.toArray('.sport-img')
      sportImgs.forEach((img, i) => {
        const directions = [
          { x: -100, y: 50, rotation: -8 },
          { x: 100, y: -30, rotation: 5 },
          { x: -50, y: 100, rotation: -3 }
        ]
        const dir = directions[i % 3]

        gsap.fromTo(img,
          {
            ...dir,
            opacity: 0,
            scale: 0.8
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Presolana section - parallax
      gsap.to('.presolana-bg', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: presolanaRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      gsap.fromTo('.presolana-text',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: presolanaRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Recensioni - scattered cards
      const recensioniCards = gsap.utils.toArray('.recensione-card')
      recensioniCards.forEach((card, i) => {
        const randomX = (Math.random() - 0.5) * 200
        const randomY = 100 + Math.random() * 50
        const randomRotation = (Math.random() - 0.5) * 20

        gsap.fromTo(card,
          { x: randomX, y: randomY, rotation: randomRotation, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 1.3,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Contatti section
      gsap.fromTo('.contatti-content',
        { x: -150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: contattiRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Marquee animation
      gsap.to('.marquee-track', {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: 'linear'
      })

    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  // Custom cursor
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorDotRef.current && cursorOutlineRef.current) {
        gsap.to(cursorDotRef.current, {
          x: e.clientX - 4,
          y: e.clientY - 4,
          duration: 0.1
        })
        gsap.to(cursorOutlineRef.current, {
          x: e.clientX - 20,
          y: e.clientY - 20,
          duration: 0.3
        })
      }
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  const scrollTo = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <div ref={cursorDotRef} className="cursor-dot hidden md:block" />
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex justify-between items-center px-6 md:px-12 py-6">
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
            className="text-white font-heading font-bold text-xl md:text-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            UL BARACHÌ
          </motion.a>

          <div className="hidden lg:flex items-center gap-12">
            {['chi-siamo', 'servizi', 'sport', 'contatti'].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                onClick={(e) => { e.preventDefault(); scrollTo(`#${item}`) }}
                className="text-white text-sm uppercase tracking-widest hover:opacity-60 transition-opacity"
                whileHover={{ y: -2 }}
              >
                {item.replace('-', ' ')}
              </motion.a>
            ))}
          </div>

          <motion.a
            href="tel:+393396480480"
            className="hidden md:block text-white text-sm border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            339 648 0480
          </motion.a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          >
            <motion.span
              className="w-6 h-0.5 bg-white block"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white block"
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white block"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[var(--quasi-nero)] z-40 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {['home', 'chi-siamo', 'servizi', 'sport', 'recensioni', 'contatti'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(`#${item}`) }}
                  className="text-white text-4xl font-heading font-bold uppercase"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.replace('-', ' ')}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={barEsterno}
            alt="Bar Ul Barachì"
            className="hero-img-main w-full h-[120%] object-cover"
          />
          <div className="hero-img-overlay absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-none text-center md:text-left">
            <h1
              ref={heroTitleRef}
              className="font-heading font-bold text-white leading-[0.85] mb-8 whitespace-nowrap"
              style={{ fontSize: 'var(--fluid-hero)' }}
            >
              Ul Barachì
            </h1>

            <p
              ref={heroSubRef}
              className="text-white/80 max-w-xl mb-12 mx-auto md:mx-0"
              style={{ fontSize: 'var(--fluid-xl)' }}
            >
              Bar di montagna ai piedi della Presolana — dove il tempo rallenta
            </p>

            <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-8 items-center justify-center md:justify-start">
              <motion.a
                href="#contatti"
                onClick={(e) => { e.preventDefault(); scrollTo('#contatti') }}
                className="bg-[var(--arancione-caldo)] text-white px-8 py-4 md:px-12 md:py-5 font-medium uppercase tracking-wider text-sm"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                Vieni a trovarci
              </motion.a>

              <div className="text-white/60 text-sm uppercase tracking-widest text-center md:text-left">
                <span className="block">Colere (BG)</span>
                <span className="block">1.020m s.l.m.</span>
              </div>
            </div>
          </div>

          <div className="absolute right-6 md:right-12 lg:right-24 bottom-20 md:bottom-32 text-right hidden md:block">
            <div className="text-white/40 text-xs uppercase tracking-widest mb-2">Rating</div>
            <div className="text-white text-3xl font-heading font-bold">4.4<span className="text-lg">/5</span></div>
            <div className="text-white/60 text-sm">84+ recensioni</div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            className="w-[1px] h-16 bg-white/30"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[var(--verde-bosco)] py-4 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-white/80 text-sm uppercase tracking-[0.3em] mx-8">
              Colazioni — Aperitivi — Sport — Relax — Vista Presolana — Pet Friendly —
            </span>
          ))}
        </div>
      </div>

      {/* Intro Section - Broken Grid */}
      <section ref={introRef} id="chi-siamo" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4">
          {/* Title - spans columns irregularly */}
          <div className="lg:col-span-7 lg:col-start-1 text-center lg:text-left">
            <h2
              className="intro-title font-heading font-bold text-[var(--grigio-scuro)] leading-[0.95] mb-8"
              style={{ fontSize: 'var(--fluid-4xl)' }}
            >
              Il tuo angolo<br/>
              <span className="text-stroke text-[var(--verde-bosco)]">di relax</span><br/>
              a Colere
            </h2>
          </div>

          {/* Image - offset position */}
          <div className="lg:col-span-5 lg:col-start-8 lg:-mt-20 lg:mb-20">
            <div className="intro-img relative overflow-hidden">
              <img
                src={areaPicnic}
                alt="Area picnic con vista montagna"
                className="w-full h-[50vh] md:h-[70vh] object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-[var(--marrone-legno)] text-white p-6 md:p-8">
                <span className="text-4xl md:text-5xl font-heading font-bold">1.020</span>
                <span className="block text-sm uppercase tracking-wider mt-1">metri s.l.m.</span>
              </div>
            </div>
          </div>

          {/* Text - opposite side, lower */}
          <div className="lg:col-span-5 lg:col-start-1 lg:-mt-40 text-center lg:text-left">
            <p className="intro-text text-[var(--grigio-medio)] leading-relaxed mb-6" style={{ fontSize: 'var(--fluid-lg)' }}>
              Un caratteristico baretto di montagna nel cuore di Colere,
              proprio sotto la maestosa Presolana. La struttura interamente
              in legno ti accoglie con un'atmosfera calda e informale.
            </p>
            <p className="intro-text text-[var(--grigio-medio)] leading-relaxed" style={{ fontSize: 'var(--fluid-base)' }}>
              Siamo il punto di ritrovo per famiglie, sportivi e amanti della montagna.
              Vieni a goderti un caffè al sole, una cioccolata calda d'inverno,
              o un aperitivo con vista sulle Orobie.
            </p>
          </div>
        </div>

        {/* USP Grid - Asymmetric */}
        <div className="usp-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-24 md:mt-40">
          {[
            { icon: Mountain, title: 'Vista Presolana', desc: 'Regina delle Orobie' },
            { icon: Trophy, title: 'Sport', desc: 'Tennis, calcetto, pattinaggio' },
            { icon: Users, title: 'Famiglie', desc: 'Area giochi bambini' },
            { icon: Dog, title: 'Pet Friendly', desc: 'Cani benvenuti' },
          ].map((item, i) => (
            <div
              key={i}
              className={`usp-card bg-white p-6 md:p-8 ${i === 1 ? 'md:-translate-y-8' : ''} ${i === 2 ? 'md:translate-y-12' : ''}`}
            >
              <item.icon className="w-10 h-10 md:w-12 md:h-12 text-[var(--verde-bosco)] mb-4 stroke-[1.5]" />
              <h3 className="font-heading font-semibold text-[var(--grigio-scuro)] text-lg md:text-xl mb-1">
                {item.title}
              </h3>
              <p className="text-[var(--grigio-medio)] text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Servizi Section - Scattered Layout */}
      <section ref={serviziRef} id="servizi" className="bg-[var(--quasi-nero)] py-24 md:py-40 overflow-hidden">
        <div className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24 text-center md:text-left">
          <h2
            className="font-heading font-bold text-white leading-[0.95]"
            style={{ fontSize: 'var(--fluid-3xl)' }}
          >
            Cosa<br/>
            <span className="text-stroke text-[var(--legno-chiaro)] md:ml-24">offriamo</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-6 md:px-12 lg:px-24">
          {[
            { icon: Coffee, title: 'Colazioni', desc: 'Caffè, cappuccini e brioches fresche. Aperti dalle 6:30 per i mattinieri!', offset: 'md:translate-y-12' },
            { icon: Cake, title: 'Cioccolata Calda', desc: 'La nostra specialità! Perfetta dopo una giornata sulla neve.', offset: 'md:-translate-y-8' },
            { icon: Beer, title: 'Aperitivi & Drink', desc: 'Birre, vini, cocktail e superalcolici. Relax con vista montagna.', offset: 'md:translate-y-20' },
            { icon: TreePine, title: 'Prodotti Locali', desc: 'Un angolo dedicato ai sapori della Val di Scalve e del sottobosco.', offset: 'md:-translate-y-4' },
            { icon: Armchair, title: 'All\'aperto', desc: 'Tavoli con vista sulle montagne e sul parco comunale.', offset: 'md:translate-y-8' },
            { icon: Truck, title: 'Consegna', desc: 'Servizio di consegna a domicilio per la zona di Colere.', offset: '' },
          ].map((item, i) => (
            <div
              key={i}
              className={`servizio-card bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 ${item.offset}`}
            >
              <item.icon className="w-12 h-12 md:w-14 md:h-14 text-[var(--legno-chiaro)] mb-6 stroke-[1.5]" />
              <h3 className="font-heading font-semibold text-white text-xl md:text-2xl mb-3">
                {item.title}
              </h3>
              <p className="text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Extra services - horizontal scroll on mobile */}
        <div className="mt-16 md:mt-24 px-6 md:px-12 lg:px-24">
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
            {['Parcheggio gratuito', 'Accessibile', 'Carte & NFC', 'Cani ammessi', 'WiFi'].map((service, i) => (
              <span
                key={i}
                className="text-white/40 text-sm border border-white/20 px-4 py-2 hover:text-white hover:border-white/40 transition-colors cursor-default"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sport Section - Cinematic */}
      <section ref={sportRef} id="sport" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-[var(--verde-bosco)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="text-center lg:text-left">
            <h2
              className="sport-title font-heading font-bold text-white leading-[0.9] mb-8 md:mb-12"
              style={{ fontSize: 'var(--fluid-4xl)' }}
            >
              Non solo bar...<br/>
              <span className="text-[var(--legno-chiaro)]">anche sport!</span>
            </h2>

            <p className="text-white/80 mb-12 max-w-lg mx-auto lg:mx-0" style={{ fontSize: 'var(--fluid-lg)' }}>
              Siamo proprio accanto al campo sportivo di Colere. Il posto perfetto per
              una pausa rinfrescante dopo l'attività fisica.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8">
                <h3 className="font-heading font-semibold text-white text-xl mb-4 flex items-center gap-3">
                  <Sun className="w-5 h-5 stroke-[1.5]" /> Estate
                </h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>— Campo da tennis</li>
                  <li>— Campo da calcetto</li>
                  <li>— Tornei e corsi</li>
                  <li>— Area giochi bambini</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8">
                <h3 className="font-heading font-semibold text-white text-xl mb-4 flex items-center gap-3">
                  <Snowflake className="w-5 h-5 stroke-[1.5]" /> Inverno
                </h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>— Pista pattinaggio</li>
                  <li>— Vicino agli impianti</li>
                  <li>— Ristoro sciatori</li>
                  <li>— Cioccolata calda</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Images - Masonry style */}
          <div className="grid grid-cols-2 gap-4">
            <div className="sport-img col-span-2">
              <img
                src={campoSportivo}
                alt="Campo sportivo Colere"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            <div className="sport-img">
              <img
                src={seggioviaImg}
                alt="Seggiovia Presolana"
                className="w-full h-40 md:h-56 object-cover"
              />
            </div>
            <div className="sport-img -mt-8 md:-mt-16">
              <img
                src={campoCalcetto}
                alt="Campo calcetto"
                className="w-full h-48 md:h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Presolana Section - Split with Ski Map */}
      <section ref={presolanaRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={presolanaInnevata}
            alt="Presolana innevata"
            className="presolana-bg w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center px-6 md:px-12 lg:px-24 py-24 md:py-32">
          <div className="presolana-text flex flex-col justify-center text-center lg:text-left">
            <h2
              className="font-heading font-bold text-white leading-[0.9] mb-6"
              style={{ fontSize: 'var(--fluid-hero)' }}
            >
              Colere<br/>
              <span className="text-stroke">Infinite Mountain</span>
            </h2>
            <p className="text-white/80 max-w-xl mb-8 mx-auto lg:mx-0" style={{ fontSize: 'var(--fluid-xl)' }}>
              La ski area più moderna della bergamasca. 25 km di piste dai 1.000 ai 2.200 metri.
              Vista mozzafiato sulla Presolana, la "Regina delle Orobie".
            </p>
            <div className="flex flex-wrap gap-4 text-white/60 text-sm justify-center lg:justify-start">
              <span className="border border-white/30 px-4 py-2">60 km da Bergamo</span>
              <span className="border border-white/30 px-4 py-2">100 km da Milano</span>
              <span className="border border-white/30 px-4 py-2">1.000 - 2.200 m</span>
            </div>
          </div>

          <div className="presolana-text flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-2xl">
              <img
                src={mappaColere}
                alt="Mappa piste Colere"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-[var(--arancione-caldo)] text-white px-6 py-3 font-heading font-bold">
                <span className="text-2xl">25</span>
                <span className="text-sm ml-1">km di piste</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recensioni Section - Editorial Style */}
      <section ref={recensioniRef} id="recensioni" className="py-24 md:py-40 overflow-hidden bg-[var(--quasi-nero)]">
        <div className="px-6 md:px-12 lg:px-24 mb-20 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end text-center lg:text-left">
            <div className="lg:col-span-8">
              <p className="text-[var(--arancione-caldo)] text-sm uppercase tracking-[0.2em] mb-4">Testimonianze</p>
              <h2
                className="font-heading font-bold text-white leading-[0.9]"
                style={{ fontSize: 'var(--fluid-4xl)' }}
              >
                Cosa dicono<br/>
                <span className="text-stroke text-[var(--legno-chiaro)]">di noi</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <div className="inline-flex items-baseline gap-2">
                <span className="text-5xl md:text-8xl font-heading font-bold text-white">4.4</span>
                <span className="text-white/40 text-xl">/5</span>
              </div>
              <p className="text-white/50 text-sm mt-2">84+ recensioni su Google</p>
            </div>
          </div>
        </div>

        {/* Featured Review - Large */}
        <div className="px-6 md:px-12 lg:px-24 mb-16">
          <div className="recensione-card relative text-center lg:text-left">
            <div className="absolute -top-8 left-0 lg:left-0 right-0 lg:right-auto text-[8rem] md:text-[16rem] font-heading font-bold text-white/5 leading-none select-none pointer-events-none">
              "
            </div>
            <blockquote className="relative z-10">
              <p
                className="text-white font-heading font-medium leading-[1.2] mb-8"
                style={{ fontSize: 'var(--fluid-2xl)' }}
              >
                Proprietaria gentilissima, luogo rilassante con vista su parco e montagna.
                Caffè e croissant in relax al sole!
              </p>
              <footer className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-12 h-12 rounded-full bg-[var(--verde-bosco)] flex items-center justify-center text-white font-heading font-bold">
                  MR
                </div>
                <div>
                  <p className="text-white font-medium">Marco R.</p>
                  <div className="flex items-center gap-1 text-[var(--arancione-caldo)]">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Other Reviews - Horizontal Scroll */}
        <div className="relative">
          <div className="flex gap-6 px-6 md:px-12 lg:px-24 overflow-x-auto pb-8 scrollbar-hide">
            {[
              { text: "Un caratteristico baretto di montagna dove rilassarsi. Super cioccolata calda!", author: "Laura B.", initials: "LB" },
              { text: "Personale gentile e disponibile. Il bar è molto caratteristico, tipico di montagna.", author: "Andrea P.", initials: "AP" },
              { text: "Tipico locale accogliente. Gestiscono anche il campo da tennis. D'inverno diventa pista del ghiaccio!", author: "Giovanni M.", initials: "GM" },
              { text: "Bar caratterizzato dalla struttura in legno sia interna che esterna. Atmosfera calma e rilassante.", author: "Francesca D.", initials: "FD" },
              { text: "Ottimo punto di ristoro dopo una giornata sulle piste. Prezzi onesti e ambiente familiare.", author: "Paolo S.", initials: "PS" },
            ].map((review, i) => (
              <div
                key={i}
                className="recensione-card flex-shrink-0 w-[320px] md:w-[400px] bg-white/5 backdrop-blur-sm border border-white/10 p-8"
              >
                <div className="flex items-center gap-1 text-[var(--arancione-caldo)] mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-white/80 leading-relaxed mb-8 text-lg">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--marrone-legno)] flex items-center justify-center text-white text-sm font-medium">
                    {review.initials}
                  </div>
                  <p className="text-white/60 text-sm">{review.author}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient fade on edges */}
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[var(--quasi-nero)] to-transparent pointer-events-none hidden md:block" />
        </div>

        {/* CTA */}
        <div className="px-6 md:px-12 lg:px-24 mt-16 text-center">
          <motion.a
            href="https://g.page/r/barulbarachi/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
            whileHover={{ x: 5 }}
          >
            <span className="text-sm uppercase tracking-widest">Lascia una recensione</span>
            <span className="w-8 h-[1px] bg-current group-hover:w-12 transition-all" />
          </motion.a>
        </div>
      </section>

      {/* Contatti Section - Split */}
      <section ref={contattiRef} id="contatti" className="bg-[var(--marrone-legno)] py-24 md:py-40 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="contatti-content px-6 md:px-12 lg:px-24 py-12 flex flex-col justify-center text-center lg:text-left">
            <h2
              className="font-heading font-bold text-white leading-[0.95] mb-16"
              style={{ fontSize: 'var(--fluid-4xl)' }}
            >
              Vieni a<br/>
              <span className="text-[var(--legno-chiaro)]">trovarci</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div>
                <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">Orari</h3>
                <p className="text-white text-3xl md:text-4xl font-heading font-bold">06:30 — 23:00</p>
                <p className="text-[var(--legno-chiaro)] mt-2">Chiuso il mercoledì</p>
              </div>

              <div>
                <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">Telefono</h3>
                <motion.a
                  href="tel:+393396480480"
                  className="text-white text-2xl md:text-3xl font-heading font-bold block hover:text-[var(--legno-chiaro)] transition-colors"
                  whileHover={{ x: 10 }}
                >
                  +39 339 648 0480
                </motion.a>
                <p className="text-white/60 text-sm mt-2">Chiamaci o scrivici su WhatsApp</p>
              </div>

              <div>
                <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">Indirizzo</h3>
                <p className="text-white text-xl md:text-2xl font-heading font-semibold">Via Asline</p>
                <p className="text-white/80 mt-1">24020 Colere (BG)</p>
                <p className="text-white/60 text-sm mt-1">Val di Scalve · Alpi Orobie</p>
              </div>

              <div>
                <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">Social</h3>
                <div className="flex gap-4 justify-center lg:justify-start">
                  <motion.a
                    href="https://www.facebook.com/barulbarachi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[var(--marrone-legno)] transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://wa.me/393396480480"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[var(--marrone-legno)] transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="mailto:saralazzaroni46@gmail.com"
                    className="w-14 h-14 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[var(--marrone-legno)] transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2777.8!2d10.0666667!3d45.983333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47817a7e5c2f9f7d%3A0x0!2sVia%20Asline%2C%2024020%20Colere%20BG!5e0!3m2!1sit!2sit!4v1699000000000!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa Bar Ul Barachì"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--quasi-nero)] py-12 md:py-16 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h3 className="font-heading font-bold text-[var(--legno-chiaro)] text-2xl mb-2">Ul Barachì</h3>
            <p className="text-white/40 text-sm">Bar di montagna · Colere (BG)</p>
          </div>

          <div className="text-white/40 text-sm">
            <p>© 2026 UL BARACHI di Silvy Lazzaroni</p>
            <p className="mt-1">Via Asline, 24020 Colere (BG)</p>
          </div>

          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
            className="text-white/40 hover:text-white transition-colors text-sm uppercase tracking-wider"
            whileHover={{ y: -3 }}
          >
            Torna su ↑
          </motion.a>
        </div>
      </footer>
    </div>
  )
}

export default App
