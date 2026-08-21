"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

type Entry = {
  company: string;
  role: string;
  period: string;
  description: string;
  brand: string;
  logoUrl: string;
  logoAlt: string;
  logoScale?: number;
  logoPadding?: string;
  logoBackground?: string;
};

const ENTRIES: Entry[] = [
  {
    company: "Entropy Advisors",
    role: "Governance & Socials",
    period: "Jan 2025 – Dec 2025",
    description:
      "Led Social and Content Strategy for data-driven content, turning complex onchain insights into stories people engaged with and shared.",
    brand: "#111111",
    logoUrl: "/logos/entropy-advisors.png",
    logoAlt: "Entropy Advisors logo",
    logoScale: 0.92,
    logoPadding: "0.32rem",
    logoBackground: "#111111",
  },
  {
    company: "HODL Capital",
    role: "Crypto Research Analyst",
    period: "Nov 2023 – Jan 2025",
    description:
      "Researched crypto products and protocols, translating complex data and market insights into clear investment research.",
    brand: "#2563EB",
    logoUrl: "/logos/hodl-capital.png",
    logoAlt: "HODL Capital logo",
    logoScale: 1.12,
    logoPadding: "0.12rem",
    logoBackground: "#ffffff",
  },
  {
    company: "Chippy’s World",
    role: "Community & Business Development",
    period: "2021 – 2023",
    description:
      "Helped build and grow a Web3 community through member engagement and community-led initiatives.",
    brand: "#ffffff",
    logoUrl: "/logos/chippys-world.png",
    logoAlt: "Chippy's World logo",
    logoScale: 1.08,
    logoPadding: "0rem",
    logoBackground: "#ffffff",
  },
  {
    company: "DEEP",
    role: "Web3 Product Lead",
    period: "Jan 2022 – Nov 2022",
    description:
      "Led product design and GTM for an AI-powered data visualization tool, shaping how it was positioned for users and partners.",
    brand: "#0F766E",
    logoUrl: "/logos/deep.png",
    logoAlt: "DEEP logo",
    logoScale: 0.92,
    logoPadding: "0.3rem",
    logoBackground: "#101818",
  },
  {
    company: "Strauss Group",
    role: "Sales Agent",
    period: "Jan 2020 – Jun 2020",
    description:
      "Worked in outbound sales, converting cold and warm leads through clear communication and persistence.",
    brand: "#ffffff",
    logoUrl: "/logos/strauss-group.png",
    logoAlt: "Strauss Group logo",
    logoScale: 0.9,
    logoPadding: "0.25rem",
    logoBackground: "#ffffff",
  },
];

const COLLAPSED_COUNT = 2.5;
const ROW_HEIGHT = 96;
const ROW_GAP = 8;

export function Experience(): ReactNode {
  const [open, setOpen] = useState(false);
  const collapsedHeight =
    Math.floor(COLLAPSED_COUNT) * ROW_HEIGHT +
    Math.floor(COLLAPSED_COUNT) * ROW_GAP +
    (COLLAPSED_COUNT % 1) * ROW_HEIGHT;
  const hiddenCount = ENTRIES.length - Math.floor(COLLAPSED_COUNT);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Experience
      </h3>
      <div
        className={`border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative overflow-hidden rounded-4xl border px-2 pt-2 sm:px-4 sm:pt-4 ${open ? "pb-2 sm:pb-4" : "pb-0"
          }`}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={{
            height: open ? "auto" : collapsedHeight,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <ul className="flex flex-col gap-2">
            {ENTRIES.map((entry) => (
              <li
                key={`${entry.company}-${entry.period}`}
                className="bg-background border-foreground/5 flex items-start gap-4 rounded-3xl border p-3"
                style={{ minHeight: ROW_HEIGHT }}
              >
                <CompanyLogo entry={entry} />
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                    {entry.company}
                  </span>
                  <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                    {entry.role}
                    <span className="text-foreground/30 mx-2">•</span>
                    <span className="text-foreground/55">{entry.period}</span>
                  </span>
                  <p className="mt-2 max-w-[48ch] text-[14px] leading-[1.5] tracking-tight text-foreground/65 sm:text-[15px]">
                    {entry.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <AnimatePresence>
          {!open && (
            <motion.div
              key="fade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{
                height: ROW_HEIGHT,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 80%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 80%)",
              }}
            />
          )}
        </AnimatePresence>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={`focus-ring text-foreground flex w-full cursor-pointer items-center justify-center gap-1.5 bg-transparent text-[15px] font-medium tracking-tight ${open
              ? "relative mt-4"
              : "absolute inset-x-0 bottom-0 z-10 py-3 sm:py-4"
              }`}
          >
            {open ? "Show less" : `Show ${hiddenCount} more`}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex"
            >
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </button>
        )}
      </div>
    </div>
  );
}

function CompanyLogo({ entry }: { entry: Entry }): ReactNode {
  return (
    <span
      className="ring-foreground/8 inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden ring-1"
      aria-hidden="true"
      style={{
        borderRadius: 14,
        backgroundColor: entry.logoBackground ?? entry.brand,
        padding: entry.logoPadding ?? "0.28rem",
      }}
    >
      <Image
        src={entry.logoUrl}
        alt={entry.logoAlt}
        width={48}
        height={48}
        className="h-full w-full object-contain"
        style={{ transform: `scale(${entry.logoScale ?? 1})` }}
        draggable={false}
      />
    </span>
  );
}
