import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const updateDesktop = () => setIsDesktop(media.matches);
    updateDesktop();
    media.addEventListener("change", updateDesktop);

    const updatePosition = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => {
      media.removeEventListener("change", updateDesktop);
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  if (!isDesktop) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-[55] h-72 w-72 rounded-full bg-electric/20 blur-3xl"
      animate={{ x: position.x - 144, y: position.y - 144 }}
      transition={{ type: "spring", damping: 30, stiffness: 180, mass: 0.35 }}
    />
  );
}
