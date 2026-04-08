import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Music, 
  Briefcase, 
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2
} from 'lucide-react';

// --- Types ---

interface Project {
  title: string;
  location: string;
  desc: string;
  fullDesc: string;
  image: string;
  images?: string[];
  year: string;
  audioPreview?: string;
  audioTracks?: Track[];
  embed?: string;
}

interface Track {
  title: string;
  album: string;
  duration: string;
  url: string;
  image?: string;
}

interface PreviousWorkItem {
  title: string;
  artist: string;
  image: string;
  link: string;
  track?: Track;
}

// --- Data ---

const PREVIOUS_WORK: PreviousWorkItem[] = [
  {
    title: 'ADMAF 2025',
    artist: 'Arranger',
    image: '/images/admaf_1.jpg',
    link: '#arranger',
  },
  {
    title: 'ADMAF 2025 — Stage',
    artist: 'Arranger',
    image: '/images/admaf_2.jpg',
    link: '#arranger',
  },
  {
    title: 'ADMAF 2025 — Ensemble',
    artist: 'Arranger',
    image: '/images/admaf_3.jpg',
    link: '#arranger',
  },
  {
    title: 'YOU ARE NOW CONNECTED',
    artist: 'Film Composer',
    image: '/images/connected_1.jpg',
    link: '#composer',
  },
  {
    title: 'YOU ARE NOW CONNECTED',
    artist: 'Film Composer — Esra',
    image: '/images/connected_esra.jpg',
    link: '#composer',
  },
  {
    title: 'Saty Mookan',
    artist: 'Artist Portrait',
    image: '/images/saty_1.jpg',
    link: '#bio',
  },
  {
    title: 'Saty Mookan',
    artist: 'Artist Portrait',
    image: '/images/saty_2.jpg',
    link: '#bio',
  }
];

const PROJECTS: Project[] = [
  {
    title: 'ADMAF 2025',
    location: 'Cultural Fusion',
    year: '2025',
    desc: 'Arranged concert for Abu Dhabi Festival at Kensington Palace, UK — bringing Arabic pop into a classical opera format.',
    fullDesc: 'A project for the Abu Dhabi Festival hosted by Peace and Prosperity Trust, performed at Kensington Palace, UK. Conducted by Mr. Toby Purser, I arranged the concert for the proposed ensemble with a touch of oriental fusion. The repertoire consisted of 12 pieces including operas, musicals, and original compositions. The intro and outro featured a unique mashup of "Pourquoi me Reveiller - Massenet" & Helef l Amar - George Wassouf — bringing Arabic Tarab pop directly into the classical opera format.',
    image: '/images/admaf_1.jpg',
    images: ['/images/admaf_1.jpg', '/images/admaf_2.jpg', '/images/admaf_3.jpg']
  },
  {
    title: 'MASAFAT 2025',
    location: 'Cultural Folk Performance',
    year: '2025',
    desc: 'Music performance captivating folklore from Lebanon, Yemen, and Palestine for a five-piece band.',
    fullDesc: 'Final exhibition of the Amman Hub for Artists from the Middle East. A multi-disciplinary presentation of film, hand printing, carving, printmaking, visual storytelling, and live performance created during a four month residency bringing artists from across the region. The music performance captivates folklore from Lebanon, Yemen, and Palestine. The performance is arranged for a five piece band from Jordan. Guitar, Keys, Percussions, Oud, Clarinet and Tareq al Fakih as vocalist to close the exhibition.',
    image: '/images/masafat_1.jpg',
    images: ['/images/masafat_1.jpg', '/images/masafat_2.jpg', '/images/masafat_3.jpg', '/images/masafat_4.jpg', '/images/masafat_5.jpg']
  },
  {
    title: 'OBTRA EXPERIENCE',
    location: 'Luxury Audio & User Experience Design',
    year: '2024',
    desc: 'Crafted a luxury sound system with orchestral, oriental and modern modes — recording the safe\'s own mechanics to tune its music.',
    fullDesc: 'A bespoke audio experience built for the Obtra luxury safe by Dreammakers S.A.L. We crafted a complete sound system with three distinct sonic modes: orchestral, oriental, and modern. The mechanics of the safe itself were recorded and tuned to become part of the music. SFX were layered with deep lighting design and UI/UX integration — the result is a fully immersive sensory product where every movement of the safe is a composed moment.',
    image: '',
    audioTracks: [
      { title: 'Opening Standard', album: 'Obtra Experience', duration: 'UI', url: '/audio/luxury-safe/Opening Standard.wav' },
      { title: 'Opening Standard Oriental', album: 'Obtra Experience', duration: 'UI', url: '/audio/luxury-safe/Opening Standard 2 oriental.wav' },
      { title: 'Opening Vibrant', album: 'Obtra Experience', duration: 'UI', url: '/audio/luxury-safe/Opening Vibrant.wav' },
      { title: 'Opening Vibrant Oriental', album: 'Obtra Experience', duration: 'UI', url: '/audio/luxury-safe/Opening Vibrant 2 orientalwav.wav' }
    ]
  },
  {
    title: 'YOU ARE NOW CONNECTED',
    location: 'Original Motion Picture Soundtrack',
    year: '2023',
    desc: 'Film scoring and thematic soundscapes for the original motion picture.',
    fullDesc: 'As a composer, Saty focuses on film scoring and thematic soundscapes. His work often bridges the gap between traditional Middle Eastern motifs and contemporary cinematic textures. "You Are Now Connected" required crisp pacing to match the visual narrative.',
    image: '/images/connected_1.jpg',
    images: ['/images/connected_1.jpg', '/images/connected_2.jpg', '/images/connected_esra.jpg', '/images/connected_esra_2.jpg']
  },
  {
    title: 'SUNWHITE TVC',
    location: 'Commercial Production',
    year: '2024',
    desc: 'Commercial production focusing on crisp audio clarity and rhythmic pacing.',
    fullDesc: 'Commercial production for Sunwhite, focusing on crisp audio clarity and rhythmic pacing to match the visual narrative.',
    image: '',
    embed: '<iframe src="https://www.youtube.com/embed/EivSPbBYnXo" class="w-full h-full min-h-[350px] md:min-h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    audioTracks: [
      { title: 'Main TVC Mix', album: 'Sunwhite TVC', duration: 'Mix', url: '/audio/sunwhite/sunwhite main version.wav' },
      { title: 'Ramadan Version', album: 'Sunwhite TVC', duration: 'Mix', url: '/audio/sunwhite/sunwhite ramadan version.wav' }
    ]
  },
  {
    title: 'GAME SOUNDTRACK',
    location: 'Interactive Media — Dolby Atmos',
    year: '2025',
    desc: 'Adaptive soundtrack, Wwise integration, and Dolby Atmos sound design for an upcoming video game.',
    fullDesc: 'A fully adaptive music system and sound design pipeline built in Wwise for an upcoming video game, mixing into Dolby Atmos. Layers respond dynamically to player progression.',
    image: '',
    audioTracks: [
      { title: 'Film Score Mix Demo', album: 'Game Soundtrack', duration: 'Demo', url: '/audio/sunwhite/sunwhite main version.wav' }
    ]
  },
  {
    title: 'MY BABY JUST CARES',
    location: 'JMR Studios Competition',
    year: '2021',
    desc: 'Winner of best arrangement at JMR Studios Competition. Originality in oriental fusion.',
    fullDesc: 'Produced and arranged Nina Simone\'s "My Baby Just Cares" with a unique oriental fusion twist, winning the first prize at the JMR Studios arrangement competition.',
    image: '',
    embed: '<iframe src="https://open.spotify.com/embed/album/6Fit1fnDwHnkmSylb0RC0i?utm_source=generator" width="100%" height="100%" style="min-height: 380px" frameborder="0" allow="encrypted-media"></iframe>'
  }
];

