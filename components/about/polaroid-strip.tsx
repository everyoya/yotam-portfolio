"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Polaroid = {
  id: string;
  rotate: number;
  src: string;
  alt: string;
};

const PHOTOS: Polaroid[] = [
  {
    id: "a",
    rotate: -8,
    src: "/polaroids/polaroid-01.png",
    alt: "Make complex products easy to understand poster",
  },
  {
    id: "b",
    rotate: 6,
    src: "/polaroids/polaroid-02.png",
    alt: "Product to advocacy flowchart sketch",
  },
  {
    id: "c",
    rotate: -4,
    src: "/polaroids/polaroid-03.png",
    alt: "Education drives adoption poster",
  },
  {
    id: "d",
    rotate: 7,
    src: "/polaroids/polaroid-04.png",
    alt: "Data to action flowchart sketch",
  },
  {
    id: "e",
    rotate: -6,
    src: "/polaroids/polaroid-05.png",
    alt: "Product x GTM x Community poster",
  },
  {
    id: "f",
    rotate: 5,
    src: "/polaroids/polaroid-06.png",
    alt: "People support what they understand poster",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function PolaroidCard({
  photo,
  index,
  onOpen,
}: {
  photo: Polaroid;
  index: number;
  onOpen: (photo: Polaroid) => void;
}): ReactNode {
  const ref = useRef<HTMLButtonElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: React.PointerEvent<HTMLButtonElement>): void => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 18;
    const k = 0.25;
    mx.set(Math.max(-max, Math.min(max, dx * k)));
    my.set(Math.max(-max, Math.min(max, dy * k)));
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onOpen(photo)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: -120, filter: "blur(18px)", rotate: photo.rotate }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: photo.rotate }}
      transition={{
        duration: 0.9,
        delay: 0.05 + index * 0.08,
        ease: EASE,
      }}
      style={{
        x: tx,
        y: ty,
        rotate: photo.rotate,
      }}
      aria-label={`Open ${photo.alt}`}
      className="focus-ring relative aspect-[3/4] w-[clamp(6rem,11vw,9rem)] shrink-0 cursor-zoom-in overflow-hidden rounded-2xl border-6 border-neutral-300/40 bg-white p-1.5 shadow-sm transition-shadow hover:shadow-lg dark:border-white/15 dark:bg-neutral-900"
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-white">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 144px, (min-width: 640px) 18vw, 32vw"
          className="object-cover object-center"
        />
      </div>
    </motion.button>
  );
}

function PolaroidLightbox({
  photo,
  onClose,
}: {
  photo: Polaroid | null;
  onClose: () => void;
}): ReactNode {
  useEffect(() => {
    if (!photo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [photo, onClose]);

  return (
    <AnimatePresence>
      {photo ? (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-8"
          aria-modal="true"
          role="dialog"
          aria-label={photo.alt}
        >
          <motion.button
            type="button"
            aria-label="Close enlarged card"
            className="absolute inset-0 cursor-zoom-out bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.34, ease: EASE }}
            className="relative z-10 w-full max-w-[min(82vw,32rem)]"
          >
            <div className="overflow-hidden rounded-[1.8rem] border border-white/20 bg-white p-2 shadow-[0_40px_120px_rgba(0,0,0,0.38)] dark:bg-neutral-950">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-white">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 32rem, 82vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function PolaroidStrip(): ReactNode {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [selectedPhoto, setSelectedPhoto] = useState<Polaroid | null>(null);

  if (!mounted) {
    return <div aria-hidden="true" className="h-[clamp(8rem,15vw,12rem)] w-full" />;
  }

  return (
    <>
      <div className="flex w-full flex-wrap items-start justify-center gap-1 px-4 sm:gap-1.5 sm:px-8">
        {PHOTOS.map((photo, i) => (
          <PolaroidCard
            key={photo.id}
            photo={photo}
            index={i}
            onOpen={setSelectedPhoto}
          />
        ))}
      </div>
      <PolaroidLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
}
