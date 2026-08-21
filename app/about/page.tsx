import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Background, working style, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip />
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pb-16 pt-20 sm:px-10 sm:pb-24 sm:pt-28">
        <FadeIn delay={0.5}>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 dark:bg-foreground/3 sm:p-12">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Hello! I&rsquo;m <span className="border-b border-foreground/30 pb-0.5">Yotam Harel</span>.
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <p>
                I&rsquo;m interested in the space between building a great product and making sure <strong className="font-semibold text-foreground">people understand how to use it, why it matters, and how it fits into their lives.</strong>
              </p>
              <p>
                My background started in Web3, working across product, data, GTM, and community. Along the way, I kept coming back to the same challenge: <strong className="font-semibold text-foreground">taking something complex and making it easier to understand, use, and care about.</strong>
              </p>
              <p>
                Today, I focus on <strong className="font-semibold text-foreground">product education, marketing, and community.</strong> Helping users discover products, understand their value, and ultimately become their biggest advocates.
              </p>
              <p>
                I&rsquo;m naturally curious and usually building something, learning something new, or finding a simpler explanation to what I&rsquo;ve discovered.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
