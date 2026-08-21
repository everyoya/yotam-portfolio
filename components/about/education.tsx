import Image from "next/image";
import type { ReactNode } from "react";

type Entry = {
  school: string;
  degree: string;
  period: string;
  logoUrl: string;
  logoAlt: string;
};

const ENTRIES: Entry[] = [
  {
    school: "Reichman University",
    degree: "B.A. Business Administration & Entrepreneurship",
    period: "2020 – 2023",
    logoUrl: "/education/reichman-university.png",
    logoAlt: "Reichman University logo",
  },
  {
    school: "EDEM Business School (Student Exchange - Valencia, Spain)",
    degree: "Business & Entrepreneurship Exchange Program",
    period: "2022 – 2023",
    logoUrl: "/education/edem-business-school.png",
    logoAlt: "EDEM Business School logo",
  },
];

const ROW_HEIGHT = 64;

export function Education(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Education
      </h3>
      <div className="border-foreground/5 bg-foreground/2 relative rounded-4xl border p-2 dark:bg-foreground/5 sm:p-4">
        <ul className="flex flex-col gap-2">
          {ENTRIES.map((entry) => (
            <li
              key={`${entry.school}-${entry.period}`}
              className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2"
              style={{ minHeight: ROW_HEIGHT }}
            >
              <SchoolLogo entry={entry} />
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                  {entry.school}
                </span>
                <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                  {entry.degree}
                  <span className="text-foreground/30 mx-2">•</span>
                  <span className="text-foreground/55">{entry.period}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SchoolLogo({ entry }: { entry: Entry }): ReactNode {
  return (
    <span
      className="border-foreground/15 bg-background inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border p-1"
      aria-hidden="true"
      style={{ borderRadius: 14 }}
    >
      <Image
        src={entry.logoUrl}
        alt={entry.logoAlt}
        width={40}
        height={40}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
