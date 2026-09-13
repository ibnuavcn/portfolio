import { useEffect, useState, useRef } from 'react';

export default function App() {
  const [roleText, setRoleText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalData, setModalData] = useState<any>(null);
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    const roles = ["Frontend Engineer", "UI/UX Designer", "React & Tailwind Specialist"];
    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      const currentRole = roles[roleIdx.current];
      
      if (isDeleting.current) {
        charIdx.current--;
        setRoleText(currentRole.substring(0, charIdx.current));
      } else {
        charIdx.current++;
        setRoleText(currentRole.substring(0, charIdx.current));
      }

      let nextDelay = isDeleting.current ? 45 : 90;

      if (!isDeleting.current && charIdx.current === currentRole.length) {
        nextDelay = 1800;
        isDeleting.current = true;
      } else if (isDeleting.current && charIdx.current === 0) {
        isDeleting.current = false;
        roleIdx.current = (roleIdx.current + 1) % roles.length;
        nextDelay = 400;
      }

      timeoutId = setTimeout(typeWriter, nextDelay);
    };

    timeoutId = setTimeout(typeWriter, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) setActiveSection(id);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      category: 'webapp',
      title: 'Nucleus Analytics SaaS Dashboard',
      desc: 'Modern dark-themed SaaS analytics dashboard with real-time telemetry metrics, automated anomaly detection, and streaming performance data visualization.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1HDZ2IULPbdFZKQ_HriAXh8gZcACFSijMhJagAo7EJU70qvdyvpZSPy1C8l40cRNw69aUl9fvYDgp34DfJ5Gfx88XxnkWbTKi89GMP7dRBoTRp-jVSc6YZzYgT8gSn22N3om1r8DTkZAFGWk3Lvq_TJxXV694BIaz6GV2RselC6x-pxciUl-MYyGALV_fMh34c-fvyfBbd1Bs3w98YjBTjHgrYTxpk444UEjle2StkBP--Z1gSUol-Q',
      points: ['Real-time WebSockets streaming charts', 'Custom reusable metric gauge widgets', 'Lighthouse performance score 98/100', 'Automated export ke format CSV dan PDF'],
      tags: ['React', 'Tailwind CSS', 'Chart.js', 'TypeScript']
    },
    {
      id: 2,
      category: 'mobile',
      title: 'Apex Finance & Wallet App',
      desc: 'Fintech mobile interface featuring interactive transaction ledger, spending analytics, multi-currency wallet management, and biometrics confirmation flow.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzdPtF2MI3nk_pEUGJvuBuRAQvP570ahyna4cHnThsfeqBarDcpRPTuk1fOxsxxuI8goS6QmI_66vSi8bDnpmPfFfdLtRfa30yd8aKV7zFxxgm97ZCV6yFaDtJYp7pxIeCCjt1RYH-dxROxcqw6b2rAOby2LRGNRTBfri6Ba9NZmvfj3o11VMXXDweX9w47f75qHkWHN6V-z3tsacPEwWAholyqRlCgw_O8vmK6XSoBo7XN9gJJgfweA',
      points: ['Seamless cross-platform mobile responsive view', 'Gesture-based spending budget categorization', 'Offline caching with local storage sync', 'Integrated dark slate high-contrast mode'],
      tags: ['React Native', 'Tailwind', 'Figma', 'Zustand']
    },
    {
      id: 3,
      category: 'designsystem',
      title: 'Nucleus UI Design System Portal',
      desc: 'Comprehensive design system documentation portal with token management, accessible components library, interactive playground, and automatic release versioning.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq_m2848nDmr5YQXvkmYqHGLDx8IF8nhrmO7IFGlTXedbM66HAittoxDpnHq3wbXQRdfMqyobP9pdIkv0Nfm6WYQL_GAJ6wwGwwbsk_6ceTQwV2SvBA11YDd3ZOhZY2wZzsXDmaYJ_bLrr3b4BCCcdPDwnSEDIKfumJ_8Wb7JXRv5BJYQo189_DDAOVUqWbO7OHh2bPn0hH4sIKamMhCWgn_rOdWwKVLwVmK_i3jG3q7-6nDn_4lJzLw',
      points: ['45+ atomic UI components with WCAG AAA compliance', 'Zero-runtime token sync script from Figma variables', 'Built-in code snippet generator for React & Vue', 'Automated regression visual test CI pipeline'],
      tags: ['TypeScript', 'Tailwind', 'Storybook', 'Radix UI']
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');
    setTimeout(() => {
      setContactStatus('success');
      setTimeout(() => setContactStatus('idle'), 3500);
    }, 1200);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-surface-container-low/80 backdrop-blur-md dark:bg-surface-container-low/80 border-b border-outline-variant/50 shadow-sm transition-all duration-200" id="navbar">
        <div className="flex justify-between items-center w-full px-gutter-mobile md:px-gutter-desktop max-w-max-content-width mx-auto h-16">
          <a className="flex items-center gap-2 group text-headline-sm font-headline-sm font-semibold tracking-tight text-primary dark:text-primary" href="#hero">
            <span className="font-code-badge text-code-badge text-primary-container">&lt;</span>
            <span className="text-on-surface group-hover:text-primary transition-colors duration-150">Rizky.dev</span>
            <span className="font-code-badge text-code-badge text-primary-container">/&gt;</span>
          </a>
          
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-space-lg">
            {['about', 'skills', 'projects', 'contact'].map(section => (
              <a key={section} className={`nav-link transition-colors duration-200 text-body-base font-body-base hover:text-primary hover:border-primary/50 ${activeSection === section ? 'text-primary font-medium border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`} href={`#${section}`}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-space-sm">
            <div className="flex items-center gap-space-xs text-on-surface-variant mr-2">
              <span className="material-symbols-outlined text-outline hover:text-primary cursor-pointer p-1" title="Terminal Mode">terminal</span>
              <span className="material-symbols-outlined text-outline hover:text-primary cursor-pointer p-1" title="Theme Palette">palette</span>
            </div>
            <a className="inline-flex items-center gap-space-xs bg-primary-container text-on-primary-container font-headline-sm text-body-base font-semibold px-space-md py-space-xs rounded-xl hover:bg-secondary-container transition-all duration-150 shadow-sm scale-95 duration-100 hover:scale-100 active:scale-95" href="#contact">
              <span className="material-symbols-outlined text-body-lg">download</span>
              <span>Resume</span>
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button aria-label="Toggle navigation menu" className="p-space-xs text-on-surface-variant hover:text-primary focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button">
              <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface-container-high/95 backdrop-blur-xl border-b border-outline-variant/40 px-gutter-mobile py-space-md">
            <nav className="flex flex-col gap-space-sm">
              {['about', 'skills', 'projects', 'contact'].map(section => (
                <a key={section} onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link text-on-surface-variant hover:text-primary py-2 px-3 rounded-lg hover:bg-surface-container text-body-base font-body-base" href={`#${section}`}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
                <a className="w-full text-center inline-flex justify-center items-center gap-space-xs bg-primary-container text-on-primary-container text-body-base font-semibold py-space-xs rounded-xl" href="#contact">
                  <span className="material-symbols-outlined text-body-lg">download</span>
                  <span>Resume</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="max-w-max-content-width mx-auto px-gutter-mobile md:px-gutter-desktop">
        <section className="min-h-[calc(100vh-4rem)] flex items-center py-space-2xl relative overflow-hidden" id="hero">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center w-full relative z-10">
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-space-xs bg-surface-container-high/80 border border-outline-variant/60 rounded-full px-space-md py-space-2xs mb-space-lg backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container"></span>
                </span>
                <span className="font-code-badge text-code-badge text-on-surface-variant">Available for freelance &amp; full-time</span>
              </div>
              <p className="font-headline-sm text-headline-sm text-primary-container mb-space-2xs">Halo, saya 👋</p>
              <h1 className="font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface font-extrabold tracking-tight mb-space-sm">
                Rizky Pratama
              </h1>
              
              <div className="flex items-center min-h-[44px] mb-space-md">
                <span className="font-headline-lg text-headline-lg text-secondary font-semibold">
                  <span className="typing-cursor">{roleText}</span>
                </span>
              </div>
              
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-xl">
                Membangun pengalaman web modern, performan tinggi, dan antarmuka presisi dengan kode yang bersih, modular, dan terukur.
              </p>
              
              <div className="flex flex-wrap items-center gap-space-md w-full sm:w-auto">
                <a className="inline-flex items-center justify-center gap-space-xs bg-primary-container text-on-primary-container font-headline-sm text-body-base font-semibold px-space-xl py-space-sm rounded-xl hover:bg-secondary-container transition-all duration-150 shadow-md hover:scale-[1.01]" href="#projects">
                  <span>Lihat Project</span>
                  <span className="material-symbols-outlined text-body-lg">arrow_downward</span>
                </a>
                <a className="inline-flex items-center justify-center gap-space-xs bg-transparent border border-outline-variant text-on-surface font-headline-sm text-body-base font-semibold px-space-xl py-space-sm rounded-xl hover:bg-surface-container hover:border-primary-container transition-all duration-150" href="#contact">
                  <span className="material-symbols-outlined text-body-lg">mail</span>
                  <span>Hubungi Saya</span>
                </a>
              </div>
              
              <div className="mt-space-xl flex items-center gap-space-sm font-code-sm text-code-sm text-outline border-t border-outline-variant/40 pt-space-md w-full">
                <span className="text-primary font-code-badge">stack:</span>
                <span>React 18</span>
                <span>•</span>
                <span>Next.js 14</span>
                <span>•</span>
                <span>TypeScript</span>
                <span>•</span>
                <span>Tailwind</span>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 sm:w-80 md:w-96 aspect-square">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-container/20 to-secondary/10 filter blur-xl"></div>
                <div className="relative w-full h-full rounded-full p-2 border-2 border-outline-variant/60 bg-surface-container-low shadow-2xl overflow-hidden group">
                  <img alt="Rizky Pratama - Modern Frontend Software Engineer" className="w-full h-full object-cover rounded-full filter grayscale-[15%] group-hover:grayscale-0 transition-all duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnEMaRGqvt-nJZw4wcQY_Xy4QgugxfZXYD_HeYVGMZne7SJeY4iPDUnHX82zDF5lNFrcr6L92g0tBeFCHxl9PyvlcOEzQ6W5pTbU7IsC-85c0olEnwgknJC4IReL5htMPmkvlnxwqcN9BJmsd4EXABrJf0wR-cLYOgFzYtxd9-S9Z0aLbh2UzgzYqLq4sPpvA0IduX13V8GUzYMDtZcvKr_9_HZSKzkYLlPqhhiPGhlsq7fhUSRHVlSg"/>
                </div>
                <div className="absolute -top-2 -left-2 bg-surface-container/90 border border-outline-variant/70 backdrop-blur-md px-space-sm py-1 rounded-xl shadow-lg flex items-center gap-1.5 animate-bounce" style={{animationDuration: '4s'}}>
                  <span className="text-primary-container font-code-badge text-code-badge">&lt;/&gt;</span>
                  <span className="font-code-badge text-code-badge text-on-surface">React</span>
                </div>
                <div className="absolute top-1/2 -right-6 bg-surface-container/90 border border-outline-variant/70 backdrop-blur-md px-space-sm py-1 rounded-xl shadow-lg flex items-center gap-1.5 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1s'}}>
                  <span className="text-secondary font-code-badge text-code-badge">TS</span>
                  <span className="font-code-badge text-code-badge text-on-surface">TypeScript</span>
                </div>
                <div className="absolute -bottom-4 left-8 bg-surface-container/90 border border-outline-variant/70 backdrop-blur-md px-space-sm py-1 rounded-xl shadow-lg flex items-center gap-1.5 animate-bounce" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}>
                  <span className="text-primary-container font-code-badge text-code-badge">#</span>
                  <span className="font-code-badge text-code-badge text-on-surface">Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-space-2xl border-t border-outline-variant/30" id="about">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <div className="inline-flex items-center gap-2 text-primary font-code-badge text-code-badge mb-space-2xs">
              <span>──</span>
              <span>TENTANG SAYA</span>
              <span>──</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              Arsitektur Kode &amp; Pengalaman Pengguna
            </h2>
            <div className="w-16 h-1 bg-primary-container mx-auto mt-space-sm rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Halo! Saya Rizky Pratama, seorang <strong className="text-on-surface font-semibold">Frontend Engineer</strong> berbasis di Jakarta yang mengkhususkan diri dalam rekayasa antarmuka web modern berskala enterprise. Saya percaya antarmuka yang hebat berakar dari keharmonisan antara estetika visual dan arsitektur kode yang tangguh.
              </p>
              <p className="font-body-base text-body-base text-on-surface-variant leading-relaxed">
                Perjalanan saya berpusat pada ekosistem React, TypeScript, dan Next.js, dengan penekanan kuat pada <span className="text-primary font-medium">Core Web Vitals</span>, aksesibilitas WCAG, modularitas komponen, serta optimasi bundle size. Saya terbiasa mengubah rancangan Figma yang kompleks menjadi aplikasi siap produksi yang responsif dan fluid.
              </p>
              
              <div className="mt-space-sm p-space-md bg-surface-container-low/80 border border-outline-variant/50 rounded-xl backdrop-blur-md">
                <div className="flex items-center gap-space-xs text-primary font-code-badge text-code-badge mb-1">
                  <span className="material-symbols-outlined text-body-base">terminal</span>
                  <span>CURRENT FOCUS</span>
                </div>
                <p className="font-code-badge text-code-badge text-on-surface">
                  Currently exploring: <span className="text-secondary">WebGL / Three.js</span>, <span className="text-secondary">Next.js App Router</span>, &amp; <span className="text-secondary">Design Tokens Automation</span>.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-1 gap-space-md">
              <div className="p-space-lg bg-surface-container-low/80 border border-outline-variant/60 rounded-xl backdrop-blur-md shadow-sm hover:border-primary-container/50 transition-all duration-200">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-body-sm text-body-sm text-outline uppercase tracking-wider">PROJECT PRODUCTION</span>
                  <span className="font-code-badge text-code-badge bg-surface-container-highest text-primary-container px-2 py-0.5 rounded-lg border border-outline-variant/40">+12 Repos</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-metric-val text-metric-val text-on-surface font-bold">5</span>
                  <span className="font-metric-val text-metric-val text-primary-container font-bold">+</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Project selesai &amp; deployed live secara publik</p>
              </div>
              
              <div className="p-space-lg bg-surface-container-low/80 border border-outline-variant/60 rounded-xl backdrop-blur-md shadow-sm hover:border-primary-container/50 transition-all duration-200">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-body-sm text-body-sm text-outline uppercase tracking-wider">TECH STACK &amp; TOOLS</span>
                  <span className="material-symbols-outlined text-secondary text-headline-sm">layers</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-metric-val text-metric-val text-on-surface font-bold">10</span>
                  <span className="font-metric-val text-metric-val text-secondary font-bold">+</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Frameworks, perpustakaan visual, dan tooling</p>
              </div>
              
              <div className="p-space-lg bg-surface-container-low/80 border border-outline-variant/60 rounded-xl backdrop-blur-md shadow-sm hover:border-primary-container/50 transition-all duration-200">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-body-sm text-body-sm text-outline uppercase tracking-wider">PENGALAMAN REKAYASA</span>
                  <span className="material-symbols-outlined text-primary text-headline-sm">history_edu</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-metric-val text-metric-val text-on-surface font-bold">3</span>
                  <span className="font-metric-val text-metric-val text-primary font-bold">+</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tahun spesialisasi frontend web engineering</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-space-2xl border-t border-outline-variant/30" id="skills">
          {/* Implement skills similarly, rendering the categories */}
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <div className="inline-flex items-center gap-2 text-primary font-code-badge text-code-badge mb-space-2xs">
              <span>──</span>
              <span>SKILLS &amp; TECH STACK</span>
              <span>──</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              Kapabilitas Teknis &amp; Standar Kode
            </h2>
            <div className="w-16 h-1 bg-primary-container mx-auto mt-space-sm rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {/* Category 1 */}
            <div className="bg-surface-container-low/80 border border-outline-variant/60 rounded-xl p-space-lg backdrop-blur-md hover:border-primary-container/40 transition-all duration-200">
              <div className="flex items-center gap-space-sm mb-space-lg pb-space-xs border-b border-outline-variant/40">
                <span className="material-symbols-outlined text-primary-container text-headline-lg">code</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Frontend Engineering</h3>
                  <p className="font-code-sm text-code-sm text-outline">Core Client-side Stacks</p>
                </div>
              </div>
              <div className="space-y-space-md">
                {[
                  { name: "HTML5 & Semantic CSS3", score: "95%" },
                  { name: "JavaScript (ES6+)", score: "90%" },
                  { name: "React.js / Next.js", score: "88%" },
                  { name: "Tailwind CSS & UI Libraries", score: "95%" }
                ].map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1 font-body-sm text-body-sm">
                      <span className="text-on-surface font-medium">{skill.name}</span>
                      <span className="font-code-badge text-code-badge text-primary-container">{skill.score}</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full transition-all duration-1000 ease-out" style={{width: skill.score}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Category 2 */}
            <div className="bg-surface-container-low/80 border border-outline-variant/60 rounded-xl p-space-lg backdrop-blur-md hover:border-primary-container/40 transition-all duration-200">
              <div className="flex items-center gap-space-sm mb-space-lg pb-space-xs border-b border-outline-variant/40">
                <span className="material-symbols-outlined text-secondary text-headline-lg">dns</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Backend &amp; Cloud</h3>
                  <p className="font-code-sm text-code-sm text-outline">Server-side &amp; APIs</p>
                </div>
              </div>
              <div className="space-y-space-md">
                {[
                  { name: "Node.js / Express", score: "75%" },
                  { name: "REST API & GraphQL", score: "80%" },
                  { name: "PostgreSQL & Supabase", score: "70%" },
                  { name: "Authentication & JWT", score: "82%" }
                ].map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1 font-body-sm text-body-sm">
                      <span className="text-on-surface font-medium">{skill.name}</span>
                      <span className="font-code-badge text-code-badge text-secondary">{skill.score}</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full transition-all duration-1000 ease-out" style={{width: skill.score}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Category 3 */}
            <div className="bg-surface-container-low/80 border border-outline-variant/60 rounded-xl p-space-lg backdrop-blur-md hover:border-primary-container/40 transition-all duration-200">
              <div className="flex items-center gap-space-sm mb-space-lg pb-space-xs border-b border-outline-variant/40">
                <span className="material-symbols-outlined text-primary text-headline-lg">terminal</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Tools &amp; Workflow</h3>
                  <p className="font-code-sm text-code-sm text-outline">DevOps, DX &amp; Tooling</p>
                </div>
              </div>
              <div className="space-y-space-md">
                {[
                  { name: "Git & GitHub Actions", score: "90%" },
                  { name: "Figma to Code (Precision)", score: "88%" },
                  { name: "Vite, Webpack & Turbopack", score: "82%" },
                  { name: "Docker Containers", score: "65%" }
                ].map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1 font-body-sm text-body-sm">
                      <span className="text-on-surface font-medium">{skill.name}</span>
                      <span className="font-code-badge text-code-badge text-primary">{skill.score}</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" style={{width: skill.score}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-space-2xl border-t border-outline-variant/30" id="projects">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <div className="inline-flex items-center gap-2 text-primary font-code-badge text-code-badge mb-space-2xs">
              <span>──</span>
              <span>FEATURED PROJECTS</span>
              <span>──</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              Koleksi Aplikasi &amp; Dashboard
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant mt-2">
              Koleksi aplikasi web &amp; dashboard yang telah saya bangun dengan standar arsitektur industri
            </p>
            <div className="w-16 h-1 bg-primary-container mx-auto mt-space-sm rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-space-xs mb-space-xl">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'webapp', label: 'Web App' },
              { id: 'mobile', label: 'Mobile UI' },
              { id: 'designsystem', label: 'Design System' }
            ].map(filter => (
              <button 
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`filter-btn px-space-md py-1.5 rounded-full font-code-badge text-code-badge transition-all duration-150 ${activeFilter === filter.id ? 'active bg-primary-container text-on-primary-container font-semibold' : 'bg-surface-container-low border border-outline-variant/60 text-on-surface-variant hover:text-on-surface'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg" id="projects-grid">
            {projects.filter(p => activeFilter === 'all' || p.category === activeFilter).map(project => (
              <article key={project.id} className="project-card group bg-surface-container-low/80 border border-outline-variant/60 rounded-xl overflow-hidden backdrop-blur-md hover:border-primary-container/50 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer" onClick={() => setModalData(project)}>
                <div className="relative overflow-hidden aspect-video bg-surface-container-lowest">
                  <img alt={`${project.title} Preview`} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" src={project.image}/>
                  <div className="absolute top-3 right-3 bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-outline-variant/60">
                    <span className={`font-code-sm text-code-sm ${project.category === 'webapp' ? 'text-primary-container' : project.category === 'mobile' ? 'text-secondary' : 'text-tertiary'}`}>
                      {project.category === 'webapp' ? 'Web App' : project.category === 'mobile' ? 'Mobile UI' : 'Design System'}
                    </span>
                  </div>
                </div>
                <div className="p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors duration-150 mb-space-xs">
                      {project.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                      {project.desc}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-space-md">
                      {project.tags.map(tag => (
                        <span key={tag} className={`font-code-sm text-code-sm bg-surface-container px-2 py-0.5 rounded border border-outline-variant/30 ${project.category === 'webapp' ? 'text-primary-container' : project.category === 'mobile' ? 'text-secondary' : 'text-tertiary'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-space-xs border-t border-outline-variant/40">
                      <button className="open-modal-btn inline-flex items-center gap-1 font-body-sm text-body-sm text-primary hover:underline" type="button">
                        <span>Detail Spesifikasi</span>
                        <span className="material-symbols-outlined text-body-base">arrow_forward</span>
                      </button>
                      <div className="flex items-center gap-2">
                        <a className="text-outline hover:text-primary p-1" href="#projects" onClick={(e) => e.stopPropagation()} title="Live Demo">
                          <span className="material-symbols-outlined text-body-lg">open_in_new</span>
                        </a>
                        <a className="text-outline hover:text-primary p-1" href="#projects" onClick={(e) => e.stopPropagation()} title="GitHub Code">
                          <span className="material-symbols-outlined text-body-lg">code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-space-2xl border-t border-outline-variant/30" id="contact">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <div className="inline-flex items-center gap-2 text-primary font-code-badge text-code-badge mb-space-2xs">
              <span>──</span>
              <span>HUBUNGI SAYA</span>
              <span>──</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              Mari Memulai Kolaborasi
            </h2>
            <div className="w-16 h-1 bg-primary-container mx-auto mt-space-sm rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            <div className="lg:col-span-7 bg-surface-container-low/80 border border-outline-variant/60 rounded-xl p-space-lg md:p-space-xl backdrop-blur-md">
              <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-2">Kirim Pesan Langsung</h3>
              <p className="font-body-base text-body-base text-on-surface-variant mb-space-lg">
                Punya ide proyek menarik atau ingin berdiskusi mengenai arsitektur frontend? Tinggalkan pesan Anda di bawah.
              </p>
              
              <form className="space-y-space-md" id="contact-form" noValidate onSubmit={handleContactSubmit}>
                {contactStatus === 'success' && (
                  <div className="p-space-md rounded-xl font-body-sm text-body-sm transition-all duration-200 bg-primary-container/20 border border-primary-container text-primary">
                    Terima kasih! Pesan Anda berhasil dikirim. Saya akan segera menghubungi Anda kembali.
                  </div>
                )}
                
                <div>
                  <label className="block font-body-sm text-body-sm font-medium text-on-surface mb-1" htmlFor="name">Nama Lengkap</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-outline text-body-lg pointer-events-none">person</span>
                    <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 text-on-surface text-body-base placeholder:text-outline/50 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" id="name" name="name" placeholder="John Doe" required type="text"/>
                  </div>
                </div>
                
                <div>
                  <label className="block font-body-sm text-body-sm font-medium text-on-surface mb-1" htmlFor="email">Email Anda</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-outline text-body-lg pointer-events-none">mail</span>
                    <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 text-on-surface text-body-base placeholder:text-outline/50 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" id="email" name="email" placeholder="john@example.com" required type="email"/>
                  </div>
                </div>
                
                <div>
                  <label className="block font-body-sm text-body-sm font-medium text-on-surface mb-1" htmlFor="message">Pesan Proyek</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-outline text-body-lg pointer-events-none">chat</span>
                    <textarea className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 text-on-surface text-body-base placeholder:text-outline/50 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" id="message" name="message" placeholder="Ceritakan brief proyek, perkiraan timeline, atau pertanyaan Anda..." required rows={4}></textarea>
                  </div>
                </div>
                
                <button className="w-full inline-flex items-center justify-center gap-space-xs bg-primary-container text-on-primary-container font-headline-sm text-body-base font-semibold py-space-sm rounded-xl hover:bg-secondary-container transition-all duration-150 shadow-md" type="submit" disabled={contactStatus === 'loading'}>
                  {contactStatus === 'loading' ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-body-lg">progress_activity</span>
                      <span>Mengirim Pesan...</span>
                    </>
                  ) : contactStatus === 'success' ? (
                    <>
                      <span className="material-symbols-outlined text-body-lg">done</span>
                      <span>Terkirim!</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-body-lg">send</span>
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>
              </form>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="bg-surface-container-low/80 border border-outline-variant/60 rounded-xl p-space-lg backdrop-blur-md">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-space-sm">Saluran Komunikasi</h4>
                <ul className="space-y-space-md">
                  <li className="flex items-start gap-space-sm">
                    <div className="p-2 bg-surface-container rounded-lg text-primary-container border border-outline-variant/40">
                      <span className="material-symbols-outlined text-body-lg">alternate_email</span>
                    </div>
                    <div>
                      <span className="block font-body-sm text-body-sm text-outline">Email Langsung</span>
                      <a className="text-on-surface font-medium hover:text-primary transition-colors" href="mailto:hello@rizkypratama.dev">hello@rizkypratama.dev</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-sm">
                    <div className="p-2 bg-surface-container rounded-lg text-primary-container border border-outline-variant/40">
                      <span className="material-symbols-outlined text-body-lg">location_on</span>
                    </div>
                    <div>
                      <span className="block font-body-sm text-body-sm text-outline">Lokasi Kerja</span>
                      <span className="text-on-surface font-medium">Jakarta, Indonesia (WIB / UTC+7)</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-sm">
                    <div className="p-2 bg-surface-container rounded-lg text-primary-container border border-outline-variant/40">
                      <span className="material-symbols-outlined text-body-lg">schedule</span>
                    </div>
                    <div>
                      <span className="block font-body-sm text-body-sm text-outline">Waktu Respon</span>
                      <span className="text-on-surface font-medium">Biasanya membalas dalam &lt; 24 jam</span>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-space-lg pt-space-md border-t border-outline-variant/40">
                  <span className="block font-body-sm text-body-sm text-outline mb-space-xs">Profil Developer</span>
                  <div className="grid grid-cols-2 gap-space-xs">
                    <a className="flex items-center gap-2 p-2 bg-surface-container-lowest rounded-lg border border-outline-variant/50 text-on-surface hover:text-primary hover:border-primary/50 transition-all" href="https://github.com" rel="noopener noreferrer" target="_blank">
                      <span className="font-code-badge text-code-badge text-primary font-bold">GH</span>
                      <span className="text-body-sm font-medium">GitHub</span>
                    </a>
                    <a className="flex items-center gap-2 p-2 bg-surface-container-lowest rounded-lg border border-outline-variant/50 text-on-surface hover:text-primary hover:border-primary/50 transition-all" href="https://linkedin.com" rel="noopener noreferrer" target="_blank">
                      <span className="font-code-badge text-code-badge text-secondary font-bold">IN</span>
                      <span className="text-body-sm font-medium">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-container-low/80 border border-outline-variant/60 rounded-xl p-space-lg backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  <span className="font-code-badge text-code-badge text-primary-container uppercase">Status Saat Ini</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Terbuka untuk posisi Frontend Engineer full-time (remote / hybrid) serta proyek freelance kontrak dengan timeline terstruktur.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-outline-variant/40 mt-space-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-gutter-mobile md:px-gutter-desktop max-w-max-content-width mx-auto py-space-xl gap-space-md">
          <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
            <a className="text-headline-sm font-headline-sm font-semibold text-primary dark:text-primary" href="#hero">
              <span className="font-code-badge text-code-badge text-primary-container">&lt;</span>
              <span>Rizky.dev</span>
              <span className="font-code-badge text-code-badge text-primary-container">/&gt;</span>
            </a>
            <span className="hidden md:inline text-outline">•</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              © 2026 Rizky Pratama • Engineered with precision &amp; passion.
            </p>
          </div>
          
          <div className="flex items-center gap-space-lg text-body-sm font-body-sm">
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-150" href="https://github.com" rel="noopener noreferrer" target="_blank">GitHub</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-150" href="https://linkedin.com" rel="noopener noreferrer" target="_blank">LinkedIn</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-150" href="https://twitter.com" rel="noopener noreferrer" target="_blank">Twitter</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-150" href="mailto:hello@rizkypratama.dev">Email</a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <div aria-hidden="true" className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md transition-opacity duration-200 ${modalData ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} id="project-modal" role="dialog" onClick={() => setModalData(null)}>
        {modalData && (
          <div className={`bg-surface-container-low border border-outline-variant rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-transform duration-200 ${modalData ? 'scale-100' : 'scale-95'}`} id="modal-container" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-video w-full bg-surface-container-lowest">
              <img alt="Project Preview" className="w-full h-full object-cover" id="modal-img" src={modalData.image}/>
              <button className="absolute top-4 right-4 bg-surface-container-lowest/80 text-on-surface hover:text-primary rounded-full p-1.5 backdrop-blur-md border border-outline-variant/60 focus:outline-none" onClick={() => setModalData(null)} type="button">
                <span className="material-symbols-outlined text-body-lg">close</span>
              </button>
            </div>
            
            <div className="p-space-lg md:p-space-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-code-sm text-code-sm bg-surface-container text-primary-container px-2.5 py-0.5 rounded border border-outline-variant/40" id="modal-category">
                  {modalData.category.toUpperCase()}
                </span>
              </div>
              <h3 className="font-headline-xl text-headline-xl text-on-surface font-bold mb-space-xs" id="modal-title">{modalData.title}</h3>
              <p className="font-body-base text-body-base text-on-surface-variant mb-space-lg leading-relaxed" id="modal-desc">
                {modalData.desc}
              </p>
              
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-space-xs">Spesifikasi &amp; Arsitektur:</h4>
              <ul className="space-y-2 mb-space-lg font-body-sm text-body-sm text-on-surface-variant list-disc pl-5" id="modal-points">
                {modalData.points.map((point: string, idx: number) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              
              <div className="mb-space-xl">
                <span className="block font-code-sm text-code-sm text-outline mb-2">TECH STACK:</span>
                <div className="flex flex-wrap gap-2" id="modal-tags">
                  {modalData.tags.map((t: string, idx: number) => (
                    <span key={idx} className="font-code-sm text-code-sm bg-surface-container-highest text-primary-container px-2.5 py-1 rounded border border-outline-variant/40">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-space-md pt-space-md border-t border-outline-variant/40">
                <a className="inline-flex items-center gap-space-xs bg-primary-container text-on-primary-container text-body-base font-semibold px-space-lg py-space-xs rounded-xl hover:bg-secondary-container transition-all" href="#projects">
                  <span className="material-symbols-outlined text-body-lg">open_in_new</span>
                  <span>Live Demo</span>
                </a>
                <a className="inline-flex items-center gap-space-xs bg-surface-container border border-outline-variant text-on-surface text-body-base font-semibold px-space-lg py-space-xs rounded-xl hover:border-primary transition-all" href="#projects">
                  <span className="material-symbols-outlined text-body-lg">code</span>
                  <span>Lihat Source</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
