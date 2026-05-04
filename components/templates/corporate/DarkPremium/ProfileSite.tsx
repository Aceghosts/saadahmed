"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Mail,
  MessageCircle,
  MapPin,
  Phone,
} from "lucide-react";
import type { ProfileData } from "@/lib/types/profile";

type ProfileSiteProps = {
  profile: ProfileData;
  isPreview?: boolean;
};

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const trustedBrands = [
  "HONOR",
  "SOLVE.CARE",
  "DARAZ",
  "CAREEM",
  "PSO",
  "BYD",
  "BANK ALFALAH",
  "K-ELECTRIC",
  "UNILEVER",
  "HBL",
  "FAYSAL BANK",
];

const featuredMedia = [
  {
    title: "Vibe Store",
    description: "Retail-first brand film with a sharper digital commerce energy.",
    src: "/clients/saad-ahmed/videos/vibe-store.mp4",
  },
  {
    title: "itel AI DVC",
    description: "AI-led product communication shaped for mobile-first audiences.",
    src: "/clients/saad-ahmed/videos/itel-ai-dvc.mp4",
  },
  {
    title: "itel S26 Ultra",
    description: "Launch creative focused on premium device storytelling.",
    src: "/clients/saad-ahmed/videos/itel-s26-ultra.mp4",
  },
];

