import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  SiFigma,
  SiFirebase,
  SiGithub,
  SiReact,
  SiVercel,
  SiVite,
} from "react-icons/si";

const icons = [
  { name: "React", icon: SiReact, iconClass: "text-cyan-400" },
  { name: "Vite", icon: SiVite, iconClass: "text-violet-400" },
  { name: "Figma", icon: SiFigma, iconClass: "text-rose-500" },
  { name: "Firebase", icon: SiFirebase, iconClass: "text-amber-400" },
  { name: "Vercel", icon: SiVercel, iconClass: "text-slate-900" },
  { name: "GitHub", icon: SiGithub, iconClass: "text-slate-900" },
];

const FAST_SPEED = 96;
const HOVER_SPEED = 34;

export default function InfiniteIconScroll() {
  const loopItems = [...icons, ...icons];
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const [speed, setSpeed] = useState(FAST_SPEED);
  // The list is duplicated so the second half immediately follows the first.
  // Animating from 0% to -50% moves exactly one full set out of view, which
  // makes the marquee loop appear continuous with no visible gap.

  useEffect(() => {
    if (prefersReducedMotion) {
      x.set(0);
      return undefined;
    }

    const track = trackRef.current;
    if (!track) {
      return undefined;
    }

    const loopWidth = track.scrollWidth / 2;
    if (!loopWidth) {
      return undefined;
    }

    let controls;

    const startScroll = () => {
      let currentX = x.get();

      while (currentX <= -loopWidth) {
        currentX += loopWidth;
      }

      while (currentX > 0) {
        currentX -= loopWidth;
      }

      x.set(currentX);

      const remainingDistance = loopWidth + currentX;
      const duration = remainingDistance / speed;

      controls = animate(x, -loopWidth, {
        duration,
        ease: "linear",
        onComplete: () => {
          x.set(0);
          startScroll();
        },
      });
    };

    startScroll();

    return () => controls?.stop();
  }, [prefersReducedMotion, speed, x]);

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setSpeed(HOVER_SPEED)}
      onMouseLeave={() => setSpeed(FAST_SPEED)}
      onFocusCapture={() => setSpeed(HOVER_SPEED)}
      onBlurCapture={() => setSpeed(FAST_SPEED)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-20" />

      <motion.div
        ref={trackRef}
        className="flex w-max gap-4 sm:gap-5"
        style={{ x }}
      >
        {loopItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={`${item.name}-${index}`}
              className="flex min-w-[160px] items-center gap-3 rounded-3xl border border-slate-200/70 bg-white/85 px-5 py-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.28)] backdrop-blur md:min-w-[200px] md:px-6 md:py-5"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 md:h-14 md:w-14">
                <Icon className={`text-2xl md:text-[1.75rem] ${item.iconClass}`} />
              </span>
              <span className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                {item.name}
              </span>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}
