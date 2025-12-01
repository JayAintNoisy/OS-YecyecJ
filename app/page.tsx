"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

/**
 * Futuristic Dark portfolio page (Option C)
 * - TailwindCSS utilities
 * - Neon accent, glass cards, circular hero image with ring
 * - Improved spacing/typography & subtle animations
 *
 * NOTE: Make sure Tailwind is configured and your images exist at /public/ (yecyec.jpg, example project images).
 */

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  link: string;
  image?: string;
  openInNewTab?: boolean;
}

const NAME = "JAYMAR YECYEC";
const heroImage = "/yecyec.jpg";

export default function Home(): React.JSX.Element {
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "FCFS Scheduler Simulator",
      description:
        "Visual simulator of FCFS scheduling. Clean UI, step-through execution, and timeline visualization.",
      link: "/projects/fcfs",
      image: "/FCFS.jpeg.jpg",
      openInNewTab: true,
    },
    {
      id: 2,
      title: "Botchokoy E-Commerce Shop",
      description:
        "Mock e-commerce with product browsing, cart flow, and responsive checkout experience.",
      link: "https://botchokoy.vercel.app/",
      image: "/Commerce Shop.jpg",
      openInNewTab: true,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#060614] via-[#0b1020] to-[#071028] text-slate-100 antialiased">
      {/* ========== NAV ========== */}
      <nav className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <div className="text-lg md:text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
         
          </div>
          <div className="hidden md:flex items-center text-sm text-slate-400 gap-6 ml-6">
            <Link href="#about" className="hover:text-slate-100 transition-colors">
              About
            </Link>
            <Link href="#portfolio" className="hover:text-slate-100 transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-slate-100 transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-slate-100 transition-colors"
            aria-label="GitHub"
          >
            {/* simple icon fallback */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.7 2 .9.1-.8.4-1.4.7-1.7-2.5-.3-5.1-1.2-5.1-5.3 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.2 0 0 .9-.3 3.1 1.1.9-.3 1.9-.4 2.9-.4 1 0 2 .1 2.9.4 2.2-1.4 3.1-1.1 3.1-1.1.6 1.7.2 2.9.1 3.2.7.8 1.1 1.7 1.1 3 0 4.1-2.6 5-5.1 5.3.4.3.7 1 .7 2v3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5z" fill="currentColor" />
            </svg>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-200 hover:bg-slate-800/50 transition"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* left: text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-sm uppercase tracking-wider text-slate-400 mb-3">Welcome to my portfolio</p>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Hello, my <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">name's Jaymar Yecyec</span>.
          </h1>

          <p className="mt-6 max-w-xl text-slate-300 text-lg">
            I'm a web developer from the Philippines focusing on performant, accessible, and beautiful interfaces. Building with Next.js, React and Tailwind CSS.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start gap-4 flex-wrap">
            <a
              href="/jaymar-resume.pdf"
              download
              className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg hover:scale-[1.01] transform transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3v12" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 11l4 4 4-4" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21H3" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download CV
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-md border border-slate-700 hover:border-cyan-400 text-slate-200 transition"
            >
              See my work →
            </a>
          </div>

          <div className="mt-12 flex items-center gap-4 justify-center lg:justify-start text-slate-400">
            <span className="text-xs">ScrollDown</span>
            <div className="w-[1px] h-6 bg-slate-700" />
            <span className="text-xs">Explore</span>
          </div>
        </div>

        {/* right: circular hero image with ring & subtle glow */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-[320px] h-[320px] rounded-full flex items-center justify-center">
            {/* neon ring */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.16)]" />

            <div className="relative w-[260px] h-[260px] rounded-full overflow-hidden border border-slate-700/40 bg-gradient-to-tr from-slate-800/20 to-transparent p-1">
              <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-slate-800/60">
                <Image
                  src={heroImage}
                  alt="Jaymar portrait"
                  fill
                  sizes="(min-width: 1024px) 260px, 200px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="block"
                  priority
                />
              </div>
            </div>

            {/* floating accent squares (decorative) */}
            <div className="absolute -left-6 -top-6 w-12 h-12 rounded-md bg-cyan-500/10 border border-cyan-400/20 backdrop-blur animate-float" />
            <div className="absolute -right-8 bottom-12 w-16 h-16 rounded-full bg-violet-500/10 border border-violet-400/20 backdrop-blur animate-float animation-delay-2000" />
          </div>
        </div>
      </header>

      {/* small animated background shapes */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-10 top-20 w-40 h-40 rounded-full bg-cyan-800/20 blur-3xl animate-blob" />
        <div className="absolute right-10 bottom-20 w-56 h-56 rounded-full bg-violet-800/20 blur-3xl animate-blob animation-delay-3000" />
      </div>

      {/* ========== ABOUT ========== */}
      <section id="about" className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              I build interfaces that are fast and delightful.
            </h2>
            <p className="mt-6 text-slate-300 leading-relaxed max-w-xl">
              I'm Jaymar Yecyec a front-end developer with a passion for clean code, strong UX, and polished visual details. I enjoy translating ideas into production-ready applications and learning new techniques to make experiences more performant and accessible.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-transparent border border-slate-700 hover:border-cyan-400 transition"
              >
                Hire me
              </a>

              <a
                href="/jaymar-resume.pdf"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-cyan-500/80 hover:bg-cyan-500 transition"
              >
                Download resume
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-[linear-gradient(135deg,#0b1220,rgba(11,16,32,0.45))] border border-slate-700/40 shadow-sm">
              <h4 className="text-sm text-slate-300 uppercase tracking-wider">Skills</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Next.js", "React", "Tailwind", "TypeScript", "Git", "Responsive UI"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[linear-gradient(135deg,#081026,rgba(11,16,32,0.35))] border border-slate-700/30 shadow-sm">
              <h4 className="text-sm text-slate-300 uppercase tracking-wider">Availability</h4>
              <p className="mt-2 text-slate-400 text-sm">Open to work · Freelance / Remote</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS ========== */}
      <section id="portfolio" className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold">Recent projects</h3>
            <p className="text-slate-400 mt-1">Selected works with clean interfaces and strong UX focus.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {portfolioItems.map((p) => (
            <article
              key={p.id}
              className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#071026] to-[#051022] border border-slate-700/40 shadow-md"
            >
              {/* preview image if available */}
              {p.image ? (
                <div className="relative w-full h-48 md:h-56">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 560px, 320px"
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              ) : null}

              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-cyan-400">Web App</span>
                <h4 className="mt-2 text-xl font-semibold">{p.title}</h4>
                <p className="mt-2 text-slate-300 text-sm">{p.description}</p>

                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={p.link}
                    target={p.openInNewTab ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md border border-slate-700 hover:border-cyan-400 transition"
                  >
                    View project →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="rounded-2xl p-8 bg-[linear-gradient(180deg,#061022,rgba(6,10,34,0.55))] border border-slate-700/40">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-extrabold">Let's get in touch</h3>
              <p className="mt-4 text-slate-300">
                I'm currently open to new opportunities. Send a message and I'll reply within a few days.
              </p>

              <div className="mt-6 flex gap-3">
                <a href="mailto:example@example.com" className="px-4 py-2 rounded-md bg-cyan-500/90 hover:bg-cyan-500 transition">
                  Email me
                </a>
                <a href="#" className="px-4 py-2 rounded-md border border-slate-700 hover:border-cyan-400 transition">
                  Other ways
                </a>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="p-3 rounded-md bg-transparent border border-slate-700 placeholder:text-slate-500 text-slate-200" placeholder="Your name" />
                <input type="email" className="p-3 rounded-md bg-transparent border border-slate-700 placeholder:text-slate-500 text-slate-200" placeholder="Your email" />
              </div>
              <input className="w-full p-3 rounded-md bg-transparent border border-slate-700 placeholder:text-slate-500 text-slate-200" placeholder="Subject" />
              <textarea className="w-full p-3 rounded-md bg-transparent border border-slate-700 placeholder:text-slate-500 text-slate-200" rows={5} placeholder="Message" />
              <div className="text-right">
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-600 hover:scale-[1.01] transition">
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="max-w-7xl mx-auto px-6 md:px-12 py-8 text-center text-slate-500">
        <div className="mb-3 text-sm">© {new Date().getFullYear()} {NAME}. All rights reserved.</div>
        <div className="text-xs">Built with Next.js • Tailwind CSS</div>
      </footer>

      {/* ========== Extra tailwind utility animations (copy to your tailwind config if you want custom durations) ========== */}
      <style jsx global>{`
        /* small animation utilities if not in your tailwind build */
        @keyframes blob {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
        .animate-blob { animation: blob 6s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-float { animation: blob 4.6s infinite ease-in-out; }
      `}</style>
    </main>
  );
}