export function ProfileSite({ profile, isPreview = false }: ProfileSiteProps) {
  const whatsappHref = profile.phone
    ? `https://wa.me/${profile.phone.replace(/\D/g, "")}`
    : undefined;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080706] text-white">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes ambientGradient {
          0%,
          100% {
            background-position:
              50% 0%,
              20% 20%,
              80% 8%;
          }
          50% {
            background-position:
              50% 0%,
              24% 18%,
              76% 12%;
          }
        }

        @keyframes chroma {
          0%,
          100% {
            color: #fff7ed;
          }
          33% {
            color: #fdba74;
          }
          66% {
            color: #c4b5fd;
          }
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animated-word {
          animation: chroma 7s ease-in-out infinite;
        }

        .site-atmosphere {
          animation: ambientGradient 18s ease-in-out infinite;
          background-size:
            100% 100%,
            120% 120%,
            120% 120%;
        }

        .brand-track {
          animation: marquee 26s linear infinite;
        }

        .brand-strip:hover .brand-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="site-atmosphere pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,#080706_0%,#120b09_36%,#160c0b_64%,#090706_100%),radial-gradient(circle_at_22%_18%,rgba(255,86,38,0.32),transparent_32%),radial-gradient(circle_at_78%_12%,rgba(139,92,246,0.18),transparent_34%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />

      <section className="relative z-10 min-h-screen overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_14%,rgba(255,86,38,0.30),transparent_34%),linear-gradient(135deg,rgba(255,79,31,0.52)_0%,rgba(169,37,22,0.42)_33%,rgba(22,11,24,0.18)_70%,rgba(5,5,5,0.08)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#080706] to-transparent" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
          <motion.header
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center justify-between"
          >
            <Link href="/dashboard" className="text-sm font-extrabold tracking-tight">
              Presona
            </Link>
            <nav className="hidden items-center gap-7 text-xs font-medium text-white/70 sm:flex">
              <a href="#work" className="transition hover:text-white">
                Projects
              </a>
              <a href="#experience" className="transition hover:text-white">
                Experience
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </nav>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-white/25 bg-white px-4 py-2 text-xs font-bold text-black shadow-[0_12px_34px_rgba(255,255,255,0.22)] transition hover:scale-105"
            >
              Get in touch
            </a>
          </motion.header>

          <div className="grid flex-1 items-center gap-8 py-8 sm:py-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-10">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="relative z-10 order-2 lg:order-1"
            >
              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl text-7xl font-black leading-[0.86] tracking-[-0.02em] text-balance sm:text-8xl lg:text-[10rem]"
              >
                {profile.name}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="animated-word mt-5 text-4xl font-black leading-none tracking-[-0.015em] sm:text-5xl lg:text-6xl"
              >
                Growth Director
              </motion.p>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mt-7 max-w-xl text-xl font-semibold leading-8 text-white/82"
              >
                {profile.tagline}
              </motion.p>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mt-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-orange-100 backdrop-blur-2xl"
              >
                {profile.title}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 36, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.14 }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="relative order-1 mx-auto w-full max-w-[330px] sm:max-w-[420px] lg:order-2 lg:max-w-[540px]"
            >
              <div className="absolute -inset-5 rounded-[2rem] bg-white/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                <div className="relative aspect-[4/4.7] overflow-hidden rounded-[1.55rem] bg-black lg:aspect-[4/5]">
                  <Image
                    src={profile.profileImage}
                    alt={`${profile.name} portrait`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover object-[50%_8%] grayscale-[18%] saturate-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-orange-500/10" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mb-8 grid gap-3 rounded-[1.6rem] border border-white/10 bg-black/28 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4"
          >
            {profile.stats.map((stat, index) => (
              <div key={stat.label} className="rounded-2xl bg-white/[0.06] p-4">
                <p className="text-xs font-bold text-orange-200/90">#{index + 1}</p>
                <p className="mt-3 text-3xl font-black tracking-[-0.05em]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/62">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: "easeOut" }}
            className="brand-strip mb-4 overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/25 py-5 shadow-2xl shadow-black/25 backdrop-blur-2xl"
          >
            <p className="mb-5 text-center text-[11px] font-black uppercase tracking-[0.5em] text-white/30">
              Trusted brands I&apos;ve helped shape
            </p>
            <div className="flex w-max brand-track gap-16 px-8">
              {[...trustedBrands, ...trustedBrands].map((brand, index) => (
                <span
                  key={`${brand}-${index}`}
                  className="text-sm font-black uppercase tracking-[0.24em] text-white/35 transition hover:text-orange-200"
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_0%,rgba(255,86,38,0.18),transparent_34%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.14),transparent_32%)]" />
        <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
          <p className="text-sm font-black text-orange-500">Behind the Growth</p>
          <h2 className="mt-3 text-5xl font-black leading-[0.98] tracking-[-0.03em] text-balance sm:text-6xl">
            Shaping Experiences That Make Brands Grow
          </h2>
        </motion.div>
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="rounded-[1.7rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-2xl"
        >
          <p className="text-2xl font-bold leading-9 text-white">
            I&apos;m a product-minded growth leader focused on building clean,
            measurable, revenue-first digital ecosystems.
          </p>
          <p className="mt-5 text-lg leading-8 text-white/62">{profile.about}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:scale-105 hover:bg-orange-400"
            >
              Let&apos;s build
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
            {profile.socialLinks.linkedin ? (
              <a
                href={profile.socialLinks.linkedin}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
              >
                LinkedIn
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </motion.div>
      </motion.section>

      <section id="work" className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,86,38,0.10),transparent_42%,rgba(139,92,246,0.10))]" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-end justify-between gap-6"
        >
          <div>
            <p className="text-sm font-black text-orange-500">Selected Work</p>
            <h2 className="mt-3 text-5xl font-black leading-none tracking-[-0.03em]">
              Growth Plays
            </h2>
          </div>
          {isPreview ? (
            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-white/70 backdrop-blur">
              Preview
            </span>
          ) : null}
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {profile.portfolio.map((item, index) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.65 }}
              className="group min-h-72 rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-orange-300/40 hover:bg-orange-400/10"
            >
              <p className="text-sm font-black text-white/35">0{index + 1}</p>
              <h3 className="mt-10 text-3xl font-black leading-[0.98] tracking-[-0.02em] text-white transition group-hover:text-orange-200">
                {item.title}
              </h3>
              <p className="mt-5 leading-7 text-white/62">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section
        id="media"
        className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="text-sm font-black text-orange-500">Featured Media</p>
          <h2 className="mt-3 text-5xl font-black leading-none tracking-[-0.03em]">
            Campaign Films
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          className="grid gap-5 lg:grid-cols-3"
        >
          {featuredMedia.map((item) => (
            <motion.article
              key={item.src}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.6 }}
              className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-3 shadow-2xl shadow-black/20 backdrop-blur-2xl transition hover:border-orange-200/35 hover:bg-white/[0.10]"
            >
              <div className="overflow-hidden rounded-[1.2rem] bg-black/60">
                <video
                  className="aspect-video w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`${item.title} video`}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              </div>
              <div className="px-3 pb-3 pt-5">
                <h3 className="text-2xl font-black tracking-[-0.02em] text-white transition group-hover:text-orange-200">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-white/60">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section
        id="experience"
        className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_20%,rgba(255,86,38,0.13),transparent_30%)]" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-black text-orange-500"
        >
          Leadership Timeline
        </motion.p>
        <div className="mt-8 grid gap-4">
          {profile.experience.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.65, delay: index * 0.04 }}
              className="grid gap-6 rounded-[1.45rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl transition hover:border-orange-200/35 lg:grid-cols-[0.34fr_0.66fr]"
            >
              <div>
                <p className="text-sm font-black text-orange-200">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-black tracking-[-0.015em]">
                  {item.company}
                </h3>
                <p className="mt-2 text-sm font-bold text-white/40">
                  {item.duration}
                </p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-[-0.015em] text-white">
                  {item.role}
                </p>
                <p className="mt-4 leading-8 text-white/62">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-[#0f0d0a] px-5 py-20 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,86,38,0.22),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(139,92,246,0.18),transparent_30%)]" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="rounded-[1.7rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-2xl">
            <p className="text-sm font-black text-orange-400">Services</p>
            <div className="mt-7 grid gap-5">
              {profile.services.map((service) => (
                <div key={service.title} className="border-t border-white/10 pt-5">
                  <h3 className="text-2xl font-black tracking-[-0.015em]">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-7 text-white/62">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-[1.7rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-2xl">
            <p className="text-sm font-black text-orange-400">Core Skills</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm font-bold text-white/72 transition hover:border-orange-200/40 hover:text-orange-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <footer id="contact" className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-white/40">Built by</p>
            <p className="mt-2 text-xl font-black">Presona</p>
          </div>
          <p className="flex items-center gap-3 text-white/65">
            <MapPin className="h-4 w-4 text-orange-300" aria-hidden="true" />
            {profile.location}
          </p>
          {profile.phone ? (
            <p className="flex items-center gap-3 text-white/65">
              <Phone className="h-4 w-4 text-orange-300" aria-hidden="true" />
              {profile.phone}
            </p>
          ) : null}
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 font-bold text-orange-200"
          >
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            {profile.email}
          </a>
        </div>
      </footer>

      {whatsappHref ? (
        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-2xl shadow-black/35 backdrop-blur"
          aria-label={`Message ${profile.name} on WhatsApp`}
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          WhatsApp
        </motion.a>
      ) : null}
    </main>
  );
}
