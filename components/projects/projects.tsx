import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Database,
  FileText,
  Sparkles,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  imageAlt: string;
  href: string;
};

const PROJECT_IMAGE_RATIO = 752 / 497;

const PROJECTS: Project[] = [
  {
    id: "remotion-inspiration",
    icon: Sparkles,
    iconLabel: "Remotion Inspiration",
    title: "A prompt-first inspiration library for Remotion.",
    description:
      "Built a visual library for discovering Remotion ideas and quickly turning inspiration into something you can create yourself.",
    meta: "Creator · 2026",
    image: "/projects/remotion-inspiration-20260820b.png",
    imageAlt: "Remotion Inspiration project preview",
    href: "https://remotion-inspiration.vercel.app/?utm_source=chatgpt.com",
  },
  {
    id: "product-story",
    icon: BookOpen,
    iconLabel: "Product Story",
    title: "Helping product teams find the stories worth sharing.",
    description:
      "Designed and built a product that turns shipped product work into stories users can understand — from gathering context and evidence to identifying highlights and creating drafts.",
    meta: "Creator · 2026",
    image: "/projects/product-story-20260820b.png",
    imageAlt: "Product Story project preview",
    href: "https://product-story.base44.app/",
  },
  {
    id: "dune-data-table-explorer",
    icon: Database,
    iconLabel: "Dune Data Table Explorer",
    title: "Making Dune's data easier to explore.",
    description:
      "Built an interactive explorer that makes it easier to discover, understand, and compare Dune tables, with search, comparisons, and ready-to-use SQL examples.",
    meta: "Creator · 2026",
    image: "/projects/dune-data-table-explorer-20260820b.png",
    imageAlt: "Dune Data Table Explorer project preview",
    href: "https://spellbook-explorer.vercel.app/",
  },
  {
    id: "dune-cheatsheet",
    icon: FileText,
    iconLabel: "Dune Cheatsheet",
    title: "Making Dune easier to learn.",
    description:
      "Created a visual cheatsheet that breaks down Dune&rsquo;s core concepts and workflows into a simple resource people can quickly understand and reference.",
    meta: "Creator · 2025",
    image: "/projects/dune-cheatsheet-20260820b.png",
    imageAlt: "Dune Cheatsheet project preview",
    href: "https://x.com/yotamha1/status/1996612139474366861",
  },
  {
    id: "base-wrapped-2024",
    icon: BarChart3,
    iconLabel: "Base Wrapped 2024",
    title: "Turning a year of wallet activity into a personalized story.",
    description:
      "Built an interactive Dune dashboard that transformed a Base wallet&rsquo;s yearly activity into a personalized Wrapped experience with top moments, patterns, and comparisons.",
    meta: "Creator · 2024",
    image: "/projects/base-wrapped-2024-20260820b.png",
    imageAlt: "Base Wrapped 2024 project preview",
    href: "https://x.com/yotamha1/status/1868355695244202191",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pb-10 pt-12 text-center sm:pb-14 sm:pt-20">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              Featured projects
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              A selection of product education, storytelling, and builder-led
              work across tools, research, and GTM.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <Link
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <article className="project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 transition-transform hover:-translate-y-0.5 sm:p-3.5">
          <header className="flex items-center gap-2.5 px-1 pt-2">
            <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
              <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium tracking-tight text-foreground">
              {project.iconLabel}
            </span>
          </header>

          <div
            className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/3 ring-1"
            style={{ aspectRatio: PROJECT_IMAGE_RATIO }}
          >
            <div className="project-card__image-inner absolute inset-0 p-3 sm:p-4">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                unoptimized
                sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
                className="rounded-xl object-contain object-center"
                priority={index < 2}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 px-1 pb-1">
            <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
              {project.title}
            </h3>
            <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
              {project.description}
            </p>
          </div>

          <p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
            {project.meta}
          </p>
        </article>
      </Link>
    </FadeIn>
  );
}
