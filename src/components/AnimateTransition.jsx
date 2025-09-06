import { AnimatePresence, motion } from "framer-motion";

export default function AnimateTransition({ children, location }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname} // check transition between paths
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