const TRACKS: Track[] = [
  { title: 'Awwal Talli (Intro)', album: 'Awwal Talli', duration: '3:45', url: '#' },
  { title: 'Beirut Shifting', album: 'Awwal Talli', duration: '4:20', url: '#' },
  { title: 'Maqam Jazz Fusion', album: 'Wackt Labs', duration: '5:12', url: '#' },
  { title: 'Oriental Raga', album: 'Awwal Talli', duration: '2:58', url: '#' },
];

// --- Components ---

const MusicPlayer = ({ 
  currentTrack, 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrev 
}: { 
  currentTrack: Track, 
  isPlaying: boolean, 
  onTogglePlay: () => void,
  onNext: () => void,
  onPrev: () => void
}) => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 w-full bg-bg/80 backdrop-blur-xl border-t border-ink/10 z-[60] px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img 
              src={currentTrack.image || `https://picsum.photos/seed/${currentTrack.title}/100/100`} 
              alt="Cover" 
              className="w-full h-full object-cover opacity-50" 
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold truncate">{currentTrack.title}</h4>
            <p className="text-[10px] uppercase tracking-widest text-ink/40 truncate">{currentTrack.album}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={onPrev} className="text-ink/60 hover:text-accent transition-colors"><SkipBack size={20} /></button>
          <button 
            onClick={onTogglePlay}
            className="w-10 h-10 bg-ink text-bg rounded-full flex items-center justify-center hover:bg-accent transition-all"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-1" fill="currentColor" />}
          </button>
          <button onClick={onNext} className="text-ink/60 hover:text-accent transition-colors"><SkipForward size={20} /></button>
        </div>

        <div className="hidden md:flex items-center gap-4 w-48">
          <Volume2 size={16} className="text-ink/40" />
          <div className="flex-1 h-1 bg-ink/10 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-accent" />
          </div>
          <span className="text-[10px] font-mono text-ink/40">{currentTrack.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Bio', href: '#bio' },
    { name: 'Awards', href: '#awards' },
    { name: 'Experience', href: '#experience' },
    { name: 'Previous Work', href: '#archive' },
    { name: 'Projects', href: '#projects' },
    { name: 'Album', href: '#album' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-bg/90 backdrop-blur-md py-4 border-b border-ink/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-display text-2xl tracking-tighter">SATY MOOKAN</a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs uppercase tracking-widest font-semibold hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <span className="font-display text-xl text-accent ml-4" dir="rtl">ساتي</span>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg border-b border-ink/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-display uppercase tracking-tight hover:text-accent"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12">
    <span className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-2 block">{subtitle || 'Section'}</span>
    <h2 className="text-6xl md:text-8xl leading-none">{title}</h2>
  </div>
);

// --- Sections ---

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // English fades out very fast — gone by 15% scroll
  const nameOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.85]);
  const nameFilter = useTransform(scrollYProgress, [0, 0.15], ["blur(0px)", "blur(12px)"]);
  
  // Arabic fades in right after
  const arabicOpacityRaw = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const arabicScale = useTransform(scrollYProgress, [0.15, 0.4], [1.15, 1]);
  const arabicFilter = useTransform(scrollYProgress, [0.15, 0.4], ["blur(12px)", "blur(0px)"]);

  return (
    <section ref={containerRef} className="h-[200vh] flex flex-col items-center relative px-6">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">

        
        <div className="relative z-10 text-center">
          <div className="relative h-[15vw] md:h-[12vw] flex items-center justify-center">
            <motion.h1 
              style={{ 
                opacity: nameOpacity, 
                scale: nameScale,
                filter: nameFilter
              }}
              className="absolute z-0 text-[15vw] md:text-[12vw] font-display leading-[0.8] whitespace-nowrap"
            >
              SATY MOOKAN
            </motion.h1>
            <motion.h1 
              style={{ 
                opacity: arabicOpacityRaw, 
                scale: arabicScale,
                filter: arabicFilter
              }}
              className="absolute z-10 text-[15vw] md:text-[12vw] font-display leading-[0.8] whitespace-nowrap"
              dir="rtl"
            >
              ساتي موكان
            </motion.h1>
          </div>

          {/* Slogan — fades in with the Arabic name */}
          <motion.p
            style={{ opacity: arabicOpacityRaw }}
            className="mt-6 text-sm md:text-base tracking-[0.25em] uppercase text-ink/50 font-light italic"
          >
            Maqams, Ragas, and Jazz
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs uppercase tracking-widest font-semibold text-ink/60 mt-8"
          >
            <button onClick={() => document.getElementById('composer')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors">Composer</button>
            <span className="text-accent">/</span>
            <button onClick={() => document.getElementById('arranger')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors">Arranger</button>
            <span className="text-accent">/</span>
            <button onClick={() => document.getElementById('producer')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors">Producer</button>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity: nameOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-ink/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};


const ScrollableProjects = ({ projects, onSelectProject }: { projects: Project[], onSelectProject?: (p: Project) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current && !isHovered) {
        const c = containerRef.current;
        if (c.scrollLeft + c.clientWidth >= c.scrollWidth - 10) {
          c.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          c.scrollBy({ left: c.clientWidth > 400 ? 400 : 280, behavior: 'smooth' });
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory mt-12 scrollbar-hide scroll-smooth"
    >
      {projects.map((project, i) => (
        <div 
          key={i}
          className="snap-start min-w-[280px] md:min-w-[400px] flex-shrink-0 group cursor-pointer"
          onClick={() => onSelectProject?.(project)}
        >
          <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-ink/10 relative mb-4">
            <div className="absolute inset-0 z-10" />
            
            {project.embed ? (
              <div className="w-full h-full *:pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" dangerouslySetInnerHTML={{ __html: project.embed }} />
            ) : project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center p-8 text-center bg-zinc-900/50">
                <div>
                  <Music size={32} className="mx-auto mb-4 opacity-10" />
                  <span className="text-ink/30 font-bold uppercase tracking-widest text-[10px]">Media Placeholder</span>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 z-20 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="bg-accent text-bg px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                View Project <ExternalLink size={12} />
              </span>
            </div>
          </div>
          <h4 className="text-xl font-display group-hover:text-accent transition-colors">{project.title}</h4>
          <p className="text-[10px] text-ink/50 uppercase tracking-widest">{project.location}</p>
        </div>
      ))}
    </div>
  );
};

const Bio = ({ onSelectProject }: { onSelectProject?: (p: Project) => void }) => {
  const filmProject = PROJECTS.find(p => p.title === 'YOU ARE NOW CONNECTED');
  const tvcProject = PROJECTS.find(p => p.title === 'SUNWHITE TVC');

  return (
    <section id="composer" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading title="COMPOSER" subtitle="Film, Game & TVC" />
      <div className="max-w-3xl space-y-6 text-ink/80 leading-relaxed text-lg font-light mb-24">
        <p>
          As a composer, Saty focuses on crafting thematic soundscapes. His work often bridges the gap between traditional oriental textures and contemporary cinematic motifs.
        </p>
      </div>
      
      <div className="space-y-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-[18vw] md:text-[8vw] leading-[0.8] mb-8 font-display tracking-tighter">FILMS</h3>
            <a 
              href="https://www.imdb.com/name/nm14741473/?ref_=nmbio_ov_bk" 
              target="_blank" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl hover:shadow-accent/50"
            >
              View IMDb Filmography <ExternalLink size={14} />
            </a>
          </div>
          <div 
            className="aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group relative bg-zinc-900 border border-ink/10 shadow-2xl" 
            onClick={() => filmProject && onSelectProject?.(filmProject)}
          >
            {filmProject?.image && (
              <img src={filmProject.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="Film Project" />
            )}
            <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
               <span className="bg-accent text-bg px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                 View Project <ExternalLink size={12} />
               </span>
               <p className="text-white mt-4 font-display text-xl uppercase tracking-widest">{filmProject?.title}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            className="order-2 md:order-1 aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group relative bg-zinc-900 border border-ink/10 shadow-2xl" 
            onClick={() => tvcProject && onSelectProject?.(tvcProject)}
          >
            <div className="absolute inset-0 z-10" />
            {tvcProject?.embed ? (
              <div className="w-full h-full *:pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700" dangerouslySetInnerHTML={{ __html: tvcProject.embed }} />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center p-8 text-center bg-zinc-900/50">
                <Music size={32} className="mx-auto opacity-10" />
              </div>
            )}
            <div className="absolute inset-0 z-20 bg-bg/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
               <span className="bg-accent text-bg px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                 View Project <ExternalLink size={12} />
               </span>
               <p className="text-white mt-4 font-display text-xl uppercase tracking-widest">{tvcProject?.title}</p>
            </div>
          </div>
          <div className="order-1 md:order-2 md:text-right">
            <h3 className="text-[18vw] md:text-[8vw] leading-[0.8] mb-8 font-display tracking-tighter">TVC</h3>
            <p className="text-ink/60 md:ml-auto max-w-sm text-lg font-light">Commercial production focusing on crisp audio clarity and rhythmic pacing to match the visual narrative.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Arranger = ({ onSelectProject }: { onSelectProject?: (p: Project) => void }) => {
  const admafProject = PROJECTS.find(p => p.title === 'ADMAF 2025');
  const masafatProject = PROJECTS.find(p => p.title === 'MASAFAT 2025');
  const babyProject = PROJECTS.find(p => p.title === 'MY BABY JUST CARES');

  return (
  <section id="arranger" className="py-24 bg-zinc-900/50 px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeading title="ARRANGER" subtitle="Fusion & Orchestration" />
      <div className="max-w-3xl space-y-4 text-ink/80 leading-relaxed text-lg font-light mb-24">
        <p>Specializing in oriental fusion, Saty's arrangements have redefined how Arabic interacts with western &amp; jazz styles.</p>
      </div>

      <div className="space-y-32">
        {/* ADMAF */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-[18vw] md:text-[8vw] leading-[0.8] mb-8 font-display tracking-tighter">ADMAF</h3>
            <p className="text-ink/60 text-lg font-light max-w-sm">Kensington Palace, UK — Abu Dhabi Festival. Bringing Arabic pop into a classical opera format across a 12-piece repertoire.</p>
          </div>
          <div
            className="aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group relative bg-zinc-900 border border-ink/10 shadow-2xl"
            onClick={() => admafProject && onSelectProject?.(admafProject)}
          >
            {admafProject?.images ? (
              <div className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {admafProject.images.map((img, idx) => (
                  <div key={idx} className="snap-start flex-shrink-0 w-full h-full">
                    <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={`ADMAF ${idx+1}`} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center"><Music size={32} className="opacity-10" /></div>
            )}
            {/* Venue label always visible on card */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white/80 text-xs uppercase tracking-widest font-semibold">Performed at Kensington Palace, UK</p>
            </div>
            <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 z-20">
              <span className="bg-accent text-bg px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">View Project <ExternalLink size={12} /></span>
            </div>
          </div>
        </div>

        {/* MASAFAT */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className="order-2 md:order-1 aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group relative bg-zinc-900 border border-ink/10 shadow-2xl"
            onClick={() => masafatProject && onSelectProject?.(masafatProject)}
          >
            {masafatProject?.images ? (
              <div className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {masafatProject.images.map((img, idx) => (
                  <div key={idx} className="snap-start flex-shrink-0 w-full h-full">
                    <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={`Masafat ${idx+1}`} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center p-8">
                <div className="text-center">
                  <Music size={40} className="mx-auto mb-4 opacity-10" />
                  <span className="text-ink/20 text-[10px] uppercase tracking-widest">Images coming soon</span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 z-10">
              <span className="bg-accent text-bg px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">View Project <ExternalLink size={12} /></span>
            </div>
          </div>
          <div className="order-1 md:order-2 md:text-right">
            <h3 className="text-[18vw] md:text-[8vw] leading-[0.8] mb-8 font-display tracking-tighter">MASAFAT</h3>
            <p className="text-ink/60 md:ml-auto max-w-sm text-lg font-light">Goethe Institut Amman, Jordan — folklore from Lebanon, Yemen & Palestine arranged for a five-piece band.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

const Producer = ({ onSelectProject }: { onSelectProject?: (p: Project) => void }) => {
  const babyProject = PROJECTS.find(p => p.title === 'MY BABY JUST CARES');
  const obraProject = PROJECTS.find(p => p.title === 'OBTRA EXPERIENCE');
  const gameProject = PROJECTS.find(p => p.title === 'GAME SOUNDTRACK');

  return (
  <section id="producer" className="py-24 px-6 max-w-7xl mx-auto">
    <SectionHeading title="PRODUCER" subtitle="WACKT S.A.L" />
    <div className="max-w-3xl space-y-4 text-ink/80 leading-relaxed text-lg font-light mb-24">
      <p>Co-founder of WACKT S.A.L, Saty oversees complex audio-visual productions, from luxury audio branding to full album cycles.</p>
    </div>

    <div className="space-y-32">
      {/* RELEASES — MY BABY JUST CARES */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div
          className="order-2 md:order-1 aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group relative bg-zinc-900 border border-ink/10 shadow-2xl"
          onClick={() => babyProject && onSelectProject?.(babyProject)}
        >
          <div className="absolute inset-0 z-10" />
          {babyProject?.embed ? (
            <div className="w-full h-full *:pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700" dangerouslySetInnerHTML={{ __html: babyProject.embed }} />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center"><Music size={32} className="opacity-10" /></div>
          )}
          <div className="absolute inset-0 z-20 bg-bg/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
            <span className="bg-accent text-bg px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">Open Project <ExternalLink size={12} /></span>
          </div>
        </div>
        <div className="order-1 md:order-2 md:text-right">
          <h3 className="text-[13vw] md:text-[5.5vw] leading-[0.85] mb-8 font-display tracking-tighter">RELEASES</h3>
          <p className="text-ink/60 md:ml-auto max-w-sm text-lg font-light">Fusing oriental Maqam sensibilities with jazz harmony and contemporary production — Saty's releases blend Eastern and Western worlds into a unique sonic signature. His arrangement of Nina Simone's "My Baby Just Cares" won first prize at JMR Studios Competition.</p>
        </div>
      </div>

      {/* OBTRA EXPERIENCE */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-[12vw] md:text-[5vw] leading-[0.85] mb-8 font-display tracking-tighter">OBTRA<br/>EXPERIENCE</h3>
          <p className="text-ink/60 text-lg font-light max-w-sm mb-8">Luxury Audio &amp; UX Design — three sonic modes (orchestral, oriental, modern) built into a bespoke safe. The mechanics were recorded to tune the music.</p>
          {obraProject && (
            <button
              onClick={() => onSelectProject?.(obraProject)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-ink/20 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-accent hover:text-bg hover:border-accent transition-all"
            >
              Listen to Audio Cues <Play size={12} fill="currentColor" />
            </button>
          )}
        </div>
        <div
          className="aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group relative bg-zinc-900 border border-ink/10 shadow-2xl"
          onClick={() => obraProject && onSelectProject?.(obraProject)}
        >
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center flex-col gap-4">
            <Music size={40} className="opacity-10" />
            <span className="text-[10px] uppercase tracking-widest text-ink/20">4 Audio Cues Available</span>
          </div>
          <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 z-10">
            <span className="bg-accent text-bg px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">Open Project <ExternalLink size={12} /></span>
          </div>
        </div>
      </div>

      {/* GAME PROJECT */}
      {gameProject && (
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className="order-2 md:order-1 aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group relative bg-zinc-900 border border-ink/10 shadow-2xl"
            onClick={() => onSelectProject?.(gameProject)}
          >
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center flex-col gap-4">
              <Music size={40} className="opacity-10" />
              <span className="text-[10px] uppercase tracking-widest text-ink/20">Coming Soon</span>
            </div>
            <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 z-10">
              <span className="bg-accent text-bg px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">Open Project <ExternalLink size={12} /></span>
            </div>
          </div>
          <div className="order-1 md:order-2 md:text-right">
            <h3 className="text-[12vw] md:text-[5vw] leading-[0.85] mb-8 font-display tracking-tighter">GAME<br/>SOUNDTRACK</h3>
            <p className="text-ink/60 md:ml-auto max-w-sm text-lg font-light">Adaptive Dolby Atmos soundtrack and Wwise sound design for an upcoming interactive experience.</p>
          </div>
        </div>
      )}
    </div>
  </section>
  );
};

const BioSection = () => (
  <section id="bio" className="py-24 px-6 max-w-7xl mx-auto border-t border-ink/5">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="order-2 md:order-1 relative group">
        <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-900">
          <img 
            src="/images/saty_3.jpg" 
            alt="Saty Mookan" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <div className="order-1 md:order-2">
        <SectionHeading title="ARTIST BIO" subtitle="About Saty" />
        <div className="space-y-6 text-ink/80 leading-relaxed text-lg font-light">
          <p>
            An Indian-Lebanese composer, arranger and producer based in Beirut. He began his musical path as a guitarist and oud player, arranging for parish choirs and directing a 30-member choir and orchestra for annual liturgical concerts between 2014 and 2021.
          </p>
          <p>
            Saty holds a B.A. in Musicology from Notre Dame University – Louaize and completed advanced studies in music and Arabic musicology at the Holy Spirit University of Kaslik and Antonine University.
          </p>
          <p>
            After working as Studio Manager and producer at Jean-Marie Riachi Studios—where he helped launch Lebanon's first certified Dolby Atmos studio—he co-founded <span className="text-ink font-semibold">WACKT S.A.L.</span>, an audio-visual production house and tech lab.
          </p>
          <div className="pt-8 grid grid-cols-3 gap-4">
            <img src="/images/saty_1.jpg" className="rounded-lg grayscale hover:grayscale-0 transition-all" alt="Saty silhouette" />
            <img src="/images/saty_2.jpg" className="rounded-lg grayscale hover:grayscale-0 transition-all" alt="Saty portrait" />
            <img src="/images/saty_3.jpg" className="rounded-lg grayscale hover:grayscale-0 transition-all" alt="Saty portrait" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Awards = () => {
  const awards = [
    {
      year: '2020',
      title: 'Sinquefield Young Composers',
      org: 'American Voices & YES Academy',
      desc: 'First Prize winner for original piece "Water Droplet" written for marimba & clarinet.'
    },
    {
      year: '2021',
      title: 'JMR Studios Competition',
      org: 'Ecole Superieurs Des Affairs',
      desc: 'Winner of best arrangement for Nina Simone\'s My Baby just Cares. Originality in oriental fusion.'
    },
    {
      year: '2015',
      title: 'Battle of the Bands Winner',
      org: 'Virgin Radio Lebanon x Mozart Chahine',
      desc: 'First prize winner with the original band "Laysh?".'
    }
  ];

  return (
    <section id="awards" className="py-24 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="AWARDS" subtitle="Recognition" />
        <div className="grid md:grid-cols-3 gap-8">
          {awards.map((award, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 border border-ink/10 rounded-2xl bg-bg hover:border-accent/50 transition-all"
            >
              <div className="text-accent font-mono text-sm mb-4">{award.year}</div>
              <h3 className="text-2xl mb-2">{award.title}</h3>
              <p className="text-xs uppercase tracking-wider text-ink/50 mb-4">{award.org}</p>
              <p className="text-sm text-ink/70 leading-relaxed">{award.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      period: '2023 - Present',
      role: 'Chairman & CEO, Music Producer',
      company: 'Wackt S.A.L - Beirut, Lebanon',
      desc: 'Audio Visual production house managing Album releases, Soundtracks, Sound design for media platforms, games, and TVCs.'
    },
    {
      period: '2021 - 2023',
      role: 'Studios Manager & Producer',
      company: 'JMR Studios - Mtayleb, Lebanon',
      desc: 'Managed facility, oversaw production & recording sessions. Coordinated events at GCC (Joy Awards, Saudi Establishment Day).'
    },
    {
      period: '2016 - 2020',
      role: 'Choir Director & Conductor',
      company: 'Resurrection Cathedral - Cornet Chehwan',
      desc: 'Conducted polyphonic sacred syriac-maronite musical training. Directed yearly Christmas and Easter concerts.'
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading title="WORK EXPERIENCE" subtitle="Career Path" />
      <div className="space-y-12">
        {experiences.map((exp, i) => (
          <div key={i} className="group grid md:grid-cols-[200px_1fr] gap-8 py-8 border-b border-ink/10 last:border-0">
            <div className="text-ink/40 font-mono text-sm group-hover:text-accent transition-colors">{exp.period}</div>
            <div>
              <h3 className="text-3xl mb-2">{exp.role}</h3>
              <p className="text-accent uppercase tracking-widest text-[10px] font-bold mb-4">{exp.company}</p>
              <p className="text-ink/70 max-w-2xl">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PreviousWork = ({ onPlay }: { onPlay: (track: Track) => void }) => {
  return (
    <section id="archive" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading title="PREVIOUS WORK" subtitle="Archive & Collaborations" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {PREVIOUS_WORK.map((item, i) => (
          <motion.a
            href={item.link}
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 block"
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
              <h4 className="text-sm md:text-base font-bold leading-tight mb-1">{item.title}</h4>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-ink/60">{item.artist}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

const Projects = ({ selectedProject, onSelectProject, onPlayTrack }: { selectedProject: Project | null, onSelectProject: (p: Project | null) => void, onPlayTrack: (t: Track) => void }) => {
  return (
    <section id="projects" className="py-24 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="PROJECTS" subtitle="Selected Works" />
        <div className="grid md:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={i} 
              layoutId={`project-${project.title}`}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden rounded-xl mb-6 bg-zinc-800">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl group-hover:text-accent transition-colors">{project.title}</h3>
              <p className="text-[10px] uppercase tracking-widest text-ink/50 mb-3">{project.location}</p>
              <p className="text-sm text-ink/60 line-clamp-2">{project.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                View Details <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => onSelectProject(null)}
                className="absolute inset-0 bg-bg/90 backdrop-blur-sm"
              />
              <motion.div 
                layoutId={`project-${selectedProject.title}`}
                className="relative bg-zinc-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-auto md:max-h-[85vh]"
              >
                <button 
                  onClick={() => onSelectProject(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] w-10 h-10 bg-bg/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="w-full md:w-1/2 h-[35vh] md:h-auto bg-zinc-800 flex-shrink-0 relative z-50 overflow-hidden">
                  {selectedProject.embed ? (
                    <div className="w-full h-full min-h-[300px] p-0 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: selectedProject.embed }} />
                  ) : selectedProject.images && selectedProject.images.length > 1 ? (
                    <div className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-0">
                      {selectedProject.images.map((img, idx) => (
                        <div key={idx} className="snap-start flex-shrink-0 w-full h-full">
                          <img 
                            src={img} 
                            alt={`${selectedProject.title} ${idx + 1}`} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <img 
                      src={selectedProject.image || (selectedProject.images?.[0] ?? '')} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto flex-1">
                  <span className="text-accent font-mono text-[10px] md:text-xs mb-2 block">{selectedProject.year}</span>
                  <h3 className="text-3xl md:text-5xl mb-4 font-display">{selectedProject.title}</h3>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-ink/40 mb-6">{selectedProject.location}</p>
                  <div className="prose prose-sm md:prose-base prose-invert border-b border-ink/10 pb-6 mb-6">
                    <p className="text-ink/70 leading-relaxed font-light">
                      {selectedProject.fullDesc}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-ink/40 mb-4">Audio Preview</h4>
                    {selectedProject.audioTracks ? (
                      <div className="flex flex-col gap-2">
                        {selectedProject.audioTracks.map((track, i) => (
                          <button 
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlayTrack(track);
                            }}
                            className="bg-zinc-800/80 rounded-lg p-3 md:p-4 flex items-center gap-4 border border-ink/10 hover:border-accent w-full text-left transition-all group"
                          >
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-accent text-bg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                              <Play size={14} fill="currentColor" className="ml-[2px]" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-xs md:text-sm font-bold group-hover:text-accent transition-colors truncate">{track.title}</p>
                              <p className="text-[10px] text-ink/40 uppercase tracking-widest truncate">{track.album}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : selectedProject.audioPreview ? (
                      <button className="bg-zinc-800 rounded-lg p-3 md:p-4 flex items-center gap-4 border border-ink/10 hover:border-accent w-full text-left transition-all group">
                        <div className="w-10 h-10 bg-accent text-bg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                          <Play size={16} fill="currentColor" className="ml-1" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-xs md:text-sm font-bold group-hover:text-accent transition-colors truncate">Play Highlight</p>
                          <p className="text-[10px] text-ink/40 uppercase tracking-widest truncate">WACKT Studio Mix</p>
                        </div>
                      </button>
                    ) : (
                      <div className="bg-zinc-800/30 rounded-lg p-3 md:p-4 border border-ink/5">
                        <p className="text-[10px] md:text-xs text-ink/40 italic flex items-center gap-2">
                          <Music size={14} /> Full audio showcase coming soon
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        <div className="mt-16 p-12 border border-ink/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 bg-bg">
          <div className="max-w-xl">
            <h3 className="text-4xl mb-4">WACKT S.A.L PRODUCTION</h3>
            <p className="text-ink/60">
              Over the past three years, we've engaged in 4 Album Productions, 3 Theatrical Soundscaping projects, 8 Event productions, and 70+ Music Production and Arrangements across Jazz, Oriental, EDM, and Classical.
            </p>
          </div>
          <a href="https://www.wacktlabs.com" target="_blank" className="flex items-center gap-2 px-8 py-4 bg-ink text-bg rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent hover:text-bg transition-all">
            Visit Wackt Labs <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Album = () => (
  <section id="album" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="bg-accent text-bg rounded-[2rem] p-8 md:p-20 flex flex-col md:grid md:grid-cols-2 gap-12 items-center overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Music size={400} />
        </div>
        
        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block opacity-70">Debut Album</span>
          <h2 className="text-7xl md:text-9xl leading-none mb-8 text-bg">AWWAL TALLI</h2>
          <p className="text-xl font-medium mb-8 leading-relaxed">
            "First Impression" — A first of its kind album where Maqams, Raagas, and Jazz meet. A monologue speaking about experiences and struggles in Lebanon in a satirical way.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 border border-bg/30 rounded-full text-xs font-bold uppercase tracking-wider">9 Songs</span>
            <span className="px-4 py-2 border border-bg/30 rounded-full text-xs font-bold uppercase tracking-wider">Full Arabic Takht</span>
            <span className="px-4 py-2 border border-bg/30 rounded-full text-xs font-bold uppercase tracking-wider">Carnatic Ensemble</span>
          </div>
        </div>
        
        <div className="relative z-10 w-full aspect-square max-w-md mx-auto">
          <div className="w-full h-full bg-bg rounded-2xl shadow-2xl overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src="/images/album_cover.jpg" 
              alt="Awwal Talli — Album Cover" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center animate-pulse">
                <Music className="text-bg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto mb-24">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <SectionHeading title="GET IN TOUCH" subtitle="Contact" />
          <p className="text-ink/60 mb-12 max-w-md">
            Based in Cornet Chehwan, Al Maten, Lebanon. Available for international collaborations, film scoring, and production projects.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                <Mail size={20} className="group-hover:text-bg" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink/40">Email</p>
                <p className="text-lg">saty@wacktlabs.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                <Instagram size={20} className="group-hover:text-bg" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink/40">Instagram</p>
                <p className="text-lg">@satymookan</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                <Phone size={20} className="group-hover:text-bg" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink/40">Phone</p>
                <p className="text-lg">+961 81 540 104</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-900/50 p-8 md:p-12 rounded-3xl border border-ink/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-bg border border-ink/10 rounded-lg p-4 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-bg border border-ink/10 rounded-lg p-4 focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block">Subject</label>
              <input 
                type="text" 
                required
                className="w-full bg-bg border border-ink/10 rounded-lg p-4 focus:outline-none focus:border-accent transition-colors"
                placeholder="Project Inquiry"
                value={formState.subject}
                onChange={e => setFormState({...formState, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block">Message</label>
              <textarea 
                rows={4}
                required
                className="w-full bg-bg border border-ink/10 rounded-lg p-4 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="How can we collaborate?"
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              disabled={submitted}
              className={`w-full py-4 font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 ${submitted ? 'bg-green-600 text-white' : 'bg-accent text-bg hover:bg-accent/80'}`}
            >
              {submitted ? 'Message Sent!' : 'Send Message'}
              {!submitted && <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-ink/5 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left">
        <p className="font-display text-2xl tracking-tighter mb-2">SATY MOOKAN</p>
        <p className="text-[10px] uppercase tracking-widest text-ink/40">© 2026 Saty Mookan. All rights reserved.</p>
      </div>
      <div className="flex gap-8">
        <a href="#" className="text-ink/40 hover:text-accent transition-colors"><Instagram size={20} /></a>
        <a href="#" className="text-ink/40 hover:text-accent transition-colors"><Mail size={20} /></a>
        <a href="https://www.wacktlabs.com" target="_blank" className="text-ink/40 hover:text-accent transition-colors"><ExternalLink size={20} /></a>
      </div>
      <div className="text-[10px] uppercase tracking-widest text-ink/40">
        Beirut, Lebanon
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const currentTrack = activeTrack || TRACKS[currentTrackIndex];

  const handleTogglePlay = () => setIsPlaying(!isPlaying);
  
  const handleNext = () => {
    if (activeTrack) {
      // If playing a custom track, maybe go back to the main playlist
      setActiveTrack(null);
      setCurrentTrackIndex(0);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    }
  };

  const handlePrev = () => {
    if (activeTrack) {
      setActiveTrack(null);
      setCurrentTrackIndex(TRACKS.length - 1);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    }
  };

  const playTrack = (track: Track) => {
    setActiveTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="scroll-container">
      <Navbar />
      <Hero />
      <Bio onSelectProject={setSelectedProject} />
      <Arranger onSelectProject={setSelectedProject} />
      <Producer onSelectProject={setSelectedProject} />
      <BioSection />
      <Awards />
      <Experience />
      <PreviousWork onPlay={playTrack} />
      <Projects selectedProject={selectedProject} onSelectProject={setSelectedProject} onPlayTrack={playTrack} />
      <Album />
      <Contact />
      <Footer />
      <MusicPlayer 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
