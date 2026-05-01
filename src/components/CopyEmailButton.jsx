import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
const CopyEmailButton = () => {
  const [status, setStatus] = useState("idle");
  const email = "rosnifarook@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch (error) {
      setStatus("error");
    }

    setTimeout(() => {
      setStatus("idle");
    }, 2000);
  };
  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 1.05 }}
      className="relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary w-[12rem] cursor-pointer overflow-hidden"
      aria-label="Copy email address"
    >
      <span className="sr-only" aria-live="polite">
        {status === "copied"
          ? "Email copied"
          : status === "error"
          ? "Could not copy email"
          : "Ready to copy email"}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        {status === "copied" ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <img src="assets/copy-done.svg" className="w-5" alt="copy Icon" />
            Email copied!
          </motion.p>
        ) : status === "error" ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <img src="assets/copy.svg" className="w-5" alt="copy icon" />
            Copy failed
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <img src="assets/copy.svg" className="w-5" alt="copy icon" />
            Copy Email Address
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyEmailButton;
