import { AnimatePresence, motion } from "framer-motion";

export default function PageLoader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div
              className="mx-auto h-16 w-16 rounded-full border-2 border-white/25 border-t-electric"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-sm tracking-[0.2em] text-slate-300">LOADING</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
